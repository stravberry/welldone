
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog posts data (empty for now)
const blogPosts = [];

const BlogManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zarządzanie Blogiem</h1>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            Nowy Post
          </Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-md shadow">
        {blogPosts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Tytuł</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Publikacji</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post: any) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.status}</TableCell>
                  <TableCell>{post.publishDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Podgląd
                      </Button>
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
        ) : (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brak postów na blogu</h3>
            <p className="text-gray-500 mb-4">Nie utworzono jeszcze żadnych postów. Zacznij tworzyć swój pierwszy post!</p>
            <Button asChild>
              <Link to="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj Pierwszy Post
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
