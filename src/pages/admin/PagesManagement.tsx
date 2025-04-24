
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

// Sample page data
const pages = [
  { id: 1, title: 'Strona główna', slug: '/', lastModified: '2023-05-15' },
  { id: 2, title: 'O Nas', slug: '/o-nas', lastModified: '2023-05-14' },
  { id: 3, title: 'Usługi', slug: '/uslugi', lastModified: '2023-05-13' },
  { id: 4, title: 'Bezpłatny Audyt', slug: '/bezplatny-audyt', lastModified: '2023-05-12' },
  { id: 5, title: 'Kontakt', slug: '/kontakt', lastModified: '2023-05-11' },
];

const PagesManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zarządzanie Stronami</h1>
        <Button>Dodaj Stronę</Button>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tytuł</TableHead>
              <TableHead>Ścieżka</TableHead>
              <TableHead>Ostatnia Modyfikacja</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.id}</TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>{page.lastModified}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edytuj
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Usuń
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PagesManagement;
