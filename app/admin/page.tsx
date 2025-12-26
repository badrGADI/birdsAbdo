'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { Bird, Book, Shirt, NewsArticle } from '../../types';

type AdminTab = 'birds' | 'books' | 'shirts' | 'news' | 'custom_orders';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('birds');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Fetch data when tab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    // Deep copy and normalize
    const normalized = { ...item };
    if (normalized.scientific_name) normalized.scientificName = normalized.scientific_name;
    if (normalized.image_url) normalized.imageUrl = normalized.image_url;
    setFormData(normalized);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase.from(activeTab).delete().eq('id', id);
    if (error) {
      alert('Error deleting item: ' + error.message);
    } else {
      fetchData();
    }
  };

  const handleDownloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return;
    setSaving(true);
    
    // Process specific fields if necessary
    const submissionData = { ...formData };
    
    // Map camelCase to snake_case for DB
    if (submissionData.scientificName !== undefined) {
        submissionData.scientific_name = submissionData.scientificName;
        delete submissionData.scientificName;
    }
    if (submissionData.imageUrl !== undefined) {
        submissionData.image_url = submissionData.imageUrl;
        delete submissionData.imageUrl;
    }

    // Validation
    const finalImageUrl = submissionData.image_url || submissionData.imageUrl;
    if (!finalImageUrl) {
        alert("Please provide an image!");
        setSaving(false);
        return;
    }

    // Ensure ID is not in submission for inserts
    if (!editingId) {
        delete submissionData.id; 
    }

    let error;
    if (editingId) {
      const { error: err } = await supabase
        .from(activeTab)
        .update(submissionData)
        .eq('id', editingId);
      error = err;
    } else {
      const { error: err } = await supabase
        .from(activeTab)
        .insert([submissionData]);
      error = err;
    }

    if (error) {
      alert('Error saving data: ' + error.message);
    } else {
      resetForm();
      fetchData();
    }
    setSaving(false);
  };

  const renderTable = () => {
    if (activeTab === 'birds') {
        const groups: Record<string, any[]> = {};
        items.forEach((item: any) => {
            const cat = item.category || item.family || 'Uncategorized';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(item);
        });

        const categories = Object.keys(groups).sort();

        if (items.length === 0 && !loading) {
            return <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">No birds cataloged yet.</div>;
        }

        return (
            <div className="space-y-6">
                {categories.map((category) => (
                    <div key={category} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div 
                            className="bg-slate-50 px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all"
                            onClick={() => {
                                setExpandedCategories(prev => 
                                    prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                                );
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <i className={`fas fa-chevron-${expandedCategories.includes(category) ? 'down' : 'right'} text-slate-300 text-xs`}></i>
                                <h3 className="font-serif text-xl text-slate-900">{category}</h3>
                                <span className="bg-white border border-slate-200 px-3 py-0.5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    {groups[category].length} Species
                                </span>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    resetForm();
                                    setFormData({ category });
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-600/10"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Species
                            </button>
                        </div>

                        {expandedCategories.includes(category) && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-slate-50 font-medium">
                                        {groups[category].map((item: any) => (
                                            <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-4 w-20">
                                                    <img src={item.image_url || item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl bg-slate-100 shadow-sm" />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="text-slate-900">{item.name}</div>
                                                    <div className="text-[10px] text-red-500 font-serif italic">{item.scientific_name || item.scientificName}</div>
                                                </td>
                                                <td className="px-8 py-4 space-x-2 text-right">
                                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
    <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-100">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Image</th>
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                {activeTab === 'custom_orders' ? 'Customer Details' : 'Name/Title'}
            </th>
            {activeTab === 'custom_orders' && (
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Specs</th>
            )}
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {loading ? (
             <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing...</td></tr>
          ) : items.length === 0 ? (
             <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">No records found.</td></tr>
          ) : items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <img src={item.image_url || item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl bg-slate-100" />
              </td>
              <td className="px-6 py-4 font-bold text-slate-900">
                {activeTab === 'custom_orders' ? (
                    <div>
                        <div className="text-sm">{item.customer_email}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{item.customer_phone}</div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest mt-1 ${
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {item.status}
                        </span>
                    </div>
                ) : (
                    <div className="text-sm">{item.name || item.title}</div>
                )}
              </td>
              {activeTab === 'custom_orders' && (
                  <td className="px-6 py-4 text-xs">
                      <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: item.fabric_color }}></span>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700">Size: {item.design_specs?.shirt_size}</span>
                            <span className="text-slate-500 text-[10px] font-medium">
                                Art: {item.design_specs?.size}px @ ({item.design_specs?.x}%, {item.design_specs?.y}%)
                            </span>
                          </div>
                      </div>
                  </td>
              )}
              <td className="px-6 py-4 space-x-2 text-right">
                {activeTab !== 'custom_orders' && (
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <i className="fas fa-edit"></i>
                    </button>
                )}
                {activeTab === 'custom_orders' && item.status === 'pending' && (
                    <button onClick={async () => {
                         await supabase.from('custom_orders').update({ status: 'completed' }).eq('id', item.id);
                         fetchData();
                    }} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Mark Completed">
                        <i className="fas fa-check"></i>
                    </button>
                )}
                {activeTab === 'custom_orders' && (
                    <button 
                        onClick={() => handleDownloadImage(item.image_url || item.imageUrl, `order-${item.id}.jpg`)} 
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" 
                        title="Download Design"
                    >
                        <i className="fas fa-download"></i>
                    </button>
                )}
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
            <h1 className="text-5xl font-serif text-slate-900 tracking-tighter lowercase">the world of <span className="text-red-600">birds</span> | <span className="text-slate-400 capitalize">admin</span></h1>
            <p className="text-slate-500 font-light mt-2">Live Sanctuary Database Management</p>
            </div>
            <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto shadow-inner">
            {(['birds', 'books', 'shirts', 'news', 'custom_orders'] as AdminTab[]).map((tab) => (
                <button
                key={tab}
                onClick={() => { setActiveTab(tab); resetForm(); }}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-white text-red-600 shadow-md' : 'text-slate-500 hover:bg-slate-200/50'
                }`}
                >
                {tab === 'custom_orders' ? 'Orders' : tab}
                </button>
            ))}
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Registry Table</h2>
                    {activeTab === 'birds' && (
                         <button 
                            onClick={() => setExpandedCategories(items.map(i => i.category || i.family || 'Uncategorized'))}
                            className="text-[10px] font-bold text-red-600 hover:underline"
                        >
                            Expand All
                        </button>
                    )}
                </div>
            {renderTable()}
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-12">
            <h2 className="text-3xl font-serif text-slate-900 tracking-tighter mb-8">
                {editingId ? 'Edit Entry' : 'New Entry'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name / Title</label>
                <input 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none transition-all shadow-sm group-focus:shadow-md"
                    value={formData.name || formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, [activeTab === 'birds' || activeTab === 'shirts' ? 'name' : 'title']: e.target.value })}
                />
                </div>
                
                <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image Source</label>
                
                <div className="flex flex-col gap-4">
                    <input 
                    placeholder="External URL..."
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none text-sm"
                    value={formData.imageUrl || formData.image_url || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, image_url: e.target.value })}
                    />
                    
                    <div className="relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setUploading(true);
                        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
                        const { data, error } = await supabase.storage.from('images').upload(filename, file);

                        if (error) {
                            alert(`Upload failed: ${error.message}`);
                        } else if (data) {
                            const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(data.path);
                            const publicUrl = publicUrlData.publicUrl;
                            setFormData((prev: any) => ({ ...prev, imageUrl: publicUrl, image_url: publicUrl }));
                        }
                        setUploading(false);
                        }}
                    />
                    <div className="w-full px-5 py-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-red-500 hover:bg-red-50 transition-all flex items-center justify-center text-slate-400 gap-3 pointer-events-none">
                        {uploading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-cloud-upload-alt"></i>}
                        <span className="text-[10px] font-black uppercase tracking-widest">{uploading ? 'Processing...' : 'Upload Local'}</span>
                    </div>
                    </div>
                </div>
                </div>

                {/* TAB SPECIFIC FIELDS */}
                {activeTab === 'birds' && (
                <>
                    <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Scientific Name</label>
                    <input className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none" 
                        value={formData.scientificName || formData.scientific_name || ''} 
                        onChange={e => setFormData({...formData, scientificName: e.target.value})} 
                    />
                    </div>
                    <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Habitat</label>
                    <input className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none" 
                        value={formData.habitat || ''} 
                        onChange={e => setFormData({...formData, habitat: e.target.value})} 
                    />
                    </div>
                    <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <div className="space-y-3">
                        <select 
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white"
                            value={['Raptors', 'Songbirds', 'Waterfowl', 'Tropical', 'Flightless', 'Hummingbirds', 'Owls'].includes(formData.category) ? formData.category : (formData.category ? 'Custom' : '')}
                            onChange={(e) => {
                                if (e.target.value === 'Custom') {
                                    setFormData({ ...formData, category: '' });
                                } else {
                                    setFormData({ ...formData, category: e.target.value });
                                }
                            }}
                        >
                            <option value="">Select Category...</option>
                            <option value="Raptors">Raptors</option>
                            <option value="Songbirds">Songbirds</option>
                            <option value="Waterfowl">Waterfowl</option>
                            <option value="Tropical">Tropical</option>
                            <option value="Flightless">Flightless</option>
                            <option value="Hummingbirds">Hummingbirds</option>
                            <option value="Owls">Owls</option>
                            <option value="Custom">+ Custom Classification</option>
                        </select>

                        {(!['Raptors', 'Songbirds', 'Waterfowl', 'Tropical', 'Flightless', 'Hummingbirds', 'Owls'].includes(formData.category) && formData.category !== undefined) && (
                            <input 
                                placeholder="Enter custom category..."
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 animate-in fade-in"
                                value={formData.category || ''}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        )}
                    </div>
                    </div>

                    <div className="space-y-1 pt-4 border-t border-slate-50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fascinating Facts</label>
                        <div className="space-y-3 mt-3">
                            {(formData.facts || []).map((fact: string, i: number) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        className="flex-1 px-4 py-2 rounded-xl border border-slate-100 text-sm focus:border-red-300 outline-none"
                                        value={fact}
                                        onChange={(e) => {
                                            const newFacts = [...(formData.facts || [])];
                                            newFacts[i] = e.target.value;
                                            setFormData({ ...formData, facts: newFacts });
                                        }}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            const newFacts = [...(formData.facts || [])];
                                            newFacts.splice(i, 1);
                                            setFormData({ ...formData, facts: newFacts });
                                        }}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <i className="fas fa-times text-xs"></i>
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={() => setFormData({ ...formData, facts: [...(formData.facts || []), ''] })}
                                className="w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white hover:border-red-200 hover:text-red-500 transition-all"
                            >
                                <i className="fas fa-plus mr-2"></i> Add Fact
                            </button>
                        </div>
                    </div>
                </>
                )}

                {activeTab === 'books' && (
                <>
                    <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Author</label>
                    <input className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none" 
                        value={formData.author || ''} 
                        onChange={e => setFormData({...formData, author: e.target.value})} 
                    />
                    </div>
                    <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price</label>
                    <input type="number" step="0.01" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-red-500 outline-none" 
                        value={formData.price || ''} 
                        onChange={e => setFormData({...formData, price: e.target.value})} 
                    />
                    </div>
                </>
                )}

                {activeTab === 'shirts' && (
                <>
                    <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Available Sizes</label>
                    <div className="flex flex-wrap gap-2">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map((size) => (
                        <label key={size} className={`px-4 py-2 rounded-xl border cursor-pointer transition-all text-sm font-bold ${
                            (formData.sizes || []).includes(size) ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}>
                            <input type="checkbox" className="hidden" checked={(formData.sizes || []).includes(size)} onChange={(e) => {
                                const sizes = Array.isArray(formData.sizes) ? [...formData.sizes] : [];
                                if (e.target.checked) setFormData({ ...formData, sizes: [...sizes, size] });
                                else setFormData({ ...formData, sizes: sizes.filter((s: string) => s !== size) });
                            }} />
                            {size}
                        </label>
                        ))}
                    </div>
                    </div>
                </>
                )}

                <div className="space-y-1 pt-4 border-t border-slate-50">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Summary</label>
                <textarea 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 h-32 focus:border-red-500 outline-none text-sm leading-relaxed" 
                    value={formData.description || formData.summary || ''} 
                    onChange={e => setFormData({...formData, [activeTab === 'news' ? 'summary' : 'description']: e.target.value})}
                />
                </div>
                
                {activeTab === 'news' && (
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Article Content</label>
                    <textarea 
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 h-64 font-mono text-xs leading-relaxed" 
                        placeholder="# Markdown content here..."
                        value={formData.content || ''} 
                        onChange={e => setFormData({...formData, content: e.target.value})} 
                    />
                </div>
                )}

                <div className="pt-6 flex gap-4">
                <button disabled={saving} type="submit" className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-50">
                    {saving ? <i className="fas fa-spinner animate-spin"></i> : (editingId ? 'Update Entry' : 'Publish Entry')}
                </button>
                {editingId && (
                    <button type="button" onClick={resetForm} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                    Cancel
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Admin;
