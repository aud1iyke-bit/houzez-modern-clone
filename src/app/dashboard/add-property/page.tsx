'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  Image as ImageIcon, 
  ListPlus, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  Info
} from 'lucide-react';
import { PropertyType, PropertyStatus } from '@/types';

export default function AddPropertyPage() {
  const router = useRouter();
  const { currentUser } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  // Step 1: Basic Info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<PropertyType>('villa');
  const [status, setStatus] = useState<PropertyStatus>('for-sale');
  const [price, setPrice] = useState('');
  const [priceSuffix, setPriceSuffix] = useState('');

  // Step 2: Media
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [virtualTourUrl, setVirtualTourUrl] = useState('');
  const [videoTourUrl, setVideoTourUrl] = useState('');

  // Step 3: Specifications
  const [bedrooms, setBedrooms] = useState('4');
  const [bathrooms, setBathrooms] = useState('4');
  const [garages, setGarages] = useState('2');
  const [areaM2, setAreaM2] = useState('350');
  const [lotSizeM2, setLotSizeM2] = useState('800');
  const [yearBuilt, setYearBuilt] = useState('2024');
  const [energyRating, setEnergyRating] = useState<'A+' | 'A' | 'B' | 'C' | 'D'>('A+');
  const [hoaFee, setHoaFee] = useState('180');

  // Step 4: Amenities
  const allAmenities = [
    'Piscina Infinity',
    'Aire Acondicionado Central',
    'Calefacción Suelo Radiante',
    'Gimnasio Privado',
    'Spa & Sauna',
    'Vistas al Mar',
    'Domótica Smart Home',
    'Seguridad 24/7',
    'Ascensor Privado',
    'Terraza Panorámica',
    'Zona BBQ',
    'Jardín Paisajístico',
    'Garaje Subterráneo',
    'Bodega Climatizada',
    'Paneles Solares',
    'Chimenea'
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Piscina Infinity',
    'Aire Acondicionado Central',
    'Seguridad 24/7',
    'Garaje Subterráneo'
  ]);

  // Step 5: Location
  const [street, setStreet] = useState('Avenida de las Palmas 14');
  const [city, setCity] = useState('Madrid');
  const [state, setState] = useState('Comunidad de Madrid');
  const [zipCode, setZipCode] = useState('28046');
  const [country, setCountry] = useState('España');
  const [lat, setLat] = useState('40.4168');
  const [lng, setLng] = useState('-3.7038');

  // Step 6: Floor Plans
  const [floorPlans, setFloorPlans] = useState([
    {
      id: 'fp-1',
      title: 'Planta Principal y Salón',
      bedrooms: 2,
      bathrooms: 2,
      size: '200 m²',
      planImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
      description: 'Salón con cocina abierta y salida al porche con piscina.'
    }
  ]);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanSize, setNewPlanSize] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddPlan = () => {
    if (newPlanTitle.trim()) {
      setFloorPlans([
        ...floorPlans,
        {
          id: `fp-${Date.now()}`,
          title: newPlanTitle,
          size: newPlanSize || '150 m²',
          bedrooms: 2,
          bathrooms: 2,
          planImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
          description: 'Distribución espaciosa con acabados de primera calidad.'
        }
      ]);
      setNewPlanTitle('');
      setNewPlanSize('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        title,
        description,
        type,
        status,
        price: Number(price),
        priceSuffix,
        featured: true,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        garages: Number(garages),
        areaM2: Number(areaM2),
        lotSizeM2: lotSizeM2 ? Number(lotSizeM2) : undefined,
        yearBuilt: Number(yearBuilt),
        energyRating,
        hoaFee: hoaFee ? Number(hoaFee) : 0,
        address: {
          street,
          city,
          state,
          zipCode,
          country,
          lat: Number(lat),
          lng: Number(lng)
        },
        amenities: selectedAmenities,
        images: images.length > 0 ? images : [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        floorPlans,
        virtualTourUrl,
        videoTourUrl,
        agentId: currentUser.agentId || 'agent-1'
      };

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        alert('¡Propiedad publicada con éxito en el catálogo!');
        router.push(`/property/${data.data.id}`);
      } else {
        alert(data.error || 'Error al publicar la propiedad');
      }
    } catch (err) {
      alert('Error de conexión al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Información Básica', icon: Building2 },
    { num: 2, title: 'Fotos & Multimedia', icon: ImageIcon },
    { num: 3, title: 'Especificaciones', icon: ListPlus },
    { num: 4, title: 'Comodidades', icon: Sparkles },
    { num: 5, title: 'Ubicación', icon: MapPin },
    { num: 6, title: 'Planos & Publicar', icon: Layers },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Publicar Nuevo Inmueble (Houzez Wizard)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Asistente paso a paso de publicación de propiedades con especificaciones técnicas completas
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {steps.map((s) => {
            const Icon = s.icon;
            const isDone = s.num < currentStep;
            const isCurrent = s.num === currentStep;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className={`p-2 rounded-xl text-center flex flex-col items-center space-y-1 transition ${
                  isCurrent
                    ? 'bg-blue-50 border border-blue-400 text-blue-700 font-bold'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                  isCurrent ? 'bg-[#0054a6] text-white' : isDone ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {isDone ? '✓' : s.num}
                </div>
                <span className="text-[10px] truncate max-w-full font-semibold">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              Paso 1: Información Principal
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Título del Anuncio *</label>
              <input
                type="text"
                required
                placeholder="Ej. Villa de Vanguardia con Vistas al Mar y Piscina Desbordante"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tipo de Propiedad</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 font-semibold"
                >
                  <option value="villa">Villa de Lujo</option>
                  <option value="penthouse">Ático / Penthouse</option>
                  <option value="apartment">Piso / Apartamento</option>
                  <option value="house">Casa Familiar</option>
                  <option value="office">Oficina Comercial</option>
                  <option value="studio">Estudio / Loft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Estado de la Operación</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 font-semibold"
                >
                  <option value="for-sale">En Venta</option>
                  <option value="for-rent">En Renta / Alquiler</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Precio (€ o $) *</label>
                <input
                  type="number"
                  required
                  placeholder="2450000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sufijo del Precio (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. /mes, /temporada"
                  value={priceSuffix}
                  onChange={(e) => setPriceSuffix(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Descripción Detallada *</label>
              <textarea
                rows={5}
                required
                placeholder="Describe los espacios, la orientación solar, la calidad de los materiales, vistas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 leading-relaxed"
              ></textarea>
            </div>
          </div>
        )}

        {/* Step 2: Media */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              Paso 2: Galería de Fotos & Tours Virtuales
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Añadir URL de Imagen (Alta Resolución)</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>

            {/* Images Preview List */}
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Imágenes en la Galería ({images.length}):</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden h-28 border border-gray-200 shadow-sm">
                    <img src={img} alt={`foto-${i}`} className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                        Foto Principal
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Enlace Tour Virtual 360 (Matterport / 360)</label>
                <input
                  type="url"
                  placeholder="https://my.matterport.com/show/?m=..."
                  value={virtualTourUrl}
                  onChange={(e) => setVirtualTourUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Enlace Video Walkthrough (YouTube / Vimeo)</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoTourUrl}
                  onChange={(e) => setVideoTourUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Specifications */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              Paso 3: Características & Especificaciones
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Habitaciones</label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Baños</label>
                <input
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Garajes</label>
                <input
                  type="number"
                  min="0"
                  value={garages}
                  onChange={(e) => setGarages(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Superficie (m²)</label>
                <input
                  type="number"
                  min="0"
                  value={areaM2}
                  onChange={(e) => setAreaM2(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Superficie Parcela (m²)</label>
                <input
                  type="number"
                  min="0"
                  value={lotSizeM2}
                  onChange={(e) => setLotSizeM2(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Año Construcción</label>
                <input
                  type="number"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Eficiencia Energética</label>
                <select
                  value={energyRating}
                  onChange={(e) => setEnergyRating(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-emerald-600"
                >
                  <option value="A+">Clase A+ (Máxima)</option>
                  <option value="A">Clase A</option>
                  <option value="B">Clase B</option>
                  <option value="C">Clase C</option>
                  <option value="D">Clase D</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Comunidad (€/mes)</label>
                <input
                  type="number"
                  value={hoaFee}
                  onChange={(e) => setHoaFee(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Amenities */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              Paso 4: Comodidades & Extras
            </h3>
            <p className="text-xs text-gray-500">Selecciona los servicios y comodidades que incluye el inmueble:</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {allAmenities.map((amenity) => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-3 rounded-xl border text-xs text-left transition flex items-center justify-between ${
                      checked
                        ? 'bg-blue-50 border-blue-400 text-blue-800 font-bold'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{amenity}</span>
                    {checked && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Location */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              Paso 5: Ubicación Geográfica
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Calle y Número *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ciudad *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Provincia / Región</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Código Postal</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">País</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Latitud (Coordenada)</label>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Longitud (Coordenada)</label>
                <input
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Floor Plans & Final Submit */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
              Paso 6: Planos Arquitectónicos y Publicación
            </h3>

            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-700 uppercase">Añadir Plano de Planta</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Título del plano (ej. Planta Primera)"
                  value={newPlanTitle}
                  onChange={(e) => setNewPlanTitle(e.target.value)}
                  className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Superficie (ej. 180 m²)"
                  value={newPlanSize}
                  onChange={(e) => setNewPlanSize(e.target.value)}
                  className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddPlan}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  + Añadir Plano
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {floorPlans.map((fp, i) => (
                  <div key={fp.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-200 text-xs">
                    <div>
                      <span className="font-bold text-gray-900">{fp.title}</span>
                      <span className="text-gray-500 ml-2">({fp.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFloorPlans(floorPlans.filter((_, idx) => idx !== i))}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Check card */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1 mt-4">
              <p className="font-bold">Todo listo para publicar en Houzez</p>
              <p className="text-blue-700">
                Al confirmar, el inmueble se indexará instantáneamente en el catálogo, en la búsqueda split en mapa y estará disponible para recibir prospectos en el CRM.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              currentStep === 1
                ? 'opacity-40 text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Paso Anterior</span>
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
              className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
            >
              <span>Siguiente Paso</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ff5a5f] hover:bg-[#e0484d] text-white text-xs font-bold px-8 py-3 rounded-xl transition shadow-lg flex items-center space-x-2"
            >
              {isSubmitting ? (
                <span>Publicando en Catálogo...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmar & Publicar Inmueble</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
