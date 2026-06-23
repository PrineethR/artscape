import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Plus, Minus, Play } from 'lucide-react';
import { Artwork } from '../types';

interface SearchPlaylistProps {
  artworks: Artwork[];
  onAddArtworks: (newArtworks: Artwork[]) => void;
  onClose: () => void;
  playlist: string[];
  onUpdatePlaylist: (newPlaylist: string[]) => void;
  onPlayArtwork: (id: string) => void;
}

export function SearchPlaylist({ artworks, onAddArtworks, onClose, playlist, onUpdatePlaylist, onPlayArtwork }: SearchPlaylistProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setSearchResults(data);
          onAddArtworks(data);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onAddArtworks]);

  const displayArtworks = searchTerm.trim().length === 0 ? artworks : searchResults;

  const toggleInPlaylist = (id: string) => {
    if (playlist.includes(id)) {
      onUpdatePlaylist(playlist.filter(p => p !== id));
    } else {
      onUpdatePlaylist([...playlist, id]);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      <motion.div 
        className="relative w-full max-w-4xl bg-zinc-900/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input 
              type="text"
              placeholder="Search artworks or artists..."
              className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex justify-between items-end">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold">Available Artworks</h3>
            <span className="text-xs text-white/40">{playlist.length} in your sequence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayArtworks.map(art => {
              const inPlaylist = playlist.includes(art.id);
              return (
                <div key={art.id} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-stretch group">
                  <div 
                    className="w-24 h-24 shrink-0 relative cursor-pointer"
                    onClick={() => onPlayArtwork(art.id)}
                  >
                    <img src={art.thumbnailUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between items-start min-w-0">
                    <div className="w-full">
                      <h4 className="text-sm font-medium text-white truncate" title={art.title}>{art.title}</h4>
                      <p className="text-xs text-white/50 truncate" title={art.artist}>{art.artist}</p>
                    </div>
                    <button 
                      onClick={() => toggleInPlaylist(art.id)}
                      className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors mt-2 ${inPlaylist ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      {inPlaylist ? <Minus size={12} /> : <Plus size={12} />}
                      {inPlaylist ? 'Remove' : 'Add'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {isSearching ? (
            <div className="text-center py-12 text-white/40 text-sm animate-pulse">
              Searching the Metropolitan Museum of Art database...
            </div>
          ) : displayArtworks.length === 0 ? (
            <div className="text-center py-12 text-white/40 text-sm">
              No artworks found matching your search.
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
