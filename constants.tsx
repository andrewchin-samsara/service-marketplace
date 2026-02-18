import { Vendor, Asset, Issue, ServiceRequest } from './types';
import React from 'react';

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Speedy Fleet Services',
    location: '123 Industrial Pkwy, Chicago, IL',
    distance: '2.5 mi',
    rating: 4.8,
    reviewCount: 124,
    services: ['Oil Change', 'Tire Replacement', 'Brake Service'],
    status: 'Available',
    // Logo: Dynamic chevrons centered, no text
    imageUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eff6ff%22%2F%3E%3Cpath%20d%3D%22M240%20240l40-80h30l-40%2080zm50%200l40-80h30l-40%2080z%22%20fill%3D%22%231e61f0%22%2F%3E%3C%2Fsvg%3E',
    priceLevel: '$$',
    nextAvailable: 'Today, 2:00 PM',
    description: 'Speedy Fleet Services specializes in quick turnaround maintenance for commercial fleets. We understand that uptime is critical for your business. Our certified technicians use state-of-the-art diagnostic tools to get your vehicles back on the road safely and efficiently.',
    phoneNumber: '(312) 555-0123',
    email: 'service@speedyfleet.com',
    hours: 'Mon-Fri: 7:00 AM - 6:00 PM, Sat: 8:00 AM - 2:00 PM',
    detailedServices: [
      { id: 's1', name: 'Standard Oil Change', description: 'Synthetic blend oil change up to 5 quarts, includes filter.', duration: '45 mins', price: 89.99 },
      { id: 's2', name: 'Tire Rotation & Balance', description: 'Rotate all 4 tires and high-speed computer balance.', duration: '1 hour', price: 49.99 },
      { id: 's3', name: 'Brake Pad Replacement (Front)', description: 'Replace front brake pads and resurface rotors.', duration: '2 hours', price: 189.99 },
      { id: 's4', name: 'Multi-Point Inspection', description: 'Comprehensive check of fluids, belts, hoses, and suspension.', duration: '30 mins', price: 0.00 }
    ]
  },
  {
    id: 'v2',
    name: 'Midwest Truck Repair',
    location: '4500 S Cicero Ave, Chicago, IL',
    distance: '5.1 mi',
    rating: 4.5,
    reviewCount: 89,
    services: ['Engine Diagnostics', 'Transmission', 'Heavy Duty Towing'],
    status: 'Busy',
    // Logo: Industrial hex nut centered, no text
    imageUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M300%20150l50%2025v50l-50%2025-50-25v-50z%22%20fill%3D%22%23334155%22%2F%3E%3Crect%20x%3D%22285%22%20y%3D%22175%22%20width%3D%2230%22%20height%3D%2250%22%20rx%3D%225%22%20fill%3D%22%23f8fafc%22%2F%3E%3C%2Fsvg%3E',
    priceLevel: '$$$',
    nextAvailable: 'Tomorrow, 8:00 AM',
    description: 'Premier heavy-duty truck repair facility serving the greater Midwest area. We handle everything from complex engine diagnostics to complete transmission rebuilds. DOT certified facility.',
    phoneNumber: '(312) 555-0199',
    email: 'dispatch@midwesttruck.com',
    hours: 'Mon-Sat: 6:00 AM - 8:00 PM',
    detailedServices: [
      { id: 's1', name: 'Heavy Duty Oil Service', description: 'Full service oil change for Class 8 trucks.', duration: '1.5 hours', price: 249.99 },
      { id: 's2', name: 'Computer Diagnostics', description: 'Full system scan and diagnostic report.', duration: '1 hour', price: 120.00 },
      { id: 's3', name: 'Transmission Fluid Change', description: 'Drain and fill transmission fluid, replace filters.', duration: '2 hours', price: 299.99 },
      { id: 's4', name: 'DOT Inspection', description: 'Annual Federal DOT inspection and certification.', duration: '1 hour', price: 85.00 }
    ]
  },
  {
    id: 'v3',
    name: 'AutoGlass Pros',
    location: '789 North Ave, Oak Park, IL',
    distance: '8.3 mi',
    rating: 4.9,
    reviewCount: 210,
    services: ['Glass Repair', 'Windshield Replacement'],
    status: 'Available',
    // Logo: Windshield arc + text, centered composition
    imageUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f0f9ff%22%2F%3E%3Cpath%20d%3D%22M100%20220c20-60%20140-60%20160%200%22%20stroke%3D%22%230284c7%22%20stroke-width%3D%2212%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%22140%22%20cy%3D%22180%22%20r%3D%2210%22%20fill%3D%22%23bae6fd%22%2F%3E%3Ctext%20x%3D%22280%22%20y%3D%22200%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2242%22%20font-weight%3D%22bold%22%20fill%3D%22%230369a1%22%3EAutoGlass%3C%2Ftext%3E%3Ctext%20x%3D%22280%22%20y%3D%22240%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2232%22%20fill%3D%22%230ea5e9%22%3EPros%3C%2Ftext%3E%3C%2Fsvg%3E',
    priceLevel: '$',
    nextAvailable: 'Today, 4:30 PM',
    description: 'We are the glass experts. From rock chip repairs to full windshield replacements with ADAS calibration, AutoGlass Pros has you covered.',
    phoneNumber: '(708) 555-0777',
    email: 'info@autoglasspros.com',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    detailedServices: [
      { id: 's1', name: 'Windshield Chip Repair', description: 'Repair of rock chips up to quarter size.', duration: '30 mins', price: 65.00 },
      { id: 's2', name: 'Windshield Replacement', description: 'OEM quality glass replacement (labor only).', duration: '2 hours', price: 250.00 },
      { id: 's3', name: 'ADAS Calibration', description: 'Camera calibration for lane departure systems.', duration: '1.5 hours', price: 300.00 }
    ]
  },
  {
    id: 'v4',
    name: 'Premier Fleet Maintenance',
    location: '900 W Lake St, Chicago, IL',
    distance: '1.2 mi',
    rating: 4.2,
    reviewCount: 56,
    services: ['Preventative Maintenance', 'DOT Inspection', 'Fluid Top-up'],
    status: 'Closed',
    // Logo: Star icon, serif font (Unchanged)
    imageUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23ffffff%22%2F%3E%3Cpath%20d%3D%22M300%20100l25%2050h50l-40%2030%2015%2050-50-35-50%2035%2015-50-40-30h50z%22%20fill%3D%22%231e293b%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22300%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2248%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3EPREMIER%3C%2Ftext%3E%3Ctext%20x%3D%22300%22%20y%3D%22340%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2218%22%20letter-spacing%3D%226%22%20text-anchor%3D%22middle%22%20fill%3D%22%2364748b%22%3EFLEET%20MAINTENANCE%3C%2Ftext%3E%3C%2Fsvg%3E',
    priceLevel: '$$',
    nextAvailable: 'Mon, 7:00 AM',
    description: 'Your partner in preventative maintenance. We focus on keeping small problems from becoming big ones. Customized fleet maintenance schedules available.',
    phoneNumber: '(312) 555-4422',
    email: 'contact@premierfleet.com',
    hours: 'Mon-Fri: 7:00 AM - 4:00 PM',
    detailedServices: [
      { id: 's1', name: 'Fleet PM Service A', description: 'Lube, oil, filter, and 20-point inspection.', duration: '1 hour', price: 95.00 },
      { id: 's2', name: 'Fleet PM Service B', description: 'Service A plus air filter, fuel filter, and brake check.', duration: '2.5 hours', price: 185.00 },
      { id: 's3', name: 'Coolant Flush', description: 'Complete coolant exchange.', duration: '1 hour', price: 110.00 }
    ]
  },
  {
    id: 'v5',
    name: 'Mobile Mechanic Unit 4',
    location: 'Mobile Service (Serving Greater Chicago)',
    distance: 'N/A',
    rating: 4.7,
    reviewCount: 42,
    services: ['Roadside Assistance', 'Battery Jump', 'Lockout Service'],
    status: 'Available',
    // Logo: Truck icon centered, no text
    imageUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eff6ff%22%2F%3E%3Cpath%20d%3D%22M250%20240h100v-50h-20v-30h-60v30h-20z%22%20fill%3D%22%232563eb%22%2F%3E%3Ccircle%20cx%3D%22280%22%20cy%3D%22240%22%20r%3D%2215%22%20fill%3D%22%231e40af%22%2F%3E%3Ccircle%20cx%3D%22320%22%20cy%3D%22240%22%20r%3D%2215%22%20fill%3D%22%231e40af%22%2F%3E%3C%2Fsvg%3E',
    priceLevel: '$$',
    nextAvailable: 'Now',
    description: 'We come to you! 24/7 Roadside assistance and mobile repairs. Don\'t pay for a tow, let us fix it on the spot.',
    phoneNumber: '(312) 555-9999',
    email: 'help@mobilemech.com',
    hours: '24/7 Emergency Service',
    detailedServices: [
      { id: 's1', name: 'Service Call / Diagnostic', description: 'On-site arrival and initial diagnosis.', duration: 'N/A', price: 125.00 },
      { id: 's2', name: 'Battery Jump Start', description: 'Heavy duty jump start.', duration: '15 mins', price: 45.00 },
      { id: 's3', name: 'Lockout Service', description: 'Vehicle entry service.', duration: '15 mins', price: 75.00 },
      { id: 's4', name: 'Fuel Delivery', description: 'Delivery of 5 gallons of fuel (fuel cost extra).', duration: '30 mins', price: 55.00 }
    ]
  }
];

export const SERVICE_CATEGORIES = [
  'All Services',
  'Preventative Maintenance',
  'Tires & Wheels',
  'Engine & Transmission',
  'Brakes',
  'Electrical',
  'Body & Glass',
  'Towing & Roadside'
];

export const MOCK_ASSETS: Asset[] = [
  { id: 'a1', name: 'Vehicle 104', vin: '1M8GDM9A_KP042788', year: 2020, make: 'Ford', model: 'F-150', status: 'Active' },
  { id: 'a2', name: 'Vehicle 107', vin: '1HTMCAAJ_LH672109', year: 2018, make: 'International', model: 'LT625', status: 'Active' },
  { id: 'a3', name: 'Vehicle 202', vin: '3HSCBTAJ_KN283746', year: 2019, make: 'Freightliner', model: 'Cascadia', status: 'In Shop' },
  { id: 'a4', name: 'Van 305', vin: '1FTYR1CM_LKA99283', year: 2021, make: 'Ford', model: 'Transit', status: 'Active' },
];

export const MOCK_ISSUES: Issue[] = [
  { id: 'i1', assetId: 'a1', type: 'Fault', title: 'Check Engine Light', description: 'P0300 Random/Multiple Cylinder Misfire Detected', date: '2023-10-25', severity: 'High' },
  { id: 'i2', assetId: 'a1', type: 'PM', title: 'Oil Change Due', description: '5,000 mile interval reached', date: '2023-10-28', severity: 'Medium' },
  { id: 'i3', assetId: 'a2', type: 'DVIR', title: 'Cracked Windshield', description: 'Driver reported crack on passenger side during pre-trip.', date: '2023-10-26', severity: 'Medium' },
  { id: 'i4', assetId: 'a4', type: 'Fault', title: 'TPMS Warning', description: 'Low pressure detected in rear right tire.', date: '2023-10-27', severity: 'Low' },
];

export const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'req_101',
    vendorId: 'v1',
    vendorName: 'Speedy Fleet Services',
    vendorImage: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eff6ff%22%2F%3E%3Cpath%20d%3D%22M240%20240l40-80h30l-40%2080zm50%200l40-80h30l-40%2080z%22%20fill%3D%22%231e61f0%22%2F%3E%3C%2Fsvg%3E',
    vehicleId: 'a2',
    vehicleName: 'Vehicle 107',
    serviceType: 'Tire Rotation & Balance',
    issueCount: 1,
    issueIds: ['i3'],
    notes: 'Please check the alignment as well.',
    status: 'Confirmed',
    submittedDate: '2023-10-20',
    scheduledDate: '2023-10-29 10:00 AM'
  },
  {
    id: 'req_102',
    vendorId: 'v4',
    vendorName: 'Premier Fleet Maintenance',
    vendorImage: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23ffffff%22%2F%3E%3Cpath%20d%3D%22M300%20100l25%2050h50l-40%2030%2015%2050-50-35-50%2035%2015-50-40-30h50z%22%20fill%3D%22%231e293b%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22300%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-size%3D%2248%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22%230f172a%22%3EPREMIER%3C%2Ftext%3E%3Ctext%20x%3D%22300%22%20y%3D%22340%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2218%22%20letter-spacing%3D%226%22%20text-anchor%3D%22middle%22%20fill%3D%22%2364748b%22%3EFLEET%20MAINTENANCE%3C%2Ftext%3E%3C%2Fsvg%3E',
    vehicleId: 'a4',
    vehicleName: 'Van 305',
    serviceType: 'Fleet PM Service A',
    issueCount: 0,
    issueIds: [],
    status: 'Pending',
    submittedDate: '2023-10-28'
  },
  {
    id: 'req_103',
    vendorId: 'v2',
    vendorName: 'Midwest Truck Repair',
    vendorImage: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M300%20150l50%2025v50l-50%2025-50-25v-50z%22%20fill%3D%22%23334155%22%2F%3E%3Crect%20x%3D%22285%22%20y%3D%22175%22%20width%3D%2230%22%20height%3D%2250%22%20rx%3D%225%22%20fill%3D%22%23f8fafc%22%2F%3E%3C%2Fsvg%3E',
    vehicleId: 'a3',
    vehicleName: 'Vehicle 202',
    serviceType: 'Transmission Fluid Change',
    issueCount: 0,
    issueIds: [],
    status: 'In Progress',
    submittedDate: '2023-10-25',
    scheduledDate: '2023-10-27 08:00 AM'
  }
];