
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsPage = () => {
  return (
    <div>
      <Navbar />
      
      <div className="pt-16">
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Regulamin
              </h1>
              <p className="text-xl text-gray-600">
                Warunki świadczenia usług szkoleniowych
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>§ 1. Postanowienia ogólne</h2>
              <p>
                Niniejszy Regulamin określa warunki świadczenia usług szkoleniowych przez 
                Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus.
              </p>

              <h2>§ 2. Definicje</h2>
              <ul>
                <li><strong>Usługodawca</strong> - Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus</li>
                <li><strong>Klient</strong> - osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z usług</li>
                <li><strong>Szkolenie</strong> - usługa edukacyjna świadczona przez Usługodawcę</li>
                <li><strong>Umowa</strong> - umowa o świadczenie usług szkoleniowych</li>
              </ul>

              <h2>§ 3. Zakres usług</h2>
              <p>Usługodawca świadczy następujące usługi:</p>
              <ul>
                <li>Szkolenia z zakresu uprawnień UDT dla operatorów i konserwatorów</li>
                <li>Szkolenia z zakresu uprawnień SEP</li>
                <li>Szkolenia z lutowania</li>
                <li>Eventy edukacyjne</li>
                <li>Audyty potrzeb szkoleniowych</li>
              </ul>

              <h2>§ 4. Warunki uczestnictwa</h2>
              <p>Warunkiem uczestnictwa w szkoleniach jest:</p>
              <ul>
                <li>Zawarcie umowy o świadczenie usług</li>
                <li>Uiszczenie opłaty za szkolenie</li>
                <li>Spełnienie wymagań formalnych określonych dla danego szkolenia</li>
                <li>Aktywne uczestnictwo w zajęciach</li>
              </ul>

              <h2>§ 5. Opłaty i płatności</h2>
              <p>
                Opłaty za szkolenia określane są w indywidualnych wycenach. 
                Płatność następuje zgodnie z warunkami określonymi w umowie.
              </p>

              <h2>§ 6. Rezygnacja i zwroty</h2>
              <p>
                Warunki rezygnacji ze szkolenia i zwrotu opłat określane są 
                indywidualnie w umowie o świadczenie usług.
              </p>

              <h2>§ 7. Certyfikaty i dokumenty</h2>
              <p>
                Po ukończeniu szkolenia i zdaniu egzaminu, uczestnicy otrzymują 
                odpowiednie certyfikaty lub zaświadczenia zgodnie z obowiązującymi przepisami.
              </p>

              <h2>§ 8. Odpowiedzialność</h2>
              <p>
                Usługodawca ponosi odpowiedzialność za jakość świadczonych usług 
                zgodnie z obowiązującymi przepisami prawa.
              </p>

              <h2>§ 9. Reklamacje</h2>
              <p>
                Reklamacje dotyczące świadczonych usług można składać:
                <br />
                - E-mail: pgerus@well-done.pl
                <br />
                - Telefon: 504-305-437
                <br />
                - Pisemnie na adres: ul. Drzewieckiego 19/11, 54-129 Wrocław
              </p>

              <h2>§ 10. Postanowienia końcowe</h2>
              <p>
                W sprawach nieuregulowanych niniejszym Regulaminem stosuje się 
                przepisy Kodeksu Cywilnego oraz inne obowiązujące przepisy prawa polskiego.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
