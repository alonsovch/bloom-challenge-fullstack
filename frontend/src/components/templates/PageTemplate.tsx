import { ReactNode } from 'react';
import { Header } from '../organisms';
import { BrandSelector } from '../molecules';

interface PageTemplateProps {
  selectedBrandId: string | null;
  onBrandSelect: (brandId: string) => void;
  children?: ReactNode;
  className?: string;
}

export const PageTemplate = ({
  selectedBrandId,
  onBrandSelect,
  children,
  className = ''
}: PageTemplateProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="mb-8">
          <BrandSelector
            selectedBrandId={selectedBrandId}
            onBrandSelect={onBrandSelect}
          />    
        </div>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}; 