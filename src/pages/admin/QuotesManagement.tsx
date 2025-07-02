import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Euro, Settings, Eye } from 'lucide-react';
import { useQuotesManagement, Service, ServiceVariant } from '@/hooks/useQuotesManagement';

const QuotesManagement: React.FC = () => {
  const { services, serviceVariants, loading, updateService, updateServiceVariant } = useQuotesManagement();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingVariant, setEditingVariant] = useState<ServiceVariant | null>(null);

  const getServiceVariants = (serviceId: string) => {
    return serviceVariants.filter(variant => variant.service_id === serviceId);
  };

  const handleUpdateService = async (updates: Partial<Service>) => {
    if (!editingService) return;
    await updateService(editingService.id, updates);
    setEditingService(null);
  };

  const handleUpdateVariant = async (updates: Partial<ServiceVariant>) => {
    if (!editingVariant) return;
    await updateServiceVariant(editingVariant.id, updates);
    setEditingVariant(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Zarządzanie wycenami</h1>
          <p className="text-gray-600">Edytuj ceny i warianty usług szkoleniowych</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => {
          const variants = getServiceVariants(service.id);
          
          return (
            <Card key={service.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={service.is_active ? "default" : "secondary"}>
                      {service.is_active ? "Aktywna" : "Nieaktywna"}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingService(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edytuj usługę</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="service-name">Nazwa usługi</Label>
                            <Input
                              id="service-name"
                              defaultValue={service.name}
                              onChange={(e) => setEditingService({...service, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="service-description">Opis</Label>
                            <Textarea
                              id="service-description"
                              defaultValue={service.description || ''}
                              onChange={(e) => setEditingService({...service, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="service-price">Cena bazowa (PLN)</Label>
                            <Input
                              id="service-price"
                              type="number"
                              step="0.01"
                              defaultValue={service.base_price}
                              onChange={(e) => setEditingService({...service, base_price: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="service-active"
                              checked={editingService?.is_active ?? service.is_active}
                              onCheckedChange={(checked) => setEditingService({...service, is_active: checked})}
                            />
                            <Label htmlFor="service-active">Usługa aktywna</Label>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditingService(null)}>
                              Anuluj
                            </Button>
                            <Button onClick={() => handleUpdateService(editingService!)}>
                              Zapisz
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Cena bazowa:</span>
                    <span className="text-lg font-bold text-green-700 flex items-center">
                      <Euro className="h-4 w-4 mr-1" />
                      {service.base_price} PLN
                    </span>
                  </div>

                  {variants.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Warianty usługi:</h4>
                      <div className="space-y-2">
                        {variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-2 border rounded-lg">
                            <div className="flex-1">
                              <span className="text-sm font-medium">{variant.name}</span>
                              {variant.description && (
                                <p className="text-xs text-gray-500">{variant.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-green-600 font-medium">
                                +{variant.price_modifier} PLN
                              </span>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingVariant(variant)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Edytuj wariant</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="variant-name">Nazwa wariantu</Label>
                                      <Input
                                        id="variant-name"
                                        defaultValue={variant.name}
                                        onChange={(e) => setEditingVariant({...variant, name: e.target.value})}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="variant-description">Opis</Label>
                                      <Textarea
                                        id="variant-description"
                                        defaultValue={variant.description || ''}
                                        onChange={(e) => setEditingVariant({...variant, description: e.target.value})}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="variant-price">Modyfikator ceny (PLN)</Label>
                                      <Input
                                        id="variant-price"
                                        type="number"
                                        step="0.01"
                                        defaultValue={variant.price_modifier}
                                        onChange={(e) => setEditingVariant({...variant, price_modifier: parseFloat(e.target.value)})}
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        id="variant-active"
                                        checked={editingVariant?.is_active ?? variant.is_active}
                                        onCheckedChange={(checked) => setEditingVariant({...variant, is_active: checked})}
                                      />
                                      <Label htmlFor="variant-active">Wariant aktywny</Label>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => setEditingVariant(null)}>
                                        Anuluj
                                      </Button>
                                      <Button onClick={() => handleUpdateVariant(editingVariant!)}>
                                        Zapisz
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuotesManagement;