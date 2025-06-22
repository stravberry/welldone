
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Eye, Edit, Users, UserCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const EmailTemplatesManagement: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'admin-notification',
      name: 'Powiadomienie dla Administratora',
      description: 'Szablon e-maila wysyłanego do administratora gdy pojawi się nowe zapytanie',
      icon: Users,
      type: 'admin',
      lastModified: '2024-01-15',
      status: 'active'
    },
    {
      id: 'client-confirmation',
      name: 'Potwierdzenie dla Klienta',
      description: 'Szablon e-maila potwierdzającego otrzymanie zapytania dla klienta',
      icon: UserCheck,
      type: 'client',
      lastModified: '2024-01-15',
      status: 'active'
    }
  ];

  const renderPreview = (templateId: string) => {
    if (templateId === 'admin-notification') {
      return (
        <div className="bg-white rounded-lg border max-w-2xl mx-auto" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' }}>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold">Nowe zapytanie UDT</h1>
          </div>
          <div className="p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-orange-800 mb-3">Dane kontaktowe:</h2>
              <div className="space-y-2 text-orange-700">
                <p><strong>Imię i nazwisko:</strong> Jan Kowalski</p>
                <p><strong>Firma:</strong> ABC Sp. z o.o.</p>
                <p><strong>Email:</strong> jan.kowalski@abc.pl</p>
                <p><strong>Telefon:</strong> +48 123 456 789</p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Wiadomość:</h2>
              <p className="text-gray-700 leading-relaxed">
                Dzień dobry, chciałbym uzyskać więcej informacji na temat szkoleń UDT dla operatorów wózków widłowych. Proszę o kontakt.
              </p>
            </div>
            <div className="text-center">
              <a href="#" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Odpowiedz na zapytanie
              </a>
            </div>
          </div>
          <div className="bg-gray-50 border-t p-4 rounded-b-lg text-center text-sm text-gray-600">
            Wiadomość wysłana ze strony <a href="#" className="text-orange-500 underline">well-done.pl</a>
          </div>
        </div>
      );
    }

    if (templateId === 'client-confirmation') {
      return (
        <div className="bg-white rounded-lg border max-w-2xl mx-auto" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' }}>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-t-lg">
            <h1 className="text-2xl font-bold">Dziękujemy za zapytanie!</h1>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Twoje zapytanie zostało wysłane!</h2>
              <p className="text-gray-600">Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą w ciągu 24 godzin.</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-800 mb-2">Co dalej?</h3>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Nasz ekspert przeanalizuje Twoje zapytanie</li>
                <li>• Skontaktujemy się z Tobą telefonicznie lub e-mailem</li>
                <li>• Przedstawimy spersonalizowaną ofertę</li>
              </ul>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Masz dodatkowe pytania?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="#" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Zadzwoń: +48 123 456 789
                </a>
                <a href="#" className="inline-block border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Napisz e-mail
                </a>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-t p-4 rounded-b-lg text-center text-sm text-gray-600">
            <p>Well-done.pl - Kompleksowe szkolenia UDT</p>
            <p className="mt-1">
              <a href="#" className="text-orange-500 underline">www.well-done.pl</a> | 
              <a href="#" className="text-orange-500 underline ml-1">kontakt@well-done.pl</a>
            </p>
          </div>
        </div>
      );
    }

    return <div>Podgląd niedostępny</div>;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Szablony E-mail</h1>
        <p className="text-gray-600">
          Zarządzaj szabłonami wiadomości e-mail wysyłanych przez system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      template.type === 'admin' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        template.type === 'admin' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          template.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.status === 'active' ? 'Aktywny' : 'Nieaktywny'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Zmieniono: {template.lastModified}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Podgląd
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Podgląd: {template.name}</DialogTitle>
                        <DialogDescription>
                          Tak będzie wyglądać wiadomość e-mail wysłana do odbiorcy
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        {renderPreview(template.id)}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edytuj
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Informacje o szablonach</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>• <strong>Szablon administratora</strong> - wysyłany na adres administracyjny gdy pojawi się nowe zapytanie</p>
          <p>• <strong>Szablon klienta</strong> - wysyłany automatycznie do osoby, która wysłała zapytanie jako potwierdzenie</p>
          <p>• Oba szablony wykorzystują responsywny design dopasowany do stylu strony well-done.pl</p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesManagement;
