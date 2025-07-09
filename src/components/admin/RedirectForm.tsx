import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Redirect } from '@/hooks/useRedirectsManagement';

const redirectSchema = z.object({
  source_url: z.string().min(1, 'URL źródłowy jest wymagany').url('Nieprawidłowy format URL'),
  target_url: z.string().min(1, 'URL docelowy jest wymagany').url('Nieprawidłowy format URL'),
  redirect_type: z.union([z.literal(301), z.literal(302)]),
  is_active: z.boolean(),
  description: z.string().optional(),
});

type RedirectFormData = z.infer<typeof redirectSchema>;

interface RedirectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirect?: Redirect | null;
  onSubmit: (data: RedirectFormData) => Promise<void>;
}

export const RedirectForm: React.FC<RedirectFormProps> = ({
  open,
  onOpenChange,
  redirect,
  onSubmit,
}) => {
  const form = useForm<RedirectFormData>({
    resolver: zodResolver(redirectSchema),
    defaultValues: {
      source_url: redirect?.source_url || '',
      target_url: redirect?.target_url || '',
      redirect_type: (redirect?.redirect_type || 301) as 301 | 302,
      is_active: redirect?.is_active ?? true,
      description: redirect?.description || '',
    },
  });

  React.useEffect(() => {
    if (redirect) {
      form.reset({
        source_url: redirect.source_url,
        target_url: redirect.target_url,
        redirect_type: redirect.redirect_type as 301 | 302,
        is_active: redirect.is_active,
        description: redirect.description || '',
      });
    } else {
      form.reset({
        source_url: '',
        target_url: '',
        redirect_type: 301,
        is_active: true,
        description: '',
      });
    }
  }, [redirect, form]);

  const handleSubmit = async (data: RedirectFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {redirect ? 'Edytuj przekierowanie' : 'Dodaj przekierowanie'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="source_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL źródłowy</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/old-page"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL docelowy</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/new-page"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="redirect_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ przekierowania</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="301">301 - Przekierowanie stałe</SelectItem>
                      <SelectItem value="302">302 - Przekierowanie tymczasowe</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis (opcjonalny)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Opis przekierowania..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Aktywne</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Czy przekierowanie ma być aktywne
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Anuluj
              </Button>
              <Button type="submit">
                {redirect ? 'Zapisz zmiany' : 'Dodaj przekierowanie'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};