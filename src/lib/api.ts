// src/lib/api.ts
// All API calls must route through this file. No direct calls elsewhere.

const BASE_URL = import.meta.env.VTL_API_URL ?? '';

export interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  tenure: 'sale' | 'rent';
  location: string;
  images: string[];
  created_at: string;
}

export async function getProperties(params?: {
  tenure?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  property_type?: string;
}): Promise<Property[]> {
  if (!BASE_URL) return getMockProperties(params);

  try {
    const query = new URLSearchParams();
    if (params?.tenure) query.set('tenure', params.tenure);
    if (params?.min_price) query.set('min_price', String(params.min_price));
    if (params?.max_price) query.set('max_price', String(params.max_price));
    if (params?.bedrooms) query.set('bedrooms', String(params.bedrooms));
    if (params?.property_type) query.set('property_type', params.property_type);

    const res = await fetch(`${BASE_URL}/api/properties?${query.toString()}`);
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return getMockProperties(params);
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  if (!BASE_URL) return getMockProperties().find(p => p.id === id) ?? null;

  try {
    const res = await fetch(`${BASE_URL}/api/property/${id}`);
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch {
    return getMockProperties().find(p => p.id === id) ?? null;
  }
}

// --- Mock data used when VTL_API_URL is not yet configured ---
function getMockProperties(params?: {
  tenure?: string;
  bedrooms?: number;
  min_price?: number;
  max_price?: number;
  property_type?: string;
}): Property[] {
  const all: Property[] = [
    {
      id: '1',
      title: 'Modern 2 Bed Apartment',
      price: 325000,
      bedrooms: 2,
      bathrooms: 1,
      property_type: 'Flat',
      tenure: 'sale',
      location: 'Brighton Marina, BN2',
      images: [],
      created_at: '2024-02-01',
    },
    {
      id: '2',
      title: 'Victorian Terrace House',
      price: 625000,
      bedrooms: 3,
      bathrooms: 2,
      property_type: 'House',
      tenure: 'sale',
      location: 'Hove, BN3',
      images: [],
      created_at: '2024-02-02',
    },
    {
      id: '3',
      title: 'Seafront Penthouse',
      price: 725000,
      bedrooms: 3,
      bathrooms: 2,
      property_type: 'Flat',
      tenure: 'sale',
      location: 'Brighton Seafront, BN2',
      images: [],
      created_at: '2024-02-03',
    },
    {
      id: '4',
      title: 'Detached Family Home',
      price: 475000,
      bedrooms: 4,
      bathrooms: 2,
      property_type: 'House',
      tenure: 'sale',
      location: 'Worthing, BN11',
      images: [],
      created_at: '2024-02-04',
    },
    {
      id: '5',
      title: 'Character Cottage',
      price: 395000,
      bedrooms: 2,
      bathrooms: 1,
      property_type: 'Cottage',
      tenure: 'sale',
      location: 'Lewes, BN7',
      images: [],
      created_at: '2024-02-05',
    },
    {
      id: '6',
      title: 'City Centre Flat',
      price: 1250,
      bedrooms: 2,
      bathrooms: 1,
      property_type: 'Flat',
      tenure: 'rent',
      location: 'Brighton, BN1',
      images: [],
      created_at: '2024-02-06',
    },
    {
      id: '7',
      title: 'Family House',
      price: 1850,
      bedrooms: 3,
      bathrooms: 2,
      property_type: 'House',
      tenure: 'rent',
      location: 'Hove, BN3',
      images: [],
      created_at: '2024-02-07',
    },
    {
      id: '8',
      title: 'Modern Studio',
      price: 850,
      bedrooms: 0,
      bathrooms: 1,
      property_type: 'Studio',
      tenure: 'rent',
      location: 'Brighton, BN2',
      images: [],
      created_at: '2024-02-08',
    },
    {
      id: '9',
      title: 'Seafront Apartment',
      price: 1650,
      bedrooms: 2,
      bathrooms: 2,
      property_type: 'Flat',
      tenure: 'rent',
      location: 'Brighton Marina',
      images: [],
      created_at: '2024-02-09',
    },
    {
      id: '10',
      title: 'Seafront 2 Bed Flat',
      price: 1095,
      bedrooms: 2,
      bathrooms: 1,
      property_type: 'Flat',
      tenure: 'rent',
      location: 'Shoreham-by-Sea, BN43',
      images: [],
      created_at: '2024-02-10',
    },
  ];

  return all.filter(p => {
    if (params?.tenure && p.tenure !== params.tenure) return false;
    if (params?.bedrooms && p.bedrooms < params.bedrooms) return false;
    if (params?.min_price && p.price < params.min_price) return false;
    if (params?.max_price && p.price > params.max_price) return false;
    if (params?.property_type && params.property_type !== 'all' && p.property_type !== params.property_type) return false;
    return true;
  });
}
