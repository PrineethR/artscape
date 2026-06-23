import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Maximize, Minimize, ChevronLeft, ChevronRight, Download, Search, Pause, Play as PlayIcon } from 'lucide-react';
import { ArtDetails } from './ArtDetails';
import { SearchPlaylist } from './SearchPlaylist';
import { Artwork } from '../types';

interface GalleryProps {
  artworks: Artwork[];
  onAddArtworks: (newArtworks: Artwork[]) => void;
}

export function Gallery({ artworks, onAddArtworks }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState<string[]>(artworks.map(a => a.id));
  const [autoPlay, setAutoPlay] = useState(true);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentArt = artworks[currentIndex] || artworks[0];

  useEffect(() => {
    // Sync playlist when artworks are added and not yet in playlist
    setPlaylist(prev => {
      const existing = new Set(prev);
      const newIds = artworks.map(a => a.id).filter(id => !existing.has(id));
      if (newIds.length > 0) {
        return [...prev, ...newIds];
      }
      return prev;
    });
  }, [artworks]);

  useEffect(() => {
    const saved = localStorage.getItem('art_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const saveFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('art_favorites', JSON.stringify(newFavs));
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      saveFavorites(favorites.filter(f => f !== id));
    } else {
      saveFavorites([...favorites, id]);
    }
  };

  const resetUITimer = useCallback(() => {
    setShowUI(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!showInfo) {
      timeoutRef.current = setTimeout(() => {
        setShowUI(false);
      }, 3000);
    }
  }, [showInfo]);

  useEffect(() => {
    resetUITimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetUITimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetUITimer();
      
      if (showSearch) {
        if (e.key === 'Escape') setShowSearch(false);
        return;
      }
      
      if (showInfo) {
        if (e.key === 'Escape' || e.key === 'ArrowUp') {
          setShowInfo(false);
        }
        return;
      }

      if (e.key === 'ArrowRight') nextArt();
      if (e.key === 'ArrowLeft') prevArt();
      if (e.key === 'ArrowDown') setShowInfo(true);
      if (e.key === 'f') toggleFullscreen();
      if (e.key === 's') setShowSearch(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showInfo, showSearch, resetUITimer]);

  const nextArt = useCallback(() => {
    if (playlist.length === 0) return;
    const currentPlaylistIndex = playlist.indexOf(currentArt.id);
    const newIndex = currentPlaylistIndex === -1 ? 0 : (currentPlaylistIndex + 1) % playlist.length;
    const nextArtId = playlist[newIndex];
    const newGlobalIndex = artworks.findIndex(a => a.id === nextArtId);
    if (newGlobalIndex !== -1) setCurrentIndex(newGlobalIndex);
  }, [playlist, currentArt.id, artworks]);

  const prevArt = useCallback(() => {
    if (playlist.length === 0) return;
    const currentPlaylistIndex = playlist.indexOf(currentArt.id);
    const newIndex = currentPlaylistIndex === -1 ? 0 : (currentPlaylistIndex - 1 + playlist.length) % playlist.length;
    const prevArtId = playlist[newIndex];
    const newGlobalIndex = artworks.findIndex(a => a.id === prevArtId);
    if (newGlobalIndex !== -1) setCurrentIndex(newGlobalIndex);
  }, [playlist, currentArt.id, artworks]);

  useEffect(() => {
    if (autoPlay && !showInfo && !showSearch) {
      const timer = setInterval(() => {
        nextArt();
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [autoPlay, showInfo, showSearch, nextArt]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.error);
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 50 && !showInfo) {
      setShowInfo(true);
    } else if (e.deltaY < -50 && showInfo) {
      const infoContainer = document.getElementById('info-scroll-container');
      if (infoContainer && infoContainer.scrollTop <= 0) {
        setShowInfo(false);
      }
    }
  };

  const handleDownload = () => {
    if (!currentArt) return;
    window.open(currentArt.imageUrl, '_blank', 'noopener,noreferrer');
  };

  if (!currentArt) return null;

  return (
    <div 
      className="relative w-full h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden select-none flex flex-col"
      onMouseMove={resetUITimer}
      onClick={resetUITimer}
      onWheel={handleWheel}
    >
      {/* Dynamic Glow Points (Atmospheric Effect) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Background Image Container */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        animate={{ y: showInfo ? '-50vh' : 0, scale: showInfo ? 1.05 : 1, filter: showInfo ? 'blur(10px)' : 'blur(0px)', opacity: showInfo ? 0.3 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="popLayout">
          {/* Blurred Background to fill empty space */}
          <motion.img
            key={`bg-${currentArt.id}`}
            src={currentArt.thumbnailUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
          {/* Main Contained Image */}
          <motion.img
            key={currentArt.id}
            src={currentArt.imageUrl}
            alt={currentArt.title}
            className="absolute inset-0 w-full h-full object-contain p-8 md:p-12 lg:p-20 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Main Gallery UI */}
      <AnimatePresence>
        {!showInfo && showUI && !showSearch && (
          <motion.div 
            className="absolute inset-0 flex flex-col justify-between pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top Bar */}
            <div className="relative z-30 flex justify-between items-center p-8 bg-transparent">
              <div className="flex items-center space-x-2 pointer-events-auto">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center bg-black/20 backdrop-blur-md">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center space-x-3 pointer-events-auto">
                <button 
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`p-3 rounded-full border backdrop-blur-md transition-colors ${autoPlay ? 'bg-white text-black border-white' : 'bg-black/20 border-white/20 text-white hover:bg-white hover:text-black'}`}
                  title={autoPlay ? "Pause Autoplay" : "Resume Autoplay"}
                >
                  {autoPlay ? <Pause size={20} className="fill-current text-current" /> : <PlayIcon size={20} className="fill-current" style={{ transform: 'translateX(2px)' }} />}
                </button>
                <button 
                  onClick={() => toggleFavorite(currentArt.id)}
                  className={`p-3 rounded-full border backdrop-blur-md transition-colors ${favorites.includes(currentArt.id) ? 'bg-white text-black border-white' : 'bg-black/20 border-white/20 text-white hover:bg-white hover:text-black'}`}
                  title="Save to favorites"
                >
                  <Heart size={20} className={favorites.includes(currentArt.id) ? "fill-black text-black" : ""} />
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-3 bg-black/20 hover:bg-white border border-white/20 hover:border-white text-white hover:text-black backdrop-blur-md rounded-full transition-colors"
                  title="Download Wallpaper"
                >
                  <Download size={20} />
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="p-3 bg-black/20 hover:bg-white border border-white/20 hover:border-white text-white hover:text-black backdrop-blur-md rounded-full transition-colors hidden sm:block"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>

            {/* Navigation Areas */}
            <div className="absolute inset-y-0 left-0 w-1/4 flex items-center px-10 pointer-events-auto cursor-w-resize z-20" onClick={prevArt}>
              <div className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-opacity opacity-0 hover:opacity-100 hover:bg-white/10 flex items-center justify-center">
                <ChevronLeft size={24} />
              </div>
            </div>
            
            <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end px-10 pointer-events-auto cursor-e-resize z-20" onClick={nextArt}>
              <div className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-opacity opacity-0 hover:opacity-100 hover:bg-white/10 flex items-center justify-center">
                <ChevronRight size={24} />
              </div>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto z-30">
              <button 
                onClick={() => setShowSearch(true)}
                className="p-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105 active:scale-95 shadow-lg"
                title="Search & Playlist"
              >
                <Search size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info View Panel */}
      <AnimatePresence>
        {showInfo && !showSearch && (
          <motion.div 
            id="info-scroll-container"
            className="absolute inset-0 top-0 overflow-y-auto z-10"
            initial={{ opacity: 0, y: '20vh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '20vh' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArtDetails 
              currentArt={currentArt} 
              artworks={artworks}
              onClose={() => setShowInfo(false)} 
              isFavorite={favorites.includes(currentArt.id)}
              onToggleFavorite={() => toggleFavorite(currentArt.id)}
              onSelectArt={(id) => {
                const idx = artworks.findIndex(a => a.id === id);
                if (idx !== -1) {
                  setCurrentIndex(idx);
                  setShowInfo(false);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Playlist Panel */}
      <AnimatePresence>
        {showSearch && (
          <SearchPlaylist 
            artworks={artworks}
            onAddArtworks={onAddArtworks}
            onClose={() => setShowSearch(false)}
            playlist={playlist}
            onUpdatePlaylist={setPlaylist}
            onPlayArtwork={(id) => {
              const idx = artworks.findIndex(a => a.id === id);
              if (idx !== -1) {
                setCurrentIndex(idx);
                setShowSearch(false);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
