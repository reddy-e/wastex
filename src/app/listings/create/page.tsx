'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/lib/store';
import { WasteCategoryType } from '@/lib/types';
import { 
  CheckCircle2, 
  Cpu, 
  Leaf, 
  ArrowRight, 
  ArrowLeft, 
  UploadCloud, 
  MapPin, 
  ShieldAlert, 
  Tag, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const { addListing, currentUser } = useAppState();

  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [type, setType] = useState<WasteCategoryType>('E_WASTE');
  const [categoryName, setCategoryName] = useState<string>('Computer Motherboards & PCBs');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [unit, setUnit] = useState<string>('kg');
  const [condition, setCondition] = useState<string>('Scrap / Parts Only');
  const [source, setSource] = useState<string>('IT Office Upgrade');
  const [availabilityDate, setAvailabilityDate] = useState<string>('2026-09-06');
  const [expiryDate, setExpiryDate] = useState<string>('');
  
  // Location
  const [address, setAddress] = useState<string>(currentUser.address || 'Tech Park Gate 2');
  const [city, setCity] = useState<string>(currentUser.city || 'Hyderabad');
  const [area, setArea] = useState<string>(currentUser.area || 'Financial District');

  // Images
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  ]);

  // Options
  const [preferredCollection, setPreferredCollection] = useState<'Self Drop-off' | 'Pickup Required' | 'Both'>('Pickup Required');
  const [isFree, setIsFree] = useState<boolean>(false);
  const [expectedPrice, setExpectedPrice] = useState<string>('15000');

  // Organic specific
  const [contaminationStatus, setContaminationStatus] = useState<'None' | 'Minor Organic Mix' | 'Non-Hazardous'>('None');
  const [suitableUse, setSuitableUse] = useState<'Composting' | 'Biogas' | 'Agricultural Soil Conditioning' | 'Industrial Recovery'>('Composting');
  const [safetyDisclaimerAccepted, setSafetyDisclaimerAccepted] = useState<boolean>(true);

  const handleNext = () => {
    setError(null);
    if (step === 2) {
      if (!title.trim() || !description.trim() || !quantity) {
        setError('Please fill in all required waste title, description, and quantity fields.');
        return;
      }
    }
    if (step === 3) {
      if (!address || !city || !area) {
        setError('Please complete the address and location fields.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 8));
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = () => {
    const newListing = addListing({
      type,
      categoryName,
      title,
      description,
      quantity: parseFloat(quantity) || 10,
      unit,
      condition,
      source,
      availabilityDate,
      expiryDate: expiryDate || undefined,
      address,
      city,
      area,
      distanceKm: Math.floor(Math.random() * 5) + 1,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80'],
      preferredCollection,
      expectedPrice: isFree ? undefined : (parseFloat(expectedPrice) || undefined),
      isFree,
      contaminationStatus: type === 'ORGANIC_WASTE' ? contaminationStatus : undefined,
      suitableUse: type === 'ORGANIC_WASTE' ? suitableUse : undefined,
      safetyDisclaimerAccepted: type === 'ORGANIC_WASTE' ? safetyDisclaimerAccepted : undefined,
    });

    router.push(`/listings/${newListing.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
      {/* Header & Step Tracker */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Multi-Step Publishing Wizard</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Create Waste Listing</h1>
        </div>

        {/* Progress step dots */}
        <div className="flex items-center justify-between gap-1 border-b border-slate-200 pb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  s === step
                    ? 'bg-[#0F382C] text-white ring-4 ring-emerald-100'
                    : s < step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              <span className="text-[9px] font-semibold text-slate-400 mt-1 hidden sm:block">
                Step {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP CONTENT PANELS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 1: Select Waste Category</h3>
            <p className="text-xs text-slate-500">Choose the primary stream for your waste material.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setType('E_WASTE');
                  setCategoryName('Computer Motherboards & PCBs');
                  setIsFree(false);
                }}
                className={`p-5 rounded-xl border-2 text-left space-y-2 transition-all ${
                  type === 'E_WASTE'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Cpu className={`w-8 h-8 ${type === 'E_WASTE' ? 'text-blue-600' : 'text-slate-400'}`} />
                <h4 className="font-bold text-sm">Electronic Waste (E-Waste)</h4>
                <p className="text-xs text-slate-500">Servers, laptops, circuit boards, cables, printers, electronic parts.</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('ORGANIC_WASTE');
                  setCategoryName('Vegetable Trimmings & Kitchen Organic Scrap');
                  setIsFree(true);
                }}
                className={`p-5 rounded-xl border-2 text-left space-y-2 transition-all ${
                  type === 'ORGANIC_WASTE'
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Leaf className={`w-8 h-8 ${type === 'ORGANIC_WASTE' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <h4 className="font-bold text-sm">Organic / Vegetable Waste</h4>
                <p className="text-xs text-slate-500">Vegetable peelings, market leftovers, spent coffee, agricultural waste.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WASTE INFORMATION */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 2: Waste Details</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Listing Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 50 kg Dismantled Server Motherboards"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  placeholder="Describe material condition, origin, components..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity *</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="50"
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="tons">Metric Tons</option>
                    <option value="units">Units / Pieces</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Condition</label>
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source Origin</label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="e.g. IT Office / Hotel Kitchen"
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              {type === 'ORGANIC_WASTE' && (
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
                  <span className="font-bold text-emerald-900 block">Organic Classification & Safety</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-emerald-800 font-bold block">Suitable Use</label>
                      <select
                        value={suitableUse}
                        onChange={(e) => setSuitableUse(e.target.value as any)}
                        className="w-full p-1.5 rounded border border-emerald-300 text-xs"
                      >
                        <option value="Composting">Vermicomposting</option>
                        <option value="Biogas">Biogas Energy</option>
                        <option value="Agricultural Soil Conditioning">Soil Structure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-emerald-800 font-bold block">Contamination</label>
                      <select
                        value={contaminationStatus}
                        onChange={(e) => setContaminationStatus(e.target.value as any)}
                        className="w-full p-1.5 rounded border border-emerald-300 text-xs"
                      >
                        <option value="None">None (Pure Segregated)</option>
                        <option value="Minor Organic Mix">Minor Organic Mix</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 3: Pickup Location</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pickup Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Area / Locality *</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: UPLOAD IMAGES */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 4: Upload Waste Photos</h3>
            <div className="border-2 border-dashed border-slate-300 p-8 rounded-xl text-center space-y-2 bg-slate-50">
              <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Sample image uploaded automatically</p>
              <span className="text-[10px] text-slate-400">1 photo attached</span>
            </div>
            {images.length > 0 && (
              <div className="flex gap-2">
                <img src={images[0]} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
              </div>
            )}
          </div>
        )}

        {/* STEP 5: PREFERRED COLLECTION METHOD */}
        {step === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 5: Preferred Collection Method</h3>
            <div className="grid grid-cols-3 gap-3 text-xs font-bold">
              {['Pickup Required', 'Self Drop-off', 'Both'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPreferredCollection(method as any)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    preferredCollection === method
                      ? 'border-[#0F382C] bg-emerald-50 text-[#0F382C]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: EXPECTED PRICE / FREE */}
        {step === 6 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 6: Pricing & Terms</h3>
            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600"
                />
                <span>Offer material for FREE (Community / Organic Exchange)</span>
              </label>

              {!isFree && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Expected Reserve Price (₹)</label>
                  <input
                    type="number"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW */}
        {step === 7 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900">Step 7: Review Information</h3>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs border border-slate-200">
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Category:</strong> {type}</p>
              <p><strong>Quantity:</strong> {quantity} {unit}</p>
              <p><strong>Location:</strong> {address}, {area}, {city}</p>
              <p><strong>Price:</strong> {isFree ? 'FREE' : `₹${expectedPrice}`}</p>
            </div>
          </div>
        )}

        {/* STEP 8: PUBLISH */}
        {step === 8 && (
          <div className="space-y-4 text-center py-4 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900">Ready to Publish</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your listing will be instantly analyzed by the Smart Match Engine for compatible local buyers.
            </p>
            <button
              onClick={handlePublish}
              className="px-8 py-3.5 rounded-xl bg-[#0F382C] hover:bg-[#154a3b] text-white font-extrabold text-xs shadow-lg transition-all"
            >
              Publish Listing Now
            </button>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        {step < 8 && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-lg bg-[#0F382C] hover:bg-[#154a3b] text-white text-xs font-semibold shadow transition-all flex items-center gap-1"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
