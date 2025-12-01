// App.js
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import styles first to ensure they load early
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/global.css'; // if you have this

// Always-loaded components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';

// Context Providers
import { SearchProvider } from './contexts/SearchContext';
import { MediaProvider } from './contexts/MediaContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Test component for API connectivity
const AuthTest = lazy(() => import('./components/AuthTest'));

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const Fashion = lazy(() => import('./pages/Fashion'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const GhanaMedia = lazy(() => import('./pages/GhanaMedia'));
const MediaPlayer = lazy(() => import('./components/MediaPlayer'));
const HomeKitchen = lazy(() => import('./pages/HomeKitchen'));
const Productlist = lazy(() => import('./pages/Productlist'));
const HealthHousehold = lazy(() => import('./pages/HearlthHousehold'));
const AboutUs = lazy(() => import('./components/About Us'));
const SupplierShowcase = lazy(() => import('./pages/SupplierShowcase'));
const ManufacturerDashboard = lazy(() => import('./pages/ManufacturerDashboard'));
const ManufacturerProfile = lazy(() => import('./pages/ManufacturerProfile'));
const ManufacturerProducts = lazy(() => import('./pages/ManufacturerProducts'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Contact = lazy(() => import('./pages/Contact'));
const BuyerShop = lazy(() => import('./pages/BuyerShop'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const BuyerOrders = lazy(() => import('./pages/BuyerOrders'));
const ManufacturerOrders = lazy(() => import('./pages/ManufacturerOrders'));
const ManufacturerRegistration = lazy(() => import('./pages/ManufacturerRegistration'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const BestSellers = lazy(() => import('./pages/BestSellers'));

const NewReleases = lazy(() => import('./pages/NewReleases'));
const AfricanMusicPage = lazy(() => import('./pages/AfricanMusic'));
const Books = lazy(() => import('./pages/Books'));
const Accessories = lazy(() => import('./pages/accessories'));
const Fruits = lazy(() => import('./pages/Fruits'));
const Vegetables = lazy(() => import('./pages/vegetables'));
const RegionProducts = lazy(() => import('./pages/RegionProducts'));
const AshantiProducts = lazy(() => import('./components/GhanaRegions/AshantiProducts'));
const GreaterAccraProducts = lazy(() => import('./components/GhanaRegions/GreaterAccraProducts'));
const CentralProducts = lazy(() => import('./components/GhanaRegions/CentralProducts'));
const EasternProducts = lazy(() => import('./components/GhanaRegions/EasternProducts'));
const VoltaProducts = lazy(() => import('./components/GhanaRegions/VoltaProducts'));
const WesternProducts = lazy(() => import('./components/GhanaRegions/WesternProducts'));
const BonoProducts = lazy(() => import('./components/GhanaRegions/BonoProducts'));
const GrainsCereals = lazy(() => import('./pages/GrainsCereals'));
const Tubers = lazy(() => import('./pages/Tubers'));
const NutsSeeds = lazy(() => import('./pages/NutsSeeds'));
const HerbsSpices = lazy(() => import('./pages/HerbsSpices'));
const WomenFashion = lazy(() => import('./pages/WomenFashion'));
const MenFashion = lazy(() => import('./pages/MenFashion'));
const BoysFashion = lazy(() => import('./pages/BoysFashion'));
const GirlsFashion = lazy(() => import('./pages/GirlsFashion'));
const Baby = lazy(() => import('./pages/Baby'));
const BeautyPersonalCare = lazy(() => import('./pages/BeautyPersonalCare'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const Watchlist = lazy(() => import('./components/Watchlist'));
const Memberships = lazy(() => import('./components/Memberships'));
const ContentDevices = lazy(() => import('./components/content-devices'));
const Orders = lazy(() => import('./components/Orders'));
const News = lazy(() => import('./components/News'));
const GhanaFoodExplorer = lazy(() => import('./pages/GhanaFoodExplorer'));
const Manufacturers = lazy(() => import('./pages/manufacturers'));
const BasicCodingPage = lazy(() => import('./components/coding/education/BasicCodingPage'));
const RatingStars = lazy(() => import('./components/RatingStars'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProcessedFoods = lazy(() => import('./pages/ProcessedFoods'));
const Beverages = lazy(() => import('./pages/Beverages'));
const Automotive = lazy(() => import('./pages/Automotive'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const LearnAboutGhana = lazy(() => import('./components/education/LearnAboutGhana'));
const Account = lazy(() => import('./components/account/Account'));
const BonoEastProducts = lazy(() => import('./components/GhanaRegions/BonoEastProducts'));
const AhafoProducts = lazy(() => import('./components/GhanaRegions/AhafoProducts'));
const NorthEastProducts = lazy(() => import('./components/GhanaRegions/NorthEastProducts'));
const SavannahProducts = lazy(() => import('./components/GhanaRegions/SavannahProducts'));
const SHOW24 = lazy(() => import('./pages/SHOW24'));
const CONNECT24 = lazy(() => import('./pages/CONNECT24'));
const UpperEastProducts = lazy(() => import('./components/GhanaRegions/UpperEastProducts'));
const UpperWestProducts = lazy(() => import('./components/GhanaRegions/UpperWestProducts'));
const OtiProducts = lazy(() => import('./components/GhanaRegions/OtiProducts'));
const WesternNorthProducts = lazy(() => import('./components/GhanaRegions/WesternNorthProducts'));
const NorthernProducts = lazy(() => import('./components/GhanaRegions/NorthernProducts'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <Loader />;
  }
  
  if (!currentUser) {
    // Redirect to login page and preserve the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <Loader />;
  }
  
  if (!isAdmin()) {
    // Redirect to login or unauthorized page
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      mirror: true
    });
  }, []);

  const handleAddToCart = (item) => {
    console.log('Item added to cart:', item);
  };

  return (
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <Router>
              <MediaProvider>
                <UserProvider>
                  <div className="App">
                    <TopBar />
                    <Navbar />
                    <Suspense fallback={<Loader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/fashion" element={<Fashion />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/fruits" element={<Fruits />} />
                        <Route path="/tubers" element={<Tubers />} />
                        <Route path="/admin" element={
                          <AdminRoute>
                            <AdminPanel />
                          </AdminRoute>
                        } />
                        
                        <Route path="/ghana-food" element={<GhanaFoodExplorer />} />
                        <Route path="/ghana-food/:foodId" element={<GhanaFoodExplorer />} /> 
                        <Route path="/baby" element={<Baby />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/ghana-media" element={<GhanaMedia />} />
                        <Route path="/media-player" element={<MediaPlayer />} />
                        <Route path="/MediaProvider" element={<MediaProvider />} />
                        <Route path="/media-player/:mediaType" element={<MediaPlayer />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/SHOW24" element={<SHOW24 />} />
                        <Route path="/CONNECT24" element={<CONNECT24 />} />
                        <Route path="/SupplierShowcase" element={<SupplierShowcase />} />
                        <Route path="/home-kitchen" element={<HomeKitchen />} />
                        <Route path="/home-kitchen/:subcategory" element={<HomeKitchen />} />
                        <Route path="/health-household" element={<HealthHousehold />} />
                        <Route path="/health-household/:subcategory" element={<HealthHousehold />} />
                        <Route path="/products/:id" element={<Productlist />} />
                        <Route path="/account" element={
                          <ProtectedRoute>
                            <Account />
                          </ProtectedRoute>
                        } />
                        <Route path="/Watchlist" element={<Watchlist />} />
                        <Route path="/music-library" element={<AfricanMusicPage />} />
                        <Route path="/content-devices" element={<ContentDevices />} />
                        <Route path="/buyer-shop" element={<BuyerShop />} />
                        <Route path="/recommendations" element={<Recommendations />} />
                        <Route path="/ManufacturerProducts" element={<ManufacturerProducts />} />
                        <Route path="/manufacturer-dashboard" element={<ManufacturerDashboard />} />
                        <Route path="/memberships" element={<Memberships />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/accessories" element={<Accessories />} />
                        <Route path="/women-fashion" element={<WomenFashion />} />
                        <Route path="/womens-fashion" element={<WomenFashion />} />
                        <Route path="/womens-fashion/:category" element={<WomenFashion />} />
                        <Route path="/womens-fashion/:category/:subcategory" element={<WomenFashion />} />
                        <Route path="/men-fashion" element={<MenFashion />} />
                        <Route path="/mens-fashion" element={<MenFashion />} />
                        <Route path="/mens-fashion/:subcategory" element={<MenFashion />} />
                        <Route path="/mens-fashion/:subcategory/:subitem" element={<MenFashion />} />
                        <Route path="/manufacturer/orders" element={<ManufacturerOrders />} />
                        <Route path="/buyer/orders" element={<BuyerOrders />} />  
                        <Route path="/boys-fashion" element={<BoysFashion />} />
                        <Route path="/boys-fashion/:subcategory" element={<BoysFashion />} />
                        <Route path="/boys-fashion/:subcategory/:subitem" element={<BoysFashion />} />
                        <Route path="/girls-fashion" element={<GirlsFashion />} />
                        <Route path="/beauty-personal-care" element={<BeautyPersonalCare />} />
                        <Route path="/beauty" element={<BeautyPersonalCare />} />
                        <Route path="/beauty/:category" element={<BeautyPersonalCare />} />
                        <Route path="/beauty/:category/:subcategory" element={<BeautyPersonalCare />} />
                        <Route path="/vegetables" element={<Vegetables />} />
                        <Route path="/grains-cereals" element={<GrainsCereals />} />
                        <Route path="/nuts-seeds" element={<NutsSeeds />} />
                        <Route path="/herbs-spices" element={<HerbsSpices />} />
                        <Route path="/rating-stars" element={<RatingStars />} />
                        <Route path="/GhanaRegion/ashanti" element={<AshantiProducts />} />
                        <Route path="/regions/:regionSlug/products" element={<RegionProducts />} />
                        <Route path="/manufacturers/:id/products" element={<ManufacturerProducts />} />
                        <Route path="/manufacturer/:id" element={<ManufacturerProfile />} />
                        <Route path="/manufacturer-registration" element={<ManufacturerRegistration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tracking" element={<OrderTracking />} />
                        <Route path="/bestsellers" element={<BestSellers />} />
                        <Route path="/new-releases" element={<NewReleases />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/Manufacturers" element={<Manufacturers />} />
                        <Route path="/basic-coding" element={<BasicCodingPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/processed-foods" element={<ProcessedFoods />} />
                        <Route path="/beverages" element={<Beverages />} />
                        <Route path="/automotive" element={<Automotive />} />
                        <Route path="/automotive/:category" element={<Automotive />} />
                        <Route path="/automotive/:category/:subcategory" element={<Automotive />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/learn" element={<LearnAboutGhana handleTakeQuiz={() => {}} />} />
                        <Route path="/regions/ashanti" element={<AshantiProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/greater-accra" element={<GreaterAccraProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/central" element={<CentralProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/eastern" element={<EasternProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/volta" element={<VoltaProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/western" element={<WesternProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/bono" element={<BonoProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/bono-east" element={<BonoEastProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/ahafo" element={<AhafoProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/north-east" element={<NorthEastProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/savannah" element={<SavannahProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/upper-east" element={<UpperEastProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/upper-west" element={<UpperWestProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/oti" element={<OtiProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/western-north" element={<WesternNorthProducts addToCart={handleAddToCart} />} />
                        <Route path="/regions/northern" element={<NorthernProducts addToCart={handleAddToCart} />} />
                        <Route path="/auth-test" element={<AuthTest />} />
                      </Routes>
                    </Suspense>
                    <Footer />
                  </div>
                </UserProvider>
              </MediaProvider>
            </Router>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;