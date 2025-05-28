
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Save, Code, Search, Shield, Zap, Globe, Database } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSave = () => {
    toast({
      title: "Ustawienia zapisane",
      description: "Twoje zmiany zostały pomyślnie zapisane"
    });
  };

  const handleCodeSave = () => {
    toast({
      title: "Kod HTML zapisany",
      description: "Zmiany w kodzie zostały zastosowane"
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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">Ogólne</TabsTrigger>
          <TabsTrigger value="html">HTML/CSS/JS</TabsTrigger>
          <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
          <TabsTrigger value="performance">Wydajność</TabsTrigger>
          <TabsTrigger value="security">Bezpieczeństwo</TabsTrigger>
          <TabsTrigger value="integrations">Integracje</TabsTrigger>
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

        <TabsContent value="html">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Zarządzanie kodem HTML
                </CardTitle>
                <CardDescription>Dodaj własny kod do sekcji head i body strony</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Tryb podglądu</Label>
                  <Switch checked={isPreviewMode} onCheckedChange={setIsPreviewMode} />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="head-code">Kod w sekcji &lt;head&gt;</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Meta tagi, CSS, skrypty analityczne, favicony
                    </p>
                    <Textarea 
                      id="head-code" 
                      value={headCode}
                      onChange={(e) => setHeadCode(e.target.value)}
                      placeholder="<!-- Dodaj kod dla sekcji head -->"
                      className="font-mono text-sm min-h-[150px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="body-code">Kod w sekcji &lt;body&gt;</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Skrypty tracking, chat widgets, popup-y
                    </p>
                    <Textarea 
                      id="body-code"
                      value={bodyCode}
                      onChange={(e) => setBodyCode(e.target.value)}
                      placeholder="<!-- Dodaj kod dla sekcji body -->"
                      className="font-mono text-sm min-h-[150px]"
                    />
                  </div>
                </div>
                
                <Button onClick={handleCodeSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Zastosuj zmiany kodu
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Szablony kodu</CardTitle>
                <CardDescription>Gotowe snippety do szybkiego dodania</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <span className="font-medium">Google Analytics 4</span>
                    <span className="text-sm text-muted-foreground">Dodaj tracking GA4</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <span className="font-medium">Facebook Pixel</span>
                    <span className="text-sm text-muted-foreground">Pixel Meta Ads</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <span className="font-medium">Live Chat</span>
                    <span className="text-sm text-muted-foreground">Widget czatu</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <span className="font-medium">Cookie Banner</span>
                    <span className="text-sm text-muted-foreground">Banner GDPR</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="seo">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  SEO & Meta Tags
                </CardTitle>
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
                <div className="space-y-2">
                  <Label htmlFor="og-image">Domyślny obraz OpenGraph</Label>
                  <Input id="og-image" placeholder="URL do obrazu" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Structured Data (Schema.org)</CardTitle>
                <CardDescription>Dane strukturalne dla lepszego SEO</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Organizacja Schema</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Breadcrumbs Schema</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>FAQ Schema</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Wydajność
                </CardTitle>
                <CardDescription>Optymalizacja szybkości strony</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Minifikacja CSS/JS</Label>
                    <p className="text-sm text-muted-foreground">Automatyczna kompresja kodu</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Optymalizacja obrazów</Label>
                    <p className="text-sm text-muted-foreground">WebP i kompresja</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cache przeglądarki</Label>
                    <p className="text-sm text-muted-foreground">Długość cachowania zasobów</p>
                  </div>
                  <Badge variant="secondary">7 dni</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>Monitoring wydajności</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">98</div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95</div>
                    <div className="text-sm text-muted-foreground">Accessibility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">87</div>
                    <div className="text-sm text-muted-foreground">SEO</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Bezpieczeństwo
                </CardTitle>
                <CardDescription>Ustawienia zabezpieczeń witryny</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>HTTPS Redirect</Label>
                    <p className="text-sm text-muted-foreground">Wymuszaj połączenia HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Security Headers</Label>
                    <p className="text-sm text-muted-foreground">HSTS, CSP, X-Frame-Options</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatyczne kopie zapasowe</Label>
                    <p className="text-sm text-muted-foreground">Codzienne backup</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GDPR & Compliance</CardTitle>
                <CardDescription>Zgodność z przepisami</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cookie-policy">Polityka cookies</Label>
                  <Textarea id="cookie-policy" placeholder="Treść polityki cookies..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privacy-policy">Polityka prywatności</Label>
                  <Textarea id="privacy-policy" placeholder="Treść polityki prywatności..." />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Integracje zewnętrzne
                </CardTitle>
                <CardDescription>Połączenia z zewnętrznymi serwisami</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mailchimp-api">MailChimp API Key</Label>
                  <Input id="mailchimp-api" type="password" placeholder="Klucz API MailChimp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook-app-id">Facebook App ID</Label>
                  <Input id="facebook-app-id" placeholder="ID aplikacji Facebook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recaptcha-key">reCAPTCHA Site Key</Label>
                  <Input id="recaptcha-key" placeholder="Klucz witryny reCAPTCHA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="URL webhook dla integracji" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status integracji</CardTitle>
                <CardDescription>Aktywne połączenia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Google Analytics</span>
                    <Badge variant="default">Aktywne</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Facebook Pixel</span>
                    <Badge variant="secondary">Nieaktywne</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MailChimp</span>
                    <Badge variant="secondary">Nieaktywne</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
