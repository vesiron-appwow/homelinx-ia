// src/lib/api.ts

export interface Property {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  image?: string;
}

const BASE_URL = import.meta.env.PUBLIC_VTL_API_URL;

export async function searchProperties(params: {
  q?: string;
  location?: string;
}): Promise<{ results: Property[]; count: number }> {

  // If no API configured → return empty result set
  if (!BASE_URL) {
    return { results: [], count: 0 };
  }

  try {
    const query = new URLSearchParams(params as Record<string, string>);
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