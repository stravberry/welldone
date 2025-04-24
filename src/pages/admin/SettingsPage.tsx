
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const handleSave = () => {
    toast({
      title: "Ustawienia zapisane",
      description: "Twoje zmiany zostały pomyślnie zapisane"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ustawienia</h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Zapisz zmiany
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Ogólne</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="users">Użytkownicy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia ogólne</CardTitle>
              <CardDescription>Podstawowe ustawienia witryny</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nazwa strony</Label>
                <Input id="site-name" defaultValue="Well-Done.pl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Opis strony</Label>
                <Textarea id="site-description" defaultValue="Pomagamy firmom produkcyjnym działać bez ryzyka – zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email kontaktowy</Label>
                <Input id="contact-email" type="email" defaultValue="pgerus@well-done.pl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Telefon kontaktowy</Label>
                <Input id="contact-phone" defaultValue="504-305-437" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia SEO</CardTitle>
              <CardDescription>Optymalizacja dla wyszukiwarek</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Domyślny tytuł meta</Label>
                <Input id="meta-title" defaultValue="Well-Done.pl - Uprawnienia UDT i SEP dla firm produkcyjnych" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Domyślny opis meta</Label>
                <Textarea id="meta-description" defaultValue="Pomagamy firmom produkcyjnym działać bez ryzyka – zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input id="google-analytics" defaultValue="GTM-MFXDSXB7" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie użytkownikami</CardTitle>
              <CardDescription>Ustawienia użytkowników CMS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-lg">admin</h3>
                <p className="text-gray-500 text-sm mb-4">Administrator systemu</p>
                <Button variant="outline">Zmień hasło</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
