
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Globe, Mail, MessageCircle, CreditCard, Share2, Key } from 'lucide-react';

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
    'google-analytics': 'GTM-MFXDSXB7',
    'mailchimp': '',
    'facebook-pixel': '',
    'stripe': '',
    'intercom': ''
  });

  const toggleIntegration = (id: string) => {
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

  const saveIntegration = (id: string) => {
    const apiKey = apiKeys[id];
    if (!apiKey.trim()) {
      toast({
        title: "Błąd",
        description: "Podaj klucz API",
        variant: "destructive"
      });
      return;
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

    // Simulate API test
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
