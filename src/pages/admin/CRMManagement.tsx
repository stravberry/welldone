import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Eye, Search, Filter, Calendar, Euro, Phone, Mail, Building } from 'lucide-react';
import { useQuotesManagement, QuoteRequest } from '@/hooks/useQuotesManagement';

const CRMManagement: React.FC = () => {
  const { quoteRequests, loading, updateQuoteRequest } = useQuotesManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  const statusLabels = {
    new: 'Nowe',
    in_progress: 'W trakcie',
    quote_sent: 'Wysłano ofertę',
    completed: 'Zakończone'
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    quote_sent: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800'
  };

  const serviceTypeLabels = {
    'udt-operator': 'UDT Operatorzy',
    'udt-conservator': 'UDT Konserwatorzy',
    'sep': 'Uprawnienia SEP',
    'forklifts': 'Wózki unoszące'
  };

  const participantsLabels = {
    '1': '1 osoba',
    '2-5': '2-5 osób',
    '6-10': '6-10 osób',
    '11-15': '11-15 osób',
    '15+': 'Powyżej 15 osób'
  };

  const filteredRequests = quoteRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (id: string, status: string) => {
    await updateQuoteRequest(id, { status });
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    await updateQuoteRequest(id, { notes });
  };

  const handleUpdatePrice = async (id: string, estimated_price: number) => {
    await updateQuoteRequest(id, { estimated_price });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">CRM - Zapytania ofertowe</h1>
          <p className="text-gray-600">Zarządzaj kontaktami i ofertami klientów</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Szukaj klientów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              <SelectItem value="new">Nowe</SelectItem>
              <SelectItem value="in_progress">W trakcie</SelectItem>
              <SelectItem value="quote_sent">Wysłano ofertę</SelectItem>
              <SelectItem value="completed">Zakończone</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {quoteRequests.filter(r => r.status === 'new').length}
            </div>
            <div className="text-sm text-blue-700">Nowe zapytania</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {quoteRequests.filter(r => r.status === 'in_progress').length}
            </div>
            <div className="text-sm text-yellow-700">W trakcie</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {quoteRequests.filter(r => r.status === 'quote_sent').length}
            </div>
            <div className="text-sm text-purple-700">Wysłano oferty</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {quoteRequests.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-green-700">Zakończone</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista zapytań ofertowych</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-gray-600">{request.company}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(request.created_at).toLocaleDateString('pl-PL')}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">{serviceTypeLabels[request.service_type]}</div>
                    <div className="text-xs text-gray-600">{participantsLabels[request.participants_count]}</div>
                    {request.estimated_price && (
                      <div className="text-xs text-green-600 flex items-center mt-1">
                        <Euro className="h-3 w-3 mr-1" />
                        {request.estimated_price} PLN
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-sm flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {request.email}
                    </div>
                    {request.phone && (
                      <div className="text-sm flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {request.phone}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={statusColors[request.status]}>
                      {statusLabels[request.status]}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Szczegóły zapytania</DialogTitle>
                        </DialogHeader>
                        {selectedRequest && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Imię i nazwisko</Label>
                                <p className="text-sm">{selectedRequest.name}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Firma</Label>
                                <p className="text-sm">{selectedRequest.company || 'Brak'}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Email</Label>
                                <p className="text-sm">{selectedRequest.email}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Telefon</Label>
                                <p className="text-sm">{selectedRequest.phone || 'Brak'}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium">Rodzaj szkolenia</Label>
                              <p className="text-sm">{serviceTypeLabels[selectedRequest.service_type]}</p>
                              {selectedRequest.service_variant && (
                                <p className="text-xs text-gray-600">Wariant: {selectedRequest.service_variant}</p>
                              )}
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium">Liczba uczestników</Label>
                              <p className="text-sm">{participantsLabels[selectedRequest.participants_count]}</p>
                            </div>
                            
                            {selectedRequest.additional_info && (
                              <div>
                                <Label className="text-sm font-medium">Dodatkowe informacje</Label>
                                <p className="text-sm bg-gray-50 p-3 rounded">{selectedRequest.additional_info}</p>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                  value={selectedRequest.status} 
                                  onValueChange={(value) => handleUpdateStatus(selectedRequest.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">Nowe</SelectItem>
                                    <SelectItem value="in_progress">W trakcie</SelectItem>
                                    <SelectItem value="quote_sent">Wysłano ofertę</SelectItem>
                                    <SelectItem value="completed">Zakończone</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label htmlFor="price">Szacowana cena (PLN)</Label>
                                <Input
                                  id="price"
                                  type="number"
                                  step="0.01"
                                  defaultValue={selectedRequest.estimated_price || ''}
                                  onBlur={(e) => {
                                    const price = parseFloat(e.target.value);
                                    if (!isNaN(price)) {
                                      handleUpdatePrice(selectedRequest.id, price);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="notes">Notatki</Label>
                              <Textarea
                                id="notes"
                                defaultValue={selectedRequest.notes || ''}
                                placeholder="Dodaj notatki..."
                                onBlur={(e) => handleUpdateNotes(selectedRequest.id, e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-lg font-medium">Brak zapytań ofertowych</div>
                <p className="text-sm">Nie znaleziono zapytań pasujących do kryteriów wyszukiwania.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMManagement;