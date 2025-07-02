import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  is_active: boolean;
  service_type: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceVariant {
  id: string;
  service_id: string;
  name: string;
  description: string;
  price_modifier: number;
  variant_key: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  service_variant?: string;
  participants_count: string;
  additional_info?: string;
  status: string;
  estimated_price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useQuotesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceVariants, setServiceVariants] = useState<ServiceVariant[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      toast.error('Błąd podczas pobierania usług');
    }
  };

  const fetchServiceVariants = async () => {
    try {
      const { data, error } = await supabase
        .from('service_variants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServiceVariants(data || []);
    } catch (error: any) {
      console.error('Error fetching service variants:', error);
      toast.error('Błąd podczas pobierania wariantów usług');
    }
  };

  const fetchQuoteRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuoteRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching quote requests:', error);
      toast.error('Błąd podczas pobierania zapytań ofertowych');
    }
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Usługa została zaktualizowana');
      fetchServices();
    } catch (error: any) {
      console.error('Error updating service:', error);
      toast.error('Błąd podczas aktualizacji usługi');
    }
  };

  const updateServiceVariant = async (id: string, updates: Partial<ServiceVariant>) => {
    try {
      const { error } = await supabase
        .from('service_variants')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Wariant usługi został zaktualizowany');
      fetchServiceVariants();
    } catch (error: any) {
      console.error('Error updating service variant:', error);
      toast.error('Błąd podczas aktualizacji wariantu usługi');
    }
  };

  const updateQuoteRequest = async (id: string, updates: Partial<QuoteRequest>) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Zapytanie ofertowe zostało zaktualizowane');
      fetchQuoteRequests();
    } catch (error: any) {
      console.error('Error updating quote request:', error);
      toast.error('Błąd podczas aktualizacji zapytania ofertowego');
    }
  };

  const createQuoteRequest = async (quoteData: Omit<QuoteRequest, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([quoteData])
        .select()
        .single();

      if (error) throw error;
      
      fetchQuoteRequests();
      return data;
    } catch (error: any) {
      console.error('Error creating quote request:', error);
      toast.error('Błąd podczas tworzenia zapytania ofertowego');
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchServices(),
        fetchServiceVariants(),
        fetchQuoteRequests()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    services,
    serviceVariants,
    quoteRequests,
    loading,
    updateService,
    updateServiceVariant,
    updateQuoteRequest,
    createQuoteRequest,
    refetch: () => {
      fetchServices();
      fetchServiceVariants();
      fetchQuoteRequests();
    }
  };
};