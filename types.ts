import React from 'react';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  services: string[];
  status: 'Available' | 'Busy' | 'Closed';
  imageUrl: string;
  priceLevel: '$' | '$$' | '$$$';
  nextAvailable: string;
  description: string;
  phoneNumber: string;
  email: string;
  hours: string;
  detailedServices: ServiceItem[];
}

export interface ServiceRequest {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorImage: string;
  vehicleId: string;
  vehicleName: string;
  serviceType: string; // Primary service name or "General Repair"
  issueCount: number;
  issueIds?: string[];
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed';
  submittedDate: string;
  scheduledDate?: string;
}

export interface Asset {
  id: string;
  name: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  status: 'Active' | 'In Shop' | 'Inactive';
  imageUrl?: string;
}

export interface Issue {
  id: string;
  assetId: string;
  type: 'Fault' | 'DVIR' | 'PM';
  title: string;
  description: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export type ViewState = 'marketplace' | 'inventory' | 'overview';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: NavItem[];
}