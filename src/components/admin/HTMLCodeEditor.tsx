
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Save, Eye, Code, AlertTriangle, CheckCircle } from 'lucide-react';

interface HTMLCodeEditorProps {
  headCode: string;
  bodyCode: string;
  onHeadCodeChange: (code: string) => void;
  onBodyCodeChange: (code: string) => void;
  onSave: () => void;
}

const HTMLCodeEditor: React.FC<HTMLCodeEditorProps> = ({
  headCode,
  bodyCode,
  onHeadCodeChange,
  onBodyCodeChange,
  onSave
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
  }>({ isValid: true, errors: [] });

  const validateCode = async () => {
    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      const errors: string[] = [];
      
      // Basic validation checks
      if (headCode.includes('<script>') && !headCode.includes('</script>')) {
        errors.push('Niezamknięty tag <script> w sekcji head');
      }
      
      if (bodyCode.includes('<div>') && !bodyCode.includes('</div>')) {
        errors.push('Niezamknięty tag <div> w sekcji body');
      }

      setValidationResult({
        isValid: errors.length === 0,
        errors
      });
      setIsValidating(false);
      
      if (errors.length === 0) {
        toast({
          title: "Walidacja pomyślna",
          description: "Kod jest poprawny i może być zastosowany"
        });
      } else {
        toast({
          title: "Błędy w kodzie",
          description: `Znaleziono ${errors.length} błędów`,
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const codeTemplates = [
    {
      name: "Google Analytics 4",
      head: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>`,
      body: ""
    },
    {
      name: "Facebook Pixel",
      head: `<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>`,
      body: ""
    },
    {
      name: "Cookie Banner GDPR",
      head: `<style>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2d3748;
  color: white;
  padding: 1rem;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>`,
      body: `<div id="cookie-banner" class="cookie-banner">
  <span>Ta strona używa plików cookie. Korzystając z niej wyrażasz zgodę na ich używanie.</span>
  <button onclick="acceptCookies()">Akceptuję</button>
</div>
<script>
function acceptCookies() {
  document.getElementById('cookie-banner').style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
}
if (localStorage.getItem('cookiesAccepted')) {
  document.getElementById('cookie-banner').style.display = 'none';
}
</script>`
    },
    {
      name: "Live Chat Widget",
      head: "",
      body: `<!-- Live Chat Widget -->
<div id="live-chat" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <div style="background: #007bff; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer;">
    💬 Potrzebujesz pomocy?
  </div>
</div>`
    }
  ];

  const applyTemplate = (template: typeof codeTemplates[0]) => {
    if (template.head) {
      onHeadCodeChange(headCode + '\n' + template.head);
    }
    if (template.body) {
      onBodyCodeChange(bodyCode + '\n' + template.body);
    }
    toast({
      title: "Szablon dodany",
      description: `Kod ${template.name} został dodany do edytora`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Edytor kodu HTML
          </CardTitle>
          <CardDescription>
            Dodaj własny kod HTML, CSS i JavaScript do strony
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={validateCode} 
                variant="outline"
                disabled={isValidating}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isValidating ? 'Walidacja...' : 'Waliduj kod'}
              </Button>
              
              {validationResult.errors.length === 0 && !isValidating && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Kod poprawny
                </Badge>
              )}
              
              {validationResult.errors.length > 0 && (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {validationResult.errors.length} błędów
                </Badge>
              )}
            </div>
          </div>

          {validationResult.errors.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium text-red-800 mb-2">Błędy walidacji:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      {error}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="head-code">Kod w sekcji &lt;head&gt;</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Meta tagi, CSS, skrypty analityczne, favicony
                </p>
                <Textarea 
                  id="head-code" 
                  value={headCode}
                  onChange={(e) => onHeadCodeChange(e.target.value)}
                  placeholder="<!-- Dodaj kod dla sekcji head -->"
                  className="font-mono text-sm min-h-[300px]"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="body-code">Kod w sekcji &lt;body&gt;</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Skrypty tracking, chat widgets, popup-y
                </p>
                <Textarea 
                  id="body-code"
                  value={bodyCode}
                  onChange={(e) => onBodyCodeChange(e.target.value)}
                  placeholder="<!-- Dodaj kod dla sekcji body -->"
                  className="font-mono text-sm min-h-[300px]"
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onSave} 
            className="w-full"
            disabled={validationResult.errors.length > 0}
          >
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {codeTemplates.map((template, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => applyTemplate(template)}
              >
                <span className="font-medium">{template.name}</span>
                <span className="text-sm text-muted-foreground">
                  {template.head && template.body ? 'Head + Body' : 
                   template.head ? 'Head' : 'Body'}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HTMLCodeEditor;
