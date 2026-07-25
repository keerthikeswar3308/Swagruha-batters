'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import {
  Lock,
  User,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Search,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  Moon,
  Sun,
  Download,
  Upload,
  Phone,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // DB State in Admin
  const [dbData, setDbData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      const json = await res.json();
      if (json.authenticated) {
        setAuthenticated(true);
        fetchData();
      } else {
        setAuthenticated(false);
      }
    } catch (e) {
      setAuthenticated(false);
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setDbData(json);
    } catch (e) {
      console.error('Failed to load DB data', e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      if (json.success) {
        setAuthenticated(true);
        fetchData();
      } else {
        setLoginError(json.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthenticated(false);
  };

  const saveDatabase = async (updatedData: any) => {
    setSaveStatus('Saving changes...');
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDbData(updatedData);
        setSaveStatus('✓ Saved successfully!');
        setTimeout(() => setSaveStatus(''), 4000);
      } else {
        setSaveStatus(`❌ ${json.error || 'Error saving changes'}`);
      }
    } catch (e: any) {
      setSaveStatus(`❌ ${e?.message || 'Error saving changes'}`);
    }
  };

  // Helper mutation functions
  const handleUpdateSiteInfo = (field: string, val: string) => {
    const updated = {
      ...dbData,
      siteInfo: {
        ...dbData.siteInfo,
        [field]: val,
      },
    };
    setDbData(updated);
  };

  const handleUpdateSeo = (field: string, val: string) => {
    const updated = {
      ...dbData,
      seo: {
        ...dbData.seo,
        [field]: val,
      },
    };
    setDbData(updated);
  };

  const handleProductChange = (index: number, field: string, val: any) => {
    const newProds = [...dbData.products];
    newProds[index] = { ...newProds[index], [field]: val };
    setDbData({ ...dbData, products: newProds });
  };

  const handleAddProduct = () => {
    const newProd = {
      id: `prod-${Date.now()}`,
      name: 'New Batter Pack',
      tagline: 'For Fresh Breakfast',
      description: 'Delicious naturally fermented batter.',
      weight: '1 KG Only',
      price: '₹60',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800',
      inStock: true,
      badge: 'Fresh Batch',
      highlights: ['100% Natural Fermentation', 'Zero Soda'],
    };
    const updated = { ...dbData, products: [...dbData.products, newProd] };
    setDbData(updated);
  };

  const handleDeleteProduct = (index: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const newProds = dbData.products.filter((_: any, i: number) => i !== index);
    setDbData({ ...dbData, products: newProds });
  };

  const handleLocationChange = (index: number, field: string, val: string) => {
    const newLocs = [...dbData.locations];
    newLocs[index] = { ...newLocs[index], [field]: val };
    setDbData({ ...dbData, locations: newLocs });
  };

  const handleAddLocation = () => {
    const newLoc = {
      id: `loc-${Date.now()}`,
      name: 'Swagruha Store - New Location',
      address: 'Shop Address Details Here',
      phone: dbData.siteInfo.phonePrimary,
      mapsUrl: 'https://google.com/maps',
      embedMap: 'https://www.google.com/maps/embed',
      timing: '6:00 AM - 9:00 PM',
    };
    setDbData({ ...dbData, locations: [...dbData.locations, newLoc] });
  };

  const handleDeleteLocation = (index: number) => {
    if (!confirm('Delete this location card?')) return;
    const newLocs = dbData.locations.filter((_: any, i: number) => i !== index);
    setDbData({ ...dbData, locations: newLocs });
  };

  const handleReviewChange = (index: number, field: string, val: any) => {
    const newRevs = [...dbData.reviews];
    newRevs[index] = { ...newRevs[index], [field]: val };
    setDbData({ ...dbData, reviews: newRevs });
  };

  const handleAddReview = () => {
    const newRev = {
      id: `rev-${Date.now()}`,
      name: 'Customer Name',
      rating: 5,
      date: 'Just now',
      comment: 'Excellent fresh batter!',
      verified: true,
    };
    setDbData({ ...dbData, reviews: [newRev, ...dbData.reviews] });
  };

  const handleDeleteReview = (index: number) => {
    const newRevs = dbData.reviews.filter((_: any, i: number) => i !== index);
    setDbData({ ...dbData, reviews: newRevs });
  };

  const handleFaqChange = (index: number, field: string, val: string) => {
    const newFaqs = [...dbData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: val };
    setDbData({ ...dbData, faqs: newFaqs });
  };

  const handleAddFaq = () => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      question: 'New Question?',
      answer: 'Detailed answer response here.',
    };
    setDbData({ ...dbData, faqs: [...dbData.faqs, newFaq] });
  };

  const handleDeleteFaq = (index: number) => {
    const newFaqs = dbData.faqs.filter((_: any, i: number) => i !== index);
    setDbData({ ...dbData, faqs: newFaqs });
  };

  const handleGalleryChange = (index: number, field: string, val: string) => {
    const newG = [...dbData.gallery];
    newG[index] = { ...newG[index], [field]: val };
    setDbData({ ...dbData, gallery: newG });
  };

  const handleAddGalleryItem = () => {
    const newItem = {
      id: `g-${Date.now()}`,
      title: 'New Gallery Image',
      category: 'Batter',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800',
    };
    setDbData({ ...dbData, gallery: [...dbData.gallery, newItem] });
  };

  const handleDeleteGalleryItem = (index: number) => {
    const newG = dbData.gallery.filter((_: any, i: number) => i !== index);
    setDbData({ ...dbData, gallery: newG });
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dbData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `swagruha_batters_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRestoreBackup = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          saveDatabase(parsed);
          alert('Backup restored successfully!');
        } catch (err) {
          alert('Invalid JSON backup file');
        }
      };
    }
  };

  const handleChangePassword = () => {
    if (!newPassword.trim()) return alert('Password cannot be empty');
    const updated = {
      ...dbData,
      adminCredentials: {
        username: 'admin',
        password: newPassword,
      },
    };
    saveDatabase(updated);
    setNewPassword('');
    alert('Password updated successfully!');
  };

  // Loading indicator while checking auth
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 font-bold text-[#F9A825]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          Loading Swagruha Admin Portal...
        </div>
      </div>
    );
  }

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D3B10] via-gray-900 to-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F9A825] text-[#1B5E20] font-black text-3xl flex items-center justify-center shadow-lg">
              S
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Swagruha Batters Admin
            </h1>
            <p className="text-xs text-gray-400">
              Sign in with administrative credentials to manage store content
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F9A825]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F9A825]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F9A825] to-[#FBC02D] text-[#1B5E20] font-extrabold text-sm shadow-xl hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              Log In To Dashboard
            </button>
          </form>

          <div className="text-center text-[11px] text-gray-500">
            Protected Admin Route • Swagruha Batters FMCG Management
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD LAYOUT
  if (loadingData || !dbData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-[#F9A825]" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar Navigation */}
      <aside className={`w-64 border-r ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} p-6 flex flex-col justify-between hidden md:flex shrink-0`}>
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9A825] text-[#1B5E20] font-black text-xl flex items-center justify-center shadow-md">
              S
            </div>
            <div>
              <h2 className="font-extrabold text-lg leading-none">Swagruha</h2>
              <span className="text-[10px] text-[#F9A825] font-bold tracking-widest uppercase">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Products (Batters)', icon: ShoppingBag },
              { id: 'locations', label: 'Store Locations', icon: MapPin },
              { id: 'contact', label: 'Contact Info', icon: Phone },
              { id: 'homepage', label: 'Homepage Copy', icon: FileText },
              { id: 'gallery', label: 'Gallery Images', icon: ImageIcon },
              { id: 'reviews', label: 'Customer Reviews', icon: MessageSquare },
              { id: 'faq', label: 'FAQ Manager', icon: HelpCircle },
              { id: 'seo', label: 'SEO Settings', icon: Search },
              { id: 'settings', label: 'Settings & Backup', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1B5E20] text-white shadow-md'
                      : darkMode
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#F9A825]' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-semibold">Appearance</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-bold text-xs transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 border-gray-800">
          <div>
            <span className="text-xs font-bold text-[#F9A825] uppercase tracking-wider">
              Management Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {saveStatus && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                {saveStatus}
              </span>
            )}
            <button
              onClick={() => saveDatabase(dbData)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F9A825] to-[#FBC02D] text-[#1B5E20] font-extrabold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save All Changes
            </button>
          </div>
        </div>

        {/* TAB CONTENT: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-2`}>
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
                  <span>Products</span>
                  <ShoppingBag className="w-5 h-5 text-[#F9A825]" />
                </div>
                <div className="text-3xl font-black">{dbData.products.length}</div>
                <p className="text-xs text-emerald-500 font-semibold">Active 1 KG Pack Items</p>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-2`}>
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
                  <span>Locations</span>
                  <MapPin className="w-5 h-5 text-[#F9A825]" />
                </div>
                <div className="text-3xl font-black">{dbData.locations.length}</div>
                <p className="text-xs text-emerald-500 font-semibold">Retail Stores Active</p>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-2`}>
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
                  <span>Reviews</span>
                  <MessageSquare className="w-5 h-5 text-[#F9A825]" />
                </div>
                <div className="text-3xl font-black">{dbData.reviews.length}</div>
                <p className="text-xs text-amber-500 font-semibold">4.9/5 Average Rating</p>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-2`}>
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
                  <span>FAQs</span>
                  <HelpCircle className="w-5 h-5 text-[#F9A825]" />
                </div>
                <div className="text-3xl font-black">{dbData.faqs.length}</div>
                <p className="text-xs text-blue-400 font-semibold">Customer Questions</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
              <h3 className="text-lg font-bold">Quick Administrative Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className="p-4 rounded-xl bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20 font-bold text-xs flex items-center justify-between cursor-pointer"
                >
                  <span>Edit Product Prices & Details</span>
                  <ShoppingBag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('locations')}
                  className="p-4 rounded-xl bg-amber-600/10 border border-amber-600/30 text-amber-400 hover:bg-amber-600/20 font-bold text-xs flex items-center justify-between cursor-pointer"
                >
                  <span>Manage Store Addresses & Phone</span>
                  <MapPin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('homepage')}
                  className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/30 text-blue-400 hover:bg-blue-600/20 font-bold text-xs flex items-center justify-between cursor-pointer"
                >
                  <span>Update Hero Headlines & Copy</span>
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">1 KG Batter Products</h2>
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B5E20] text-white font-bold text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F9A825]" />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dbData.products.map((prod: any, idx: number) => (
                <div
                  key={prod.id || idx}
                  className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4 relative`}
                >
                  <button
                    onClick={() => handleDeleteProduct(idx)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Product Name</label>
                      <input
                        type="text"
                        value={prod.name}
                        onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Price (Editable)</label>
                      <input
                        type="text"
                        value={prod.price}
                        onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Weight Badge</label>
                      <input
                        type="text"
                        value={prod.weight}
                        onChange={(e) => handleProductChange(idx, 'weight', e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={prod.tagline}
                        onChange={(e) => handleProductChange(idx, 'tagline', e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={prod.description}
                      onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Product Image URL</label>
                    <input
                      type="text"
                      value={prod.image}
                      onChange={(e) => handleProductChange(idx, 'image', e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: LOCATIONS MANAGER */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Store Locations Manager</h2>
              <button
                onClick={handleAddLocation}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B5E20] text-white font-bold text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F9A825]" />
                Add Location
              </button>
            </div>

            <div className="space-y-6">
              {dbData.locations.map((loc: any, idx: number) => (
                <div
                  key={loc.id || idx}
                  className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4 relative`}
                >
                  <button
                    onClick={() => handleDeleteLocation(idx)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Shop Name</label>
                      <input
                        type="text"
                        value={loc.name}
                        onChange={(e) => handleLocationChange(idx, 'name', e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={loc.phone}
                        onChange={(e) => handleLocationChange(idx, 'phone', e.target.value)}
                        className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Store Address</label>
                    <input
                      type="text"
                      value={loc.address}
                      onChange={(e) => handleLocationChange(idx, 'address', e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Google Maps Direct Link</label>
                    <input
                      type="text"
                      value={loc.mapsUrl}
                      onChange={(e) => handleLocationChange(idx, 'mapsUrl', e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: CONTACT INFO */}
        {activeTab === 'contact' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4 max-w-3xl`}>
            <h2 className="text-xl font-bold">Contact & Operating Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={dbData.siteInfo.phonePrimary}
                  onChange={(e) => handleUpdateSiteInfo('phonePrimary', e.target.value)}
                  className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Secondary Phone</label>
                <input
                  type="text"
                  value={dbData.siteInfo.phoneSecondary}
                  onChange={(e) => handleUpdateSiteInfo('phoneSecondary', e.target.value)}
                  className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Email Address</label>
              <input
                type="text"
                value={dbData.siteInfo.email}
                onChange={(e) => handleUpdateSiteInfo('email', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Working Hours</label>
              <input
                type="text"
                value={dbData.siteInfo.workingHours}
                onChange={(e) => handleUpdateSiteInfo('workingHours', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>
          </div>
        )}

        {/* TAB CONTENT: HOMEPAGE COPY */}
        {activeTab === 'homepage' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4 max-w-3xl`}>
            <h2 className="text-xl font-bold">Homepage Copy Editor</h2>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Hero Main Title</label>
              <input
                type="text"
                value={dbData.siteInfo.heroTitle}
                onChange={(e) => handleUpdateSiteInfo('heroTitle', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Hero Subtitle</label>
              <textarea
                rows={3}
                value={dbData.siteInfo.heroSubtitle}
                onChange={(e) => handleUpdateSiteInfo('heroSubtitle', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">About Section Title</label>
              <input
                type="text"
                value={dbData.siteInfo.aboutTitle}
                onChange={(e) => handleUpdateSiteInfo('aboutTitle', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">About Paragraph 1</label>
              <textarea
                rows={2}
                value={dbData.siteInfo.aboutText1}
                onChange={(e) => handleUpdateSiteInfo('aboutText1', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>
          </div>
        )}

        {/* TAB CONTENT: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Gallery Manager</h2>
              <button
                onClick={handleAddGalleryItem}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B5E20] text-white font-bold text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F9A825]" />
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbData.gallery.map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className={`p-4 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-3 relative`}
                >
                  <button
                    onClick={() => handleDeleteGalleryItem(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl" />

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleGalleryChange(idx, 'title', e.target.value)}
                    className={`w-full p-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    placeholder="Caption title"
                  />

                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => handleGalleryChange(idx, 'image', e.target.value)}
                    className={`w-full p-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    placeholder="Image URL"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: REVIEWS MANAGER */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Reviews Manager</h2>
              <button
                onClick={handleAddReview}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B5E20] text-white font-bold text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F9A825]" />
                Add Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dbData.reviews.map((rev: any, idx: number) => (
                <div
                  key={rev.id || idx}
                  className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-3 relative`}
                >
                  <button
                    onClick={() => handleDeleteReview(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Customer Name</label>
                      <input
                        type="text"
                        value={rev.name}
                        onChange={(e) => handleReviewChange(idx, 'name', e.target.value)}
                        className={`w-full p-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1">Rating (1-5)</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={rev.rating}
                        onChange={(e) => handleReviewChange(idx, 'rating', Number(e.target.value))}
                        className={`w-full p-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Comment</label>
                    <textarea
                      rows={2}
                      value={rev.comment}
                      onChange={(e) => handleReviewChange(idx, 'comment', e.target.value)}
                      className={`w-full p-2 text-xs rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: FAQ MANAGER */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">FAQ Manager</h2>
              <button
                onClick={handleAddFaq}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B5E20] text-white font-bold text-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F9A825]" />
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {dbData.faqs.map((faq: any, idx: number) => (
                <div
                  key={faq.id || idx}
                  className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-3 relative`}
                >
                  <button
                    onClick={() => handleDeleteFaq(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Answer</label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: SEO SETTINGS */}
        {activeTab === 'seo' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4 max-w-3xl`}>
            <h2 className="text-xl font-bold">SEO & Metadata Settings</h2>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Website Meta Title</label>
              <input
                type="text"
                value={dbData.seo?.title || ''}
                onChange={(e) => handleUpdateSeo('title', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Website Description</label>
              <textarea
                rows={3}
                value={dbData.seo?.description || ''}
                onChange={(e) => handleUpdateSeo('description', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Keywords</label>
              <input
                type="text"
                value={dbData.seo?.keywords || ''}
                onChange={(e) => handleUpdateSeo('keywords', e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>
          </div>
        )}

        {/* TAB CONTENT: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            {/* Password Change */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
              <h2 className="text-xl font-bold">Change Admin Password</h2>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">New Admin Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={`w-full p-2.5 text-xs rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
              >
                Update Password
              </button>
            </div>

            {/* Backup & Restore Data */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
              <h2 className="text-xl font-bold">Backup & Restore Database</h2>
              <p className="text-xs text-gray-400">
                Export all website data to a JSON backup file or restore from a previously saved file.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1B5E20] text-white font-bold text-xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#F9A825]" />
                  Download Full JSON Backup
                </button>

                <label className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-white font-bold text-xs cursor-pointer hover:bg-gray-700 border border-gray-700">
                  <Upload className="w-4 h-4 text-amber-400" />
                  Restore JSON Backup
                  <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
