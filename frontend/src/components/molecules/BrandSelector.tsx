import { useState, useEffect } from 'react';
import { Select, Spinner } from '../atoms';
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
      <div className={`w-full max-w-sm mx-auto ${className}`}>
        <div className="flex items-center justify-center p-6">
          <Spinner size="md" color="gray" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-sm mx-auto ${className}`}>
        <div className="text-center text-gray-500 py-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      <Select
        value={selectedBrandId || ''}
        onChange={(e) => onBrandSelect(e.target.value)}
      >
        <option value="">Selecciona una marca</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </Select>
    </div>
  );
}; 