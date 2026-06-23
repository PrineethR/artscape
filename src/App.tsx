import React, { useState, useEffect } from 'react';
import { Gallery } from './components/Gallery';
import { fetchArtworks } from './data';
import { Artwork } from './types';

export default function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworks().then(data => {
      setArtworks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0a0a0a] text-white flex items-center justify-center font-sans overflow-hidden">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border border-white/40 border-t-white animate-spin mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-white/50">Curating Exhibition...</p>
        </div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="w-full h-full bg-[#0a0a0a] text-white flex items-center justify-center font-sans overflow-hidden">
        <p className="text-sm text-white/50">Failed to load exhibition data. Please try again later.</p>
      </div>
    );
  }

  const handleAddArtworks = (newArtworks: Artwork[]) => {
    setArtworks(prev => {
      const existingIds = new Set(prev.map(a => a.id));
      const uniqueNew = newArtworks.filter(a => !existingIds.has(a.id));
      return [...prev, ...uniqueNew];
    });
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Gallery artworks={artworks} onAddArtworks={handleAddArtworks} />
    </div>
  );
}

