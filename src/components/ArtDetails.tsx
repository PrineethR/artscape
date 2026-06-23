import React from 'react';
import { motion } from 'motion/react';
import { ChevronUp, Download, Heart } from 'lucide-react';
import { Artwork } from '../types';

interface ArtDetailsProps {
  currentArt: Artwork;
  artworks: Artwork[];
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectArt: (id: string) => void;
}

export function ArtDetails({ currentArt, artworks, onClose, isFavorite, onToggleFavorite, onSelectArt }: ArtDetailsProps) {
  
  const similarArtworks = currentArt.similarIds.map(id => artworks.find(a => a.id === id)).filter((a): a is Artwork => !!a);


  return (
    <div className="min-h-screen pt-[60vh] pb-24 px-8 md:px-12 flex flex-col items-center">
      
      <div className="w-full max-w-5xl bg-black/40 backdrop-blur-3xl border-t border-white/10 pt-12 pb-10 px-8 flex flex-col md:px-12 text-white relative z-20">
        
        {/* Scroll back up hint */}
        <button 
          onClick={onClose}
          className="absolute -top-[4.5rem] left-1/2 -translate-x-1/2 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full hover:bg-white hover:text-black"
          title="Back to Image"
        >
          <ChevronUp size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-4">
            <h1 className="text-4xl font-light mb-2 italic font-serif">{currentArt.title}</h1>
            <p className="text-sm text-white/60 leading-relaxed mb-4 font-light italic pr-4">
              {currentArt.description}
            </p>
            <div className="flex items-center space-x-4 text-[10px] tracking-widest text-white/40 uppercase">
              <span>ARTIST: {currentArt.artist}</span>
              <span>/</span>
              <span>YEAR: {currentArt.year}</span>
            </div>
          </div>

          {/* Sidebar Info / Similar */}
          <div className="lg:col-span-8">
            <div className="flex items-center mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/80 shrink-0">Similar in Series</span>
              <div className="h-[1px] w-full mx-6 bg-white/10"></div>
            </div>
            
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
              {similarArtworks.map(art => (
                <div 
                  key={art.id}
                  onClick={() => onSelectArt(art.id)}
                  className="w-32 h-20 shrink-0 rounded-lg overflow-hidden border border-white/10 group cursor-pointer relative"
                >
                    <img 
                      src={art.thumbnailUrl} 
                      alt={art.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
