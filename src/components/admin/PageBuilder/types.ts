
export interface PageBlock {
  id: string;
  type: string;
  content: any;
  styles: BlockStyles;
  order: number;
  responsive?: {
    mobile?: Partial<BlockStyles>;
    tablet?: Partial<BlockStyles>;
  };
}

export interface BlockStyles {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  textAlign: 'left' | 'center' | 'right' | 'justify';
  backgroundColor: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number;
  borderRadius?: number;
  border?: {
    width: number;
    style: string;
    color: string;
  };
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface BlockType {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'basic' | 'media' | 'layout' | 'advanced' | 'homepage';
  description: string;
}
