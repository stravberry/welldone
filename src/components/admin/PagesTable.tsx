
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Globe } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Page = Tables<'pages'> & {
  page_sections: Tables<'page_sections'>[];
};

interface PagesTableProps {
  pages: Page[] | undefined;
  isLoading: boolean;
  onEditPage: (pageId: string) => void;
  onDeletePage: (id: string, title: string) => void;
}

const PagesTable: React.FC<PagesTableProps> = ({
  pages,
  isLoading,
  onEditPage,
  onDeletePage
}) => {
  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tytuł</TableHead>
            <TableHead>Ścieżka</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ostatnia modyfikacja</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Ładowanie stron...
              </TableCell>
            </TableRow>
          ) : pages?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Nie znaleziono stron
              </TableCell>
            </TableRow>
          ) : (
            pages?.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="font-mono text-sm">{page.slug}</TableCell>
                <TableCell>
                  <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                    {page.status === 'published' ? 'Opublikowana' : 'Szkic'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(page.updated_at).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {page.status === 'published' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <a href={page.slug} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" />
                          Zobacz
                        </a>
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditPage(page.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edytuj
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDeletePage(page.id, page.title)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Usuń
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PagesTable;
