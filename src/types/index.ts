export type PropertyType = 
  | 'apartment' 
  | 'house' 
  | 'villa' 
  | 'office' 
  | 'penthouse' 
  | 'studio' 
  | 'commercial' 
  | 'land';

export type PropertyStatus = 'for-sale' | 'for-rent';

export interface FloorPlan {
  id: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  planImage: string;
  description: string;
}

export interface PropertyDocument {
  title: string;
  size: string;
  url: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  pricePrefix?: string;
  priceSuffix?: string;
  featured: boolean;
  hotOffer?: boolean;
  openHouse?: boolean;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  areaM2: number;
  lotSizeM2?: number;
  yearBuilt: number;
  propertyCode: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    lat: number;
    lng: number;
  };
  amenities: string[];
  images: string[];
  floorPlans: FloorPlan[];
  virtualTourUrl?: string;
  videoTourUrl?: string;
  documents?: PropertyDocument[];
  energyRating?: 'A+' | 'A' | 'B' | 'C' | 'D';
  hoaFee?: number;
  agentId: string;
  agencyId?: string;
  viewsCount: number;
  favoritesCount: number;
  createdAt: string;
  published: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  mobile: string;
  whatsapp: string;
  avatar: string;
  bio: string;
  agencyId?: string;
  agencyName: string;
  licenseNumber: string;
  rating: number;
  reviewCount: number;
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  agentsCount: number;
  propertiesCount: number;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';
export type LeadSource = 'website_inquiry' | 'schedule_tour' | 'whatsapp' | 'phone' | 'direct' | 'portal';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  budgetMin?: number;
  budgetMax?: number;
  preferredType?: PropertyType;
  preferredCity?: string;
  notes: string;
  assignedAgentId: string;
  propertyId?: string;
  propertyTitle?: string;
  createdAt: string;
  lastContactDate?: string;
}

export type DealStage = 
  | 'lead_in'
  | 'contact_made'
  | 'viewing_scheduled'
  | 'offer_submitted'
  | 'contract_sent'
  | 'closed_won'
  | 'closed_lost';

export interface Deal {
  id: string;
  title: string;
  stage: DealStage;
  value: number;
  commission: number;
  probability: number;
  leadId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyId: string;
  propertyTitle: string;
  assignedAgentId: string;
  expectedCloseDate: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  type: 'general' | 'schedule_tour';
  tourType?: 'in_person' | 'video_call';
  tourDate?: string;
  tourTime?: string;
  status: 'unread' | 'read' | 'replied' | 'converted_lead';
  createdAt: string;
  agentId: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'viewing' | 'call' | 'meeting' | 'email' | 'contract';
  dueDate: string;
  dueTime?: string;
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  leadId?: string;
  propertyId?: string;
  propertyTitle?: string;
  clientName?: string;
  agentId: string;
  notes?: string;
}

export interface Review {
  id: string;
  propertyId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  rating: number;
  criteria: {
    location: number;
    value: number;
    amenities: number;
    agent: number;
  };
  comment: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  packageName: string;
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
  paymentMethod: string;
  clientName: string;
  clientEmail: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'buyer';
  avatar: string;
  agentId?: string;
}
