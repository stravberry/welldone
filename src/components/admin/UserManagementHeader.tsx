
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface UserManagementHeaderProps {
  onCreateUser: () => void;
}

const UserManagementHeader = ({ onCreateUser }: UserManagementHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Zarządzanie Użytkownikami</h1>
        <p className="text-muted-foreground">Zarządzaj użytkownikami systemu i ich uprawnieniami</p>
      </div>
      <Button onClick={onCreateUser}>
        <UserPlus className="mr-2 h-4 w-4" />
        <span>Dodaj użytkownika</span>
      </Button>
    </div>
  );
};

export default UserManagementHeader;
