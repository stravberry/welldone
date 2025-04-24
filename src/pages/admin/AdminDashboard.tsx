
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Edit, Users, Eye, Image, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panel Administratora</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Strony</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Ilość stron</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Artykuły</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Ilość postów</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Użytkownicy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Ilość użytkowników</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wyświetlenia</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Wyświetlenia stron</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ostatnia aktywność</CardTitle>
            <CardDescription>Ostatnie zmiany na stronie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm font-medium">Zalogowanie do systemu</p>
              <p className="text-xs text-muted-foreground">Dzisiaj, {new Date().toLocaleTimeString()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Skróty</CardTitle>
            <CardDescription>Szybki dostęp do najczęściej używanych funkcji</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-accent">
                <Edit className="h-6 w-6 mb-1" />
                <span className="text-xs text-center">Nowy post</span>
              </div>
              <div className="rounded-lg border bg-card p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-accent">
                <FileText className="h-6 w-6 mb-1" />
                <span className="text-xs text-center">Edytuj strony</span>
              </div>
              <div className="rounded-lg border bg-card p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-accent">
                <Image className="h-6 w-6 mb-1" />
                <span className="text-xs text-center">Dodaj media</span>
              </div>
              <div className="rounded-lg border bg-card p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-accent">
                <Settings className="h-6 w-6 mb-1" />
                <span className="text-xs text-center">Ustawienia</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
