
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface CreatePageDialogProps {
  onCreatePage: (data: {
    title: string;
    slug: string;
    meta_title: string;
    meta_description: string;
  }) => Promise<boolean>;
  isLoading: boolean;
}

const CreatePageDialog: React.FC<CreatePageDialogProps> = ({
  onCreatePage,
  isLoading
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPageData, setNewPageData] = useState({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await onCreatePage(newPageData);
    if (success) {
      setIsOpen(false);
      setNewPageData({ title: '', slug: '', meta_title: '', meta_description: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Dodaj Stronę
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Utwórz nową stronę</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Tytuł strony</Label>
            <Input
              id="title"
              value={newPageData.title}
              onChange={(e) => setNewPageData(prev => ({ 
                ...prev, 
                title: e.target.value,
                slug: e.target.value.toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim()
              }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="slug">Ścieżka URL</Label>
            <Input
              id="slug"
              value={newPageData.slug}
              onChange={(e) => setNewPageData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="/nowa-strona"
              required
            />
          </div>
          <div>
            <Label htmlFor="meta_title">Meta tytuł (opcjonalnie)</Label>
            <Input
              id="meta_title"
              value={newPageData.meta_title}
              onChange={(e) => setNewPageData(prev => ({ ...prev, meta_title: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="meta_description">Meta opis (opcjonalnie)</Label>
            <Input
              id="meta_description"
              value={newPageData.meta_description}
              onChange={(e) => setNewPageData(prev => ({ ...prev, meta_description: e.target.value }))}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Anuluj
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Tworzenie...' : 'Utwórz'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageDialog;
