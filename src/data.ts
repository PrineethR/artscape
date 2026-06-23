import { Artwork } from './types';

// We fetch data from the Art Institute of Chicago public API
// which provides high-resolution, public-domain artwork images.
const API_URL = 'https://api.artic.edu/api/v1/artworks/search';

// 25 hand-picked famous public domain artworks to ensure high quality results,
// or we can just fetch random highly-rated public domain artworks.
// We'll fetch 25 public domain artworks that have images.
export async function fetchArtworks(): Promise<Artwork[]> {
  try {
    const searchRes = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&hasImages=true&isHighlight=true&q=paintings"
    );
    const searchData = await searchRes.json();
    
    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      return [];
    }
    
    const idsToFetch = searchData.objectIDs.slice(0, 25);
    
    const artworksPromises = idsToFetch.map(async (id: number) => {
      const objRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
      return objRes.json();
    });

    const objectsData = await Promise.all(artworksPromises);

    const fetchedArtworks = objectsData
      .filter((item: any) => item.primaryImage)
      .map((item: any) => {
        return {
          id: item.objectID.toString(),
          title: item.title || "Unknown Title",
          artist: item.artistDisplayName || "Unknown Artist",
          year: item.objectDate || "Unknown Year",
          description: item.medium + ". " + (item.creditLine || ""),
          imageUrl: item.primaryImage,
          thumbnailUrl: item.primaryImageSmall,
          similarIds: [], 
        };
      });

    return fetchedArtworks;
  } catch (error) {
    console.error('Failed to fetch artworks:', error);
    return [];
  }
}

