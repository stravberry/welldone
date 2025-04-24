
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Save, Image, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPostEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log({
      title,
      content,
      excerpt,
      coverImage,
      seoTitle,
      seoDescription,
      isPublished
    });
    
    toast({
      title: "Post zapisany",
      description: isPublished ? "Post został opublikowany" : "Post zapisany jako szkic"
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      // For now, just use a local URL
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/admin/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powrót
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Nowy Post</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>Zapisz szkic</Button>
          <Button onClick={() => { setIsPublished(true); handleSave(); }}>
            <Save className="h-4 w-4 mr-2" />
            Opublikuj
          </Button>
        </div>
      </div>
      
      <Card>
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Treść</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          
          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tytuł</Label>
                <Input
                  id="title"
                  placeholder="Wpisz tytuł posta"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Treść</Label>
                <Textarea
                  id="content"
                  placeholder="Wpisz treść posta"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Fragment</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Krótki fragment posta"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={isPublished}
                  onCheckedChange={(checked) => setIsPublished(checked as boolean)}
                />
                <Label htmlFor="published" className="cursor-pointer">Opublikowany</Label>
              </div>
            </CardContent>
          </TabsContent>
          
          {/* Media Tab */}
          <TabsContent value="media">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-image">Zdjęcie główne</Label>
                  <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                    {coverImage ? (
                      <div className="space-y-2 w-full">
                        <img
                          src={coverImage}
                          alt="Cover preview"
                          className="max-h-[200px] mx-auto object-contain"
                        />
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setCoverImage(null)}
                        >
                          Usuń zdjęcie
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Image className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Przeciągnij i upuść lub kliknij, aby dodać</p>
                        <Input
                          id="cover-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button variant="outline" onClick={() => document.getElementById('cover-image')?.click()}>
                          Wybierz plik
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          {/* SEO Tab */}
          <TabsContent value="seo">
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="seo-title">Tytuł SEO</Label>
                <Input
                  id="seo-title"
                  placeholder="Tytuł dla wyszukiwarek"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seo-description">Opis SEO</Label>
                <Textarea
                  id="seo-description"
                  placeholder="Opis dla wyszukiwarek"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default BlogPostEditor;
