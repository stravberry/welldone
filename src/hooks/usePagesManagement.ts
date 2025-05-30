
import { useState } from 'react';
import { usePages, useCreatePage, useDeletePage } from '@/hooks/usePages';
import { useToast } from '@/hooks/use-toast';

export const usePagesManagement = () => {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: pages, isLoading } = usePages();
  const createPage = useCreatePage();
  const deletePage = useDeletePage();
  const { toast } = useToast();

  const filteredPages = pages?.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePage = async (pageData: {
    title: string;
    slug: string;
    meta_title: string;
    meta_description: string;
  }) => {
    try {
      await createPage.mutateAsync({
        title: pageData.title,
        slug: pageData.slug,
        meta_title: pageData.meta_title,
        meta_description: pageData.meta_description,
        status: 'draft',
        meta_keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        created_by: null,
        updated_by: null,
        blocks_data: [],
      });
      
      toast({
        title: "Sukces",
        description: "Nowa strona została utworzona",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć strony",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!confirm(`Czy na pewno chcesz usunąć stronę "${title}"?`)) return;
    
    try {
      await deletePage.mutateAsync(id);
      toast({
        title: "Sukces",
        description: "Strona została usunięta",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć strony",
        variant: "destructive",
      });
    }
  };

  return {
    pages: filteredPages,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedPageId,
    setSelectedPageId,
    handleCreatePage,
    handleDeletePage,
    createPageLoading: createPage.isPending,
  };
};
