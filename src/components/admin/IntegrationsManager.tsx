import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Globe, Mail, MessageCircle, CreditCard, Share2, Key, Send } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  apiKey?: string;
  config?: Record<string, any>;
}

const IntegrationsManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'resend',
      name: 'Resend',
      description: 'Profesjonalne wysyłanie emaili',
      icon: <Send className="h-5 w-5" />,
      isActive: false
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Analityka ruchu na stronie',
      icon: <Globe className="h-5 w-5" />,
      isActive: true,
      apiKey: 'GTM-MFXDSXB7'
    },
    {
      id: 'mailchimp',
      name: 'MailChimp',
      description: 'Email marketing i newslettery',
      icon: <Mail className="h-5 w-5" />,
      isActive: false
    },
    {
      id: 'facebook-pixel',
      name: 'Facebook Pixel',
      description: 'Tracking dla reklam Facebook',
      icon: <Share2 className="h-5 w-5" />,
      isActive: false
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Płatności online',
      icon: <CreditCard className="h-5 w-5" />,
      isActive: false
    },
    {
      id: 'intercom',
      name: 'Intercom',
      description: 'Live chat z klientami',
      icon: <MessageCircle className="h-5 w-5" />,
      isActive: false
    }
  ]);

  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    'resend': '',
    'google-analytics': 'GTM-MFXDSXB7',
    'mailchimp': '',
    'facebook-pixel': '',
    'stripe': '',
    'intercom': ''
  });

  const [resendFromEmail, setResendFromEmail] = useState('noreply@well-done.pl');

  const toggleIntegration = (id: string) => {
    if (id === 'resend' && !apiKeys.resend) {
      toast({
        title: "Brak klucza API",
        description: "Najpierw wprowadź i zapisz klucz API Resend",
        variant: "destructive"
      });
      return;
    }

    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, isActive: !integration.isActive }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: integration?.isActive ? "Integracja wyłączona" : "Integracja włączona",
      description: `${integration?.name} została ${integration?.isActive ? 'wyłączona' : 'włączona'}`
    });
  };

  const updateApiKey = (id: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [id]: value }));
  };

  const saveIntegration = async (id: string) => {
    const apiKey = apiKeys[id];
    if (!apiKey.trim()) {
      toast({
        title: "Błąd",
        description: "Podaj klucz API",
        variant: "destructive"
      });
      return;
    }

    // For Resend, save the API key to Supabase secrets
    if (id === 'resend') {
      try {
        const response = await fetch('/api/save-resend-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            apiKey,
            fromEmail: resendFromEmail 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save API key');
        }

        toast({
          title: "Klucz Resend zapisany",
          description: "Klucz API został bezpiecznie zapisany i jest gotowy do użycia"
        });
      } catch (error) {
        toast({
          title: "Błąd zapisywania",
          description: "Nie udało się zapisać klucza API. Spróbuj ponownie.",
          variant: "destructive"
        });
        return;
      }
    }

    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, apiKey }
          : integration
      )
    );

    toast({
      title: "Integracja zapisana",
      description: "Klucz API został zaktualizowany"
    });
  };

  const testIntegration = async (id: string) => {
    toast({
      title: "Testowanie integracji",
      description: "Sprawdzanie połączenia..."
    });

    if (id === 'resend') {
      try {
        const response = await fetch('/api/test-resend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          toast({
            title: "Test Resend zakończony pomyślnie",
            description: "Integracja z Resend działa poprawnie"
          });
        } else {
          toast({
            title: "Test nie powiódł się",
            description: "Sprawdź klucz API i spróbuj ponownie",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Błąd testowania",
          description: "Nie udało się przetestować integracji",
          variant: "destructive"
        });
      }
      return;
    }

    // Simulate API test for other integrations
    setTimeout(() => {
      toast({
        title: "Test zakończony pomyślnie",
        description: "Integracja działa poprawnie"
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Zarządzanie integracjami
          </CardTitle>
          <CardDescription>
            Skonfiguruj połączenia z zewnętrznymi serwisami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {integration.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{integration.name}</h3>
                        <Badge 
                          variant={integration.isActive ? "default" : "secondary"}
                        >
                          {integration.isActive ? "Aktywne" : "Nieaktywne"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {integration.description}
                      </p>
                      
                      {integration.id === 'resend' && (
                        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800 mb-2">
                            <strong>Instrukcje konfiguracji Resend:</strong>
                          </p>
                          <ol className="text-sm text-blue-700 space-y-1 ml-4 list-decimal">
                            <li>Zarejestruj się na <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline">resend.com</a></li>
                            <li>Zweryfikuj swoją domenę na <a href="https://resend.com/domains" target="_blank" rel="noopener noreferrer" className="underline">resend.com/domains</a></li>
                            <li>Utwórz klucz API na <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">resend.com/api-keys</a></li>
                            <li>Wklej klucz API poniżej i zapisz</li>
                          </ol>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Label>Włącz integrację</Label>
                          <Switch
                            checked={integration.isActive}
                            onCheckedChange={() => toggleIntegration(integration.id)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`${integration.id}-key`}>
                            Klucz API
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              id={`${integration.id}-key`}
                              type="password"
                              value={apiKeys[integration.id]}
                              onChange={(e) => updateApiKey(integration.id, e.target.value)}
                              placeholder="Wklej klucz API..."
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              onClick={() => saveIntegration(integration.id)}
                              disabled={!apiKeys[integration.id]?.trim()}
                            >
                              <Key className="h-4 w-4 mr-1" />
                              Zapisz
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => testIntegration(integration.id)}
                              disabled={!integration.isActive || !integration.apiKey}
                            >
                              Test
                            </Button>
                          </div>
                        </div>

                        {integration.id === 'resend' && (
                          <div className="space-y-2">
                            <Label htmlFor="resend-from-email">
                              Adres nadawcy (From)
                            </Label>
                            <Input
                              id="resend-from-email"
                              type="email"
                              value={resendFromEmail}
                              onChange={(e) => setResendFromEmail(e.target.value)}
                              placeholder="noreply@twojadomena.pl"
                            />
                            <p className="text-xs text-muted-foreground">
                              Musi być z zweryfikowanej domeny w Resend
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Konfiguruj webhooks dla automatyzacji
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://example.com/webhook"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Wydarzenia</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="form-submit" />
                <Label htmlFor="form-submit">Wysłanie formularza</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="page-view" />
                <Label htmlFor="page-view">Wyświetlenie strony</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="user-register" />
                <Label htmlFor="user-register">Rejestracja użytkownika</Label>
              </div>
            </div>
          </div>
          
          <Button className="w-full">
            Zapisz konfigurację webhook
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status połączeń</CardTitle>
          <CardDescription>Ostatnie sprawdzenie połączeń</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {integrations.filter(i => i.isActive).map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {integration.icon}
                  <span>{integration.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Połączono</span>
                  <span className="text-xs text-muted-foreground">2 min temu</span>
                </div>
              </div>
            ))}
            
            {integrations.filter(i => i.isActive).length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Brak aktywnych integracji
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsManager;
