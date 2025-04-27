
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserPlus, Lock, UserX } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import CreateUser from '@/components/admin/CreateUser';
import UserDetails from '@/components/admin/UserDetails';
import { Database } from '@/integrations/supabase/types';
import { AdminUserAttributes } from '@supabase/supabase-js';

type User = {
  id: string;
  email: string;
  role: Database['public']['Enums']['app_role'];
  created_at: string;
  last_sign_in_at: string | null;
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const handleCreateUser = async (email: string, password: string, role: Database['public']['Enums']['app_role']) => {
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
      
      setIsCreateUserOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się utworzyć użytkownika: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleResetPassword = async (userId: string) => {
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

  const handleDeleteUser = async (userId: string) => {
    try {
      // Delete the user role first
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) {
        throw roleError;
      }

      // Note: We can't actually delete the auth user without admin API
      // But we can remove their role which effectively deactivates them

      toast({
        title: "Sukces",
        description: "Rola użytkownika została usunięta",
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się usunąć użytkownika: ${error.message}`,
        variant: "destructive"
      });
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

  useEffect(() => {
    createAdminUser();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Zarządzanie Użytkownikami</h1>
          <p className="text-muted-foreground">Zarządzaj użytkownikami systemu i ich uprawnieniami</p>
        </div>
        <Button onClick={() => setIsCreateUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Dodaj użytkownika</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista użytkowników</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Ładowanie użytkowników...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Użytkownika</TableHead>
                  <TableHead>Rola</TableHead>
                  <TableHead>Data utworzenia</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer hover:bg-muted/30">
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : user.role === 'moderator' 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' 
                          ? 'Administrator' 
                          : user.role === 'moderator' 
                            ? 'Moderator treści' 
                            : 'Użytkownik'}
                      </span>
                    </TableCell>
                    <TableCell>{format(new Date(user.created_at), 'dd.MM.yyyy HH:mm')}</TableCell>
                    <TableCell className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetPassword(user.id);
                        }}
                      >
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj nowego użytkownika</DialogTitle>
          </DialogHeader>
          <CreateUser onSubmit={handleCreateUser} onCancel={() => setIsCreateUserOpen(false)} />
        </DialogContent>
      </Dialog>

      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Szczegóły użytkownika</DialogTitle>
            </DialogHeader>
            <UserDetails 
              user={selectedUser} 
              onClose={() => setSelectedUser(null)}
              onResetPassword={handleResetPassword}
              onDelete={handleDeleteUser}
              onUpdateRole={async (userId, newRole: Database['public']['Enums']['app_role']) => {
                try {
                  const { error } = await supabase
                    .from('user_roles')
                    .upsert({ user_id: userId, role: newRole }, { onConflict: 'user_id' });

                  if (error) throw error;
                  
                  toast({
                    title: "Sukces",
                    description: "Rola użytkownika została zaktualizowana",
                  });
                  
                  fetchUsers();
                } catch (error: any) {
                  toast({
                    title: "Błąd",
                    description: `Nie udało się zaktualizować roli: ${error.message}`,
                    variant: "destructive"
                  });
                }
              }}
              onUpdatePassword={(userId, password) => {
                toast({
                  title: "Informacja",
                  description: "Funkcja zmiany hasła wymaga uprawnień administratora Supabase.",
                });
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
