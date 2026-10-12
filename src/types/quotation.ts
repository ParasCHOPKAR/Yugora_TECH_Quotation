export interface ServiceItem {
  id: string;
  category?: string;
  title: string;
  description?: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface CompanyDetails {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  footerAddress: string;
  logoUrl: string;
}

export interface ClientDetails {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
}

export interface QuotationData {
  quotationNo: string;
  date: string;
  validUntil: string;
  company: CompanyDetails;
  client: ClientDetails;
  salutation: string;
  introMessage: string;
  items: ServiceItem[];
  subtotal: number;
  taxRate: number; // e.g. 18 for GST or 0
  taxAmount: number;
  discountRate: number; // percentage
  discountAmount: number;
  grandTotal: number;
  currency: string;
  paymentTerms: string[];
  termsAndConditions: string[];
  authorizedSignatoryName: string;
  authorizedSignatoryTitle: string;
  closingNote: string;
}
