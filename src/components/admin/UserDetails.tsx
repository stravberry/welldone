
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lock, UserX } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
}

interface UserDetailsProps {
  user: User;
  onClose: () => void;
  onResetPassword: (userId: string) => void;
  onDelete: (userId: string) => void;
  onUpdateRole: (userId: string, role: string) => void;
  onUpdatePassword: (userId: string, password: string) => void;
}

const formSchema = z.object({
  role: z.enum(['user', 'moderator', 'admin'], { 
    required_error: "Proszę wybrać rolę" 
  }),
  password: z.string().min(6, { message: "Hasło musi mieć co najmniej 6 znaków" }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UserDetails: React.FC<UserDetailsProps> = ({ 
  user, 
  onClose, 
  onResetPassword, 
  onDelete, 
  onUpdateRole,
  onUpdatePassword 
}) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: user.role as any,
      password: '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (values.role !== user.role) {
      onUpdateRole(user.id, values.role);
    }
    
    if (values.password && values.password.length >= 6) {
      onUpdatePassword(user.id, values.password);
      setIsPasswordUpdated(true);
      setIsEditingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h4 className="font-medium">Email</h4>
        <p className="text-sm">{user.email}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rola</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz rolę" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">Użytkownik</SelectItem>
                    <SelectItem value="moderator">Moderator treści</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditingPassword && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nowe hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  if (isEditingPassword) {
                    setIsEditingPassword(false);
                    form.resetField("password");
                  } else {
                    setIsEditingPassword(true);
                  }
                }}
              >
                {isEditingPassword ? "Anuluj zmianę hasła" : "Zmień hasło"}
              </Button>
              
              <Button 
                type="submit" 
                disabled={!form.formState.isDirty}
              >
                Zapisz zmiany
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => onResetPassword(user.id)}
              >
                <Lock className="mr-2 h-4 w-4" />
                <span>Resetuj hasło</span>
              </Button>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <UserX className="mr-2 h-4 w-4" />
                  <span>Usuń użytkownika</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Czy na pewno chcesz usunąć tego użytkownika?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ta akcja jest nieodwracalna. Spowoduje trwałe usunięcie konta użytkownika i wszystkich powiązanych danych.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    onDelete(user.id);
                    onClose();
                  }}>
                    Usuń
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserDetails;
