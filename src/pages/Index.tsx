import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StatisticsCard } from "@/components/ui/statistics-card";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, ArrowRight, Book, Briefcase, Bus, FileText, Home, Shield, Rotate3D, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useStatisticsStore } from "@/services/statisticsService";
import { useEffect, useState } from "react";
import { VoiceAssistant } from "@/components/VoiceAssistant";

// Mock data for statistics
const statisticsData = [
  { title: "Central Departments", value: "36", subtitle: "Ministries" },
  { title: "State Departments", value: "96", subtitle: "Across all states" },
  { title: "Services", value: "428", subtitle: "Central & State combined" },
  { title: "Total Registrations", value: "13.6M", subtitle: "Growing daily" },
];

// Mock data for latest services
const latestServices = [
  { title: "RTO Services", icon: <Bus className="h-6 w-6" />, description: "License, registration, and permit services" },
  { title: "PM Kisan Updates", icon: <Activity className="h-6 w-6" />, description: "Latest updates on PM Kisan scheme" },
  { title: "Land Records", icon: <FileText className="h-6 w-6" />, description: "Online access to land records" },
  { title: "Birth Certificate", icon: <FileText className="h-6 w-6" />, description: "Apply for birth certificates online" }
];

// Mock data for popular services
const popularServices = [
  { title: "Aadhaar Services", icon: <Users className="h-6 w-6" />, description: "Update and manage Aadhaar" },
  { title: "PAN Services", icon: <FileText className="h-6 w-6" />, description: "Apply and link PAN card" },
  { title: "Scholarship Portal", icon: <Book className="h-6 w-6" />, description: "Apply for educational scholarships" },
  { title: "EPFO Services", icon: <Briefcase className="h-6 w-6" />, description: "EPF withdrawals and claims" }
];

// Mock data for trending services
const trendingServices = [
  { title: "COVID Certificate", icon: <Activity className="h-6 w-6" />, description: "Download vaccination certificates" },
  { title: "Passport Services", icon: <FileText className="h-6 w-6" />, description: "Apply and track passport applications" },
  { title: "DigiLocker", icon: <FileText className="h-6 w-6" />, description: "Access your documents online" },
  { title: "Income Tax Filing", icon: <TrendingUp className="h-6 w-6" />, description: "E-file your income tax returns" }
];

// Mock data for state services
const stateServices = {
  delhi: [
    { title: "Delhi Transport", icon: <Bus className="h-6 w-6" /> },
    { title: "Delhi Jal Board", icon: <Activity className="h-6 w-6" /> },
  ],
  gujarat: [
    { title: "Gujarat Land Records", icon: <FileText className="h-6 w-6" /> },
    { title: "Gujarat Health", icon: <Activity className="h-6 w-6" /> },
  ],
  maharashtra: [
    { title: "MAHA Help", icon: <Users className="h-6 w-6" /> },
    { title: "Maharashtra RTO", icon: <Bus className="h-6 w-6" /> },
  ],
  telangana: [
    { title: "T-Wallet", icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Telangana Police", icon: <Shield className="h-6 w-6" /> },
  ],
};

// Mock data for categories
const categoryData = [
  {
    title: "Travel",
    icon: <Rotate3D className="h-8 w-8" />,
    description: "Passport, visa, flight bookings",
  },
  {
    title: "Health & Wellness",
    icon: <Activity className="h-8 w-8" />,
    description: "Medical records, hospital appointments",
  },
  {
    title: "Police & Legal",
    icon: <Shield className="h-8 w-8" />,
    description: "FIR, complaint status, legal aid",
  },
  {
    title: "Mera Ration",
    icon: <Home className="h-8 w-8" />,
    description: "Ration card services, PDS allocations",
  },
  {
    title: "Transport",
    icon: <Bus className="h-8 w-8" />,
    description: "Vehicle registration, licenses, permits",
  },
  {
    title: "Education & Employment",
    icon: <Book className="h-8 w-8" />,
    description: "Scholarships, job listings, certifications",
  },
];

// Benefits data
const benefitsData = [
  {
    title: "All Services in One Place",
    description: "Access hundreds of government services through a single platform",
    icon: <Home className="h-8 w-8 text-primary" />,
  },
  {
    title: "All Documents at One Place",
    description: "Store and access your important documents securely anytime, anywhere",
    icon: <FileText className="h-8 w-8 text-primary" />,
  },
  {
    title: "All Transactions",
    description: "Complete transactions securely and track history with ease",
    icon: <Activity className="h-8 w-8 text-primary" />,
  },
  {
    title: "All Engagements",
    description: "Engage with government services efficiently and transparently",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
];

export default function Index() {
  const { stats, incrementRegistrations } = useStatisticsStore();
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  // Simulate periodic updates
  useEffect(() => {
    const interval = setInterval(() => {
      incrementRegistrations();
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [incrementRegistrations]);

  // Update statistics data to use dynamic values
  const statisticsData = [
    { title: "Central Departments", value: stats.centralDepartments.toString(), subtitle: "Ministries" },
    { title: "State Departments", value: stats.stateDepartments.toString(), subtitle: "Across all states" },
    { title: "Services", value: stats.services.toString(), subtitle: "Central & State combined" },
    { title: "Total Registrations", value: (stats.registrations / 1000000).toFixed(1) + "M", subtitle: "Growing daily" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        
        {/* Floating Voice Assistant Button */}
        <div className="fixed right-4 bottom-20 z-50">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-white shadow-lg"
            onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
          >
            <Volume className="h-6 w-6" />
          </Button>
          {showVoiceAssistant && (
            <div className="absolute bottom-16 right-0 mb-2">
              <VoiceAssistant />
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <section className="py-10 px-4">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statisticsData.map((stat, index) => (
                <StatisticsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Latest Services Section */}
        <section className="py-10 bg-secondary/50">
          <div className="container px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">What's New?</h2>
                <p className="text-muted-foreground">Latest services and schemes added</p>
              </div>
              <Button variant="ghost" className="mt-2 sm:mt-0" asChild>
                <Link to="/services">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {latestServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  icon={service.icon}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Tabs Section */}
        <section className="py-10">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Government Services</h2>
            
            <Tabs defaultValue="popular" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="popular">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularServices.map((service, index) => (
                    <ServiceCard
                      key={index}
                      title={service.title}
                      icon={service.icon}
                      description={service.description}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="trending">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trendingServices.map((service, index) => (
                    <ServiceCard
                      key={index}
                      title={service.title}
                      icon={service.icon}
                      description={service.description}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* State Services Section */}
        <section className="py-10 bg-secondary/50">
          <div className="container px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-1">State-wise Services</h2>
              <p className="text-muted-foreground">Access services specific to your state</p>
            </div>
            
            <Tabs defaultValue="delhi" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-3">
                <TabsList>
                  <TabsTrigger value="delhi">Delhi</TabsTrigger>
                  <TabsTrigger value="gujarat">Gujarat</TabsTrigger>
                  <TabsTrigger value="maharashtra">Maharashtra</TabsTrigger>
                  <TabsTrigger value="telangana">Telangana</TabsTrigger>
                </TabsList>
              </div>
              
              {Object.entries(stateServices).map(([state, services]) => (
                <TabsContent key={state} value={state}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {services.map((service, index) => (
                      <ServiceCard
                        key={index}
                        title={service.title}
                        icon={service.icon}
                        className="h-full"
                      />
                    ))}
                    <Card className="flex items-center justify-center h-full">
                      <CardContent className="p-4 text-center">
                        <Button variant="ghost" className="text-primary" asChild>
                          <Link to="/services">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-10">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Benefits of Yojana Dost</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border shadow-sm">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-10 bg-secondary/50">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Browse by Categories</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.map((category, index) => (
                <ServiceCard
                  key={index}
                  title={category.title}
                  icon={category.icon}
                  description={category.description}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* App Promotion Section */}
        <section className="py-10 bg-gradient-to-r from-primary/90 to-primary text-white">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Download the Yojana Dost App</h2>
                <p className="mb-6 text-white/90">
                  Get instant access to all government schemes and services on your mobile device
                </p>
                <div className="flex space-x-4">
                  <Link to="#">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                      alt="Get it on Google Play" 
                      className="h-12" 
                    />
                  </Link>
                  <Link to="#">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                      alt="Download on App Store" 
                      className="h-12" 
                    />
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Yojana Dost App" 
                  className="w-full h-auto rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Eligibility CTA */}
        <section className="py-16">
          <div className="container px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Find Schemes You're Eligible For</h2>
            <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
              Answer a few questions about yourself to discover government schemes and benefits you may qualify for
            </p>
            <Button size="lg" asChild>
              <Link to="/eligibility">Check Your Eligibility</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
