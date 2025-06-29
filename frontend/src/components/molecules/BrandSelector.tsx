import { useState, useEffect } from 'react';
import { Select, Text, Spinner } from '../atoms';
import { Brand, apiService } from '../../services/api';

interface BrandSelectorProps {
  selectedBrandId: string | null;
  onBrandSelect: (brandId: string) => void;
  className?: string;
}

export const BrandSelector = ({ 
  selectedBrandId, 
  onBrandSelect,
  className = ''
}: BrandSelectorProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const brandsData = await apiService.getBrands();
        setBrands(brandsData);
      } catch (err) {
        setError('Error al cargar las marcas');
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <div className="flex items-center justify-center p-4">
          <Spinner size="md" />
          <Text variant="body" color="muted" className="ml-2">
            Cargando marcas...
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <Text variant="body" color="error" align="center">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Text 
        variant="subtitle" 
        color="primary" 
        className="block mb-3"
      >
        Selecciona una marca:
      </Text>
      <Select
        value={selectedBrandId || ''}
        onChange={(e) => onBrandSelect(e.target.value)}
      >
        <option value="">Elige una marca...</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </Select>
    </div>
  );
}; 