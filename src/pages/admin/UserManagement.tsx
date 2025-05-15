
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useUserManagement, User } from '@/hooks/useUserManagement';
import CreateUser from '@/components/admin/CreateUser';
import UserDetails from '@/components/admin/UserDetails';
import UserList from '@/components/admin/UserList';
import UserManagementHeader from '@/components/admin/UserManagementHeader';

const UserManagement = () => {
  const {
    users,
    loading,
    createUser,
    resetPassword,
    deleteUser,
    updateUserRole,
    createAdminUser
  } = useUserManagement();

  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    createAdminUser();
  }, []);

  const handleCreateUser = async (email: string, password: string, role: 'admin' | 'moderator' | 'user') => {
    const success = await createUser(email, password, role);
    if (success) {
      setIsCreateUserOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <UserManagementHeader onCreateUser={() => setIsCreateUserOpen(true)} />

      <Card>
        <CardHeader>
          <CardTitle>Lista użytkowników</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList 
            users={users}
            loading={loading}
            onSelectUser={setSelectedUser}
            onResetPassword={resetPassword}
            onDeleteUser={deleteUser}
          />
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
              onResetPassword={resetPassword}
              onDelete={deleteUser}
              onUpdateRole={updateUserRole}
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
