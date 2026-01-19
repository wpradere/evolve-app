'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const carouselItems = [
  {
    title: 'Maquillaje Natural de Día',
    description: 'Aprende a crear un look fresco y natural perfecto para el día a día',
    gradient: 'from-taupe-s to-nude-s',
  },
  {
    title: 'Smokey Eyes Dramático',
    description: 'Domina la técnica del difuminado perfecto para eventos especiales',
    gradient: 'from-mocha to-nude',
  },
  {
    title: 'Contorno y Iluminación',
    description: 'Esculpe y realza tus facciones como una maquilladora profesional',
    gradient: 'from-taupe-s to-nude',
  },
];

const features = [
  {
    title: 'Videos HD',
    description: 'Tutoriales en alta definición con cada detalle visible para aprender mejor',
  },
  {
    title: 'Técnicas Profesionales',
    description: 'Aprende los secretos de las maquilladoras más reconocidas de la industria',
  },
  {
    title: 'Para Todos los Niveles',
    description: 'Desde principiantes hasta avanzados, tenemos el curso perfecto para ti',
  },
];

export default function EvolvePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const moveCarousel = (direction: number) => {
    setCurrentSlide((prev) => {
      const newSlide = prev + direction;
      if (newSlide < 0) return carouselItems.length - 1;
      if (newSlide >= carouselItems.length) return 0;
      return newSlide;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-taupe-s to-nude-s text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="max-w-350 mx-auto my-12 px-[5%] text-center">
        {/* Título con efecto cristal dorado */}
        <div className="relative inline-block mx-auto mb-8">
          {/* Sombra/resplandor exterior */}
          <div className="absolute -inset-1 bg-linear-to-r from-amber-600/40 via-yellow-500/30 to-amber-700/40 rounded-full blur-xl"></div>

          {/* Contenedor principal con efecto cristal */}
          <div className="relative px-12 py-6 rounded-full bg-linear-to-br from-amber-800/60 via-amber-600/40 to-amber-900/60 backdrop-blur-md border-2 border-amber-500/50 shadow-[inset_0_2px_20px_rgba(255,215,0,0.2),0_10px_40px_rgba(0,0,0,0.3)]">
            {/* Borde interior brillante */}
            <div className="absolute inset-1 rounded-full border border-amber-400/30 pointer-events-none"></div>

            {/* Reflejo superior */}
            <div className="absolute top-2 left-8 right-8 h-4 bg-linear-to-r from-transparent via-amber-300/20 to-transparent rounded-full"></div>

            <h1 className="relative text-4xl md:text-5xl font-bold bg-linear-to-br from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
              Aprende Maquillaje como una Profesional
            </h1>
          </div>
        </div>

        <p className="text-2xl  mb-8 text-gray-700">
          Tutoriales en video paso a paso para transformar tu pasión en habilidad
        </p>
      </section>

      {/* Carousel */}
      <div className="relative max-w-[1200px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`min-w-full h-125 relative bg-linear-to-br ${item.gradient}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10">
                <h3 className="text-4xl font-bold mb-4">{item.title}</h3>
                <p className="text-xl mb-6">{item.description}</p>
                <button className="inline-block px-10 py-4 bg-linear-to-br from-black to-dorado text-white rounded-full font-semibold hover:translate-y-[-3px] hover:shadow-xl transition-all duration-300">
                  Ver Tutorial
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20">
          <button
            onClick={() => moveCarousel(-1)}
            className="bg-white/90 w-12.5 h-12.5 rounded-full text-2xl text-[#D4C5AE] hover:bg-white hover:scale-110 transition-all duration-300"
          >
            ❮
          </button>
          <button
            onClick={() => moveCarousel(1)}
            className="bg-white/90 w-12.5 h-12.5 rounded-full text-2xl text-[#D4C5AE] hover:bg-white hover:scale-110 transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="text-center mt-6">
        {carouselItems.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`inline-block h-3 rounded-full mx-1 cursor-pointer transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#D4C5AE] w-8'
                : 'bg-gray-300 w-3'
            }`}
          />
        ))}
      </div>

      {/* Features Section */}
      <section className="max-w-[1400px] mx-auto my-20 px-[5%] grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-2xl text-center shadow-lg hover:translate-y-[-10px] hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-[#D4C5AE] text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-mocha text-white text-center py-20 px-[5%] mt-20">
        <h2 className="text-4xl font-bold mb-6">Comienza Tu Transformación Hoy</h2>
        <p className="text-xl mb-8">
          Accede a más de 100 tutoriales premium y conviértete en experta
        </p>
        <button className="inline-block px-10 py-4 bg-white text-[#D4C5AE] rounded-full font-semibold hover:translate-y-[-3px] hover:shadow-xl transition-all duration-300">
          Explorar Cursos
        </button>
      </section>      
    </div>
  );
}
