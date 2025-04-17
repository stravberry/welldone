
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  title = "Skontaktuj się z nami", 
  subtitle = "Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe."
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Formularz został wysłany! Skontaktujemy się wkrótce.");
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input
              id="name"
              placeholder="Jan Kowalski"
              {...register("name", { required: "To pole jest wymagane" })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Nazwa firmy</Label>
            <Input
              id="company"
              placeholder="Firma Sp. z o.o."
              {...register("company", { required: "To pole jest wymagane" })}
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Adres e-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="jan.kowalski@firma.pl"
              {...register("email", { 
                required: "To pole jest wymagane",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Nieprawidłowy adres e-mail"
                }
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Numer telefonu</Label>
            <Input
              id="phone"
              placeholder="+48 123 456 789"
              {...register("phone", { required: "To pole jest wymagane" })}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Wiadomość</Label>
          <Textarea
            id="message"
            placeholder="Opisz czego potrzebujesz..."
            rows={5}
            {...register("message", { required: "To pole jest wymagane" })}
            className={errors.message ? "border-red-500" : ""}
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message as string}</p>}
        </div>
        
        <Button type="submit" className="w-full">Wyślij wiadomość</Button>
      </form>
    </div>
  );
};

export default ContactForm;
