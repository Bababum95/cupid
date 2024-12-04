export interface ReviewProps {
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  content: string;
  images?: string[];
  authorInitial?: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface ProductFeatureProps {
  title: string;
  description: string;
}

export interface SocialLinkProps {
  icon: string;
  alt: string;
  url: string;
}

export interface FooterLinkProps {
  text: string;
  url: string;
}

export interface PaymentMethodProps {
  icon: string;
  alt: string;
}
