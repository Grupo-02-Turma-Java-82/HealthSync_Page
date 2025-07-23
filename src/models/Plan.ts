interface PricingFeature {
  text: string;
}

export type Plan = {
  title: string;
  description: string;
  price: string;
  pricePer?: string;
  details: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
  icon: React.ReactNode;
  iconBgColorClass: string;
  buttonColorClass: string;
  buttonHoverColorClass: string;
  ringColorClass?: string;
};
