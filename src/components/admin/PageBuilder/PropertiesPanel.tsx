
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import type { PageBlock } from './types';

interface PropertiesPanelProps {
  block: PageBlock;
  onUpdateBlock: (updates: Partial<PageBlock>) => void;
  onClose: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  block,
  onUpdateBlock,
  onClose,
}) => {
  const updateStyles = (styleUpdates: any) => {
    onUpdateBlock({
      styles: { ...block.styles, ...styleUpdates }
    });
  };

  const updateMargin = (side: string, value: number) => {
    updateStyles({
      margin: { ...block.styles.margin, [side]: value }
    });
  };

  const updatePadding = (side: string, value: number) => {
    updateStyles({
      padding: { ...block.styles.padding, [side]: value }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold">Właściwości bloku</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="spacing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spacing" className="text-xs">Odstępy</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">Styl</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Treść</TabsTrigger>
          </TabsList>

          <TabsContent value="spacing" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Marginesy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="margin-top" className="text-xs">Góra</Label>
                    <Input
                      id="margin-top"
                      type="number"
                      value={block.styles.margin.top}
                      onChange={(e) => updateMargin('top', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="margin-bottom" className="text-xs">Dół</Label>
                    <Input
                      id="margin-bottom"
                      type="number"
                      value={block.styles.margin.bottom}
                      onChange={(e) => updateMargin('bottom', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="margin-left" className="text-xs">Lewo</Label>
                    <Input
                      id="margin-left"
                      type="number"
                      value={block.styles.margin.left}
                      onChange={(e) => updateMargin('left', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="margin-right" className="text-xs">Prawo</Label>
                    <Input
                      id="margin-right"
                      type="number"
                      value={block.styles.margin.right}
                      onChange={(e) => updateMargin('right', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Padding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="padding-top" className="text-xs">Góra</Label>
                    <Input
                      id="padding-top"
                      type="number"
                      value={block.styles.padding.top}
                      onChange={(e) => updatePadding('top', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="padding-bottom" className="text-xs">Dół</Label>
                    <Input
                      id="padding-bottom"
                      type="number"
                      value={block.styles.padding.bottom}
                      onChange={(e) => updatePadding('bottom', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="padding-left" className="text-xs">Lewo</Label>
                    <Input
                      id="padding-left"
                      type="number"
                      value={block.styles.padding.left}
                      onChange={(e) => updatePadding('left', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="padding-right" className="text-xs">Prawo</Label>
                    <Input
                      id="padding-right"
                      type="number"
                      value={block.styles.padding.right}
                      onChange={(e) => updatePadding('right', parseInt(e.target.value) || 0)}
                      className="h-8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="style" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Kolory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label htmlFor="bg-color" className="text-xs">Kolor tła</Label>
                  <Input
                    id="bg-color"
                    type="color"
                    value={block.styles.backgroundColor}
                    onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                    className="h-8"
                  />
                </div>
                {block.styles.textColor !== undefined && (
                  <div>
                    <Label htmlFor="text-color" className="text-xs">Kolor tekstu</Label>
                    <Input
                      id="text-color"
                      type="color"
                      value={block.styles.textColor}
                      onChange={(e) => updateStyles({ textColor: e.target.value })}
                      className="h-8"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Wyrównanie</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={block.styles.textAlign}
                  onChange={(e) => updateStyles({ textAlign: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="left">Do lewej</option>
                  <option value="center">Do środka</option>
                  <option value="right">Do prawej</option>
                  <option value="justify">Wyjustowany</option>
                </select>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ustawienia treści</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">
                  Edytuj treść bezpośrednio na canvas klikając na blok i używając przycisków edycji.
                </p>
                
                {block.type === 'heading' && (
                  <div className="mt-2">
                    <Label htmlFor="heading-level" className="text-xs">Poziom nagłówka</Label>
                    <select
                      id="heading-level"
                      value={block.content.level || 2}
                      onChange={(e) => onUpdateBlock({
                        content: { ...block.content, level: parseInt(e.target.value) }
                      })}
                      className="w-full p-2 border rounded mt-1"
                    >
                      <option value={1}>H1</option>
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                      <option value={4}>H4</option>
                      <option value={5}>H5</option>
                      <option value={6}>H6</option>
                    </select>
                  </div>
                )}

                {block.type === 'spacer' && (
                  <div className="mt-2">
                    <Label htmlFor="spacer-height" className="text-xs">Wysokość (px)</Label>
                    <Input
                      id="spacer-height"
                      type="number"
                      value={block.content.height || 40}
                      onChange={(e) => onUpdateBlock({
                        content: { ...block.content, height: parseInt(e.target.value) || 40 }
                      })}
                      className="h-8 mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertiesPanel;
