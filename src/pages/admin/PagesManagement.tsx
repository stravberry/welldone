
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePage } from '@/hooks/usePages';
import { usePagesManagement } from '@/hooks/usePagesManagement';
import PageEditor from '@/components/admin/PageEditor';
import CreatePageDialog from '@/components/admin/CreatePageDialog';
import PagesTable from '@/components/admin/PagesTable';
import SearchBar from '@/components/admin/SearchBar';

const PagesManagement: React.FC = () => {
  const {
    pages,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedPageId,
    setSelectedPageId,
    handleCreatePage,
    handleDeletePage,
    createPageLoading,
  } = usePagesManagement();

  const { data: selectedPage } = usePage(selectedPageId || '');

  if (selectedPage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPageId(null)}
          >
            ← Powrót do listy
          </Button>
        </div>
        <PageEditor page={selectedPage} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zarządzanie Stronami</h1>
        <CreatePageDialog 
          onCreatePage={handleCreatePage}
          isLoading={createPageLoading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Szukaj stron..."
        />
      </div>
      
      <PagesTable
        pages={pages}
        isLoading={isLoading}
        onEditPage={setSelectedPageId}
        onDeletePage={handleDeletePage}
      />
    </div>
  );
};

export default PagesManagement;
