// Adinkra symbols and their meanings
export const adinkraSymbols = {
  'adinkrahene': { symbol: '◉', meaning: 'Chief of Adinkra symbols - greatness, charisma, leadership' },
  'gye-nyame': { symbol: '☻', meaning: 'Except for God - supremacy of God' },
  'sankofa': { symbol: '♋', meaning: 'Return and get it - learn from the past' },
  'akoma': { symbol: '♥', meaning: 'The heart - patience and tolerance' },
  'dwennimmen': { symbol: '♈', meaning: 'Ram\'s horns - humility and strength' },
  'nkonsonkonson': { symbol: '⛓', meaning: 'Chain link - unity and human relations' },
  'nyame-nti': { symbol: '☰', meaning: 'By God\'s grace - faith and trust in God' },
  'mmere-dane': { symbol: '🕰', meaning: 'Time changes - life transformation' },
  'aya': { symbol: '✴', meaning: 'Fern - endurance and resourcefulness' }
};

// Ghanaian languages for translation
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'tw', name: 'Twi' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ew', name: 'Ewe' },
  { code: 'ga', name: 'Ga' },
];

// Translations for UI elements
export const translations = {
  en: {
    sizeGuide: "Size Guide",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    viewDetails: "View Details",
    shopByCategory: "Shop by Category",
    featuredCollections: "Featured Collections",
    recentlyViewed: "Recently Viewed",
    sustainability: "Sustainability",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    share: "Share",
    filterBy: "Filter By",
    sortBy: "Sort By",
    clearFilters: "Clear Filters",
    searchPlaceholder: "Search boys' fashion..."
  },
  tw: {
    sizeGuide: "Susuananmu Hwɛ",
    addToCart: "Fa ka wo bɔ mu",
    outOfStock: "Ebi nni hɔ",
    viewDetails: "Hwɛ mu yie",
    shopByCategory: "Di dwuma sɛ kwan",
    featuredCollections: "Ahorow a wɔayi",
    recentlyViewed: "Nea wohwɛɛ no akyire yi",
    sustainability: "Daapem nhyehyɛe",
    addToFavorites: "Fa ka wo dɔ nneɛma ho",
    removeFromFavorites: "Yi firi wo dɔ nneɛma mu",
    share: "Kyɛ",
    filterBy: "Hwehwɛ sɛ",
    sortBy: "Hyehyɛ sɛ",
    clearFilters: "Yi nhwehwɛmu nyinaa",
    searchPlaceholder: "Hwehwɛ mmarimaa ntade..."
  }
};

// Categories for boys' fashion
export const categories = [
  { 
    name: 'Traditional Wear', 
    link: 'traditional-wear',
    description: 'Authentic Ghanaian traditional garments for boys',
    shortDescription: 'Classic Ghanaian designs for cultural occasions',
    image: '/images/boys-fashion/traditional-boys.jpg',
    subcats: ['Kente Cloth', 'Smocks (Batakari)', 'Fugu Outfits', 'Traditional Caps'],
    regions: ['Ashanti Region', 'Northern Region', 'Volta Region'],
    symbol: adinkraSymbols.adinkrahene.symbol,
    symbolMeaning: adinkraSymbols.adinkrahene.meaning,
    culturalContext: 'Traditional boys\' wear in Ghana represents heritage and cultural identity.'
  },
  { 
    name: 'Modern African Prints', 
    link: 'african-prints',
    description: 'Contemporary clothing featuring Ghanaian prints and patterns',
    shortDescription: 'Modern styles with traditional patterns',
    image: '/images/boys-fashion/african-print-boys.jpg',
    subcats: ['Ankara Shirts', 'Print Outfits', 'School Uniforms', 'Casual Wear'],
    regions: ['Greater Accra', 'Eastern Region'],
    symbol: adinkraSymbols.sankofa.symbol,
    symbolMeaning: adinkraSymbols.sankofa.meaning,
    culturalContext: 'Modern African print clothing blends traditional patterns with contemporary styles.'
  },
  { 
    name: 'School Uniforms', 
    link: 'school-uniforms',
    description: 'Quality school uniforms made in Ghana for primary and JHS students',
    shortDescription: 'Durable and comfortable school wear',
    image: '/images/boys-fashion/ghana-school-uniform-boys.jpg',
    subcats: ['Primary Uniforms', 'JHS Uniforms', 'House Wear', 'School Sportswear'],
    regions: ['Greater Accra', 'Central Region'],
    symbol: adinkraSymbols['gye-nyame'].symbol,
    symbolMeaning: adinkraSymbols['gye-nyame'].meaning,
    culturalContext: 'Education is highly valued in Ghanaian society.'
  },
  { 
    name: 'Footwear', 
    link: 'footwear',
    description: 'Traditional and modern shoes handcrafted by Ghanaian artisans',
    shortDescription: 'Handcrafted shoes with cultural elements',
    image: '/images/boys-fashion/ghana-boys-shoes.jpg',
    subcats: ['Traditional Sandals', 'School Shoes', 'Casual Shoes', 'Sports Footwear'],
    regions: ['Ashanti Region', 'Northern Region'],
    symbol: adinkraSymbols.dwennimmen.symbol,
    symbolMeaning: adinkraSymbols.dwennimmen.meaning,
    culturalContext: 'Handcrafted footwear combines tradition with modern comfort.'
  }
];

// Details about Ghana's regions
export const regionDetails = [
  {
    name: 'Ashanti Region',
    capital: 'Kumasi',
    description: 'Home to the Ashanti kingdom and famous for kente cloth weaving',
    knownFor: ['Kente cloth', 'Wood carving', 'Gold jewelry'],
    mapImage: '/images/maps/ashanti-region.jpg'
  },
  {
    name: 'Northern Region',
    capital: 'Tamale',
    description: 'Known for smock weaving (batakari) and leather work',
    knownFor: ['Smock weaving', 'Leather crafts', 'Traditional sandals'],
    mapImage: '/images/maps/northern-region.jpg'
  },
  {
    name: 'Greater Accra',
    capital: 'Accra',
    description: 'The capital region with diverse crafts and modern Ghanaian fashion',
    knownFor: ['Contemporary fashion', 'Beadwork', 'Urban designs'],
    mapImage: '/images/maps/greater-accra.jpg'
  },
  {
    name: 'Eastern Region',
    capital: 'Koforidua',
    description: 'Known for beadwork and traditional crafts',
    knownFor: ['Bead making', 'Kente variants', 'Glass recycling crafts'],
    mapImage: '/images/maps/eastern-region.jpg'
  }
];

// Cultural stories about Ghanaian fashion
export const culturalStories = [
  {
    id: 'story-kente',
    title: 'The Story of Kente Cloth',
    summary: 'The royal cloth of the Ashanti people and its significance in boys\' clothing',
    content: `Kente cloth originated with the Ashanti people of Ghana. According to legend, two 
              friends learned the art of weaving by observing a spider spinning its web. Originally 
              worn by royalty and for ceremonial occasions, different patterns have specific meanings. 
              For boys, kente represents connection to heritage and is often worn for special occasions 
              like festivals, naming ceremonies, and cultural celebrations.`,
    image: '/images/stories/kente-story.jpg'
  },
  {
    id: 'story-batakari',
    title: 'The Northern Smock (Batakari)',
    summary: 'The traditional smock from Northern Ghana and its cultural significance',
    content: `The batakari or smock is a traditional garment worn by various ethnic groups in Northern 
              Ghana. Made from hand-loomed strips of cotton sewn together, with embroidered designs at 
              the neck and chest. For boys in the northern regions, smocks are everyday wear but also 
              have special significance during festivals and rites of passage. The patterns and designs 
              often tell stories about family history and cultural values.`,
    image: '/images/stories/smock-story.jpg'
  },
  {
    id: 'story-adinkra',
    title: 'Adinkra Symbols in Boys\' Clothing',
    summary: 'The meaning behind the symbols found in modern Ghanaian children\'s fashion',
    content: `Adinkra symbols originated from the Gyaman people and were brought to Ghana in the 19th century. 
              Each symbol represents a specific concept or value important in Ghanaian culture. For boys' clothing, 
              symbols are carefully selected for their meanings—for example, "Sankofa" encourages learning from 
              the past, while "Gye Nyame" represents the supremacy of God. These symbols appear on modern clothing, 
              accessories, and school items, helping young boys connect with cultural values through everyday fashion.`,
    image: '/images/stories/adinkra-symbols.jpg'
  }
];

// Carousel items
export const carouselItems = [
  {
    id: 'carousel-1',
    title: 'Ghana Independence Day Collection',
    description: 'Special edition boys\' wear celebrating Ghana\'s freedom',
    image: '/images/boys-fashion/independence-carousel.jpg',
    cta: 'Shop the Collection',
    link: '/boys-fashion/special/independence-day',
    fact: 'Ghana became the first sub-Saharan African nation to gain independence in 1957'
  },
  {
    id: 'carousel-2',
    title: 'Back to School - Ghana Style',
    description: 'Premium quality school uniforms made by local craftspeople',
    image: '/images/boys-fashion/school-carousel.jpg', 
    cta: 'Get Ready for School',
    link: '/boys-fashion/school-uniforms',
    fact: 'Education is highly valued in Ghana, with unique school uniforms for each institution'
  },
  {
    id: 'carousel-3',
    title: 'Traditional Kente for Boys',
    description: 'Authentic handwoven kente cloth outfits',
    image: '/images/boys-fashion/kente-carousel.jpg',
    cta: 'Explore Kente Collection',
    link: '/boys-fashion/traditional-wear/kente-cloth',
    fact: 'Each kente pattern has a name and meaning, with some reserved for specific occasions'
  }
];

// Featured collections
export const featuredCollections = [
  {
    id: "collection1",
    title: "Ghana Independence Collection",
    description: "Celebrate Ghana's heritage with our patriotic designs",
    coverImage: "/images/collections/ghana-independence.jpg",
    link: "/collections/ghana-independence",
    products: ["product123", "product456", "product789"],
    color: "#f5d6ba"
  },
  {
    id: "collection2",
    title: "Ashanti Heritage",
    description: "Special occasion outfits inspired by Ashanti traditions",
    coverImage: "/images/collections/ashanti-heritage.jpg",
    link: "/collections/ashanti-heritage",
    products: ["product234", "product567", "product890"],
    color: "#c9a87a"
  },
  {
    id: "collection3",
    title: "Coastal Cool",
    description: "Breezy, comfortable styles inspired by Ghana's coast",
    coverImage: "/images/collections/coastal-cool.jpg",
    link: "/collections/coastal-cool",
    products: ["product345", "product678", "product901"],
    color: "#a8d5e2"
  }
];

// Products data
export const products = [
  {
    id: "product1",
    name: "Boys' Traditional Kente Outfit",
    price: 120.00,
    rating: 4.8,
    reviews: 24,
    image: "/images/products/boys-kente-outfit.jpg",
    category: "traditional-wear",
    subcategory: "kente-cloth",
    description: "Authentic handwoven kente cloth outfit for special occasions",
    longDescription: "This boys' kente outfit is crafted by master weavers in the Ashanti Region using traditional techniques. The vibrant colors and patterns represent wisdom, royalty, and cultural heritage, making it perfect for festivals, naming ceremonies, and other special occasions.",
    artisan: "Made by the Bonwire Kente Weavers Association",
    artisanStory: "The Bonwire Kente Weavers Association preserves the centuries-old tradition of kente weaving in Ghana. Each weaver undergoes years of apprenticeship to master this intricate craft that produces Ghana's most recognizable textile.",
    material: "100% handwoven cotton threads",
    isNew: false,
    region: "Ashanti Region",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    inStock: true,
    discountPercent: 0,
    popularityScore: 95,
    sustainabilityCertified: true,
    sustainabilityInfo: "Supports traditional artisans and preserves cultural heritage crafts",
    careInstructions: "Dry clean only. Store carefully to preserve the handwoven fabric.",
    adinkraSymbols: ["adinkrahene", "gye-nyame"]
  },
  {
    id: "product2",
    name: "Boys' Modern Ankara Shirt",
    price: 45.00,
    rating: 4.6,
    reviews: 18,
    image: "/images/products/boys-ankara-shirt.jpg",
    category: "african-prints",
    subcategory: "ankara-shirts",
    description: "Contemporary shirt featuring vibrant Ghanaian prints",
    longDescription: "This comfortable cotton shirt combines modern style with traditional Ghanaian prints. Perfect for casual wear while celebrating cultural heritage, it's designed in Accra and sewn by skilled local tailors using authentic African wax print fabric.",
    artisan: "Made by Accra Design Collective",
    artisanStory: "The Accra Design Collective brings together young Ghanaian fashion designers creating contemporary pieces that honor traditional elements while embracing modern aesthetics.",
    material: "100% cotton with authentic wax print",
    isNew: true,
    region: "Greater Accra",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    inStock: true,
    discountPercent: 10,
    popularityScore: 88,
    sustainabilityCertified: true,
    sustainabilityInfo: "Made with sustainable practices and eco-friendly dyes",
    careInstructions: "Machine wash cold, inside out. Do not bleach. Iron on reverse.",
    adinkraSymbols: ["sankofa", "nkonsonkonson"]
  },
  {
    id: "product3",
    name: "Boys' Northern Fugu Set",
    price: 85.00,
    // Just before the duplicate properties:
    // eslint-disable-next-line no-dupe-keys
    rating: 4.9,
    // eslint-disable-next-line no-dupe-keys
    reviews: 18,
    category: "traditional-wear",
    subcategory: "smocks-batakari",
    description: "Traditional northern Ghana smock (batakari) for boys",
    longDescription: "Handwoven by craftsmen in Northern Ghana, this fugu (smock) set includes a top and matching trousers. The distinctive strip weaving and embroidery are characteristic of northern Ghanaian traditional craftsmanship. This outfit is perfect for cultural events and festivals.",
    artisan: "Made by Tamale Master Weavers",
    artisanStory: "The Tamale Master Weavers have been creating traditional smocks for generations, passing down the techniques of strip weaving and hand embroidery that make northern Ghana's traditional attire unique.",
    material: "Hand-loomed cotton with traditional embroidery",
    images: [
      "/images/products/boys-fugu-set-1.jpg",
      "/images/products/boys-fugu-set-2.jpg",
      "/images/products/boys-fugu-set-3.jpg"
    ],
    sustainabilityCertified: true,
    inStock: true,
    isNew: true,
    popularityScore: 92
  }
];