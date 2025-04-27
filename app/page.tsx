"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { X } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const heroImages = [
    "/images/luci-hero.png",
    "/images/luci-hero3.png",
    "/images/luci-hero4.png",
    "/images/luci-hero5.png",
    "/images/luci-hero6.png",
    "/images/luci-hero7.png"
  ];

  // Only show animations after component mounts to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotate hero images every 5 seconds
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [mounted, heroImages.length]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const hoverCard = {
    rest: { y: 0 },
    hover: { 
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  const portfolioItems = [
    { id: 1, image: "/images/port1.png", alt: "Portrait Photography" },
    { id: 2, image: "/images/port2.png", alt: "Fashion Photography" },
    { id: 3, image: "/images/port3.png", alt: "Portrait Photography" },
    { id: 4, image: "/images/port4.png", alt: "Fashion Photography" },
    { id: 5, image: "/images/port5.png", alt: "Portrait Photography" },
    { id: 6, image: "/images/port6.png", alt: "Fashion Photography" },
  ];

  const featuredItems = [
    { id: 7, image: "/images/port7.png", alt: "Featured Portrait Work" },
    { id: 8, image: "/images/port8.png", alt: "Featured Fashion Work" },
    { id: 9, image: "/images/port9.png", alt: "Featured Portrait Work" },
    { id: 15, image: "/images/port15.png", alt: "Featured Portrait Work" },
    { id: 16, image: "/images/port16.png", alt: "Featured Fashion Work" },
    { id: 17, image: "/images/port17.png", alt: "Featured Portrait Work" },
  ];

  const additionalItems = [
    { id: 10, image: "/images/port10.png", alt: "Additional Portfolio Work" },
    { id: 11, image: "/images/port11.png", alt: "Additional Portfolio Work" },
    { id: 12, image: "/images/port12.png", alt: "Additional Portfolio Work" },
    { id: 13, image: "/images/port13.png", alt: "Additional Portfolio Work" },
    { id: 14, image: "/images/port14.png", alt: "Additional Portfolio Work" },
    { id: 18, image: "/images/port18.png", alt: "Additional Portfolio Work" },
    { id: 19, image: "/images/port19.png", alt: "Additional Portfolio Work" },
    { id: 20, image: "/images/port20.png", alt: "Additional Portfolio Work" },
  ];

  // Hidden Rome items for potential later use
  const hiddenRomeItems = [
    { id: 21, image: "/images/port21.png", alt: "Rome Photography" },
    { id: 22, image: "/images/port22.png", alt: "Rome Photography" },
    { id: 23, image: "/images/port23.png", alt: "Rome Photography" },
    { id: 24, image: "/images/port24.png", alt: "Rome Photography" },
    { id: 25, image: "/images/port25.png", alt: "Rome Photography" },
    { id: 26, image: "/images/port26.png", alt: "Rome Photography" },
  ];
  
  // Active Rome items to display
  const romeItems = [
    { id: 27, image: "/images/port27.png", alt: "Rome Photography" },
    { id: 28, image: "/images/port28.png", alt: "Rome Photography" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden">
        {/* Hero background image */}
        {mounted && (
          <div className="absolute inset-0 z-0 opacity-40">
            {heroImages.map((image, index) => (
              <Image 
                key={image}
                src={image} 
                alt={`Luci Beers hero image ${index + 1}`} 
                fill 
                className={`object-contain object-center md:object-top transition-opacity duration-1000 ${
                  index === currentHeroImage ? "opacity-100" : "opacity-0"
                }`}
                priority={index === 0}
              />
            ))}
          </div>
        )}
        
        {mounted && (
          <motion.div 
            className="text-center space-y-6 z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-tighter"
              variants={fadeIn}
            >
              <span className="text-pink">Luci</span> Beers
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-muted-foreground"
              variants={fadeIn}
            >
              Portrait & Fashion Photographer
            </motion.h2>
            
            <motion.div variants={fadeIn}>
              <span className="inline-flex items-center rounded-md bg-purple/10 px-3 py-1 text-sm font-medium text-purple ring-1 ring-inset ring-purple/20">
                British Columbia, Canada
              </span>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        {mounted && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pink">About</h2>
            <div className="space-y-4 text-lg">
              <p>
                Working professionally in Film and Television with <span className="text-muted-foreground">IATSE</span>, I bring a cinematic approach to portrait and fashion photography.
              </p>
              <p>
                I exclusively offer <span className="font-medium text-pink">VIP in-person bookings</span> for clients who appreciate attention to detail and personalized service.
              </p>
              <p className="text-muted-foreground">
                Proud supporter of Pierre Poilievre and the Conservative Party of Canada.
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {mounted && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-purple"
              variants={fadeIn}
            >
              Portfolio
            </motion.h2>
            
            {/* Main Portfolio Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {portfolioItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeIn}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div variants={hoverCard}>
                    <Card 
                      className="bg-muted/10 border-muted/20 h-80 overflow-hidden cursor-pointer"
                      onClick={() => openLightbox(item.image)}
                    >
                      <CardContent className="p-0 h-full relative">
                        <Image 
                          src={item.image} 
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Featured Portfolio Items */}
            <motion.div
              variants={fadeIn}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold text-pink">Featured Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredItems.map((item) => (
                  <Card 
                    key={item.id}
                    className="bg-muted/10 border-muted/20 overflow-hidden h-96 cursor-pointer"
                    onClick={() => openLightbox(item.image)}
                  >
                    <CardContent className="p-0 h-full relative">
                      <Image 
                        src={item.image} 
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Additional Portfolio Items */}
            <motion.div
              variants={fadeIn}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold text-purple">Additional Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {additionalItems.map((item) => (
                  <Card 
                    key={item.id}
                    className="bg-muted/10 border-muted/20 overflow-hidden aspect-square cursor-pointer"
                    onClick={() => openLightbox(item.image)}
                  >
                    <CardContent className="p-0 h-full relative">
                      <Image 
                        src={item.image} 
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Rome Portfolio Items */}
            <motion.div
              variants={fadeIn}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold text-pink">Rome</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {romeItems.map((item) => (
                  <Card 
                    key={item.id}
                    className="bg-muted/10 border-muted/20 overflow-hidden h-96 md:h-[500px] cursor-pointer"
                    onClick={() => openLightbox(item.image)}
                  >
                    <CardContent className="p-0 h-full relative">
                      <Image 
                        src={item.image} 
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 mt-auto">
        {mounted && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-sm text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} Luci Beers. All rights reserved.
          </motion.div>
        )}
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={lightboxVariants}
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 p-2 text-white hover:text-pink transition-colors z-50"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightboxImage}
                alt="Expanded portfolio image"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
