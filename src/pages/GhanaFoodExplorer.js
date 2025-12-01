import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft, FaClock, FaUsers, FaUtensils, FaBookmark, FaStar, FaChevronRight } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './GhanaFoodExplorer.css';

const GhanaFoodExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const { foodId } = useParams();
  const navigate = useNavigate();

  // Ghana Food Data
  const ghanaFoodData = [
    {
      id: 'jollof-rice',
      name: 'Jollof Rice',
      region: 'National dish',
      category: 'main',
      image: '/image/jollofrice.svg',
      description: 'Ghana\'s iconic one-pot rice dish cooked in a spiced tomato sauce, often served at celebrations and gatherings.',
      prepTime: '15 mins',
      cookTime: '45 mins',
      servings: 6,
      difficulty: 'Medium',
      ingredients: [
        '3 cups long grain rice',
        '1/4 cup vegetable oil',
        '1 large onion, finely chopped',
        '2 tbsp tomato paste',
        '4 large tomatoes, blended',
        '2 red bell peppers, blended',
        '2-3 scotch bonnet peppers (adjust for spice level)',
        '3 cloves garlic, minced',
        '1 tbsp ginger, grated',
        '1 tsp curry powder',
        '1 tsp thyme',
        '2 bay leaves',
        '3 cups chicken or vegetable stock',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Wash rice thoroughly until water runs clear, then set aside to drain completely.',
        'Heat oil in a large pot and sauté onions until translucent.',
        'Add tomato paste and fry for 2-3 minutes until the raw smell disappears.',
        'Pour in the blended tomatoes, bell peppers, and scotch bonnets. Cook on medium heat for 10-15 minutes until reduced.',
        'Add garlic, ginger, curry powder, thyme, bay leaves, salt and pepper. Stir well.',
        'Add the washed rice, stirring to coat it evenly with the sauce.',
        'Pour in the stock, bring to a boil, then reduce heat to low.',
        'Cover pot with aluminum foil (to trap steam) then with the pot lid.',
        'Simmer for 25-30 minutes or until rice is cooked through.',
        'Fluff rice with a fork and serve hot with your choice of protein.'
      ],
      tips: 'For authentic Ghanaian jollof, use long grain rice and don\'t be afraid of spice. The bottom layer of slightly burnt rice (called "kanzo") is considered a delicacy.',
      nutritionalInfo: 'Rich in carbohydrates, vitamins A and C from the peppers and tomatoes.',
      videoUrl: 'https://www.youtube.com/embed/kQBMdxOq75I'
    },
    {
        id: 'waakye',
        name: 'Waakye',
        region: 'Northern Ghana',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'A popular Ghanaian street food of rice and beans cooked together with dried millet leaves, giving it a distinctive reddish-brown color.',
        prepTime: '30 mins (plus overnight soaking)',
        cookTime: '1 hour',
        servings: 8,
        difficulty: 'Medium',
        ingredients: [
          '2 cups rice',
          '1 cup black-eyed peas or red beans (soaked overnight)',
          '4-5 dried waakye leaves (or sorghum leaves)',
          '1 tbsp baking soda (optional)',
          'Salt to taste',
          'Water as needed'
        ],
        instructions: [
          'Soak beans overnight to reduce cooking time.',
          'Wash the waakye leaves and put them in a large pot with water.',
          'Add the soaked beans and baking soda, then bring to a boil.',
          'Cook beans until they begin to soften, about 30 minutes.',
          'Add rice and additional water if needed.',
          'Add salt to taste and stir gently.',
          'Cover and cook on low heat until both rice and beans are tender, about 25-30 minutes.',
          'Remove waakye leaves before serving.',
          'Serve with stew, spaghetti, fried plantains, garri, meat, or fish.'
        ],
        tips: 'Authentic waakye uses dried millet stalks or sorghum leaves to give the dish its signature color. If unavailable, a small amount of red food coloring can be substituted.',
        nutritionalInfo: 'High in protein from the beans and carbohydrates from the rice. A complete protein meal.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'banku',
        name: 'Banku',
        region: 'Southern Ghana',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'A fermented corn and cassava dough that\'s cooked into a smooth, stretchy paste-like consistency and eaten with soup or stew.',
        prepTime: '24 hours (fermentation)',
        cookTime: '30 mins',
        servings: 6,
        difficulty: 'Medium',
        ingredients: [
          '4 cups corn dough',
          '1 cup cassava dough',
          '1/2 tsp salt',
          'Water as needed'
        ],
        instructions: [
          'Mix corn dough and cassava dough together in a large bowl.',
          'Add salt and enough water to make a thick, smooth batter.',
          'Let the mixture ferment for 24 hours in a warm place.',
          'Pour the fermented mixture into a pot and cook over medium heat, stirring continuously with a wooden paddle.',
          'Stir vigorously to prevent lumps from forming.',
          'Continue stirring until the dough becomes thick and stretchy, about 25-30 minutes.',
          'Form into balls and serve hot with grilled tilapia, pepper sauce, or okra soup.'
        ],
        tips: 'The authentic preparation requires continuous stirring which builds arm strength! The longer the fermentation, the tangier the banku will taste.',
        nutritionalInfo: 'High in carbohydrates and provides sustained energy.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'fufu',
        name: 'Fufu',
        region: 'National dish',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'A staple food made by pounding boiled cassava and plantains into a smooth, dough-like consistency. Traditionally eaten with soup using fingers.',
        prepTime: '15 mins',
        cookTime: '25 mins',
        servings: 4,
        difficulty: 'Hard',
        ingredients: [
          '2 medium-sized plantains (semi-ripe)',
          '1 large cassava (yuca)',
          'Water for boiling',
          'Salt (optional)'
        ],
        instructions: [
          'Peel and cut cassava and plantains into chunks.',
          'Remove the woody core from the cassava.',
          'Boil the cassava and plantains in water until very soft, about 20-25 minutes.',
          'Drain well, keeping some of the hot water aside.',
          'Place cooked cassava and plantains in a mortar.',
          'Pound with a pestle, adding small amounts of the reserved hot water as needed.',
          'Continue pounding until smooth and elastic with no lumps.',
          'Form into a smooth ball and serve immediately with soup.'
        ],
        tips: 'Traditional fufu requires vigorous pounding, but you can use a food processor for a modern approach. Fufu should be smooth enough to swallow without chewing.',
        nutritionalInfo: 'High in carbohydrates from both cassava and plantains. Low in fat and protein.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'red-red',
        name: 'Red Red',
        region: 'Southern Ghana',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'A hearty bean stew cooked with red palm oil and served with fried plantains, giving the dish its name "red red".',
        prepTime: '30 mins (plus soaking time)',
        cookTime: '1 hour',
        servings: 6,
        difficulty: 'Easy',
        ingredients: [
          '2 cups black-eyed peas',
          '1/4 cup red palm oil',
          '2 onions, finely chopped',
          '3 tomatoes, blended',
          '2 tbsp tomato paste',
          '2-3 scotch bonnet peppers (adjust to taste)',
          '1 tbsp ginger, grated',
          '2 cloves garlic, minced',
          'Salt and pepper to taste',
          '4 ripe plantains for frying'
        ],
        instructions: [
          'Soak black-eyed peas overnight, then rinse well.',
          'Boil peas until tender, about 45 minutes, then drain.',
          'Heat palm oil in a large pot and sauté onions until translucent.',
          'Add ginger, garlic, and scotch bonnet peppers, cook for 2 minutes.',
          'Add tomato paste and cook for another 2-3 minutes.',
          'Pour in blended tomatoes, bring to a simmer and cook for 10 minutes.',
          'Add cooked beans and season with salt and pepper.',
          'Simmer for 15-20 minutes until the stew thickens.',
          'Meanwhile, peel and slice plantains diagonally.',
          'Fry plantains in oil until golden brown and serve alongside the bean stew.'
        ],
        tips: 'The dish gets its distinctive red color from palm oil, which is essential for authentic flavor. If preparing for children, reduce the amount of scotch bonnet peppers.',
        nutritionalInfo: 'High in protein from beans, with healthy fats from palm oil and carbohydrates from plantains.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'kelewele',
        name: 'Kelewele',
        region: 'National street food',
        category: 'snack',
        image: '/image/jollofrice.svg',
        description: 'Spicy fried plantain cubes, seasoned with ginger, cayenne pepper, and other spices. A popular street food and side dish.',
        prepTime: '30 mins',
        cookTime: '15 mins',
        servings: 4,
        difficulty: 'Easy',
        ingredients: [
          '4 ripe plantains',
          '2 tbsp ginger, grated',
          '1 tsp cayenne pepper',
          '1 tsp ground anise (or fennel)',
          '1 tsp salt',
          '1 onion, grated',
          '1/2 tsp ground nutmeg',
          'Vegetable oil for frying'
        ],
        instructions: [
          'Peel and cut plantains into small cubes (about 1 inch).',
          'Combine ginger, cayenne pepper, anise, salt, grated onion, and nutmeg in a bowl.',
          'Toss plantain cubes in the spice mixture, ensuring all pieces are well coated.',
          'Let the seasoned plantains marinate for 15-30 minutes.',
          'Heat oil in a deep pan to 350°F (175°C).',
          'Fry plantain cubes in batches until golden brown and crispy, about 3-4 minutes per batch.',
          'Remove with a slotted spoon and drain on paper towels.',
          'Serve hot as a snack or side dish.'
        ],
        tips: 'For best results, choose plantains that are ripe (yellow with black spots) but still firm. This gives the perfect balance of sweetness and texture.',
        nutritionalInfo: 'Rich in carbohydrates and potassium. The spices also offer various health benefits.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'groundnut-soup',
        name: 'Groundnut Soup',
        region: 'National dish',
        category: 'soup',
        image: '/image/jollofrice.svg',
        description: 'A rich, savory soup made from peanut butter or ground peanuts, often served with fufu, rice, or other staples.',
        prepTime: '20 mins',
        cookTime: '1 hour',
        servings: 6,
        difficulty: 'Medium',
        ingredients: [
          '1 cup natural peanut butter (unsweetened)',
          '1 lb meat (beef, chicken, or goat), cut into pieces',
          '1 large onion, chopped',
          '3 tomatoes, chopped',
          '2 scotch bonnet peppers (adjust to taste)',
          '2 tbsp tomato paste',
          '1 tbsp ginger, grated',
          '2 cloves garlic, minced',
          '6 cups meat or vegetable stock',
          'Salt and pepper to taste',
          'Fresh herbs like nkaakra (African basil) or utazi leaves (optional)'
        ],
        instructions: [
          'Season meat with salt and pepper, then sear in a hot pot until browned on all sides.',
          'Add onions, ginger, and garlic, sauté until fragrant.',
          'Stir in tomato paste and cook for 2 minutes.',
          'Add chopped tomatoes and scotch bonnet peppers, cook until tomatoes break down.',
          'Pour in stock and bring to a boil, then reduce heat and simmer for 30 minutes until meat is tender.',
          'In a separate bowl, dilute peanut butter with some of the hot soup liquid until smooth.',
          'Pour the peanut mixture into the pot gradually, stirring continuously to prevent lumps.',
          'Simmer for another 15-20 minutes, stirring occasionally until the soup thickens.',
          'Adjust seasoning to taste and add fresh herbs if using.',
          'Serve hot with fufu, rice, or other staples.'
        ],
        tips: 'For a smoother texture, blend the soup after adding the peanut butter. Add smoked fish or mushrooms for an umami flavor boost.',
        nutritionalInfo: 'High in protein from meat and peanuts, with healthy fats from peanut butter.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'kontomire-stew',
        name: 'Kontomire Stew',
        region: 'Southern Ghana',
        category: 'stew',
        image: '/image/jollofrice.svg',
        description: 'A nutritious stew made from cocoyam leaves (taro leaves), palm oil, and various proteins like fish, meat, or mushrooms.',
        prepTime: '30 mins',
        cookTime: '45 mins',
        servings: 6,
        difficulty: 'Medium',
        ingredients: [
          '2 bunches kontomire (cocoyam/taro leaves), washed and chopped',
          '1/4 cup palm oil',
          '1 large onion, chopped',
          '2 tomatoes, chopped',
          '1/4 cup ground agushi (melon seeds) or egusi',
          '2 cloves garlic, minced',
          '1 inch ginger, grated',
          '1 scotch bonnet pepper (adjust to taste)',
          '1 smoked fish, deboned and flaked',
          'Salt and bouillon cube to taste'
        ],
        instructions: [
          'Bring a large pot of water to boil and blanch kontomire leaves for 5 minutes.',
          'Drain and rinse under cold water, then squeeze out excess water.',
          'Blend or finely chop the blanched leaves.',
          'Heat palm oil in a pot until moderately hot.',
          'Add onions and sauté until translucent.',
          'Add ginger, garlic, and scotch bonnet pepper, cook for 2 minutes.',
          'Stir in chopped tomatoes and cook until soft.',
          'Add the blanched kontomire and mix well.',
          'Stir in ground agushi if using, mixing thoroughly.',
          'Add smoked fish, salt, and bouillon cube.',
          'Cover and simmer on low heat for 15-20 minutes, stirring occasionally.',
          'Serve hot with boiled yam, plantain, rice, or fufu.'
        ],
        tips: 'Kontomire leaves should be young and tender for the best flavor. When handling, wear gloves as the leaves can cause skin irritation for some people.',
        nutritionalInfo: 'Excellent source of iron, calcium, vitamin A, and protein. Palm oil adds vitamin E and antioxidants.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'tilapia-with-banku',
        name: 'Grilled Tilapia with Banku',
        region: 'Coastal Ghana',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'A signature coastal Ghanaian dish featuring grilled whole tilapia served with banku and hot pepper sauce.',
        prepTime: '20 mins',
        cookTime: '25 mins',
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
          '4 whole tilapia fish, cleaned and scored',
          '2 tbsp ginger, grated',
          '3 cloves garlic, minced',
          '1 onion, finely chopped',
          '2 tbsp vegetable oil',
          '1 tsp mixed dried herbs',
          'Salt and pepper to taste',
          'Lemon or lime wedges',
          'Fresh banku (see banku recipe)',
          'Hot pepper sauce (kpakpo shito)'
        ],
        instructions: [
          'Clean fish and make 3-4 diagonal cuts on each side.',
          'Mix ginger, garlic, onion, oil, herbs, salt, and pepper to make a marinade.',
          'Rub marinade all over fish, including inside cavity and cuts.',
          'Let fish marinate for at least 15 minutes, preferably 1-2 hours.',
          'Preheat grill to medium-high heat.',
          'Grill fish for 5-7 minutes per side until skin is crispy and flesh flakes easily.',
          'Alternatively, bake in a preheated oven at 400°F (200°C) for 20-25 minutes.',
          'Serve hot with banku and hot pepper sauce.',
          'Garnish with lemon or lime wedges.'
        ],
        tips: 'For authentic flavor, grill over charcoal. The cuts help the fish cook evenly and allow the marinade to penetrate deeper.',
        nutritionalInfo: 'High in protein and omega-3 fatty acids from tilapia. When served with banku, it makes a complete meal.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'tuo-zaafi',
        name: 'Tuo Zaafi',
        region: 'Northern Ghana',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'A thick, smooth porridge made from corn and cassava flour, popular in Northern Ghana. Typically served with ayoyo soup or okra soup.',
        prepTime: '15 mins',
        cookTime: '45 mins',
        servings: 6,
        difficulty: 'Medium',
        ingredients: [
          '2 cups corn flour',
          '1 cup cassava flour',
          'Water as needed',
          'For the soup:',
          '1/2 lb meat (beef or mutton), cut into pieces',
          '2 tbsp dawadawa (fermented seeds)',
          '1 bunch ayoyo leaves (jute leaves) or okra',
          '1 onion, chopped',
          '2 tomatoes, chopped',
          'Salt and pepper to taste'
        ],
        instructions: [
          'First prepare the soup: Boil meat with salt until tender.',
          'Add chopped onions, tomatoes, and dawadawa.',
          'Add chopped ayoyo leaves or okra and simmer for 10-15 minutes.',
          'Season with salt and pepper to taste.',
          'For the tuo zaafi: Mix corn flour with cold water to form a smooth paste.',
          'Bring 4 cups of water to boil in a large pot.',
          'Pour half of the corn flour mixture into the boiling water, stirring continuously.',
          'Cook for 10 minutes, then add cassava flour and remaining corn flour mixture.',
          'Stir vigorously to prevent lumps and cook until the mixture thickens and pulls away from the sides of the pot.',
          'Mold into balls and serve with the prepared soup.'
        ],
        tips: 'Tuo zaafi should be very smooth and free of lumps. Continuous stirring is key to achieving the right consistency.',
        nutritionalInfo: 'High in carbohydrates from corn and cassava flour. The soup adds protein and essential vitamins.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'okro-soup',
        name: 'Okro Soup',
        region: 'National dish',
        category: 'soup',
        image: '/image/jollofrice.svg',
        description: 'A slimy, nutritious soup made from okra, often mixed with palm oil and various seafood or meat. Popular with banku or fufu.',
        prepTime: '20 mins',
        cookTime: '40 mins',
        servings: 6,
        difficulty: 'Easy',
        ingredients: [
          '20 fresh okra pods, chopped',
          '1/4 cup palm oil',
          '1 lb assorted seafood (fish, crab, shrimp) or meat',
          '1 onion, chopped',
          '2 tomatoes, chopped',
          '1 tablespoon ginger, grated',
          '2 cloves garlic, minced',
          '1 scotch bonnet pepper (adjust to taste)',
          '1 tablespoon crayfish powder (optional)',
          'Salt and bouillon cube to taste'
        ],
        instructions: [
          'Heat palm oil in a large pot over medium heat.',
          'Add onions and sauté until translucent.',
          'Add ginger, garlic, and scotch bonnet pepper, cook for 2 minutes.',
          'Stir in chopped tomatoes and cook until soft.',
          'Add meat or seafood and cook until partially done.',
          'Add 4 cups of water or stock and bring to a boil.',
          'Add chopped okra and crayfish powder if using.',
          'Simmer for 10-15 minutes until okra is tender and soup is slimy.',
          'Season with salt and bouillon cube to taste.',
          'Serve hot with banku, fufu, or rice.'
        ],
        tips: 'The key to good okro soup is not overcooking the okra. For a less slimy texture, add a little lemon juice.',
        nutritionalInfo: 'Good source of vitamins A and C, iron, and calcium. Low in calories and high in fiber.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      },
      {
        id: 'kenkey',
        name: 'Kenkey',
        region: 'Coastal Ghana',
        category: 'main',
        image: '/image/jollofrice.svg',
        description: 'Fermented corn dough, wrapped in corn husks or banana leaves and steamed. Usually served with fried fish and hot pepper sauce.',
        prepTime: '3-4 days (fermentation)',
        cookTime: '3 hours',
        servings: 8,
        difficulty: 'Hard',
        ingredients: [
          '4 cups corn dough (fermented maize dough)',
          '1 tsp salt',
          'Corn husks or banana leaves for wrapping',
          'Water as needed'
        ],
        instructions: [
          'Divide the fermented corn dough into two equal parts.',
          'Take one part and mix with enough water to form a thick paste.',
          'Cook this mixture in a pot, stirring continuously until it forms a thick porridge (called "aflata").',
          'Mix the aflata with the remaining raw dough while it\'s still hot.',
          'Knead the mixture thoroughly until well combined.',
          'Divide the dough into portions and wrap each in corn husks or banana leaves.',
          'Place the wrapped kenkey in a large pot with water at the bottom.',
          'Steam for 2-3 hours, adding more water if necessary.',
          'Kenkey is ready when firm to the touch.',
          'Serve with fried fish, shito (hot pepper sauce), and fresh vegetables.'
        ],
        tips: 'The fermentation process gives kenkey its unique sour taste. The longer the fermentation, the more sour it becomes. Ga kenkey uses only corn husks, while Fante kenkey uses banana leaves and adds a bit of salt.',
        nutritionalInfo: 'High in carbohydrates and a good source of probiotics due to fermentation.',
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
      }
  
    // Other food data omitted for brevity
  ];

  // Adinkra Symbols
  const adinkraSymbols = [
    { name: "Sankofa", meaning: "Learn from the past", symbol: "🦜" },
    { name: "Gye Nyame", meaning: "Except God", symbol: "Ⓖ" },
    { name: "Dwennimmen", meaning: "Humility and strength", symbol: "🐏" },
    { name: "Akoma", meaning: "Patience and tolerance", symbol: "❤️" },
    { name: "Adinkrahene", meaning: "Leadership", symbol: "◎" }
  ];

  // Filter functions
  const filteredFoods = ghanaFoodData.filter(food => {
    const searchMatch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        food.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const categoryMatch = activeFilter === 'all' || food.category === activeFilter;
    
    return searchMatch && categoryMatch;
  });

  // Toggle favorite
  const toggleFavorite = (foodId) => {
    setFavorites(prev => 
      prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId]
    );
  };

  // Check if food is favorited
  const isFavorite = (foodId) => {
    return favorites.includes(foodId);
  };

  // Load food details if foodId is present in URL
  useEffect(() => {
    if (foodId) {
      const food = ghanaFoodData.find(f => f.id === foodId);
      if (food) {
        setSelectedFood(food);
      }
    }
  }, [foodId]);

  // Handle click on food card
  const handleFoodClick = (food) => {
    setSelectedFood(food);
    navigate(`/ghana-food/${food.id}`);
  };

  return (
    <div className="ghana-food-explorer">
      <nav className="food-nav">
        <div className="nav-container">
          <Link to="/ghana-basics" className="back-link">
            <FaArrowLeft /> Back to Ghana Basics
          </Link>
          <h1>
            <span className="icon">🍲</span> 
            Ghana Food Explorer
          </h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search foods or ingredients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {selectedFood ? (
        <div className="food-detail-page">
          <button 
            className="back-to-foods"
            onClick={() => {
              setSelectedFood(null);
              navigate('/ghana-food');
            }}
          >
            <FaArrowLeft /> Back to all foods
          </button>

          <div className="food-detail-header">
            <h1>{selectedFood.name}</h1>
            <p className="food-region">{selectedFood.region}</p>
          </div>

          <div className="food-detail-container">
            <div className="food-detail-image-container">
              <img 
                src={selectedFood.image} 
                alt={selectedFood.name} 
                className="food-detail-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x400?text=Ghana+Food";
                }}
              />
              <button 
                className="favorite-btn large"
                onClick={() => toggleFavorite(selectedFood.id)}
              >
                {isFavorite(selectedFood.id) ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>

            <div className="food-detail-content">
              <div className="food-meta">
                <div className="meta-item">
                  <FaClock />
                  <div>
                    <span className="meta-label">Prep Time</span>
                    <span className="meta-value">{selectedFood.prepTime}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <FaClock />
                  <div>
                    <span className="meta-label">Cook Time</span>
                    <span className="meta-value">{selectedFood.cookTime}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <FaUsers />
                  <div>
                    <span className="meta-label">Servings</span>
                    <span className="meta-value">{selectedFood.servings}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <FaUtensils />
                  <div>
                    <span className="meta-label">Difficulty</span>
                    <span className="meta-value">{selectedFood.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="food-description">
                <h2>About this dish</h2>
                <p>{selectedFood.description}</p>
              </div>

              <div className="food-ingredients">
                <h2>Ingredients</h2>
                <ul>
                  {selectedFood.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="food-instructions">
                <h2>Cooking Instructions</h2>
                <ol>
                  {selectedFood.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {selectedFood.tips && (
                <div className="food-tips">
                  <h2>Chef's Tips</h2>
                  <p>{selectedFood.tips}</p>
                </div>
              )}

              {selectedFood.nutritionalInfo && (
                <div className="food-nutrition">
                  <h2>Nutritional Information</h2>
                  <p>{selectedFood.nutritionalInfo}</p>
                </div>
              )}

              {selectedFood.videoUrl && (
                <div className="food-video">
                  <h2>Watch How to Prepare</h2>
                  <div className="video-container">
                    <iframe
                      src={selectedFood.videoUrl}
                      title={`How to prepare ${selectedFood.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="ghana-culture-notes">
                <h2>Cultural Significance</h2>
                <p>{selectedFood.name} is an important dish in Ghanaian culture, often served during {selectedFood.category === 'main' ? 'family gatherings and celebrations' : 'special occasions and as a popular street food'}.</p>
                
                <div className="adinkra-symbols">
                  <h3>Adinkra Symbols of Ghana</h3>
                  <div className="symbols-grid">
                    {adinkraSymbols.map((symbol, index) => (
                      <div key={index} className="symbol-item">
                        <div className="symbol">{symbol.symbol}</div>
                        <div className="symbol-info">
                          <strong>{symbol.name}</strong>
                          <span>{symbol.meaning}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="food-hero">
            <div className="food-hero-content">
              <h1>Discover Traditional Ghanaian Cuisine</h1>
              <p>Explore authentic recipes, ingredients, and cooking techniques from Ghana's rich culinary heritage</p>
              <div className="kente-border" style={{ marginTop: '2rem' }}></div>
            </div>
          </div>

          <div className="food-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Foods
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'main' ? 'active' : ''}`}
              onClick={() => setActiveFilter('main')}
            >
              Main Dishes
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'soup' ? 'active' : ''}`}
              onClick={() => setActiveFilter('soup')}
            >
              Soups
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'stew' ? 'active' : ''}`}
              onClick={() => setActiveFilter('stew')}
            >
              Stews
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'snack' ? 'active' : ''}`}
              onClick={() => setActiveFilter('snack')}
            >
              Snacks
            </button>
          </div>

          <div className="foods-container">
            {filteredFoods.length > 0 ? (
              <div className="food-grid">
                {filteredFoods.map(food => (
                  <div 
                    key={food.id} 
                    className="food-card"
                    onClick={() => handleFoodClick(food)}
                  >
                    <div className="food-card-image-container">
                      <img 
                        src={food.image} 
                        alt={food.name} 
                        className="food-card-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Ghana+Food";
                        }}
                      />
                      <button 
                        className="favorite-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(food.id);
                        }}
                      >
                        {isFavorite(food.id) ? <MdFavorite /> : <MdFavoriteBorder />}
                      </button>
                      <span className="category-tag">{food.category}</span>
                    </div>
                    <div className="food-card-content">
                      <h3>{food.name}</h3>
                      <p className="food-region">{food.region}</p>
                      <p className="food-card-description">{food.description.substring(0, 100)}...</p>
                      <div className="food-card-meta">
                        <span><FaClock /> {food.cookTime}</span>
                        <span><FaUtensils /> {food.difficulty}</span>
                      </div>
                      <div className="food-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(3 + Math.random() * 2) ? 'star-filled' : 'star-empty'} />
                          ))}
                        </div>
                        <span className="rating-count">{Math.floor(50 + Math.random() * 200)} ratings</span>
                      </div>
                      <div className="traditional-fact">
                        <FaChevronRight className="fact-icon" />
                        <span>Traditional {food.region} specialty</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h2>No foods found</h2>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GhanaFoodExplorer;