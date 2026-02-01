'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollDrivenHero from '@/components/ScrollDrivenHero';

const carouselItems = [
  {
    title: 'Maquillaje Natural de Día',
    description: 'Aprende a crear un look fresco y natural perfecto para el día a día',
    video: '/video1.webp',
  },
  {
    title: 'Smokey Eyes Dramático',
    description: 'Domina la técnica del difuminado perfecto para eventos especiales',
    video: '/video2.webp',
  },
  {
    title: 'Contorno y Iluminación',
    description: 'Esculpe y realza tus facciones como una maquilladora profesional',
    video: '/video3.webp',
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
    <div className="bg-linear-to-br from-taupe-s to-nude-s text-gray-800 font-sans ">
      {/* Hero Section - Scroll Driven Animation */}
      <ScrollDrivenHero
        frameCount={192}
        framePath="/frames/frame"
        frameExtension="gif"
      />

      {/* Spacing */}
      <div id="about" className="py-20 scroll-mt-24"></div>

      {/* Carousel */}
      <div className="relative max-w-300 mx-auto overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="min-w-full h-125 relative bg-black flex items-center justify-center"
            >
              {/* Video/Image centrado */}
              <img
                src={item.video}
                alt={item.title}
                className="h-full w-auto object-contain"
              />
              {/* Overlay con información */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10">
                <h3 className="text-4xl font-bold mb-4 text-crema">{item.title}</h3>
                <p className="text-xl mb-6">{item.description}</p>
                <button className="inline-block px-10 py-4 bg-dorado text-white rounded-full font-semibold hover:translate-y-[-3px] hover:shadow-xl hover:bg-amber-500 transition-all duration-300">
                  Reservar cita
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20">
          <button
            onClick={() => moveCarousel(-1)}
            className="bg-dorado w-12.5 h-12.5 rounded-full text-2xl text-white hover:bg-amber-500 hover:scale-110 transition-all duration-300 shadow-lg"
          >
            ❮
          </button>
          <button
            onClick={() => moveCarousel(1)}
            className="bg-dorado w-12.5 h-12.5 rounded-full text-2xl text-white hover:bg-amber-500 hover:scale-110 transition-all duration-300 shadow-lg"
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
            <h3 className="text-dorado text-2xl font-bold mb-4">{feature.title}</h3>
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-9 h-9"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
