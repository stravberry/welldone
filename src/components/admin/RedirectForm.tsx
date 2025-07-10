import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, ChevronsUpDown, Link, List } from 'lucide-react';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Redirect } from '@/hooks/useRedirectsManagement';
import { useSitePages } from '@/hooks/useSitePages';

const redirectSchema = z.object({
  source_url: z.string().min(1, 'Ścieżka źródłowa jest wymagana')
    .refine(val => val.startsWith('/'), {
      message: 'Ścieżka źródłowa musi zaczynać się od "/"'
    }),
  target_url: z.string().min(1, 'URL docelowy jest wymagany'),
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
  const { sitePages, loading } = useSitePages();
  const [sourceInputMode, setSourceInputMode] = useState<'manual' | 'select'>('manual');
  const [targetInputMode, setTargetInputMode] = useState<'manual' | 'select'>('manual');
  const [selectedSourcePage, setSelectedSourcePage] = useState<string>('');
  const [selectedTargetPage, setSelectedTargetPage] = useState<string>('');
  const [sourcePageSearchOpen, setSourcePageSearchOpen] = useState(false);
  const [targetPageSearchOpen, setTargetPageSearchOpen] = useState(false);

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
      
      // Check if source_url matches any existing page
      const matchingSourcePage = sitePages.find(page => page.path === redirect.source_url);
      if (matchingSourcePage) {
        setSourceInputMode('select');
        setSelectedSourcePage(matchingSourcePage.id);
      } else {
        setSourceInputMode('manual');
        setSelectedSourcePage('');
      }
      
      // Check if target_url matches any existing page
      const matchingTargetPage = sitePages.find(page => page.path === redirect.target_url);
      if (matchingTargetPage) {
        setTargetInputMode('select');
        setSelectedTargetPage(matchingTargetPage.id);
      } else {
        setTargetInputMode('manual');
        setSelectedTargetPage('');
      }
    } else {
      form.reset({
        source_url: '',
        target_url: '',
        redirect_type: 301,
        is_active: true,
        description: '',
      });
      setSourceInputMode('manual');
      setTargetInputMode('manual');
      setSelectedSourcePage('');
      setSelectedTargetPage('');
    }
  }, [redirect, form, sitePages]);

  const handleSubmit = async (data: RedirectFormData) => {
    await onSubmit(data);
    onOpenChange(false);
    setSourceInputMode('manual');
    setTargetInputMode('manual');
    setSelectedSourcePage('');
    setSelectedTargetPage('');
  };

  const handleSourcePageSelect = (pageId: string) => {
    const page = sitePages.find(p => p.id === pageId);
    if (page) {
      setSelectedSourcePage(pageId);
      form.setValue('source_url', page.path);
      setSourcePageSearchOpen(false);
    }
  };

  const handleTargetPageSelect = (pageId: string) => {
    const page = sitePages.find(p => p.id === pageId);
    if (page) {
      setSelectedTargetPage(pageId);
      form.setValue('target_url', page.path);
      setTargetPageSearchOpen(false);
    }
  };

  const handleSourceModeChange = (mode: 'manual' | 'select') => {
    setSourceInputMode(mode);
    if (mode === 'manual') {
      setSelectedSourcePage('');
    } else {
      form.setValue('source_url', '');
    }
  };

  const handleTargetModeChange = (mode: 'manual' | 'select') => {
    setTargetInputMode(mode);
    if (mode === 'manual') {
      setSelectedTargetPage('');
    } else {
      form.setValue('target_url', '');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
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
                  <FormLabel>Ścieżka źródłowa</FormLabel>
                  <div className="space-y-3">
                    {/* Mode Selection */}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={sourceInputMode === 'manual' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleSourceModeChange('manual')}
                        className="flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" />
                        Wpisz ścieżkę
                      </Button>
                      <Button
                        type="button"
                        variant={sourceInputMode === 'select' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleSourceModeChange('select')}
                        className="flex items-center gap-2"
                      >
                        <List className="h-4 w-4" />
                        Wybierz stronę
                      </Button>
                    </div>

                    {/* Manual Input */}
                    {sourceInputMode === 'manual' && (
                      <FormControl>
                        <Input
                          placeholder="/stara-podstrona"
                          {...field}
                        />
                      </FormControl>
                    )}

                    {/* Page Selector */}
                    {sourceInputMode === 'select' && (
                      <div className="space-y-2">
                        <Popover open={sourcePageSearchOpen} onOpenChange={setSourcePageSearchOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                disabled={loading}
                                className={cn(
                                  "w-full justify-between",
                                  !selectedSourcePage && "text-muted-foreground"
                                )}
                              >
                                {selectedSourcePage 
                                  ? sitePages.find(page => page.id === selectedSourcePage)?.title 
                                  : "Wybierz stronę..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0 max-w-md">
                            <Command className="max-h-64">
                              <CommandInput placeholder="Szukaj strony..." className="h-9" />
                              <CommandList className="max-h-48 overflow-y-auto">
                                <CommandEmpty>Nie znaleziono stron.</CommandEmpty>
                                <CommandGroup>
                                  {sitePages.map((page) => (
                                    <CommandItem
                                      key={page.id}
                                      value={page.title}
                                      onSelect={() => handleSourcePageSelect(page.id)}
                                      className="flex items-start gap-2 p-2"
                                    >
                                      <Check
                                        className={cn(
                                          "mt-1 h-4 w-4 shrink-0",
                                          selectedSourcePage === page.id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div className="flex flex-col min-w-0 flex-1">
                                        <span className="font-medium truncate">{page.title}</span>
                                        <span className="text-xs text-muted-foreground font-mono truncate">
                                          {page.path}
                                        </span>
                                        {page.description && (
                                          <span className="text-xs text-muted-foreground truncate mt-1">
                                            {page.description}
                                          </span>
                                        )}
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        
                        {/* Selected Page Preview */}
                        {selectedSourcePage && (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <Badge variant="secondary" className="text-xs">
                              {sitePages.find(p => p.id === selectedSourcePage)?.path}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
                  <div className="space-y-3">
                    {/* Mode Selection */}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={targetInputMode === 'manual' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleTargetModeChange('manual')}
                        className="flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" />
                        Wpisz ścieżkę
                      </Button>
                      <Button
                        type="button"
                        variant={targetInputMode === 'select' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleTargetModeChange('select')}
                        className="flex items-center gap-2"
                      >
                        <List className="h-4 w-4" />
                        Wybierz stronę
                      </Button>
                    </div>

                    {/* Manual Input */}
                    {targetInputMode === 'manual' && (
                      <FormControl>
                        <Input
                          placeholder="/nowa-podstrona"
                          {...field}
                        />
                      </FormControl>
                    )}

                    {/* Page Selector */}
                    {targetInputMode === 'select' && (
                      <div className="space-y-2">
                        <Popover open={targetPageSearchOpen} onOpenChange={setTargetPageSearchOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                disabled={loading}
                                className={cn(
                                  "w-full justify-between",
                                  !selectedTargetPage && "text-muted-foreground"
                                )}
                              >
                                {selectedTargetPage 
                                  ? sitePages.find(page => page.id === selectedTargetPage)?.title 
                                  : "Wybierz stronę..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0 max-w-md">
                            <Command className="max-h-64">
                              <CommandInput placeholder="Szukaj strony..." className="h-9" />
                              <CommandList className="max-h-48 overflow-y-auto">
                                <CommandEmpty>Nie znaleziono stron.</CommandEmpty>
                                <CommandGroup>
                                  {sitePages.map((page) => (
                                    <CommandItem
                                      key={page.id}
                                      value={page.title}
                                      onSelect={() => handleTargetPageSelect(page.id)}
                                      className="flex items-start gap-2 p-2"
                                    >
                                      <Check
                                        className={cn(
                                          "mt-1 h-4 w-4 shrink-0",
                                          selectedTargetPage === page.id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div className="flex flex-col min-w-0 flex-1">
                                        <span className="font-medium truncate">{page.title}</span>
                                        <span className="text-xs text-muted-foreground font-mono truncate">
                                          {page.path}
                                        </span>
                                        {page.description && (
                                          <span className="text-xs text-muted-foreground truncate mt-1">
                                            {page.description}
                                          </span>
                                        )}
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        
                        {/* Selected Page Preview */}
                        {selectedTargetPage && (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <Badge variant="secondary" className="text-xs">
                              {sitePages.find(p => p.id === selectedTargetPage)?.path}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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