
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Navbar />
      
      <div className="pt-16">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Polityka Prywatności
              </h1>
              <p className="text-xl text-gray-600">
                Informacje o przetwarzaniu danych osobowych
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>1. Informacje ogólne</h2>
              <p>
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                przekazanych przez Użytkowników w związku z korzystaniem z usług świadczonych przez 
                Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus.
              </p>

              <h2>2. Administrator danych</h2>
              <p>
                Administratorem danych osobowych jest:
                <br />
                <strong>Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus</strong>
                <br />
                ul. Drzewieckiego 19/11, 54-129 Wrocław
                <br />
                NIP: 884-248-74-55
                <br />
                REGON: 022303775
                <br />
                E-mail: pgerus@well-done.pl
                <br />
                Telefon: 504-305-437
              </p>

              <h2>3. Cel przetwarzania danych</h2>
              <p>Dane osobowe przetwarzane są w celu:</p>
              <ul>
                <li>Świadczenia usług szkoleniowych</li>
                <li>Kontaktu z klientami</li>
                <li>Wystawiania dokumentów i certyfikatów</li>
                <li>Prowadzenia dokumentacji wymaganej przepisami prawa</li>
                <li>Marketingu bezpośredniego własnych usług</li>
              </ul>

              <h2>4. Podstawa prawna</h2>
              <p>Podstawą prawną przetwarzania danych osobowych jest:</p>
              <ul>
                <li>Wykonanie umowy (art. 6 ust. 1 lit. b RODO)</li>
                <li>Wypełnienie obowiązku prawnego (art. 6 ust. 1 lit. c RODO)</li>
                <li>Prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO)</li>
                <li>Zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO)</li>
              </ul>

              <h2>5. Okres przechowywania danych</h2>
              <p>
                Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, 
                dla których zostały zebrane, jednak nie dłużej niż przez okres wymagany 
                przepisami prawa.
              </p>

              <h2>6. Prawa osoby, której dane dotyczą</h2>
              <p>Każda osoba ma prawo do:</p>
              <ul>
                <li>Dostępu do swoich danych osobowych</li>
                <li>Sprostowania danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania</li>
                <li>Przenoszenia danych</li>
                <li>Wniesienia sprzeciwu wobec przetwarzania</li>
                <li>Cofnięcia zgody w dowolnym momencie</li>
              </ul>

              <h2>7. Kontakt</h2>
              <p>
                W sprawach dotyczących ochrony danych osobowych można kontaktować się 
                pod adresem e-mail: pgerus@well-done.pl lub telefonicznie: 504-305-437.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
