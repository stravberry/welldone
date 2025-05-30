import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import type { PageBlock } from '@/components/admin/PageBuilder/types';

// Converter functions
const convertSectionToBlock = (section: Tables<'page_sections'>): PageBlock => {
  const baseBlock = {
    id: section.id,
    order: section.order_index,
    styles: {
      margin: { top: 0, right: 0, bottom: 20, left: 0 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      textAlign: 'left' as const,
      backgroundColor: 'transparent',
    },
  };

  // Map section types to block types
  switch (section.section_type) {
    case 'hero':
      return {
        ...baseBlock,
        type: 'hero',
        content: {
          title: section.title || 'Nagłówek Hero',
          description: section.content || 'Opis sekcji hero',
          buttonText: section.button_text || 'Przycisk',
          buttonUrl: section.button_url || '#',
          videoUrl: section.video_url || '',
        },
      };
    case 'services':
      return {
        ...baseBlock,
        type: 'services-grid',
        content: {
          title: section.title || 'Nasze Usługi',
          description: section.subtitle || 'Opis usług',
          services: (section.settings as any)?.services || [],
        },
      };
    case 'stats':
      return {
        ...baseBlock,
        type: 'stats',
        content: {
          title: section.title || 'Statystyki',
          stats: (section.settings as any)?.stats || [],
        },
      };
    case 'cta':
      return {
        ...baseBlock,
        type: 'cta',
        content: {
          title: section.title || 'Call to Action',
          description: section.content || 'Opis CTA',
          buttonText: section.button_text || 'Przycisk',
          buttonUrl: section.button_url || '#',
          backgroundType: 'gradient',
        },
      };
    default:
      return {
        ...baseBlock,
        type: 'text',
        content: {
          text: section.content || '<p>Tekst...</p>',
        },
      };
  }
};

const convertBlockToSection = (block: PageBlock, pageId: string): Omit<Tables<'page_sections'>, 'id' | 'created_at' | 'updated_at'> => {
  const baseSection = {
    page_id: pageId,
    order_index: block.order,
    section_key: `block-${block.id}`,
    is_active: true,
    settings: {},
  };

  switch (block.type) {
    case 'hero':
      return {
        ...baseSection,
        section_type: 'hero',
        title: block.content.title,
        content: block.content.description,
        button_text: block.content.buttonText,
        button_url: block.content.buttonUrl,
        video_url: block.content.videoUrl,
        subtitle: null,
        image_url: null,
      };
    case 'services-grid':
      return {
        ...baseSection,
        section_type: 'services',
        title: block.content.title,
        subtitle: block.content.description,
        settings: { services: block.content.services },
        content: null,
        button_text: null,
        button_url: null,
        image_url: null,
        video_url: null,
      };
    case 'stats':
      return {
        ...baseSection,
        section_type: 'stats',
        title: block.content.title,
        settings: { stats: block.content.stats },
        content: null,
        subtitle: null,
        button_text: null,
        button_url: null,
        image_url: null,
        video_url: null,
      };
    case 'cta':
      return {
        ...baseSection,
        section_type: 'cta',
        title: block.content.title,
        content: block.content.description,
        button_text: block.content.buttonText,
        button_url: block.content.buttonUrl,
        subtitle: null,
        image_url: null,
        video_url: null,
      };
    default:
      return {
        ...baseSection,
        section_type: 'text',
        content: block.content.text || '',
        title: null,
        subtitle: null,
        button_text: null,
        button_url: null,
        image_url: null,
        video_url: null,
      };
  }
};

export const usePageBlocks = (pageId: string) => {
  return useQuery({
    queryKey: ['page-blocks', pageId],
    queryFn: async () => {
      if (!pageId) return [];

      // First try to get blocks_data from pages table
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('blocks_data')
        .eq('id', pageId)
        .single();

      if (pageError) throw pageError;

      // If blocks_data exists and is not empty, use it
      if (pageData.blocks_data && Array.isArray(pageData.blocks_data) && pageData.blocks_data.length > 0) {
        return pageData.blocks_data as PageBlock[];
      }

      // Otherwise, convert from page_sections
      const { data: sections, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pageId)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (sectionsError) throw sectionsError;

      if (!sections || sections.length === 0) {
        return [];
      }

      // Convert sections to blocks
      const blocks = sections.map(convertSectionToBlock);
      
      // Save converted blocks to pages table for future use
      await supabase
        .from('pages')
        .update({ blocks_data: blocks })
        .eq('id', pageId);

      return blocks;
    },
    enabled: !!pageId,
  });
};

export const useSavePageBlocks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, blocks }: { pageId: string; blocks: PageBlock[] }) => {
      // Save to pages table as blocks_data
      const { error: pageError } = await supabase
        .from('pages')
        .update({ blocks_data: blocks })
        .eq('id', pageId);

      if (pageError) throw pageError;

      // Also convert and save to page_sections for backward compatibility
      // First, delete existing sections
      await supabase
        .from('page_sections')
        .delete()
        .eq('page_id', pageId);

      // Then insert new sections
      if (blocks.length > 0) {
        const sections = blocks.map(block => convertBlockToSection(block, pageId));
        const { error: sectionsError } = await supabase
          .from('page_sections')
          .insert(sections);

        if (sectionsError) throw sectionsError;
      }

      return blocks;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['page-blocks', variables.pageId] });
      queryClient.invalidateQueries({ queryKey: ['page-sections', variables.pageId] });
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};
