import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const RedirectTester: React.FC = () => {
  const [testUrl, setTestUrl] = useState('');
  const [testing, setTesting] = useState(false);

  const testRedirect = async () => {
    if (!testUrl.trim()) {
      toast.error('Wprowadź URL do testowania');
      return;
    }

    setTesting(true);
    
    try {
      console.log('[REDIRECT-TEST] Testing URL:', testUrl);
      
      // Test 1: Sprawdź czy Vercel API handler działa
      const vercelResponse = await fetch(`/api/redirect-handler?path=${encodeURIComponent(testUrl)}`);
      console.log('[REDIRECT-TEST] Vercel API response:', vercelResponse.status, vercelResponse.statusText);
      
      if (vercelResponse.redirected) {
        console.log('[REDIRECT-TEST] Vercel redirected to:', vercelResponse.url);
        toast.success(`✅ Vercel redirect działa! Przekierowano na: ${vercelResponse.url}`);
        return;
      }

      // Test 2: Sprawdź edge function przez supabase client (unikając CORS)
      try {
        const { data: edgeData, error: edgeError } = await fetch('/api/redirect-handler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'test-edge', path: testUrl })
        }).then(res => res.json());

        if (edgeError) {
          console.log('[REDIRECT-TEST] Edge function error:', edgeError);
          toast.warning('❓ Edge function nie odpowiedział poprawnie');
        } else if (edgeData?.redirect) {
          console.log('[REDIRECT-TEST] Edge function found redirect:', edgeData);
          toast.success(`✅ Edge function działa! Przekierowanie na: ${edgeData.redirect.target_url}`);
          return;
        } else {
          console.log('[REDIRECT-TEST] Edge function data:', edgeData);
          toast.warning('❓ Nie znaleziono przekierowania w edge function');
        }
      } catch (edgeError) {
        console.log('[REDIRECT-TEST] Edge function connection error:', edgeError);
        toast.warning('❓ Nie można połączyć się z edge function');
      }

      // Końcowa informacja
      toast.info('ℹ️ Test zakończony - sprawdź console dla szczegółów');

    } catch (error) {
      console.error('[REDIRECT-TEST] Error:', error);
      toast.error('❌ Błąd podczas testowania przekierowania');
    } finally {
      setTesting(false);
    }
  };

  const commonTestUrls = [
    '/szkolenia-uprawnienia-elektryczne/',
    '/login',
    '/admin',
    '/szkolenia-na-wozki-widlowe-na-dolnym-slasku/szkolenia-wozki-widlowe-wroclaw/'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>🧪 Tester przekierowań</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Wpisz URL do testowania np. /szkolenia-uprawnienia-elektryczne/"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && testRedirect()}
          />
          <Button onClick={testRedirect} disabled={testing}>
            {testing ? 'Testowanie...' : 'Test'}
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Szybkie testy:</p>
          <div className="flex flex-wrap gap-2">
            {commonTestUrls.map((url) => (
              <Button
                key={url}
                variant="outline"
                size="sm"
                onClick={() => setTestUrl(url)}
                className="text-xs"
              >
                {url}
              </Button>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>🔍 <strong>Test sprawdza:</strong></p>
          <p>1. Czy Vercel API handler działa</p>
          <p>2. Czy Edge Function odpowiada poprawnie</p>
          <p>3. Czy przekierowanie zostało znalezione w bazie</p>
          <p className="pt-2 text-blue-600">💡 Sprawdź console (F12) aby zobaczyć szczegółowe logi</p>
        </div>
      </CardContent>
    </Card>
  );
};