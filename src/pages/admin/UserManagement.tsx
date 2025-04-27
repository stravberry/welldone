
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

type User = {
  id: string;
  email: string;
  role: string;
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
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        throw error;
      }

      // Get roles for users
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        throw rolesError;
      }

      // Create a map of user_id to role
      const roleMap: Record<string, string> = {};
      rolesData?.forEach((roleEntry) => {
        roleMap[roleEntry.user_id] = roleEntry.role;
      });

      const formattedUsers = users.map((user) => ({
        id: user.id,
        email: user.email || 'No email',
        role: roleMap[user.id] || 'user',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (email: string, password: string, role: string) => {
    try {
      // Create user in Auth
      const { data: userData, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) {
        throw createError;
      }

      // Assign role
      if (userData.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: userData.user.id, role }]);

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
      // Generate reset password link
      const { error } = await supabase.auth.admin.generateLink({
        type: 'recovery',
        userId,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Sukces",
        description: "Link do resetowania hasła został wysłany na adres e-mail użytkownika",
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
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Sukces",
        description: "Użytkownik został pomyślnie usunięty",
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

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

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
                  <TableHead>Email</TableHead>
                  <TableHead>Rola</TableHead>
                  <TableHead>Data utworzenia</TableHead>
                  <TableHead>Ostatnie logowanie</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} onClick={() => handleUserClick(user)} className="cursor-pointer hover:bg-muted/30">
                    <TableCell>{user.email}</TableCell>
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
                    <TableCell>
                      {user.last_sign_in_at 
                        ? format(new Date(user.last_sign_in_at), 'dd.MM.yyyy HH:mm')
                        : 'Brak logowania'}
                    </TableCell>
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
              onUpdateRole={async (userId, role) => {
                try {
                  // Update the role
                  const { error } = await supabase
                    .from('user_roles')
                    .upsert({ user_id: userId, role }, { onConflict: 'user_id' });

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
                // Implement this to change a user's password
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
