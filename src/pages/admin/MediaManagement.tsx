
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image, Upload } from 'lucide-react';

const MediaManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zarządzanie Mediami</h1>
        <label htmlFor="upload-media">
          <Button className="cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Dodaj Media
          </Button>
          <Input id="upload-media" type="file" accept="image/*" multiple className="hidden" />
        </label>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center">
            <Image className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-900 mb-2">Nie dodano jeszcze żadnych mediów</p>
            <p className="text-gray-500 mb-4">Dodaj zdjęcia, aby móc je wykorzystać na stronie lub w postach na blogu.</p>
            <label htmlFor="upload-media-2">
              <Button variant="outline" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Wybierz pliki
              </Button>
              <Input id="upload-media-2" type="file" accept="image/*" multiple className="hidden" />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManagement;
