import BrandService from "../services/brand";
import FAQService from "../services/faq";
import { Request, Response, NextFunction } from "express";

const listBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await BrandService.list();
    res.status(201).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json(error);
  }
  next();
};

const getBrandById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const brand = await BrandService.retrieve(id);
    const faqResponse = FAQService.generateFAQs(brand);
    res.status(200).json(faqResponse);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json(error);
  }
  next();
};

export { listBrands, getBrandById };
