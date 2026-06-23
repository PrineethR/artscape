import { Artwork } from './types';

// We fetch data from the Art Institute of Chicago public API
// which provides high-resolution, public-domain artwork images.
const API_URL = 'https://api.artic.edu/api/v1/artworks/search';

// 25 hand-picked famous public domain artworks to ensure high quality results,
// or we can just fetch random highly-rated public domain artworks.
// We'll fetch 25 public domain artworks that have images.
export async function fetchArtworks(): Promise<Artwork[]> {
  try {
    const response = await fetch('/api/artworks');
    const data = await response.json();
    if (!Array.isArray(data)) {
      console.error('API did not return an array:', data);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch artworks:', error);
    return [];
  }
}

