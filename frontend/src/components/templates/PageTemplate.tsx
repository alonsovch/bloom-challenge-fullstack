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
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Header />
        
        <div className="mb-16">
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