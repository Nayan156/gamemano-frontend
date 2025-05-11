'use client';

import { useState, useEffect } from 'react';

export default function Carousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Slide auto‐advance
  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  // Track viewport width
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768); // mobile if <768px
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Dots
  const dots = (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === index ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  );

  if (isMobile) {
    // === MOBILE VIEW ===
    // return (
    //   <div className="relative w-full h-[400px] overflow-hidden bg-black text-white">
    //     {slides.map((slide, i) => (
    //       <div
    //         key={slide.id}
    //         className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
    //           i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
    //         }`}
    //       >
    //         {/* Background Image */}
    //         <div className="absolute top-0 left-0">
    //           <img
    //             src={slide.images?.[0] ?? '/fallback.jpg'}
    //             alt={slide.title}
    //             width={300}
    //             height={"full"}
    //             onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
    //           />
    //         </div>
    
    //         {/* Gradient Overlay */}
    //         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    
    //         {/* Text Content */}
    //         <div className="absolute bottom-4 left-4 right-4 z-20 max-w-[340px]">
    //           <h2 className="text-[18px] font-semibold mb-1 leading-tight line-clamp-2">
    //             {slide.title}
    //           </h2>
    //           {slide.description && (
    //             <p className="text-sm text-gray-200 leading-snug line-clamp-3 max-w-[320px]">
    //               {slide.description}
    //             </p>
    //           )}
    //         </div>
    //       </div>
    //     ))}
    
    //     {/* Dots */}
    //     <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
    //       {slides.map((_, i) => (
    //         <button
    //           key={i}
    //           onClick={() => setIndex(i)}
    //           className={`w-2.5 h-2.5 rounded-full ${
    //             i === index ? 'bg-white' : 'bg-gray-400'
    //           }`}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // );

    return (
      <div className="relative w-full h-[400px] overflow-hidden bg-black text-white">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
              <img
                src={slide.images?.[0] ?? '/fallback.jpg'}
                alt={slide.title}
                width={380}
                height={"full"}
                onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
                // className="w-full h-full object-cover object-center"
              />
            </div>
    
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
    
            {/* Text Content */}
            <div className="absolute bottom-4 left-4 right-4 z-20 max-w-[340px]">
              <h2 className="text-[18px] font-semibold mb-1 leading-tight line-clamp-2">
                {slide.title}
              </h2>
              {slide.description && (
                <p className="text-sm text-gray-200 leading-snug line-clamp-3 max-w-[320px]">
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        ))}
    
        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === index ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
    
    
    
    
  } else {
    // --- DESKTOP LAYOUT ---
    return (
      // <div className="relative w-full h-100 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-black/30">
      <div className="relative w-full h-[703px] overflow-hidden bg-black/55">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.images?.[0] ?? '/fallback.jpg'}
              alt={slide.title}
              onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-24 left-8 text-white">
              <h2 className="text-7xl font-bold">{slide.title}</h2>
              <p className="mt-5 text-2xl w-[900px] leading-relaxed">{slide.description ?? slide.category}</p>
            </div>
          </div>
        ))}
  
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === index ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }
}
