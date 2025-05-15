
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Lock, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { User } from '@/hooks/useUserManagement';

interface UserListProps {
  users: User[];
  loading: boolean;
  onSelectUser: (user: User) => void;
  onResetPassword: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UserList = ({
  users,
  loading,
  onSelectUser,
  onResetPassword,
  onDeleteUser,
}: UserListProps) => {
  if (loading) {
    return <div className="text-center py-4">Ładowanie użytkowników...</div>;
  }

  return (
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
          <TableRow key={user.id} onClick={() => onSelectUser(user)} className="cursor-pointer hover:bg-muted/30">
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
                  onResetPassword(user.id);
                }}
              >
                <Lock className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteUser(user.id);
                }}
              >
                <UserX className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
