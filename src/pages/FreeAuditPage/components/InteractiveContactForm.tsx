import React, { useState } from 'react';
import { Send, CheckCircle, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const InteractiveContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    industry: '',
    currentTraining: '',
    challenges: '',
    goals: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Twoja wiadomość została wysłana, skontaktujemy się z Tobą wkrótce", {
      position: "top-center",
      duration: 5000,
    });
    setIsSubmitted(true);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.company && formData.employees && formData.industry;
      case 3:
        return formData.currentTraining && formData.challenges;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-green-200">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dziękujemy za zgłoszenie!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Twoje zgłoszenie zostało wysłane. Skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <p className="text-green-800 font-medium">
                📧 Sprawdź swoją skrzynkę e-mail - wysłaliśmy potwierdzenie
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50" ref={elementRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Zamów bezpłatny audyt szkoleniowy
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`} style={{ transitionDelay: '200ms' }}>
            Wypełnij formularz, a nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Progress bar */}
          <div className="bg-orange-50 p-6 border-b border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-orange-600">Krok {currentStep} z 3</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% ukończone</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <User className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dane kontaktowe</h3>
                  <p className="text-gray-600">Podaj swoje podstawowe informacje</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="Jan Kowalski"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adres e-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="jan@firma.pl"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Numer telefonu *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="+48 123 456 789"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Building2 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Informacje o firmie</h3>
                  <p className="text-gray-600">Opisz swoją organizację</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nazwa firmy *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="ABC Sp. z o.o."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Liczba pracowników *
                      </label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                        required
                      >
                        <option value="">Wybierz zakres</option>
                        <option value="1-10">1-10 pracowników</option>
                        <option value="11-50">11-50 pracowników</option>
                        <option value="51-200">51-200 pracowników</option>
                        <option value="201-500">201-500 pracowników</option>
                        <option value="500+">Powyżej 500 pracowników</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Branża *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                        required
                      >
                        <option value="">Wybierz branżę</option>
                        <option value="production">Produkcja</option>
                        <option value="logistics">Logistyka</option>
                        <option value="construction">Budownictwo</option>
                        <option value="services">Usługi</option>
                        <option value="trade">Handel</option>
                        <option value="other">Inna</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Training Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <MessageSquare className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Potrzeby szkoleniowe</h3>
                  <p className="text-gray-600">Opisz swoje wyzwania i cele</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Obecne szkolenia w firmie *
                    </label>
                    <textarea
                      name="currentTraining"
                      value={formData.currentTraining}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="Opisz jakie szkolenia obecnie organizujesz..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Główne wyzwania *
                    </label>
                    <textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="Jakie problemy chcesz rozwiązać dzięki audytowi?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cele audytu
                    </label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors duration-200"
                      placeholder="Czego oczekujesz od audytu? (opcjonalne)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6 py-3 disabled:opacity-50"
              >
                Wstecz
              </Button>

              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      step === currentStep
                        ? 'bg-orange-500'
                        : step < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                >
                  Dalej
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid(currentStep)}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Wyślij zgłoszenie
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InteractiveContactForm;
