// Artscapes - Sleek & Fast Vanilla JavaScript Gallery

// Pre-baked database of 25 curated masterpiece paintings
const CURATED_EXHIBITION = [
  {
    "id": "435641",
    "title": "Madonna and Child",
    "artist": "Giovanni Bellini",
    "year": "late 1480s",
    "description": "Oil on wood. Rogers Fund, 1908",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DT375.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DT375.jpg",
    "similarIds": ["437900", "435802", "437891"]
  },
  {
    "id": "436573",
    "title": "Cardinal Fernando Niño de Guevara (1541–1609)",
    "artist": "El Greco (Domenikos Theotokopoulos)",
    "year": "ca. 1600",
    "description": "Oil on canvas. H. O. Havemeyer Collection, Bequest of Mrs. H. O. Havemeyer, 1929",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-17777-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-17777-001.jpg",
    "similarIds": ["435853", "435809", "437447"]
  },
  {
    "id": "437769",
    "title": "Clothing the Naked",
    "artist": "Michiel Sweerts",
    "year": "ca. 1661",
    "description": "Oil on canvas. Gift of Mr. and Mrs. Charles Wrightsman, 1984",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-15762-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-15762-001.jpg",
    "similarIds": ["435809", "437609", "437826"]
  },
  {
    "id": "436440",
    "title": "Cottage Children (The Wood Gatherers)",
    "artist": "Thomas Gainsborough",
    "year": "1787",
    "description": "Oil on canvas. Bequest of Mary Stillman Harkness, 1950",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP169640.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP169640.jpg",
    "similarIds": ["436244", "436851", "437447"]
  },
  {
    "id": "437900",
    "title": "Comtesse de la Châtre (Marie Charlotte Louise Perrette Aglaé Bontemps, 1762–1848)",
    "artist": "Elisabeth Louise Vigée Le Brun",
    "year": "1789",
    "description": "Oil on canvas. Gift of Jessie Woolworth Donahue, 1954",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP320086.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP320086.jpg",
    "similarIds": ["437329", "437532", "827660"]
  },
  {
    "id": "438814",
    "title": "The Abduction of Rebecca",
    "artist": "Eugène Delacroix",
    "year": "1846",
    "description": "Oil on canvas. Catharine Lorillard Wolfe Collection, Wolfe Fund, 1903",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-14344-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-14344-001.jpg",
    "similarIds": ["439933", "437826", "436323"]
  },
  {
    "id": "437609",
    "title": "The Holy Family with the Young Saint John the Baptist",
    "artist": "Andrea del Sarto (Andrea d'Agnolo)",
    "year": "ca. 1528",
    "description": "Oil on wood. Maria DeWitt Jesup Fund, 1922",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP295025.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP295025.jpg",
    "similarIds": ["436323", "437826", "437447"]
  },
  {
    "id": "437326",
    "title": "Blind Orion Searching for the Rising Sun",
    "artist": "Nicolas Poussin",
    "year": "1658",
    "description": "Oil on canvas. Fletcher Fund, 1924",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP148490.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP148490.jpg",
    "similarIds": ["435641", "437900", "436851"]
  },
  {
    "id": "435853",
    "title": "The Coronation of the Virgin",
    "artist": "Annibale Carracci",
    "year": "after 1595",
    "description": "Oil on canvas. Purchase, Bequest of Miss Adelaide Milton de Groot (1876-1967), by exchange, and Dr. and Mrs. Manuel Porter and sons Gift, in honor of Mrs. Sarah Porter, 1971",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-27033-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-27033-001.jpg",
    "similarIds": ["437455", "437447", "438814"]
  },
  {
    "id": "437455",
    "title": "The Holy Family with Saints Anne and Catherine of Alexandria",
    "artist": "Jusepe de Ribera (called Lo Spagnoletto)",
    "year": "1648",
    "description": "Oil on canvas. Samuel D. Lee Fund, 1934",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DT16.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DT16.jpg",
    "similarIds": ["435641", "438814", "437447"]
  },
  {
    "id": "436323",
    "title": "Marie Emilie Coignet de Courson (1716–1806) with a Dog",
    "artist": "Jean Honoré Fragonard",
    "year": "ca. 1769",
    "description": "Oil on canvas. Fletcher Fund, 1937",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-1019-01.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-1019-01.jpg",
    "similarIds": ["435809", "435802", "438814"]
  },
  {
    "id": "437891",
    "title": "Mars and Venus United by Love",
    "artist": "Paolo Veronese (Paolo Caliari)",
    "year": "1570s",
    "description": "Oil on canvas. John Stewart Kennedy Fund, 1910",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP167124.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP167124.jpg",
    "similarIds": ["438814", "437447", "437326"]
  },
  {
    "id": "435851",
    "title": "The Meditation on the Passion",
    "artist": "Vittore Carpaccio",
    "year": "ca. 1490",
    "description": "Oil and tempera on wood. John Stewart Kennedy Fund, 1911",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP296427.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP296427.jpg",
    "similarIds": ["436573", "436440", "437826"]
  },
  {
    "id": "436851",
    "title": "Elizabeth Farren (born about 1759, died 1829), Later Countess of Derby",
    "artist": "Sir Thomas Lawrence",
    "year": "1790",
    "description": "Oil on canvas. Bequest of Edward S. Harkness, 1940",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP169218.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP169218.jpg",
    "similarIds": ["437826", "437549", "436573"]
  },
  {
    "id": "437447",
    "title": "Captain George K. H. Coussmaker (1759–1801)",
    "artist": "Sir Joshua Reynolds",
    "year": "1782",
    "description": "Oil on canvas. Bequest of William K. Vanderbilt, 1920",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP169215.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP169215.jpg",
    "similarIds": ["437769", "436573", "437532"]
  },
  {
    "id": "436244",
    "title": "Virgin and Child with Saint Anne",
    "artist": "Albrecht Dürer",
    "year": "probably 1519",
    "description": "Oil on linden. Bequest of Benjamin Altman, 1913",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP280846.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP280846.jpg",
    "similarIds": ["435853", "437891", "437329"]
  },
  {
    "id": "439933",
    "title": "Lute Player",
    "artist": "Valentin de Boulogne",
    "year": "ca. 1625–26",
    "description": "Oil on canvas. Purchase, Walter and Leonore Annenberg Acquisitions Endowment Fund; Director's Fund; Acquisitions Fund; James and Diane Burke and Mark Fisch and Rachel Davidson Gifts; Louis V. Bell, Harris Brisbane Dick, Fletcher, and Rogers Funds and Joseph Pulitzer Bequest, 2008",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP168811.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP168811.jpg",
    "similarIds": ["437549", "437826", "437532"]
  },
  {
    "id": "435728",
    "title": "The Last Communion of Saint Jerome",
    "artist": "Botticelli (Alessandro di Mariano Filipepi)",
    "year": "early 1490s",
    "description": "Tempera and gold on wood. Bequest of Benjamin Altman, 1913",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-24049-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-24049-001.jpg",
    "similarIds": ["438814", "437900", "827660"]
  },
  {
    "id": "435802",
    "title": "Portrait of a Young Man",
    "artist": "Bronzino (Agnolo di Cosimo di Mariano)",
    "year": "1530s",
    "description": "Oil on wood. H. O. Havemeyer Collection, Bequest of Mrs. H. O. Havemeyer, 1929",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-14286-011.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-14286-011.jpg",
    "similarIds": ["439933", "437329", "435851"]
  },
  {
    "id": "437532",
    "title": "Rubens, Helena Fourment (1614–1673), and Their Son Frans (1633–1678)",
    "artist": "Peter Paul Rubens",
    "year": "ca. 1635",
    "description": "Oil on wood. Gift of Mr. and Mrs. Charles Wrightsman, in honor of Sir John Pope-Hennessy, 1981",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-14286-003.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-14286-003.jpg",
    "similarIds": ["437900", "827660", "435809"]
  },
  {
    "id": "435809",
    "title": "The Harvesters",
    "artist": "Pieter Bruegel the Elder",
    "year": "1565",
    "description": "Oil on wood. Rogers Fund, 1919",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP119115.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP119115.jpg",
    "similarIds": ["437826", "437455", "436573"]
  },
  {
    "id": "437329",
    "title": "The Abduction of the Sabine Women",
    "artist": "Nicolas Poussin",
    "year": "probably 1633–34",
    "description": "Oil on canvas. Harris Brisbane Dick Fund, 1946",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-29324-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-29324-001.jpg",
    "similarIds": ["438814", "437891", "436244"]
  },
  {
    "id": "437826",
    "title": "Venus and Adonis",
    "artist": "Titian (Tiziano Vecellio)",
    "year": "1550s",
    "description": "Oil on canvas. The Jules Bache Collection, 1949",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-19299-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19299-001.jpg",
    "similarIds": ["435641", "436440", "438814"]
  },
  {
    "id": "827660",
    "title": "A Bouquet of Flowers",
    "artist": "Clara Peeters",
    "year": "ca. 1612",
    "description": "Oil on wood. Purchase, Lila Acheson Wallace, Howard S. and Nancy Marks, Friends of European Paintings, and Mr. and Mrs. J. Tomilson Hill Gifts, Gift of Humanities Fund Inc., by exchange, Henry and Lucy Moses Fund Inc. Gift, and funds from various donors, 2020",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP-19451-001.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19451-001.jpg",
    "similarIds": ["437549", "436573", "439933"]
  },
  {
    "id": "437549",
    "title": "Wheat Fields",
    "artist": "Jacob van Ruisdael",
    "year": "ca. 1670",
    "description": "Oil on canvas. Bequest of Benjamin Altman, 1913",
    "imageUrl": "https://images.metmuseum.org/CRDImages/ep/original/DP145911.jpg",
    "thumbnailUrl": "https://images.metmuseum.org/CRDImages/ep/web-large/DP145911.jpg",
    "similarIds": ["827660", "435641", "435802"]
  }
];

// App State
let database = [...CURATED_EXHIBITION];
let playlist = database.map(a => a.id);
let favorites = [];
let currentIndex = 0;
let autoPlay = true;
let isFullscreen = false;
let showUI = true;
let showInfo = false;
let showSearch = false;
let uiTimer = null;
let autoplayTimer = null;
let searchTimeout = null;
let isSearching = false;

// Infinite Stream State
let streamObjectIds = [];
let loadedIds = new Set(database.map(a => a.id));
let isFetchingStream = false;

// DOM Elements
const elBgBlur = document.getElementById('bg-blur-image');
const elMainArt = document.getElementById('main-artwork-image');
const elImageContainer = document.querySelector('.image-container');
const elUILayer = document.querySelector('.ui-layer');
const elBtnPlay = document.getElementById('btn-play');
const elBtnFav = document.getElementById('btn-fav');
const elBtnDownload = document.getElementById('btn-download');
const elBtnFullscreen = document.getElementById('btn-fullscreen');
const elBtnSearchTrigger = document.getElementById('btn-search-trigger');
const elNavLeft = document.getElementById('nav-left');
const elNavRight = document.getElementById('nav-right');

// Drawer Elements
const elDetailsDrawer = document.getElementById('details-drawer');
const elDrawerClose = document.getElementById('drawer-close');
const elArtTitle = document.getElementById('art-title');
const elArtArtist = document.getElementById('art-artist');
const elArtYear = document.getElementById('art-year');
const elArtDesc = document.getElementById('art-desc');
const elSimilarCarousel = document.getElementById('similar-carousel');

// Modal Elements
const elSearchModal = document.getElementById('search-modal');
const elSearchClose = document.getElementById('search-close');
const elSearchInput = document.getElementById('search-input');
const elPlaylistCount = document.getElementById('playlist-count');
const elSearchResultsGrid = document.getElementById('search-results-grid');

// Initialize App
function init() {
  loadFavorites();
  initEventListeners();
  resetUITimer();
  startAutoplay();
  
  // Set initial playlist from DB
  syncPlaylist();
  
  // Render first artwork
  renderArtwork(0);
  
  // Initialize background remote pre-fetching for infinite stream
  initInfiniteStream();
  
  // Fade out loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.remove(), 800);
    }
  }, 1200);
}

// Infinite Stream Engine
async function initInfiniteStream() {
  try {
    // Fetch all painting IDs from European Paintings department that have images
    const searchRes = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&hasImages=true&q=paintings");
    const searchData = await searchRes.json();
    
    if (searchData.objectIDs && searchData.objectIDs.length > 0) {
      // Shuffle the list of IDs so every session is unique
      streamObjectIds = shuffleArray(searchData.objectIDs.map(id => id.toString()));
      
      // Remove IDs that are already in our pre-baked database
      streamObjectIds = streamObjectIds.filter(id => !loadedIds.has(id));
      
      console.log(`Infinite stream initialized with ${streamObjectIds.length} remote paintings.`);
      
      // Start initial prefetch
      prefetchNextStreamItems();
    }
  } catch (error) {
    console.error("Failed to initialize infinite stream:", error);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function prefetchNextStreamItems() {
  if (isFetchingStream || streamObjectIds.length === 0) return;
  
  const currentArt = database[currentIndex];
  if (!currentArt) return;
  
  const playPos = playlist.indexOf(currentArt.id);
  // If the current artwork is not in the playlist (e.g. searching/curating custom sequence), ignore
  if (playPos === -1) return;
  
  const remainingIndex = playlist.length - 1 - playPos;
  
  // If we have fewer than 5 paintings ahead in our queue, fetch the next 5 paintings in the background
  if (remainingIndex < 5) {
    isFetchingStream = true;
    
    // Take the next 5 IDs from the remote stream list
    const idsToFetch = streamObjectIds.splice(0, 5);
    
    const promises = idsToFetch.map(async (id) => {
      try {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        return res.json();
      } catch (e) {
        return null;
      }
    });
    
    try {
      const results = await Promise.all(promises);
      results.forEach(item => {
        if (item && item.primaryImage && !loadedIds.has(item.objectID.toString())) {
          const artwork = {
            id: item.objectID.toString(),
            title: item.title || "Unknown Title",
            artist: item.artistDisplayName || "Unknown Artist",
            year: item.objectDate || "Unknown Year",
            description: (item.medium || "") + (item.creditLine ? ". " + item.creditLine : ""),
            imageUrl: item.primaryImage,
            thumbnailUrl: item.primaryImageSmall || item.primaryImage,
            similarIds: []
          };
          
          database.push(artwork);
          playlist.push(artwork.id);
          loadedIds.add(artwork.id);
        }
      });
      
      console.log(`Prefetched batch loaded. Database size: ${database.length}. Playlist size: ${playlist.length}`);
      
      // Update playlist manager UI if it is active
      if (showSearch) {
        renderPlaylistManager();
      }
    } catch (err) {
      console.error("Error prefetching stream items:", err);
    } finally {
      isFetchingStream = false;
      // Re-trigger prefetch check in case we need more buffer
      prefetchNextStreamItems();
    }
  }
}

// Load favorites from local storage
function loadFavorites() {
  const saved = localStorage.getItem('art_favorites');
  if (saved) {
    try {
      favorites = JSON.parse(saved);
    } catch (e) {
      favorites = [];
    }
  }
}

// Save favorites
function saveFavorites() {
  localStorage.setItem('art_favorites', JSON.stringify(favorites));
}

// Sync playlist to ensure valid IDs
function syncPlaylist() {
  const dbIds = new Set(database.map(a => a.id));
  playlist = playlist.filter(id => dbIds.has(id));
  if (playlist.length === 0) {
    playlist = database.map(a => a.id);
  }
}

// Render selected artwork
function renderArtwork(index) {
  if (database.length === 0) return;
  
  // Wrap index
  if (index < 0) index = database.length - 1;
  if (index >= database.length) index = 0;
  
  currentIndex = index;
  const art = database[currentIndex];
  if (!art) return;
  
  // Update images with elegant crossfade
  const tempBlur = new Image();
  tempBlur.onload = () => {
    elBgBlur.src = art.thumbnailUrl;
    elBgBlur.classList.add('active');
  };
  tempBlur.src = art.thumbnailUrl;
  
  elMainArt.classList.remove('active');
  
  // Pre-load main image to prevent flashes
  const tempMain = new Image();
  tempMain.onload = () => {
    elMainArt.src = art.imageUrl;
    elMainArt.classList.add('active');
  };
  tempMain.src = art.imageUrl;
  
  // Update top bar buttons
  const isFav = favorites.includes(art.id);
  if (isFav) {
    elBtnFav.classList.add('active-state');
    elBtnFav.innerHTML = '<i data-lucide="heart" fill="currentColor"></i>';
  } else {
    elBtnFav.classList.remove('active-state');
    elBtnFav.innerHTML = '<i data-lucide="heart"></i>';
  }
  
  // Update Autoplay Button UI
  if (autoPlay) {
    elBtnPlay.classList.add('active-state');
    elBtnPlay.innerHTML = '<i data-lucide="pause"></i>';
  } else {
    elBtnPlay.classList.remove('active-state');
    elBtnPlay.innerHTML = '<i data-lucide="play" style="transform: translateX(1px)"></i>';
  }
  
  // Update Details Drawer Content
  elArtTitle.textContent = art.title;
  elArtArtist.textContent = art.artist;
  elArtYear.textContent = art.year;
  elArtDesc.textContent = art.description;
  
  // Render Similar Artworks
  renderSimilarArtworks(art);
  
  // Re-instantiate Icons
  lucide.createIcons();
  
  // Trigger background pre-fetching
  prefetchNextStreamItems();
}

// Render Similar list in details
function renderSimilarArtworks(art) {
  elSimilarCarousel.innerHTML = '';
  
  // Get similar items from database
  let similarItems = art.similarIds
    .map(id => database.find(a => a.id === id))
    .filter(a => !!a);
    
  // If no pre-defined similar, fall back to same artist or random
  if (similarItems.length === 0) {
    similarItems = database
      .filter(a => a.id !== art.id && (a.artist === art.artist || Math.random() > 0.7))
      .slice(0, 4);
  }
  
  if (similarItems.length === 0) {
    // Ultimate fallback: first 4 items in DB
    similarItems = database.filter(a => a.id !== art.id).slice(0, 4);
  }
  
  similarItems.forEach(item => {
    const slide = document.createElement('div');
    slide.className = 'similar-item';
    slide.title = `${item.title} - ${item.artist}`;
    slide.innerHTML = `<img src="${item.thumbnailUrl}" alt="${item.title}">`;
    slide.addEventListener('click', (e) => {
      e.stopPropagation();
      const newIdx = database.findIndex(a => a.id === item.id);
      if (newIdx !== -1) {
        toggleInfoDrawer(false);
        renderArtwork(newIdx);
      }
    });
    elSimilarCarousel.appendChild(slide);
  });
}

// Navigation Controls
function nextArtwork() {
  if (playlist.length === 0) return;
  const currentArt = database[currentIndex];
  let playIndex = playlist.indexOf(currentArt.id);
  
  if (playIndex === -1) {
    playIndex = 0;
  } else {
    playIndex = (playIndex + 1) % playlist.length;
  }
  
  const targetId = playlist[playIndex];
  const dbIndex = database.findIndex(a => a.id === targetId);
  if (dbIndex !== -1) {
    renderArtwork(dbIndex);
  }
}

function prevArtwork() {
  if (playlist.length === 0) return;
  const currentArt = database[currentIndex];
  let playIndex = playlist.indexOf(currentArt.id);
  
  if (playIndex === -1) {
    playIndex = 0;
  } else {
    playIndex = (playIndex - 1 + playlist.length) % playlist.length;
  }
  
  const targetId = playlist[playIndex];
  const dbIndex = database.findIndex(a => a.id === targetId);
  if (dbIndex !== -1) {
    renderArtwork(dbIndex);
  }
}

// Autoplay
function startAutoplay() {
  stopAutoplay();
  if (autoPlay) {
    autoplayTimer = setInterval(() => {
      if (!showInfo && !showSearch) {
        nextArtwork();
      }
    }, 10000); // 10 seconds interval
  }
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function toggleAutoplay() {
  autoPlay = !autoPlay;
  startAutoplay();
  renderArtwork(currentIndex);
}

// Favorites Toggle
function toggleFavorite() {
  const currentArt = database[currentIndex];
  if (!currentArt) return;
  
  const favIndex = favorites.indexOf(currentArt.id);
  if (favIndex === -1) {
    favorites.push(currentArt.id);
  } else {
    favorites.splice(favIndex, 1);
  }
  
  saveFavorites();
  renderArtwork(currentIndex);
}

// Download Artwork
function downloadArtwork() {
  const currentArt = database[currentIndex];
  if (currentArt) {
    window.open(currentArt.imageUrl, '_blank', 'noopener,noreferrer');
  }
}

// Fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
      .then(() => {
        isFullscreen = true;
        updateFullscreenButton();
      })
      .catch(err => console.error(err));
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
        .then(() => {
          isFullscreen = false;
          updateFullscreenButton();
        });
    }
  }
}

function updateFullscreenButton() {
  if (document.fullscreenElement) {
    elBtnFullscreen.innerHTML = '<i data-lucide="minimize"></i>';
  } else {
    elBtnFullscreen.innerHTML = '<i data-lucide="maximize"></i>';
  }
  lucide.createIcons();
}

// UI Visibility Management
function resetUITimer() {
  showUI = true;
  elUILayer.classList.add('visible');
  
  if (uiTimer) clearTimeout(uiTimer);
  
  if (!showInfo && !showSearch) {
    uiTimer = setTimeout(() => {
      showUI = false;
      elUILayer.classList.remove('visible');
    }, 3000);
  }
}

// Drawers & Overlays toggle
function toggleInfoDrawer(show) {
  showInfo = show;
  if (show) {
    // Hide standard UI
    showUI = false;
    elUILayer.classList.remove('visible');
    if (uiTimer) clearTimeout(uiTimer);
    
    // Slide up drawer and blur bg image
    elImageContainer.classList.add('dimmed');
    elDetailsDrawer.classList.add('visible');
  } else {
    // Reset back
    elImageContainer.classList.remove('dimmed');
    elDetailsDrawer.classList.remove('visible');
    resetUITimer();
  }
}

function toggleSearchModal(show) {
  showSearch = show;
  if (show) {
    elSearchModal.classList.add('visible');
    elSearchInput.focus();
    renderPlaylistManager();
  } else {
    elSearchModal.classList.remove('visible');
    elSearchInput.value = '';
    resetUITimer();
  }
}

// Playlist manager rendering
function renderPlaylistManager() {
  elPlaylistCount.textContent = `${playlist.length} in sequence`;
  
  const query = elSearchInput.value.trim();
  const listToRender = query.length === 0 ? database : searchResults;
  
  elSearchResultsGrid.innerHTML = '';
  
  if (isSearching) {
    elSearchResultsGrid.innerHTML = '<div class="loading-message">Searching the Metropolitan Museum database...</div>';
    return;
  }
  
  if (listToRender.length === 0) {
    elSearchResultsGrid.innerHTML = '<div class="empty-message">No artworks found. Try another search.</div>';
    return;
  }
  
  listToRender.forEach(art => {
    const inPlaylist = playlist.includes(art.id);
    const card = document.createElement('div');
    card.className = 'artwork-card';
    
    card.innerHTML = `
      <div class="card-img-wrapper" onclick="playFromCard('${art.id}')">
        <img src="${art.thumbnailUrl}" alt="${art.title}">
        <div class="card-img-overlay">
          <i data-lucide="play" fill="currentColor" size="20"></i>
        </div>
      </div>
      <div class="card-details">
        <div>
          <h4 class="card-title" title="${art.title}">${art.title}</h4>
          <p class="card-artist" title="${art.artist}">${art.artist}</p>
        </div>
        <button class="card-btn ${inPlaylist ? 'in-playlist' : ''}" onclick="togglePlaylistCard(event, '${art.id}')">
          <i data-lucide="${inPlaylist ? 'minus' : 'plus'}" size="12"></i>
          <span>${inPlaylist ? 'Remove' : 'Add'}</span>
        </button>
      </div>
    `;
    elSearchResultsGrid.appendChild(card);
  });
  
  lucide.createIcons();
}

window.playFromCard = function(id) {
  const dbIndex = database.findIndex(a => a.id === id);
  if (dbIndex !== -1) {
    toggleSearchModal(false);
    renderArtwork(dbIndex);
  }
};

window.togglePlaylistCard = function(event, id) {
  event.stopPropagation();
  const idx = playlist.indexOf(id);
  if (idx !== -1) {
    playlist.splice(idx, 1);
  } else {
    playlist.push(id);
  }
  renderPlaylistManager();
};

// Search Met API
async function performSearch(term) {
  isSearching = true;
  renderPlaylistManager();
  
  try {
    const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(term)}`);
    const data = await res.json();
    
    if (data.objectIDs && data.objectIDs.length > 0) {
      const ids = data.objectIDs.slice(0, 15);
      const promises = ids.map(async (id) => {
        try {
          const r = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
          return r.json();
        } catch (e) {
          return null;
        }
      });
      
      const results = await Promise.all(promises);
      const filtered = results
        .filter(item => item && item.primaryImage)
        .map(item => ({
          id: item.objectID.toString(),
          title: item.title || "Unknown Title",
          artist: item.artistDisplayName || "Unknown Artist",
          year: item.objectDate || "Unknown Year",
          description: (item.medium || "") + (item.creditLine ? ". " + item.creditLine : ""),
          imageUrl: item.primaryImage,
          thumbnailUrl: item.primaryImageSmall || item.primaryImage,
          similarIds: []
        }));
        
      searchResults = filtered;
      
      // Inject search results into global database if not already present
      filtered.forEach(item => {
        if (!database.some(a => a.id === item.id)) {
          database.push(item);
        }
      });
    } else {
      searchResults = [];
    }
  } catch (e) {
    console.error("Search API failed: ", e);
    searchResults = [];
  } finally {
    isSearching = false;
    renderPlaylistManager();
  }
}

// Event Listeners
function initEventListeners() {
  // Mouse events for UI overlay visibility
  document.addEventListener('mousemove', resetUITimer);
  document.addEventListener('click', resetUITimer);
  
  // Navigation Arrows Click
  elNavLeft.addEventListener('click', (e) => {
    e.stopPropagation();
    prevArtwork();
  });
  if (elNavRight) {
    elNavRight.addEventListener('click', (e) => {
      e.stopPropagation();
      nextArtwork();
    });
  }
  
  // Top Buttons
  elBtnPlay.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAutoplay();
  });
  elBtnFav.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite();
  });
  elBtnDownload.addEventListener('click', (e) => {
    e.stopPropagation();
    downloadArtwork();
  });
  elBtnFullscreen.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFullscreen();
  });
  
  // Fullscreen event sync
  document.addEventListener('fullscreenchange', updateFullscreenButton);
  
  // Open search modal
  elBtnSearchTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSearchModal(true);
  });
  
  elSearchClose.addEventListener('click', () => toggleSearchModal(false));
  
  // Search input debouncer
  elSearchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if (val.length === 0) {
      searchResults = [];
      isSearching = false;
      renderPlaylistManager();
      return;
    }
    
    searchTimeout = setTimeout(() => {
      performSearch(val);
    }, 500);
  });
  
  // Details Drawer scrolling
  document.addEventListener('wheel', (e) => {
    if (showSearch) return;
    
    if (e.deltaY > 50 && !showInfo) {
      toggleInfoDrawer(true);
    } else if (e.deltaY < -50 && showInfo) {
      if (elDetailsDrawer.scrollTop <= 0) {
        toggleInfoDrawer(false);
      }
    }
  });
  
  elDrawerClose.addEventListener('click', () => toggleInfoDrawer(false));
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // If typing in search box, ignore hotkeys
    if (document.activeElement === elSearchInput) {
      if (e.key === 'Escape') {
        elSearchInput.blur();
        toggleSearchModal(false);
      }
      return;
    }
    
    resetUITimer();
    
    if (showSearch) {
      if (e.key === 'Escape') toggleSearchModal(false);
      return;
    }
    
    if (showInfo) {
      if (e.key === 'Escape' || e.key === 'ArrowUp') {
        toggleInfoDrawer(false);
      }
      return;
    }
    
    if (e.key === 'ArrowRight') nextArtwork();
    if (e.key === 'ArrowLeft') prevArtwork();
    if (e.key === 'ArrowDown') toggleInfoDrawer(true);
    if (e.key === 'f') toggleFullscreen();
    if (e.key === 's') toggleSearchModal(true);
    if (e.key === ' ') { // Space toggles play/pause
      e.preventDefault();
      toggleAutoplay();
    }
  });
}

// Start
document.addEventListener('DOMContentLoaded', init);
