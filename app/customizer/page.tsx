'use client';

import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

const Customizer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Keep file for upload
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [imageSize, setImageSize] = useState(150);
  const [imagePos, setImagePos] = useState({ x: 50, y: 40 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shirtSize, setShirtSize] = useState('L');
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePrice = () => {
    return 35.00; // Base price
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedFile || !email || !phone) return;
      
      setSubmitting(true);
      try {
          // 1. Upload Design Image to Supabase
          const filename = `custom-${Date.now()}-${selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
          const { data: uploadData, error: uploadError } = await import('../../lib/supabase').then(m => m.supabase.storage.from('images').upload(filename, selectedFile));
          
          if (uploadError) throw uploadError;
          
          const { data: publicUrlData } = await import('../../lib/supabase').then(m => m.supabase.storage.from('images').getPublicUrl(uploadData.path));
          const finalImageUrl = publicUrlData.publicUrl;

          // 2. Insert Order
          const { error: insertError } = await import('../../lib/supabase').then(m => m.supabase.from('custom_orders').insert([{
              image_url: finalImageUrl,
              fabric_color: shirtColor,
              customer_email: email,
              customer_phone: phone,
              design_specs: { x: imagePos.x, y: imagePos.y, size: imageSize, shirt_size: shirtSize },
              status: 'pending'
          }]));

          if (insertError) throw insertError;

          alert("Design Request Submitted! Check your email for confirmation.");
          setShowModal(false);
          // Optional: Reset form
          setSelectedImage(null);
          setSelectedFile(null);
          
      } catch (err: any) {
          console.error(err);
          alert("Error submitting order: " + err.message);
      } finally {
          setSubmitting(false);
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 relative">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif mb-4 uppercase tracking-tight">Bird Print Studio</h1>
        <p className="text-slate-600">Bring your bird photography to life. Customize every detail of your apparel.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Preview Area (Same as before) */}
        <div className="bg-slate-200 rounded-[3rem] p-12 flex items-center justify-center relative min-h-[600px] border-4 border-white shadow-inner overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <i className="fas fa-feather text-[30rem] absolute -top-40 -left-40 rotate-12 text-red-600"></i>
          </div>
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl transition-colors duration-500" fill={shirtColor}>
               <path d="M20,10 L30,5 L70,5 L80,10 L95,25 L85,35 L80,30 L80,95 L20,95 L20,30 L15,35 L5,25 Z" />
            </svg>
            
            {selectedImage && (
              <div 
                className="absolute overflow-hidden pointer-events-none border border-slate-300/20"
                style={{
                  top: `${imagePos.y}%`,
                  left: `${imagePos.x}%`,
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '4px'
                }}
              >
                <img src={selectedImage} alt="Design" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Controls Area */}
        <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">1. Fabric Color</label>
            <div className="flex flex-wrap gap-4">
              {['#ffffff', '#000000', '#dc2626', '#1e293b', '#450a0a', '#f97316', '#3b82f6', '#22c55e', '#eab308'].map(color => (
                <button
                  key={color}
                  onClick={() => setShirtColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${shirtColor === color ? 'border-red-600 scale-125' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">2. Upload Artwork</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              ref={fileInputRef} 
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-10 border-2 border-dashed border-slate-300 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all group flex flex-col items-center justify-center space-y-2"
            >
              <i className="fas fa-cloud-upload-alt text-3xl text-slate-400 group-hover:text-red-500"></i>
              <span className="text-slate-600 font-bold">Select Image</span>
            </button>
          </div>

          {selectedImage && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
               <div>
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">3. Position Controls</label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-slate-400 w-8 tracking-tighter">SIZE</span>
                    <input 
                      type="range" min="50" max="250" value={imageSize} 
                      onChange={(e) => setImageSize(Number(e.target.value))}
                      className="flex-1 accent-red-600"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-slate-400 w-8 tracking-tighter">X-POS</span>
                    <input 
                      type="range" min="30" max="70" value={imagePos.x} 
                      onChange={(e) => setImagePos(prev => ({...prev, x: Number(e.target.value)}))}
                      className="flex-1 accent-red-600"
                    />
                  </div>
                   <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-slate-400 w-8 tracking-tighter">Y-POS</span>
                    <input 
                      type="range" min="20" max="80" value={imagePos.y} 
                      onChange={(e) => setImagePos(prev => ({...prev, y: Number(e.target.value)}))}
                      className="flex-1 accent-red-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-xl shadow-red-600/20 active:scale-95"
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submission Modal */}
      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                  <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                          <i className="fas fa-paper-plane"></i>
                      </div>
                      <h2 className="text-2xl font-serif text-slate-900 uppercase tracking-tight">Finalize Request</h2>
                      <p className="text-slate-500 text-sm mt-2">Enter your details and size.</p>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                      
                      {/* Size Selector */}
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shirt Size</label>
                          <div className="flex flex-wrap gap-2">
                              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(size => (
                                  <button
                                      key={size}
                                      type="button"
                                      onClick={() => setShirtSize(size)}
                                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors border ${
                                          shirtSize === size 
                                          ? 'bg-slate-900 text-white border-slate-900' 
                                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                      }`}
                                  >
                                      {size}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                          <input 
                              required 
                              type="email"
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 outline-none"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                          />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                          <input 
                              required 
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 outline-none"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                          />
                      </div>

                      <div className="pt-4 flex gap-3">
                          <button 
                              type="button" 
                              onClick={() => setShowModal(false)}
                              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                          >
                              Cancel
                          </button>
                          <button 
                              disabled={submitting}
                              type="submit" 
                              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                              {submitting ? <i className="fas fa-circle-notch animate-spin"></i> : 'Send Request'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Customizer;
