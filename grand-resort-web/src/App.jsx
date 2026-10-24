import { useState } from 'react';
import axios from 'axios';
import { Wifi, Coffee, Car, Star, CheckCircle2, MapPin, Image as ImageIcon, X ,Calendar} from 'lucide-react';
import myCustomIcon from './assets/grand.png';



const API = import.meta.env.VITE_API_BASE_URL || 'https://grand-resorts-api.onrender.com/api';

const roomImages = {
  'Normal': [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1771775529138-a7a20ba7e032?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1777180249046-abf7d640e0d9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  'Deluxe': [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  ],
  'Super Luxury': [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1721989519334-40923a0ee1c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]
};

export default function App() {
  const [form, setForm] = useState({
    guestName: '', phone: '', email: '', roomType: 'Normal', checkInDate: '', checkOutDate: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [gallery, setGallery] = useState(null);
  const [errors, setErrors] = useState({ phone: '', email: '' });

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, phone: val });
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (val && !phoneRegex.test(val)) {
      setErrors(prev => ({ ...prev, phone: 'Must be a valid 10-15 digit number' }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, email: val });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !emailRegex.test(val)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.phone || errors.email || !form.guestName.trim() || !form.phone.trim()) {
      return; 
    }
    setStatus('submitting');
    try {
      await axios.post(`${API}/public/book`, form);
      setStatus('success');
      setForm({ guestName: '', phone: '', email: '', roomType: 'Normal', checkInDate: '', checkOutDate: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const scrollToBooking = () => {
    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={myCustomIcon} alt="Grand Resort" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Grand Resort</span>
          </div>
          <button onClick={scrollToBooking} className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors">
            Book Now
          </button>
        </div>
      </nav>

      {/* Floating Book Now Button */}
      <a 
  href="https://grand-resort-web-l1sz-ten.vercel.app/" 
  className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[99] bg-slate-900 text-white p-4 sm:px-6 sm:py-4 rounded-2xl sm:rounded-full shadow-2xl hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/30 flex items-center gap-4 border border-slate-700 hover:border-indigo-500 group"
>
  <div className="relative bg-white/10 p-2.5 rounded-full flex-shrink-0 group-hover:bg-white/20 transition-colors">
    {/* Pulsing green dot for "Real-time" effect */}
    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900 group-hover:border-indigo-600 transition-colors"></span>
    </span>
    {/* Make sure to import Calendar from lucide-react at the top of your file */}
    <Calendar size={24} className="text-white" />
  </div>
  
  <div className="flex flex-col pr-2">
    <span className="font-bold text-lg leading-tight">Book Now</span>
    <span className="text-xs text-gray-300 font-medium group-hover:text-indigo-100 transition-colors">
      Check live room availability
    </span>
  </div>
</a>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-12 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Escape to Luxury at <br className="hidden md:block"/>
            <span className="text-indigo-400">Grand Resort</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Experience world-class hospitality, breathtaking views, and unforgettable moments. Your perfect getaway starts here.
          </p>
          <button onClick={scrollToBooking} className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1">
            Check Availability
          </button>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Wifi size={28} /></div>
              <span className="font-semibold text-gray-700">Free High-Speed WiFi</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Coffee size={28} /></div>
              <span className="font-semibold text-gray-700">Complimentary Breakfast</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Car size={28} /></div>
              <span className="font-semibold text-gray-700">Valet Parking</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Star size={28} /></div>
              <span className="font-semibold text-gray-700">Premium Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase & Booking Form */}
      <section id="booking-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Room Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Comfort</h2>
              <p className="text-gray-600">Select the room that fits your style and budget.</p>
            </div>

            {/* Normal Room Card */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm border transition-all cursor-pointer ${form.roomType === 'Normal' ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300'}`} onClick={() => setForm({...form, roomType: 'Normal'})}>
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden group">
                <img src={roomImages['Normal'][0]} alt="Normal Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={(e) => { e.stopPropagation(); setGallery('Normal'); }} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:bg-white shadow-sm">
                  <ImageIcon size={16} /> Gallery
                </button>
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Normal Room</h3>
                  <p className="text-indigo-600 font-semibold">₹7,500 / night</p>
                </div>
                <div className={`p-2 rounded-full ${form.roomType === 'Normal' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-transparent'}`}><CheckCircle2 size={24} /></div>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Queen Size Bed & City View</li>
              </ul>
            </div>

            {/* Deluxe Room Card */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm border transition-all cursor-pointer ${form.roomType === 'Deluxe' ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300'}`} onClick={() => setForm({...form, roomType: 'Deluxe'})}>
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden group">
                <img src={roomImages['Deluxe'][0]} alt="Deluxe Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={(e) => { e.stopPropagation(); setGallery('Deluxe'); }} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:bg-white shadow-sm">
                  <ImageIcon size={16} /> Gallery
                </button>
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Deluxe Suite</h3>
                  <p className="text-indigo-600 font-semibold">₹15,000 / night</p>
                </div>
                <div className={`p-2 rounded-full ${form.roomType === 'Deluxe' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-transparent'}`}><CheckCircle2 size={24} /></div>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> King Bed, Ocean View & Balcony</li>
              </ul>
            </div>

            {/* Super Luxury Room Card */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm border transition-all cursor-pointer ${form.roomType === 'Super Luxury' ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300'}`} onClick={() => setForm({...form, roomType: 'Super Luxury'})}>
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden group">
                <img src={roomImages['Super Luxury'][0]} alt="Super Luxury Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={(e) => { e.stopPropagation(); setGallery('Super Luxury'); }} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:bg-white shadow-sm">
                  <ImageIcon size={16} /> Gallery
                </button>
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Super Luxury Suite</h3>
                  <p className="text-indigo-600 font-semibold">₹20,500 / night</p>
                </div>
                <div className={`p-2 rounded-full ${form.roomType === 'Super Luxury' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-transparent'}`}><CheckCircle2 size={24} /></div>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> Plunge Pool & 24/7 Butler Service</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Reservation</h3>
            
            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Request Sent Successfully!</p>
                  <p className="text-sm mt-1">Our front desk will contact you shortly to confirm your booking.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl">
                Something went wrong. Please try submitting again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input required type="text" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" placeholder="e.g. Aishwarya" value={form.guestName} onChange={e => setForm({...form, guestName: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" className={`w-full border p-3 rounded-xl focus:ring-2 focus:outline-none transition-shadow ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`} placeholder="+91" value={form.phone} onChange={handlePhoneChange} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className={`w-full border p-3 rounded-xl focus:ring-2 focus:outline-none transition-shadow ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`} placeholder="you@example.com" value={form.email} onChange={handleEmailChange} />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selected Room</label>
                <select className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50" value={form.roomType} onChange={e => setForm({...form, roomType: e.target.value})}>
                  <option value="Normal">Normal Room (₹7,500/night)</option>
                  <option value="Deluxe">Deluxe Suite (₹15,000/night)</option>
                  <option value="Super Luxury">Super Luxury Suite (₹20,500/night)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in *</label>
                  <input required type="date" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" value={form.checkInDate} onChange={e => setForm({...form, checkInDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out *</label>
                  <input required type="date" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" value={form.checkOutDate} onChange={e => setForm({...form, checkOutDate: e.target.value})} />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting' || errors.phone !== '' || errors.email !== '' || !form.guestName.trim() || !form.phone.trim()}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {status === 'submitting' ? 'Processing...' : 'Submit Booking Request'}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">No payment required until check-in.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <img src={myCustomIcon} alt="Grand Resort" className="h-6 w-auto object-contain brightness-0 invert opacity-90" />
            <span className="text-xl font-bold tracking-tight">Grand Resort</span>
          </div>
          <p className="flex items-center justify-center gap-2 text-sm"><MapPin size={16}/> 123 Resort Avenue, Coastal City, CC 90210</p>
          <p className="text-sm mt-4">© 2026 Grand Resort Management. All rights reserved.</p>
        </div>
      </footer>
      {/* Image Gallery Modal */}
      {gallery && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setGallery(null)}>
          <div className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">{gallery} Room Gallery</h3>
              <button onClick={() => setGallery(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh]">
              {roomImages[gallery].map((img, i) => (
                <img key={i} src={img} alt={`${gallery} room view ${i + 1}`} className="w-full h-64 md:h-80 object-cover rounded-xl border border-gray-100" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}