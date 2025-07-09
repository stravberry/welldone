
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Users, 
  Mail, 
  FileText,
  Image,
  Settings,
  Activity,
  TrendingUp,
  Clock,
  MessageSquare,
  Quote,
  Palette,
  Edit
} from 'lucide-react';
import { usePages } from '@/hooks/usePages';

const Dashboard: React.FC = () => {
  const { data: pages, isLoading } = usePages();

  const quickStats = {
    totalPages: pages?.length || 0,
    publishedPages: pages?.filter(p => p.status === 'published').length || 0,
    draftPages: pages?.filter(p => p.status === 'draft').length || 0,
  };

  const recentPages = pages?.slice(0, 5) || [];

  const quickActions = [
    {
      title: 'Zarządzaj wycenami',
      description: 'Przeglądaj i odpowiadaj na zapytania',
      icon: Calculator,
      link: '/admin/quotes',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      title: 'CRM - Klienci',
      description: 'Zarządzaj bazą klientów',
      icon: Users,
      link: '/admin/crm',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary'
    },
    {
      title: 'Szablony email',
      description: 'Edytuj szablony wiadomości',
      icon: Mail,
      link: '/admin/email-templates',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent-foreground'
    },
    {
      title: 'Blog',
      description: 'Zarządzaj artykułami',
      icon: FileText,
      link: '/admin/blog',
      iconBg: 'bg-muted/50',
      iconColor: 'text-muted-foreground'
    },
    {
      title: 'Media Library',
      description: 'Dodaj i zarządzaj plikami',
      icon: Image,
      link: '/admin/media',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      title: 'Ustawienia',
      description: 'Konfiguracja systemu',
      icon: Settings,
      link: '/admin/settings',
      iconBg: 'bg-muted/50',
      iconColor: 'text-muted-foreground'
    }
  ];

  const systemOverview = [
    {
      title: 'Strony WWW',
      value: quickStats.totalPages,
      icon: Palette,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Opublikowane',
      value: quickStats.publishedPages,
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Wersje robocze',
      value: quickStats.draftPages,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Zapytania o wyceny',
      value: '24',
      icon: Quote,
      color: 'text-accent-foreground',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="p-3 md:p-6 bg-background min-h-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Panel Administracyjny</h1>
        <p className="text-muted-foreground text-sm md:text-base">Zarządzaj swoją witryną z jednego miejsca</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Główne funkcje</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border shadow-sm">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className={`p-2 md:p-3 rounded-lg ${action.iconBg}`}>
                        <Icon className={`h-5 w-5 md:h-6 md:w-6 ${action.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">{action.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* System Overview */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Statystyki</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {systemOverview.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">{item.title}</p>
                      <p className="text-xl md:text-3xl font-bold text-foreground">{item.value}</p>
                    </div>
                    <div className={`p-2 md:p-3 rounded-lg ${item.bgColor} self-end md:self-auto`}>
                      <Icon className={`h-4 w-4 md:h-6 md:w-6 ${item.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activity */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Activity className="h-4 w-4 md:h-5 md:w-5" />
              Ostatnia aktywność
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground text-sm">Ładowanie...</div>
            ) : recentPages.length > 0 ? (
              <div className="space-y-3">
                {recentPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate text-sm md:text-base">{page.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                          {page.status === 'published' ? 'Opublikowane' : 'Wersja robocza'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(page.updated_at).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    </div>
                    <Link to={`/admin/quotes`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <FileText className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm">Brak ostatniej aktywności</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg">Szybki dostęp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3">
              <Link to="/admin/quotes" className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Calculator className="h-4 w-4 md:h-5 md:w-5 text-primary mr-3" />
                <div>
                  <p className="font-medium text-sm md:text-base">Wyceny</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Zarządzaj zapytaniami</p>
                </div>
              </Link>
              
              <Link to="/admin/crm" className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-secondary mr-3" />
                <div>
                  <p className="font-medium text-sm md:text-base">CRM</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Baza klientów</p>
                </div>
              </Link>
              
              <Link to="/admin/email-templates" className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-accent-foreground mr-3" />
                <div>
                  <p className="font-medium text-sm md:text-base">Email</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Szablony wiadomości</p>
                </div>
              </Link>
              
              <Link to="/admin/settings" className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Settings className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium text-sm md:text-base">Ustawienia</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Konfiguracja systemu</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
