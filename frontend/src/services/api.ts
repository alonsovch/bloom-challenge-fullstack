const API_BASE_URL = 'http://localhost:8000';

export type Brand = {
  id: string;
  name: string;
  url: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type BrandWithFAQs = {
  brand: Brand;
  faqs: FAQ[];
};

class ApiService {
  private async fetchJson<T>(url: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getBrands(): Promise<Brand[]> {
    return this.fetchJson<Brand[]>('/brands');
  }

  async getBrandWithFAQs(brandId: string): Promise<BrandWithFAQs> {
    return this.fetchJson<BrandWithFAQs>(`/brands/${brandId}`);
  }
}

export const apiService = new ApiService(); 