
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
  last_sign_in_at: string | null;
};

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get user roles from the public table
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, created_at');

      if (rolesError) {
        throw rolesError;
      }

      if (!rolesData || rolesData.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Transform the roles data into the user format we need
      const formattedUsers = rolesData.map((roleEntry) => ({
        id: roleEntry.user_id,
        email: roleEntry.user_id, // We'll use ID as email initially
        role: roleEntry.role,
        created_at: roleEntry.created_at,
        last_sign_in_at: null,
      }));

      setUsers(formattedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({ 
        title: "Błąd", 
        description: `Nie udało się pobrać użytkowników: ${error.message}`, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (email: string, password: string, role: 'admin' | 'moderator' | 'user') => {
    try {
      // Create user using signUp instead of admin methods
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (signUpData.user) {
        // Add role for the new user
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: signUpData.user.id, role }]);

        if (roleError) {
          throw roleError;
        }
      }

      toast({
        title: "Sukces",
        description: "Użytkownik został pomyślnie utworzony",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się utworzyć użytkownika: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  const resetPassword = async (userId: string) => {
    try {
      // We need to get the email from somewhere else, since we can't use admin API
      // For this example, we'll just show a message to the user
      toast({
        title: "Informacja",
        description: "Funkcja resetowania hasła wymaga uprawnień administratora Supabase.",
      });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się zresetować hasła: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Delete the user role first
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) {
        throw roleError;
      }

      toast({
        title: "Sukces",
        description: "Rola użytkownika została usunięta",
      });
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się usunąć użytkownika: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole }, { onConflict: 'user_id' });

      if (error) throw error;
      
      toast({
        title: "Sukces",
        description: "Rola użytkownika została zaktualizowana",
      });
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się zaktualizować roli: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  const createAdminUser = async () => {
    try {
      // Create admin user with signUp
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@example.com',
        password: 'admin123',
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (signUpData.user) {
        // Add admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: signUpData.user.id, role: 'admin' }]);

        if (roleError) {
          throw roleError;
        }

        toast({
          title: "Sukces",
          description: "Administrator został pomyślnie utworzony (admin@example.com, admin123)",
        });
        
        fetchUsers();
      }
    } catch (error: any) {
      if (error.message.includes('already registered')) {
        // If admin user exists, just fetch users
        fetchUsers();
        return;
      }
      
      toast({
        title: "Błąd",
        description: `Nie udało się utworzyć administratora: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    resetPassword,
    deleteUser,
    updateUserRole,
    createAdminUser
  };
};

export type { User };
