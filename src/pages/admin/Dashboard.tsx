
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Upload, 
  Activity, 
  Eye, 
  Clock, 
  TrendingUp,
  FileText,
  Image,
  Users,
  Settings,
  Palette,
  BarChart
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
      title: 'Nowa strona',
      description: 'Utwórz nową stronę z Live Builder',
      icon: Plus,
      link: '/admin/content-studio',
      color: 'bg-blue-500 hover:bg-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Edytuj stronę główną',
      description: 'Szybka edycja strony głównej',
      icon: Edit,
      link: '/admin/content-studio',
      color: 'bg-orange-500 hover:bg-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Upload mediów',
      description: 'Dodaj nowe obrazy i pliki',
      icon: Upload,
      link: '/admin/media',
      color: 'bg-green-500 hover:bg-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Nowy post',
      description: 'Napisz nowy post na blog',
      icon: FileText,
      link: '/admin/blog',
      color: 'bg-purple-500 hover:bg-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const systemOverview = [
    {
      title: 'Wszystkie strony',
      value: quickStats.totalPages,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Opublikowane',
      value: quickStats.publishedPages,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Wersje robocze',
      value: quickStats.draftPages,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Łączne wyświetlenia',
      value: '12.5k',
      icon: BarChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Witaj z powrotem! Zarządzaj swoją witryną z jednego miejsca.</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Szybkie akcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${action.iconBg}`}>
                        <Icon className={`h-6 w-6 ${action.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Przegląd systemu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemOverview.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{item.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${item.bgColor}`}>
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Ostatnia aktywność
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4 text-gray-500">Ładowanie...</div>
            ) : recentPages.length > 0 ? (
              <div className="space-y-3">
                {recentPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{page.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                          {page.status === 'published' ? 'Opublikowane' : 'Wersja robocza'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(page.updated_at).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    </div>
                    <Link to={`/admin/content-studio?page=${page.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>Brak ostatniej aktywności</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Przydatne linki</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/admin/content-studio" className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Palette className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium">Content Studio</p>
                  <p className="text-sm text-gray-600">Zarządzaj stronami</p>
                </div>
              </Link>
              
              <Link to="/admin/media" className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Image className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium">Media Library</p>
                  <p className="text-sm text-gray-600">Zarządzaj plikami</p>
                </div>
              </Link>
              
              <Link to="/admin/users" className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Users className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Użytkownicy</p>
                  <p className="text-sm text-gray-600">Zarządzaj dostępem</p>
                </div>
              </Link>
              
              <Link to="/admin/settings" className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Settings className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium">Ustawienia</p>
                  <p className="text-sm text-gray-600">Konfiguracja systemu</p>
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
