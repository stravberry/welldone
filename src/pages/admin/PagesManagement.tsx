
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';
import { usePages } from '@/hooks/usePages';
import CreatePageDialog from '@/components/admin/CreatePageDialog';
import { usePagesManagement } from '@/hooks/usePagesManagement';

interface PagesManagementProps {
  onSelectPage?: (pageId: string) => void;
}

const PagesManagement: React.FC<PagesManagementProps> = ({ onSelectPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: pages, isLoading } = usePages();
  const { handleCreatePage, createPageLoading } = usePagesManagement();

  const filteredPages = pages?.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <Badge className="bg-green-100 text-green-800">Opublikowane</Badge>;
    }
    return <Badge variant="secondary">Wersja robocza</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Ładowanie stron...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Zarządzanie stronami</h2>
          <p className="text-gray-600">Twórz, edytuj i zarządzaj stronami swojej witryny</p>
        </div>
        <CreatePageDialog 
          onCreatePage={handleCreatePage}
          isLoading={createPageLoading}
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Szukaj stron..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Brak wyników' : 'Brak stron'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? `Nie znaleziono stron zawierających "${searchTerm}"`
                : 'Zacznij od utworzenia pierwszej strony'
              }
            </p>
            {!searchTerm && (
              <CreatePageDialog 
                onCreatePage={handleCreatePage}
                isLoading={createPageLoading}
              />
            )}
          </div>
        ) : (
          filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{page.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">/{page.slug}</p>
                  </div>
                  {getStatusBadge(page.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>Utworzono: {formatDate(page.created_at)}</p>
                    <p>Aktualizacja: {formatDate(page.updated_at)}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSelectPage?.(page.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edytuj
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Podgląd
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PagesManagement;
