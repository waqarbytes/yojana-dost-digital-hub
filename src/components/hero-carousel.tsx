
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const carouselData = [
  {
    id: 1,
    title: "Find All Government Schemes in One Place",
    description: "Access hundreds of central and state government schemes designed for citizens",
    buttonText: "Explore Schemes",
    buttonLink: "/schemes",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Check Your Eligibility for Schemes",
    description: "Find out which government schemes you qualify for based on your profile",
    buttonText: "Check Eligibility",
    buttonLink: "/eligibility",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "All Digital Services at Your Fingertips",
    description: "Access government services, submit applications, and track status online",
    buttonText: "View Services",
    buttonLink: "/services",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="relative w-full overflow-hidden h-[300px] md:h-[450px]">
      {/* Slides */}
      {carouselData.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white p-6">
            <div className="max-w-3xl text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="text-sm md:text-lg mb-6 max-w-2xl mx-auto">{slide.description}</p>
              <Button asChild size="lg">
                <a href={slide.buttonLink}>{slide.buttonText}</a>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white scale-110" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
