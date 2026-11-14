'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property, Agent, Review } from '@/types';
import { useApp } from '@/context/AppContext';
import ScheduleTourWidget from '@/components/property/ScheduleTourWidget';
import ContactAgentCard from '@/components/property/ContactAgentCard';
import MortgageCalculator from '@/components/property/MortgageCalculator';
import PropertyCard from '@/components/property/PropertyCard';
import InteractiveMap from '@/components/property/InteractiveMap';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  Calendar, 
  MapPin, 
  Heart, 
  SlidersHorizontal, 
  Share2, 
  Printer, 
  ShieldCheck, 
  Check, 
  Star, 
  Video, 
  Layers, 
  ChevronRight, 
  Building2, 
  Camera, 
  FileText, 
  Send 
} from 'lucide-react';

interface PropertyDetailClientProps {
  property: Property;
  agent: Agent;
  initialReviews: Review[];
  similarProperties: Property[];
}

export default function PropertyDetailClient({
  property,
  agent,
  initialReviews,
  similarProperties
}: PropertyDetailClientProps) {
  const { 
    formatPrice, 
    toggleFavorite, 
    isFavorite, 
    addToCompare, 
    removeFromCompare, 
    isInCompare 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplans' | 'virtualtour' | 'video'>('overview');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const fav = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: newReviewAuthor,
          rating: newReviewRating,
          comment: newReviewComment,
          criteria: {
            location: newReviewRating,
            value: newReviewRating,
            amenities: newReviewRating,
            agent: newReviewRating
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setReviews([data.data, ...reviews]);
        setNewReviewAuthor('');
        setNewReviewComment('');
        alert('¡Gracias! Tu reseña ha sido publicada.');
      }
    } catch (e) {
      alert('Error al publicar la reseña.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Breadcrumb & Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
              <Link href="/" className="hover:text-blue-600">Inicio</Link>
              <span>/</span>
              <Link href="/properties" className="hover:text-blue-600">Propiedades</Link>
              <span>/</span>
              <span className="text-gray-700 font-semibold">{property.address.city}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{property.address.street}, {property.address.city}, {property.address.zipCode}, {property.address.country}</span>
              <span>•</span>
              <span className="font-mono text-gray-400">Ref: {property.propertyCode}</span>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-col md:items-end justify-between gap-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0054a6]">
              {formatPrice(property.price, property.priceSuffix)}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(property.id)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition ${
                  fav ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{fav ? 'Guardado' : 'Favorito'}</span>
              </button>

              <button
                onClick={() => compared ? removeFromCompare(property.id) : addToCompare(property.id)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition ${
                  compared ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">{compared ? 'Comparando' : 'Comparar'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{copyFeedback ? '¡Copiado!' : 'Compartir'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-3">
          <div className="relative h-[380px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img 
              src={property.images[activeImageIndex] || property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {property.featured && (
                <span className="bg-[#0054a6] text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                  DESTACADO
                </span>
              )}
              <span className={`text-white text-xs font-bold px-3 py-1 rounded-md shadow ${
                property.status === 'for-sale' ? 'bg-emerald-600' : 'bg-amber-600'
              }`}>
                {property.status === 'for-sale' ? 'EN VENTA' : 'EN RENTA'}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg flex items-center space-x-1.5">
              <Camera className="w-4 h-4" />
              <span>Foto {activeImageIndex + 1} de {property.images.length}</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {property.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                    activeImageIndex === i ? 'border-[#0054a6] ring-2 ring-blue-300' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Details, Specs, Amenities, Floorplans, Tour, Mortgage, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Key Metric Cards */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Resumen de la Propiedad
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-base font-black text-gray-900">{property.bedrooms}</p>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Habitaciones</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Bath className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-base font-black text-gray-900">{property.bathrooms}</p>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Baños</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Maximize2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-base font-black text-gray-900">{property.areaM2} m²</p>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Superficie</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Car className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-base font-black text-gray-900">{property.garages}</p>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase">Garajes</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                Descripción
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Property Specifications Table */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Detalles Técnicos & Ficha
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">ID de Referencia:</span>
                  <span className="font-bold text-gray-900 font-mono">{property.propertyCode}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Tipo de Inmueble:</span>
                  <span className="font-bold text-gray-900 capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Estado:</span>
                  <span className="font-bold text-emerald-600 uppercase">{property.status === 'for-sale' ? 'En Venta' : 'En Renta'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Año de Construcción:</span>
                  <span className="font-bold text-gray-900">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Superficie Terreno:</span>
                  <span className="font-bold text-gray-900">{property.lotSizeM2 ? `${property.lotSizeM2} m²` : 'N/D'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Gastos Comunidad / HOA:</span>
                  <span className="font-bold text-gray-900">{property.hoaFee ? `${property.hoaFee} €/mes` : 'Incluidos'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Eficiencia Energética:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{property.energyRating || 'A+'}</span>
                </div>
              </div>
            </div>

            {/* Amenities & Features */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Características & Comodidades
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor Plans Section (Houzez Interactive Accordion) */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Planos de Planta Arquitectónicos
                </h3>
                <div className="space-y-4">
                  {property.floorPlans.map((plan) => (
                    <div key={plan.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200">
                        <span className="text-sm font-bold text-gray-900">{plan.title}</span>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span>{plan.size}</span>
                          <span>{plan.bedrooms} Habitaciones</span>
                          <span>{plan.bathrooms} Baños</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <p className="text-xs text-gray-600 mb-3">{plan.description}</p>
                        <img 
                          src={plan.planImage} 
                          alt={plan.title}
                          className="w-full h-64 object-cover rounded-lg border border-gray-100" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Tour & Video Section */}
            {(property.virtualTourUrl || property.videoTourUrl) && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Tour Virtual & Video Recorrido
                </h3>
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center text-white relative">
                    <img 
                      src={property.images[1] || property.images[0]} 
                      alt="Virtual Tour preview" 
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute text-center p-4">
                      <Video className="w-12 h-12 mx-auto mb-2 text-rose-500 animate-pulse" />
                      <p className="text-sm font-bold">Recorrido Virtual 3D y Video Walkthrough</p>
                      <p className="text-xs text-gray-300 mt-1">Disponible para visitas virtuales guiadas</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mortgage Calculator Component */}
            <MortgageCalculator initialPrice={property.price} hoaFee={property.hoaFee} />

            {/* Location & Map */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Ubicación & Entorno
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                {property.address.street}, {property.address.city}, {property.address.state}, {property.address.country}
              </p>
              <div className="h-72 rounded-xl overflow-hidden">
                <InteractiveMap properties={[property]} selectedPropertyId={property.id} />
              </div>
            </div>

            {/* Property Reviews & Rating System */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Reseñas de Clientes</h3>
                  <p className="text-xs text-gray-500">{reviews.length} valoraciones verificadas</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500 font-black text-lg">
                  <Star className="w-5 h-5 fill-current" />
                  <span>5.0</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img 
                          src={rev.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'} 
                          alt={rev.authorName}
                          className="w-8 h-8 rounded-full object-cover" 
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">{rev.authorName}</p>
                          <p className="text-[10px] text-gray-400">{new Date(rev.createdAt).toLocaleDateString('es-ES')}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-gray-800 uppercase">Escribir una Reseña</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-gray-800"
                  >
                    <option value="5">★★★★★ (5 estrellas - Excelente)</option>
                    <option value="4">★★★★☆ (4 estrellas - Muy buena)</option>
                    <option value="3">★★★☆☆ (3 estrellas - Normal)</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Comparte tu opinión sobre los acabados, la ubicación o la atención recibida..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  {isSubmittingReview ? 'Publicando...' : 'Publicar Reseña'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column (1 Col Sticky): Schedule Tour & Contact Agent */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Houzez Schedule Tour Form */}
              <ScheduleTourWidget property={property} agent={agent} />

              {/* Houzez Contact Agent Card */}
              <ContactAgentCard agent={agent} property={property} />
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-gray-200 space-y-6">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                Propiedades Similares que Podrían Interesarte
              </h3>
              <p className="text-xs text-gray-500">Inmuebles relacionados por categoría y ubicación</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} agent={agent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
