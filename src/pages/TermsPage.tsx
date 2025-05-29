
import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Regulamin</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 1 Postanowienia ogólne</h2>
            <p className="mb-6">
              1. Niniejszy Regulamin określa zasady korzystania z usług świadczonych przez 
              Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus.
            </p>
            <p className="mb-6">
              2. Usługodawca: Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus, 
              ul. Drzewieckiego 19/11, 54-129 Wrocław, NIP: 884-248-74-55.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 2 Zakres usług</h2>
            <p className="mb-6">
              Usługodawca świadczy następujące usługi:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Szkolenia z zakresu uprawnień UDT dla operatorów</li>
              <li>Szkolenia z zakresu uprawnień UDT dla konserwatorów</li>
              <li>Szkolenia z zakresu uprawnień SEP</li>
              <li>Szkolenia z lutowania</li>
              <li>Eventy edukacyjne</li>
              <li>Bezpłatne audyty firm</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 3 Warunki świadczenia usług</h2>
            <p className="mb-6">
              1. Usługi świadczone są na podstawie umowy zawartej między Usługodawcą a Klientem.
            </p>
            <p className="mb-6">
              2. Szczegółowe warunki realizacji usług określane są w ofercie handlowej 
              lub umowie o świadczenie usług.
            </p>
            <p className="mb-6">
              3. Klient zobowiązuje się do terminowego uregulowania należności za świadczone usługi.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 4 Prawa i obowiązki stron</h2>
            <p className="mb-6">
              1. Usługodawca zobowiązuje się do świadczenia usług z należytą starannością, 
              zgodnie z aktualnym stanem wiedzy technicznej.
            </p>
            <p className="mb-6">
              2. Klient zobowiązuje się do współpracy przy realizacji usług oraz 
              przekazania niezbędnych informacji.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 5 Odpowiedzialność</h2>
            <p className="mb-6">
              1. Usługodawca ponosi odpowiedzialność za jakość świadczonych usług zgodnie 
              z obowiązującymi przepisami prawa.
            </p>
            <p className="mb-6">
              2. Odpowiedzialność Usługodawcy ograniczona jest do wysokości wynagrodzenia 
              otrzymanego za daną usługę.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">§ 6 Postanowienia końcowe</h2>
            <p className="mb-6">
              1. W sprawach nieuregulowanych niniejszym Regulaminem stosuje się przepisy 
              Kodeksu Cywilnego.
            </p>
            <p className="mb-6">
              2. Wszelkie spory rozstrzygane będą przez sąd właściwy dla siedziby Usługodawcy.
            </p>
            <p className="mb-6">
              3. Regulamin wchodzi w życie z dniem publikacji na stronie internetowej.
            </p>

            <div className="mt-8 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Kontakt:</strong><br />
                E-mail: pgerus@well-done.pl<br />
                Telefon: 504-305-437<br />
                Adres: ul. Drzewieckiego 19/11, 54-129 Wrocław
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
