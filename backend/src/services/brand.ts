import { Brand } from "../models/brand";
import brands from "../data/brands";
import brandSettings from "../data/brands-settings";

const BrandService = {
  retrieve(id: string): Promise<Brand> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundBrand = brands.find((item) => item.id === id);
        const foundSettings = brandSettings.find(
          (setting) => setting.brandId === id
        );
        
        if (!foundBrand || !foundSettings) {
          reject(new Error("Brand not found"));
          return;
        }
        
        const brandWithSettings: Brand = {
          ...foundBrand,
          settings: foundSettings,
        };
        
        resolve(brandWithSettings);
      }, 1000);
    });
  },
  
  list(): Promise<Brand[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(brands);
      }, 1000);
    });
  },
};

export default BrandService;
