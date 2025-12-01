import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, 
         FaMapMarkerAlt, FaRegCalendarAlt, FaUtensils, FaDrum, FaLeaf, 
         FaUmbrellaBeach, FaLandmark, FaSearch, FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';
import { useMedia } from '../contexts/MediaContext';
import './GhanaMedia.css';

const ExploreGhana = () => {
  // Video player states (keep existing states)
  const { setCurrentMedia, setMediaType } = useMedia();
  const [currentMedia, setCurrentMediaState] = useState(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeSliderRef = useRef(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef(null);
  
  // Toggle fullscreen function
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  
  // New exploration-specific states
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeExperienceType, setActiveExperienceType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Time formatting and player functions (keep from original component)
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle time updates from the video
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentVideoTime = videoRef.current.currentTime;
      const durationTime = videoRef.current.duration || 0;
      setCurrentTime(formatTime(currentVideoTime));
      setProgress((currentVideoTime / durationTime) * 100);
    }
  };
  
  // Handle seeking when clicking on progress bar
  const handleSeek = (e) => {
    if (!videoRef.current || !progressRef.current) return;
    
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * videoRef.current.duration;
    
    videoRef.current.currentTime = newTime;
  };

  // Toggle play/pause 
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch(error => {
              console.error("Error playing video:", error);
              setIsLoading(false);
              
              // Create a big play button as fallback
              const playerElement = document.querySelector('.video-player');
              if (playerElement) {
                // Remove any existing big play buttons first
                const existingButton = playerElement.querySelector('.big-play-button');
                if (existingButton) existingButton.remove();
                
                const bigPlayButton = document.createElement('button');
                bigPlayButton.className = 'big-play-button';
                bigPlayButton.innerHTML = '▶';
                bigPlayButton.onclick = () => {
                  videoRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(err => console.error("Failed on retry:", err));
                };
                playerElement.appendChild(bigPlayButton);
              }
            });
        }
      }
    } catch (err) {
      console.error("Error toggling play:", err);
      setIsLoading(false);
    }
  };

  // Keep other player functions from the original component
  // Volume control, seeking, playback speed, fullscreen toggle, etc.

  // Toggle favorites
  const toggleFavorite = (experienceId) => {
    setFavorites(prev => {
      if (prev.includes(experienceId)) {
        return prev.filter(id => id !== experienceId);
      }
      return [...prev, experienceId];
    });
  };

  // Open experience detail modal
  const openExperienceDetail = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
    
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== experience.id);
      return [experience, ...filtered].slice(0, 8); // Keep only 8 most recent
    });
  };

  // Experience Filter
  const filterExperiences = (experiences) => {
    return experiences.filter(experience => {
      // Filter by region
      if (activeRegion !== 'all' && experience.region !== activeRegion) {
        return false;
      }
      
      // Filter by experience type
      if (activeExperienceType !== 'all' && !experience.categories.includes(activeExperienceType)) {
        return false;
      }
      
      // Filter by favorites
      if (showFavoritesOnly && !favorites.includes(experience.id)) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !experience.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !experience.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  // Sample Ghana experiences data
  const ghanaExperiences = {
    cultural: [
      {
        id: 1,
        title: "Traditional Kente Weaving in Bonwire",
        description: "Learn about the intricate art of Kente cloth weaving in the village of Bonwire, the birthplace of this iconic Ghanaian textile.",
        videoUrl: "/media/experiences/kente-weaving.mp4",
        thumbnail: "/images/experiences/kente-weaving.jpg",
        duration: 480, // in seconds
        region: "Ashanti Region",
        location: { lat: 6.8430, lng: -1.5242 },
        categories: ["cultural", "crafts", "heritage"],
        bestTime: "Year-round",
        rating: 4.8,
        reviewCount: 124
      },
      {
        id: 2,
        title: "Elmina Castle Historical Tour",
        description: "Explore the dark history of the transatlantic slave trade at Elmina Castle, a UNESCO World Heritage site built in 1482.",
        videoUrl: "/media/experiences/elmina-castle.mp4",
        thumbnail: "/images/experiences/elmina-castle.jpg",
        duration: 720,
        region: "Central Region",
        location: { lat: 5.0848, lng: -1.3496 },
        categories: ["cultural", "historical", "heritage"],
        bestTime: "Oct-March",
        rating: 4.7,
        reviewCount: 256
      },
      {
        id: 3,
        title: "Akwasidae Festival Experience",
        description: "Witness the vibrant Akwasidae Festival, a sacred ceremony held by the Ashanti people to honor ancestors and the Golden Stool.",
        videoUrl: "/media/experiences/akwasidae.mp4",
        thumbnail: "/images/experiences/akwasidae.jpg",
        duration: 540,
        region: "Ashanti Region",
        location: { lat: 6.7080, lng: -1.6218 },
        categories: ["cultural", "festival", "heritage"],
        bestTime: "Festival dates vary (every 6 weeks)",
        rating: 4.9,
        reviewCount: 89
      }
    ],
    nature: [
      {
        id: 4,
        title: "Kakum National Park Canopy Walkway",
        description: "Walk among the treetops on the famous Kakum National Park canopy walkway, suspended 30 meters above the forest floor.",
        videoUrl: "/media/experiences/kakum.mp4",
        thumbnail: "/images/experiences/kakum.jpg",
        duration: 420,
        region: "Central Region",
        location: { lat: 5.3507, lng: -1.3809 },
        categories: ["nature", "adventure", "wildlife"],
        bestTime: "Nov-April",
        rating: 4.6,
        reviewCount: 312
      },
      {
        id: 5,
        title: "Wli Waterfalls Hike",
        description: "Trek through the Agumatsa Wildlife Sanctuary to reach Wli Waterfalls, the highest waterfall in West Africa.",
        videoUrl: "/media/experiences/wli-falls.mp4",
        thumbnail: "/images/experiences/wli-falls.jpg",
        duration: 360,
        region: "Volta Region",
        location: { lat: 7.1360, lng: 0.5947 },
        categories: ["nature", "adventure", "hiking"],
        bestTime: "April-October",
        rating: 4.7,
        reviewCount: 178
      },
      {
        id: 6,
        title: "Lake Volta Boat Safari",
        description: "Cruise on Lake Volta, the largest artificial lake in the world, exploring its islands and witnessing local fishing communities.",
        videoUrl: "/media/experiences/lake-volta.mp4",
        thumbnail: "/images/experiences/lake-volta.jpg",
        duration: 540,
        region: "Eastern Region",
        location: { lat: 6.3176, lng: 0.0845 },
        categories: ["nature", "water", "community"],
        bestTime: "Year-round",
        rating: 4.5,
        reviewCount: 142
      }
    ],
    culinary: [
      {
        id: 7,
        title: "Ghanaian Cuisine Cooking Class",
        description: "Learn to prepare traditional Ghanaian dishes like Jollof rice, Waakye, and Fufu with local chefs in Accra.",
        videoUrl: "/media/experiences/ghana-cooking.mp4",
        thumbnail: "/images/experiences/ghana-cooking.jpg",
        duration: 320,
        region: "Greater Accra",
        location: { lat: 5.6037, lng: -0.1870 },
        categories: ["culinary", "workshop", "cultural"],
        bestTime: "Year-round",
        rating: 4.9,
        reviewCount: 206
      },
      {
        id: 8,
        title: "Cocoa Farm Tour & Chocolate Making",
        description: "Visit a cocoa plantation to understand Ghana's chocolate industry, from bean to bar, with hands-on chocolate making.",
        videoUrl: "/media/experiences/cocoa-tour.mp4",
        thumbnail: "/images/experiences/cocoa-tour.jpg",
        duration: 480,
        region: "Western Region",
        location: { lat: 5.9370, lng: -2.1140 },
        categories: ["culinary", "agricultural", "workshop"],
        bestTime: "October-December",
        rating: 4.8,
        reviewCount: 124
      }
    ],
    adventure: [
      {
        id: 9,
        title: "Mole National Park Safari",
        description: "Embark on a walking or driving safari in Mole National Park, home to elephants, antelopes, and over 300 bird species.",
        videoUrl: "/media/experiences/mole-safari.mp4",
        thumbnail: "/images/experiences/mole-safari.jpg",
        duration: 720,
        region: "Northern Region",
        location: { lat: 9.2626, lng: -1.8559 },
        categories: ["adventure", "wildlife", "nature"],
        bestTime: "December-March",
        rating: 4.8,
        reviewCount: 287
      },
      {
        id: 10,
        title: "Surfing at Busua Beach",
        description: "Catch waves at Busua Beach, Ghana's premier surfing destination known for its consistent breaks and laid-back atmosphere.",
        videoUrl: "/media/experiences/busua-surfing.mp4",
        thumbnail: "/images/experiences/busua-surfing.jpg",
        duration: 380,
        region: "Western Region",
        location: { lat: 4.8084, lng: -1.9331 },
        categories: ["adventure", "beach", "water"],
        bestTime: "May-September",
        rating: 4.6,
        reviewCount: 143
      }
    ],
    wellness: [
      {
        id: 11,
        title: "Traditional Healing Retreat",
        description: "Experience traditional Ghanaian wellness practices including herbal medicine, spiritual healing, and meditation.",
        videoUrl: "/media/experiences/ghana-healing.mp4",
        thumbnail: "/images/experiences/ghana-healing.jpg",
        duration: 640,
        region: "Eastern Region",
        location: { lat: 6.6080, lng: -0.2577 },
        categories: ["wellness", "spiritual", "cultural"],
        bestTime: "Year-round",
        rating: 4.7,
        reviewCount: 92
      }
    ],
    featured: [
      {
        id: 12,
        title: "Cape Coast Cultural Immersion",
        description: "A comprehensive 3-day cultural immersion in Cape Coast, including castle visits, fishing village experiences, and traditional ceremonies.",
        videoUrl: "/media/experiences/cape-coast-immersion.mp4",
        thumbnail: "/images/experiences/cape-coast-immersion.jpg",
        duration: 820,
        region: "Central Region",
        location: { lat: 5.1053, lng: -1.2466 },
        categories: ["featured", "cultural", "heritage", "community"],
        bestTime: "Year-round",
        rating: 4.9,
        reviewCount: 178,
        isFeatured: true
      }
    ]
  };

  // Combine all experiences for filtering
  const allExperiences = [
    ...ghanaExperiences.cultural,
    ...ghanaExperiences.nature,
    ...ghanaExperiences.culinary,
    ...ghanaExperiences.adventure,
    ...ghanaExperiences.wellness,
    ...ghanaExperiences.featured
  ];

  // Get unique regions for filtering
  const regions = [...new Set(allExperiences.map(exp => exp.region))];
  
  // Get unique experience categories for filtering
  const experienceCategories = [...new Set(
    allExperiences.flatMap(exp => exp.categories)
  )].filter(cat => cat !== 'featured');

  // Filter experiences based on current filters
  const filteredExperiences = filterExperiences(allExperiences);
  
  // Get featured experiences
  const featuredExperiences = allExperiences.filter(exp => exp.categories.includes('featured'));

  return (
    <div className="ghana-media-library explore-ghana">
      <header className="explore-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Ghana</h1>
          <p className="hero-subtitle">Immerse yourself in the rich culture, breathtaking landscapes, and transformative experiences of the Gateway to Africa</p>
          <div className="hero-cta">
            <button className="hero-btn hero-btn-primary">
              Start Your Journey
            </button>
            <button className="hero-btn hero-btn-secondary">
              Watch Video Tour
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="scroll-text">Explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </header>

      <main className="media-content explore-content">
        {/* Featured Experience Video Player */}
        {featuredExperiences.length > 0 && (
          <div className="featured-experience">
            <h2 className="section-title">Featured Experience</h2>
            
            <div className="video-player-container">
              <div className="video-player">
                {isLoading && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Loading immersive experience...</span>
                  </div>
                )}
                
                <video
                  ref={videoRef}
                  className="main-video"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setDuration(formatTime(videoRef.current.duration));
                      setIsLoading(false);
                    }
                  }}
                  onCanPlay={() => setIsLoading(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  poster="/images/experiences/cape-coast-immersion.jpg"
                >
                  <source src={featuredExperiences[0].videoUrl} type="video/mp4" />
                  <p>Your browser doesn't support HTML5 video.</p>
                </video>

                {/* Custom video controls (keep from original) */}
                <div className={`custom-controls ${showControls ? 'visible' : ''}`}>
                  <div 
                    className="progress-bar" 
                    ref={progressRef}
                    onClick={handleSeek}
                  >
                    <div 
                      className="progress-filled"
                      style={{ width: `${progress}%` }}
                    ></div>
                    <div 
                      className="progress-handle"
                      style={{ left: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="controls-bottom">
                    <div className="left-controls">
                      <button className="play-pause-btn" onClick={togglePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      
                      <div className="time-display">
                        <span>{currentTime}</span>
                        <span> / </span>
                        <span>{duration}</span>
                      </div>
                    </div>
                    
                    <div className="featured-info">
                      <h3>{featuredExperiences[0].title}</h3>
                    </div>
                    
                    <div className="right-controls">
                      <button className="fullscreen-btn" onClick={toggleFullscreen}>
                        {isFullscreen ? <FaCompress /> : <FaExpand />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="featured-experience-info">
                <h3>{featuredExperiences[0].title}</h3>
                <div className="experience-meta">
                  <span className="region">
                    <FaMapMarkerAlt /> {featuredExperiences[0].region}
                  </span>
                  <span className="rating">
                    {'★'.repeat(Math.floor(featuredExperiences[0].rating))}
                    {featuredExperiences[0].rating % 1 >= 0.5 ? '½' : ''}
                    {'☆'.repeat(5 - Math.ceil(featuredExperiences[0].rating))}
                    <span className="review-count">({featuredExperiences[0].reviewCount})</span>
                  </span>
                  <span className="best-time">
                    <FaRegCalendarAlt /> Best time: {featuredExperiences[0].bestTime}
                  </span>
                </div>
                <p className="featured-description">{featuredExperiences[0].description}</p>
                <button 
                  className="explore-btn"
                  onClick={() => openExperienceDetail(featuredExperiences[0])}
                >
                  Explore This Experience
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experience Categories */}
        <section className="experience-categories">
          <h2 className="section-title">Experience Ghana</h2>
          <div className="category-buttons">
            <button 
              className={`category-btn ${activeExperienceType === 'cultural' ? 'active' : ''}`}
              onClick={() => setActiveExperienceType('cultural')}
            >
              <FaDrum />
              <span>Cultural</span>
            </button>
            <button 
              className={`category-btn ${activeExperienceType === 'nature' ? 'active' : ''}`}
              onClick={() => setActiveExperienceType('nature')}
            >
              <FaLeaf />
              <span>Nature</span>
            </button>
            <button 
              className={`category-btn ${activeExperienceType === 'culinary' ? 'active' : ''}`}
              onClick={() => setActiveExperienceType('culinary')}
            >
              <FaUtensils />
              <span>Culinary</span>
            </button>
            <button 
              className={`category-btn ${activeExperienceType === 'adventure' ? 'active' : ''}`}
              onClick={() => setActiveExperienceType('adventure')}
            >
              <FaUmbrellaBeach />
              <span>Adventure</span>
            </button>
            <button 
              className={`category-btn ${activeExperienceType === 'heritage' ? 'active' : ''}`}
              onClick={() => setActiveExperienceType('heritage')}
            >
              <FaLandmark />
              <span>Heritage</span>
            </button>
          </div>
        </section>

        {/* Cultural Timeline */}
        <section className="cultural-timeline">
          <h2 className="section-title">Ghana's Cultural Journey</h2>
          <div className="timeline-line"></div>
          
          <div className="timeline-event">
            <div className="timeline-content">
              <div className="timeline-date">Ancient Heritage</div>
              <h3 className="timeline-title">Kingdom of Ghana</h3>
              <p className="timeline-description">
                The ancient Kingdom of Ghana (not in the same location as modern Ghana) was known as the "Land of Gold" and was one of the great medieval trading empires of West Africa from the 6th to the 13th centuries.
              </p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="timeline-content">
              <div className="timeline-date">Colonial Period</div>
              <h3 className="timeline-title">The Gold Coast</h3>
              <p className="timeline-description">
                European powers, including the Portuguese, Dutch, and British, established trading posts along the coast, primarily for gold and later for the slave trade, giving the region its colonial name "Gold Coast."
              </p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="timeline-content">
              <div className="timeline-date">March 6, 1957</div>
              <h3 className="timeline-title">Independence</h3>
              <p className="timeline-description">
                Under the leadership of Dr. Kwame Nkrumah, Ghana became the first sub-Saharan African country to gain independence from colonial rule, inspiring independence movements across Africa.
              </p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="timeline-content">
              <div className="timeline-date">Contemporary Ghana</div>
              <h3 className="timeline-title">Cultural Renaissance</h3>
              <p className="timeline-description">
                Today's Ghana balances rich traditions with modern innovation, showcasing vibrant arts, music, fashion, and technology while maintaining deep connections to cultural heritage and traditional values.
              </p>
            </div>
          </div>
        </section>

        {/* Recently Viewed Experiences */}
        {recentlyViewed.length > 0 && (
          <section className="experience-section recently-viewed-section">
            <header className="section-header">
              <h2>Continue Exploring</h2>
            </header>
            
            <div className="experiences-grid">
              {recentlyViewed.map(experience => (
                <div 
                  key={`recent-${experience.id}`} 
                  className="experience-card"
                  onClick={() => openExperienceDetail(experience)}
                >
                  <div className="experience-thumbnail">
                    <img src={experience.thumbnail} alt={experience.title} loading="lazy" />
                    <div className="play-indicator">
                      <FaPlay />
                    </div>
                    <span className="duration">{formatTime(experience.duration)}</span>
                    <button 
                      className={`favorite-btn ${favorites.includes(experience.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(experience.id);
                      }}
                    >
                      {favorites.includes(experience.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                  <div className="experience-info">
                    <h3>{experience.title}</h3>
                    <div className="info-meta">
                      <span className="region">{experience.region}</span>
                      <span className="rating">{'★'.repeat(Math.floor(experience.rating))}</span>
                    </div>
                    <p className="experience-description">{experience.description.substring(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Experiences Grid */}
        <section className="experience-section all-experiences">
          <header className="section-header">
            <h2>{activeRegion === 'all' && activeExperienceType === 'all' 
                 ? 'All Experiences' 
                 : `${activeExperienceType !== 'all' ? activeExperienceType.charAt(0).toUpperCase() + activeExperienceType.slice(1) + ' ' : ''}Experiences${activeRegion !== 'all' ? ' in ' + activeRegion : ''}`}
            </h2>
            <p className="results-count">{filteredExperiences.length} experiences found</p>
          </header>
          
          {filteredExperiences.length > 0 ? (
            <div className="experiences-grid">
              {filteredExperiences.map(experience => (
                <div 
                  key={experience.id} 
                  className="experience-card"
                  onClick={() => openExperienceDetail(experience)}
                >
                  <div className="experience-thumbnail">
                    <img src={experience.thumbnail} alt={experience.title} loading="lazy" />
                    <div className="play-indicator">
                      <FaPlay />
                    </div>
                    <span className="duration">{formatTime(experience.duration)}</span>
                    <button 
                      className={`favorite-btn ${favorites.includes(experience.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(experience.id);
                      }}
                    >
                      {favorites.includes(experience.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <div className="categories-tags">
                      {experience.categories.map(category => (
                        category !== 'featured' && (
                          <span key={category} className="category-tag">
                            {category}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                  <div className="experience-info">
                    <h3>{experience.title}</h3>
                    <div className="info-meta">
                      <span className="region">
                        <FaMapMarkerAlt /> {experience.region}
                      </span>
                      <span className="rating">
                        {'★'.repeat(Math.floor(experience.rating))}
                        <span className="review-count">({experience.reviewCount})</span>
                      </span>
                    </div>
                    <p className="experience-description">{experience.description.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <svg viewBox="0 0 24 24">
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              <p>No experiences found matching your criteria</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setActiveRegion('all');
                  setActiveExperienceType('all');
                  setSearchTerm('');
                  setShowFavoritesOnly(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Region Explorer */}
        <section className="region-explorer">
          <header className="section-header">
            <h2>Explore Ghana by Region</h2>
          </header>
          
          <div className="regions-grid">
            {regions.map(region => {
              const regionExperiences = allExperiences.filter(exp => exp.region === region);
              const regionImage = regionExperiences[0]?.thumbnail || '/images/regions/default.jpg';
              
              return (
                <div 
                  key={region}
                  className="region-card"
                  onClick={() => setActiveRegion(region)}
                >
                  <div className="region-image">
                    <img src={regionImage} alt={region} loading="lazy" />
                    <div className="region-overlay">
                      <h3>{region}</h3>
                      <p>{regionExperiences.length} experiences</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Experience Detail Modal */}
      {isModalOpen && selectedExperience && (
        <div className="experience-modal">
          <div className="experience-modal-content">
            <button 
              className="close-modal-btn"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>
            
            <div className="modal-media">
              <video 
                controls
                poster={selectedExperience.thumbnail}
                className="modal-video"
              >
                <source src={selectedExperience.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="modal-info">
              <div className="modal-header">
                <h2>{selectedExperience.title}</h2>
                <button 
                  className={`modal-favorite-btn ${favorites.includes(selectedExperience.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(selectedExperience.id)}
                >
                  {favorites.includes(selectedExperience.id) ? 
                    <><FaHeart /> Saved to Favorites</> : 
                    <><FaRegHeart /> Add to Favorites</>
                  }
                </button>
              </div>
              
              <div className="modal-meta">
                <div className="meta-item">
                  <FaMapMarkerAlt />
                  <span>{selectedExperience.region}</span>
                </div>
                <div className="meta-item">
                  <FaRegCalendarAlt />
                  <span>Best time: {selectedExperience.bestTime}</span>
                </div>
                <div className="meta-item rating-display">
                  <span>{'★'.repeat(Math.floor(selectedExperience.rating))}</span>
                  <span className="rating-number">{selectedExperience.rating.toFixed(1)}</span>
                  <span className="review-count">({selectedExperience.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="modal-categories">
                {selectedExperience.categories.map(category => (
                  category !== 'featured' && (
                    <span key={category} className="modal-category-tag">
                      {category}
                    </span>
                  )
                ))}
              </div>
              
              <div className="modal-description">
                <h3>About this experience</h3>
                <p>{selectedExperience.description}</p>
                <p className="extended-description">
                  Immerse yourself in the rich tapestry of Ghanaian culture and natural beauty through this authentic experience. 
                  From meeting local communities to witnessing time-honored traditions, this journey offers a genuine connection 
                  to the heart and soul of Ghana. Guided by knowledgeable locals who share stories passed down through generations, 
                  you'll gain insights that most travelers miss.
                </p>
              </div>
              
              <div className="modal-location">
                <h3>Location</h3>
                <div className="map-placeholder">
                  <img 
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${selectedExperience.location.lat},${selectedExperience.location.lng}&zoom=10&size=600x300&maptype=roadmap&markers=color:red%7C${selectedExperience.location.lat},${selectedExperience.location.lng}&key=YOUR_API_KEY`} 
                    alt={`Map showing ${selectedExperience.title} location`}
                  />
                </div>
              </div>
              
              <div className="modal-related">
                <h3>Similar Experiences</h3>
                <div className="related-experiences">
                  {allExperiences
                    .filter(exp => 
                      exp.id !== selectedExperience.id && 
                      exp.categories.some(cat => selectedExperience.categories.includes(cat))
                    )
                    .slice(0, 3)
                    .map(exp => (
                      <div 
                        key={exp.id}
                        className="related-experience-card"
                        onClick={() => {
                          setSelectedExperience(exp);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <img src={exp.thumbnail} alt={exp.title} loading="lazy" />
                        <h4>{exp.title}</h4>
                        <span className="related-region">{exp.region}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="media-footer explore-footer">
        <div className="ghana-banner">
          <div className="banner-stripe red"></div>
          <div className="banner-stripe gold"></div>
          <div className="banner-stripe green"></div>
        </div>
        
        <div className="footer-content">
          <div className="footer-info">
            <h3>About Explore Ghana</h3>
            <p>
              Experience the beauty, culture, and spirit of Ghana through immersive virtual tours 
              and experiences. From the vibrant markets of Accra to the historic castles of Cape Coast, 
              from lush rainforests to sun-kissed beaches, discover why Ghana is truly the gateway to Africa.
            </p>
          </div>
          
          <div className="footer-quote">
            <blockquote>
              "Akwaaba" – Welcome to Ghana, where tradition meets modernity and every visitor becomes family.
            </blockquote>
          </div>
        </div>
        
        <p className="copyright">© 2025 Explore Ghana Virtual Experience. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExploreGhana;