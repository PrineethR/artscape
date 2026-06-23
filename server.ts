import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/artworks", async (req, res) => {
    try {
      // Fetch 25 highlights from European Paintings from the Met Museum
      const searchRes = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&hasImages=true&isHighlight=true&q=paintings"
      );
      const searchData = await searchRes.json();
      
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
            similarIds: [], // We'll populate this below
          };
        });

      // Populate some pseudo-random similar IDs for the "Similar in Series" functionality
      fetchedArtworks.forEach((art: any, i: number) => {
        const similar = [];
        for (let j = 1; j <= 4; j++) {
          const simIdx = (i + j) % fetchedArtworks.length;
          similar.push(fetchedArtworks[simIdx].id);
        }
        art.similarIds = similar;
      });

      res.json(fetchedArtworks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch artworks" });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const q = req.query.q || "";
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(q as string)}`
      );
      const searchData = await searchRes.json();
      
      if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
        return res.json([]);
      }
      
      const idsToFetch = searchData.objectIDs.slice(0, 15);
      
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

      res.json(fetchedArtworks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to search artworks" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
