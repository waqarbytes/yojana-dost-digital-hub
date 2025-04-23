
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServiceCard } from "@/components/ui/service-card";
import { Shield, BookOpen, Heart, Car, GraduationCap, Home } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Legal Services",
      description: "Access legal aid and documentation services",
      icon: <Shield className="h-6 w-6" />,
      href: "/services/legal"
    },
    {
      title: "Education",
      description: "Scholarships and educational programs",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/services/education"
    },
    {
      title: "Healthcare",
      description: "Health insurance and medical benefits",
      icon: <Heart className="h-6 w-6" />,
      href: "/services/healthcare"
    },
    {
      title: "Transport",
      description: "Vehicle registration and licenses",
      icon: <Car className="h-6 w-6" />,
      href: "/services/transport"
    },
    {
      title: "Skill Development",
      description: "Training and certification programs",
      icon: <GraduationCap className="h-6 w-6" />,
      href: "/services/skills"
    },
    {
      title: "Housing",
      description: "Housing schemes and property services",
      icon: <Home className="h-6 w-6" />,
      href: "/services/housing"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
