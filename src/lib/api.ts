// src/lib/api.ts

export interface Property {
  id: string;
  title: string;
  slug: string;

  type: 'residential' | 'commercial';
  listing_type: 'sale' | 'rent';

  currency: string; // ISO 4217 (GBP, EUR, USD, etc.)
  price: number;
  rent_frequency?: 'monthly' | 'annum';

  category?: string;
  summary?: string;
  location?: string;

  // Residential
  bedrooms?: number;
  bathrooms?: number;

  // Commercial
  floor_area?: number;
  use_class?: string;

  image?: string;
}

const BASE_URL = import.meta.env.PUBLIC_VTL_API_URL;

export async function searchProperties(params: {
  q?: string;
  location?: string;
  type?: 'residential' | 'commercial';
  listing_type?: 'sale' | 'rent';
}): Promise<{ results: Property[]; count: number }> {

  // If no API configured → return empty result set
  if (!BASE_URL) {
    return { results: [], count: 0 };
  }

  try {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== '')
        .reduce<Record<string, string>>((acc, [k, v]) => {
          if (v !== undefined) acc[k] = String(v);
          return acc;
        }, {})
    );

    const res = await fetch(`${BASE_URL}/properties?${query.toString()}`);

    if (!res.ok) throw new Error("API error");

    return await res.json();
  } catch (err) {
    console.error("Search failed:", err);
    return { results: [], count: 0 };
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  if (!BASE_URL) return null;

  try {
    const res = await fetch(`${BASE_URL}/properties/${id}`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("Fetch property failed:", err);
    return null;
  }
}