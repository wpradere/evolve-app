'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollDrivenHeroProps {
  frameCount: number;
  framePath: string; // e.g., "/frames/frame" -> /frames/frame-001.gif, /frames/frame-002.gif, etc.
  frameExtension?: string;
}

export default function ScrollDrivenHero({
  frameCount,
  framePath,
  frameExtension = 'gif',
}: ScrollDrivenHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Preload all frames
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];

      for (let i = 1; i <= frameCount; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image();
          const frameNumber = String(i).padStart(3, '0');
          img.src = `${framePath}-${frameNumber}.${frameExtension}`;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
        imagePromises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading frames:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [frameCount, framePath, frameExtension]);

  // Handle scroll and draw frame
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !container || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on wrapper
    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const drawFrame = (frameIndex: number) => {
      if (!images[frameIndex]) return;

      const img = images[frameIndex];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to cover the canvas (like object-cover)
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (containerHeight - window.innerHeight))
      );

      const frameIndex = Math.min(
        Math.floor(scrollProgress * images.length),
        images.length - 1
      );

      drawFrame(frameIndex);
    };

    resizeCanvas();
    drawFrame(0); // Draw first frame initially

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      resizeCanvas();
      handleScroll();
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [images]);

  return (
    <section ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black">
        <div ref={wrapperRef} className="max-w-3xl w-full h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-dorado border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
