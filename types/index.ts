// Common types for the application

export interface Benefit {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  testimonial?: Testimonial;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  videoUrl?: string;
  date?: string;
  type?: "video" | "text";
}

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ScienceTab {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}
