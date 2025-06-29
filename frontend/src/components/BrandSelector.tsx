import { useState, useEffect } from 'react';
import { Brand, apiService } from '../services/api';

type BrandSelectorProps = {
  selectedBrandId: string | null;
  onBrandSelect: (brandId: string) => void;
};

export const BrandSelector = ({ selectedBrandId, onBrandSelect }: BrandSelectorProps) => {
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
      <div className="w-full max-w-md mx-auto">
        <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="brand-select" className="block text-lg font-medium text-gray-700 mb-3">
        Selecciona una marca:
      </label>
      <select
        id="brand-select"
        value={selectedBrandId || ''}
        onChange={(e) => onBrandSelect(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
      >
        <option value="">Elige una marca...</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
}; 