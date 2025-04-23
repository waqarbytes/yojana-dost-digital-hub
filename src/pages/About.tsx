
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Welcome to Yojana Dost, your trusted partner in accessing government schemes and services.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 my-8">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p>To simplify access to government schemes and empower citizens through digital transformation.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
              <p>To become the most trusted platform for citizens to discover and access government benefits.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-3">Our Values</h2>
              <p>Transparency, accessibility, and citizen-first approach in all our services.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
