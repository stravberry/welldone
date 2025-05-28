
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { useUpdatePageSection } from '@/hooks/usePages';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type PageSection = Tables<'page_sections'>;

interface PageSectionEditorProps {
  section: PageSection;
  onDelete?: (sectionId: string) => void;
}

const PageSectionEditor: React.FC<PageSectionEditorProps> = ({ section, onDelete }) => {
  const [formData, setFormData] = useState({
    title: section.title || '',
    subtitle: section.subtitle || '',
    content: section.content || '',
    image_url: section.image_url || '',
    video_url: section.video_url || '',
    button_text: section.button_text || '',
    button_url: section.button_url || '',
    is_active: section.is_active,
    order_index: section.order_index,
  });
  
  const [isExpanded, setIsExpanded] = useState(false);
  const updateSection = useUpdatePageSection();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateSection.mutateAsync({
        id: section.id,
        updates: {
          ...formData,
          updated_at: new Date().toISOString(),
        }
      });
      
      toast({
        title: "Sukces",
        description: "Sekcja została zaktualizowana",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować sekcji",
        variant: "destructive",
      });
    }
  };

  const getSectionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      hero: 'Hero/Nagłówek',
      about: 'O nas',
      services: 'Usługi',
      testimonials: 'Opinie',
      contact: 'Kontakt',
      cta: 'Call to Action',
    };
    return types[type] || type;
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          {getSectionTypeLabel(section.section_type)} - {section.section_key}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(section.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`title-${section.id}`}>Tytuł</Label>
                <Input
                  id={`title-${section.id}`}
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Wprowadź tytuł sekcji"
                />
              </div>
              
              <div>
                <Label htmlFor={`subtitle-${section.id}`}>Podtytuł</Label>
                <Input
                  id={`subtitle-${section.id}`}
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Wprowadź podtytuł"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`content-${section.id}`}>Treść HTML</Label>
              <Textarea
                id={`content-${section.id}`}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Wprowadź treść w formacie HTML"
                rows={6}
                className="font-mono text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`image-${section.id}`}>URL obrazu</Label>
                <Input
                  id={`image-${section.id}`}
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <Label htmlFor={`video-${section.id}`}>URL video</Label>
                <Input
                  id={`video-${section.id}`}
                  value={formData.video_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`button-text-${section.id}`}>Tekst przycisku</Label>
                <Input
                  id={`button-text-${section.id}`}
                  value={formData.button_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                  placeholder="Kliknij tutaj"
                />
              </div>
              
              <div>
                <Label htmlFor={`button-url-${section.id}`}>URL przycisku</Label>
                <Input
                  id={`button-url-${section.id}`}
                  value={formData.button_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, button_url: e.target.value }))}
                  placeholder="/kontakt"
                />
              </div>
              
              <div>
                <Label htmlFor={`order-${section.id}`}>Kolejność</Label>
                <Input
                  id={`order-${section.id}`}
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            
            <Button type="submit" disabled={updateSection.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateSection.isPending ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default PageSectionEditor;
