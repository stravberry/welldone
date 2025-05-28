
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Page = Tables<'pages'>;
type PageSection = Tables<'page_sections'>;
type PageInsert = TablesInsert<'pages'>;
type PageUpdate = TablesUpdate<'pages'>;
type PageSectionInsert = TablesInsert<'page_sections'>;
type PageSectionUpdate = TablesUpdate<'page_sections'>;

export const usePages = () => {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const usePage = (id: string) => {
  return useQuery({
    queryKey: ['page', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select(`
          *,
          page_sections (*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (page: PageInsert) => {
      const { data, error } = await supabase
        .from('pages')
        .insert(page)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: PageUpdate }) => {
      const { data, error } = await supabase
        .from('pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['page', data.id] });
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};

export const useUpdatePageSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: PageSectionUpdate }) => {
      const { data, error } = await supabase
        .from('page_sections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['page', data.page_id] });
    },
  });
};

export const useCreatePageSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (section: PageSectionInsert) => {
      const { data, error } = await supabase
        .from('page_sections')
        .insert(section)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['page', data.page_id] });
    },
  });
};

export const useDeletePageSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};

// New hook for handling page builder blocks
export const useSavePageBlocks = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ pageId, blocks }: { pageId: string; blocks: any[] }) => {
      // First, delete existing page builder sections
      await supabase
        .from('page_sections')
        .delete()
        .eq('page_id', pageId)
        .eq('section_type', 'builder_block');

      // Then create new sections for each block
      const sectionsData = blocks.map((block, index) => ({
        page_id: pageId,
        section_type: 'builder_block',
        section_key: `builder_${block.type}_${block.id}`,
        title: `${block.type} block`,
        content: JSON.stringify(block),
        order_index: index,
        is_active: true,
      }));

      if (sectionsData.length > 0) {
        const { data, error } = await supabase
          .from('page_sections')
          .insert(sectionsData)
          .select();
        
        if (error) throw error;
        return data;
      }
      
      return [];
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['page', variables.pageId] });
    },
  });
};
