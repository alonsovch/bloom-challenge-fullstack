"use client";

import { useState } from "react";
import Image from "next/image";
import { BrandSelector } from "../components/BrandSelector";
import { FAQ } from "../components/FAQ";

export const Home = () => {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrandId(brandId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Desafío Dev
            </h1>
            <p className="text-gray-600 mt-2">
              Selecciona una marca para ver sus preguntas frecuentes
            </p>
          </div>
          <Image
            className="h-14 w-auto"
            src="/images/Logo-Bloom.png"
            alt="Logo Bloom"
            width={400}
            height={100}
            priority
          />
        </header>

        {/* Brand Selector */}
        <div className="mb-8">
          <BrandSelector
            selectedBrandId={selectedBrandId}
            onBrandSelect={handleBrandSelect}
          />
        </div>

        {/* FAQ Section */}
        {selectedBrandId && (
          <FAQ brandId={selectedBrandId} />
        )}

        {/* Empty State */}
        {!selectedBrandId && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏷️</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Elige una marca para comenzar
            </h3>
            <p className="text-gray-500">
              Selecciona una marca del menú superior para ver sus preguntas frecuentes específicas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
