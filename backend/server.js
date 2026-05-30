const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure data directory and files exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Initialize data files if they don't exist
const dataFiles = {
  'tours.json': [],
  'packages.json': [],
  'bookings.json': [],
  'hotel_requests.json': [],
  'flight_requests.json': [],
  'cab_requests.json': [],
  'testimonials.json': [],
  'admin.json': [{ id: '1', username: 'admin', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', email: 'admin@wanderlust.com', name: 'Admin User' }],
  'settings.json': { siteName: 'WanderLust Travels', phone: '+91-9876543210', email: 'info@wanderlust.com', address: 'Mathura, Uttar Pradesh, India', whatsapp: '+91-9876543210' }
};

Object.entries(dataFiles).forEach(([file, defaultData]) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
});

// Seed sample data
const toursPath = path.join(dataDir, 'tours.json');
const tours = JSON.parse(fs.readFileSync(toursPath));
if (tours.length === 0) {
  const sampleTours = [
    { id: '1', title: 'Golden Triangle Tour', destination: 'Delhi - Agra - Jaipur', duration: '6 Days / 5 Nights', price: 15999, originalPrice: 20000, category: 'Cultural', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600', description: 'Explore the iconic Golden Triangle covering Delhi, Agra with the majestic Taj Mahal, and the Pink City of Jaipur.', highlights: ['Taj Mahal Visit', 'Amber Fort', 'India Gate', 'Hawa Mahal'], included: ['Hotel Stay', 'Breakfast', 'AC Transport', 'Guide'], excluded: ['Flights', 'Lunch/Dinner', 'Personal Expenses'], maxGroup: 20, rating: 4.8, reviews: 124, featured: true, active: true, createdAt: new Date().toISOString() },
    { id: '2', title: 'Kerala Backwaters Bliss', destination: 'Kochi - Alleppey - Munnar', duration: '7 Days / 6 Nights', price: 22999, originalPrice: 28000, category: 'Nature', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600', description: 'Cruise through serene backwaters, explore lush tea gardens, and experience the God\'s Own Country.', highlights: ['Houseboat Stay', 'Tea Gardens', 'Spice Plantation', 'Kathakali Show'], included: ['Houseboat', 'All Meals', 'Transport', 'Sightseeing'], excluded: ['Flights', 'Personal Expenses'], maxGroup: 15, rating: 4.9, reviews: 98, featured: true, active: true, createdAt: new Date().toISOString() },
    { id: '3', title: 'Rajasthan Desert Safari', destination: 'Jaipur - Jodhpur - Jaisalmer', duration: '8 Days / 7 Nights', price: 18999, originalPrice: 24000, category: 'Adventure', image: 'https://images.unsplash.com/photo-1477587458883-47145ed68bcd?w=600', description: 'Ride camels through golden dunes, stay in luxury desert camps, and explore medieval forts.', highlights: ['Camel Safari', 'Desert Camp', 'Fort Mehrangarh', 'Sam Sand Dunes'], included: ['Heritage Hotels', 'Breakfast & Dinner', 'Camel Ride', 'Transport'], excluded: ['Flights', 'Lunch'], maxGroup: 18, rating: 4.7, reviews: 156, featured: true, active: true, createdAt: new Date().toISOString() },
    { id: '4', title: 'Goa Beach Holiday', destination: 'North & South Goa', duration: '5 Days / 4 Nights', price: 12999, originalPrice: 16000, category: 'Beach', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600', description: 'Sun, sand, and sea! Enjoy Goa\'s vibrant beaches, Portuguese heritage, and nightlife.', highlights: ['Beach Hopping', 'Water Sports', 'Old Goa Churches', 'Spice Farm'], included: ['Beach Resort', 'Breakfast', 'Airport Transfer', 'Sightseeing'], excluded: ['Flights', 'Water Sports Fees'], maxGroup: 25, rating: 4.6, reviews: 203, featured: false, active: true, createdAt: new Date().toISOString() },
    { id: '5', title: 'Himalayan Adventure Trek', destination: 'Manali - Spiti - Leh', duration: '10 Days / 9 Nights', price: 28999, originalPrice: 35000, category: 'Adventure', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', description: 'Conquer high-altitude passes, explore ancient monasteries, and witness breathtaking Himalayan vistas.', highlights: ['Rohtang Pass', 'Key Monastery', 'Pangong Lake', 'Magnetic Hill'], included: ['Camping & Hotels', 'All Meals', '4x4 Vehicles', 'Permits'], excluded: ['Flights to Manali', 'Personal Gear'], maxGroup: 12, rating: 4.9, reviews: 67, featured: true, active: true, createdAt: new Date().toISOString() },
    { id: '6', title: 'Varanasi Spiritual Journey', destination: 'Varanasi - Sarnath - Prayagraj', duration: '4 Days / 3 Nights', price: 9999, originalPrice: 13000, category: 'Spiritual', image: 'https://images.unsplash.com/photo-1561361058-c24e91745713?w=600', description: 'Experience the spiritual heart of India – Ganga Aarti, ancient ghats, and timeless traditions.', highlights: ['Ganga Aarti', 'Boat Ride at Dawn', 'Sarnath Buddhist Site', 'Temple Tour'], included: ['Heritage Hotel', 'Breakfast', 'Boat Ride', 'Guide'], excluded: ['Flights', 'Lunch/Dinner'], maxGroup: 20, rating: 4.8, reviews: 89, featured: false, active: true, createdAt: new Date().toISOString() }
  ];
  fs.writeFileSync(toursPath, JSON.stringify(sampleTours, null, 2));
}

const packagesPath = path.join(dataDir, 'packages.json');
const packages = JSON.parse(fs.readFileSync(packagesPath));
if (packages.length === 0) {
  const samplePackages = [
    { id: '1', title: 'Honeymoon Special', subtitle: 'Romance Redefined', price: 45999, duration: '7 Nights', destinations: ['Maldives', 'Bali'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', description: 'A dreamy honeymoon escape to paradise islands with luxury stays, candlelit dinners, and unforgettable sunsets.', features: ['Luxury Beach Villa', 'Candlelit Dinner', 'Couple Spa', 'Private Beach', 'Airport Transfers', 'Daily Breakfast'], badge: 'Most Popular', active: true, createdAt: new Date().toISOString() },
    { id: '2', title: 'Family Funtime', subtitle: 'Memories for Life', price: 32999, duration: '6 Nights', destinations: ['Singapore', 'Malaysia'], image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600', description: 'Perfect family vacation with theme parks, cultural experiences, and comfortable stays for all ages.', features: ['Universal Studios', 'Legoland', 'Cable Car', 'City Tour', '4-Star Hotels', 'All Transfers'], badge: 'Family Pick', active: true, createdAt: new Date().toISOString() },
    { id: '3', title: 'Adventure Seeker', subtitle: 'Thrill Beyond Limits', price: 38999, duration: '8 Nights', destinations: ['Nepal', 'Bhutan'], image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', description: 'Trek through the Himalayas, explore Tiger\'s Nest Monastery, and discover the last Shangri-La.', features: ['Everest Base Camp View', 'Tiger\'s Nest Trek', 'White Water Rafting', 'Paragliding', 'Camping', 'Permits'], badge: 'Thrill Pick', active: true, createdAt: new Date().toISOString() }
  ];
  fs.writeFileSync(packagesPath, JSON.stringify(samplePackages, null, 2));
}

const testimonialsPath = path.join(dataDir, 'testimonials.json');
const testimonials = JSON.parse(fs.readFileSync(testimonialsPath));
if (testimonials.length === 0) {
  const sampleTestimonials = [
    { id: '1', name: 'Priya Sharma', location: 'Mumbai', tour: 'Kerala Backwaters Bliss', rating: 5, comment: 'Absolutely magical experience! The houseboat stay was a dream come true. WanderLust team took care of every detail. Will definitely book again!', avatar: 'PS', active: true, createdAt: new Date().toISOString() },
    { id: '2', name: 'Rahul Gupta', location: 'Delhi', tour: 'Rajasthan Desert Safari', rating: 5, comment: 'Best trip of my life! Camel safari under the stars and the heritage hotel stay was beyond expectations. Highly recommend WanderLust!', avatar: 'RG', active: true, createdAt: new Date().toISOString() },
    { id: '3', name: 'Anita & Vikram', location: 'Bangalore', tour: 'Honeymoon Special', rating: 5, comment: 'Our honeymoon was absolutely perfect. Every moment was beautifully planned. Thank you WanderLust for making our trip so memorable!', avatar: 'AV', active: true, createdAt: new Date().toISOString() }
  ];
  fs.writeFileSync(testimonialsPath, JSON.stringify(sampleTestimonials, null, 2));
}

// Routes
app.use('/api/tours', require('./routes/tours'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/hotel-requests', require('./routes/hotelRequests'));
app.use('/api/flight-requests', require('./routes/flightRequests'));
app.use('/api/cab-requests', require('./routes/cabRequests'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'WanderLust API is running' }));

app.listen(PORT, () => {
  console.log(`\n🌍 WanderLust Travel API running on http://localhost:${PORT}`);
  console.log(`📊 Admin credentials: username=admin, password=password\n`);
});
