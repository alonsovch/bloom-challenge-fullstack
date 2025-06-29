import { useState, useEffect } from 'react';
import { BrandWithFAQs, apiService } from '../services/api';

type FAQProps = {
  brandId: string;
};

export const FAQ = ({ brandId }: FAQProps) => {
  const [data, setData] = useState<BrandWithFAQs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchBrandFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const brandData = await apiService.getBrandWithFAQs(brandId);
        setData(brandData);
        // Expandir la primera pregunta por defecto
        setExpandedItems(new Set([0]));
      } catch (err) {
        setError('Error al cargar las preguntas frecuentes');
        console.error('Error fetching brand FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandFAQs();
  }, [brandId]);

  const toggleExpanded = (index: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          PREGUNTAS FRECUENTES
        </h2>
        <h3 className="text-xl font-semibold text-gray-600 mb-4">
          PREGUNTAS FRECUENTES AL VENDER
        </h3>
        <p className="text-lg text-gray-600">
          <span className="font-medium">{data.brand.name}</span>
        </p>
      </div>

      <div className="space-y-4">
        {data.faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h4>
                <span className="text-gray-500 text-xl flex-shrink-0">
                  {expandedItems.has(index) ? '−' : '+'}
                </span>
              </div>
            </button>
            
            {expandedItems.has(index) && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Más información en:{' '}
          <a
            href={data.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {data.brand.url}
          </a>
        </p>
      </div>
    </div>
  );
}; 