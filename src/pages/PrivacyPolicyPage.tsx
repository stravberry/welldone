import React from 'react';
import Navbar from '@/components/Navbar';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Polityka Prywatności</h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Informacje ogólne</h2>
              <p className="mb-6">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                przekazanych przez Użytkowników w związku z korzystaniem z usług świadczonych przez 
                Well-Done.pl Paweł Gerus.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Administrator danych</h2>
              <p className="mb-6">
                Administratorem danych osobowych jest:<br />
                Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus<br />
                ul. Drzewieckiego 19/11<br />
                54-129 Wrocław<br />
                NIP: 884-248-74-55<br />
                E-mail: pgerus@well-done.pl
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Zakres zbieranych danych</h2>
              <p className="mb-6">
                Zbieramy następujące dane osobowe:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu</li>
                <li>Nazwa firmy</li>
                <li>Inne dane podane dobrowolnie w formularzach kontaktowych</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cel przetwarzania danych</h2>
              <p className="mb-6">
                Dane osobowe przetwarzamy w celu:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Świadczenia usług szkoleniowych</li>
                <li>Kontaktu z klientami</li>
                <li>Przygotowania ofert handlowych</li>
                <li>Rozliczenia świadczonych usług</li>
                <li>Prowadzenia działań marketingowych (za zgodą)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Prawa użytkowników</h2>
              <p className="mb-6">
                Użytkownicy mają prawo do:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Dostępu do swoich danych osobowych</li>
                <li>Sprostowania danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania</li>
                <li>Przenoszenia danych</li>
                <li>Wniesienia sprzeciwu wobec przetwarzania</li>
                <li>Cofnięcia zgody w dowolnym momencie</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Kontakt</h2>
              <p className="mb-6">
                W sprawach dotyczących ochrony danych osobowych prosimy o kontakt:<br />
                E-mail: pgerus@well-done.pl<br />
                Telefon: 504-305-437
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
