
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Schemes = () => {
  const schemes = [
    {
      title: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      description: "Direct income support to farmers",
      deadline: "Open"
    },
    {
      title: "Ayushman Bharat",
      category: "Healthcare",
      description: "Health insurance coverage",
      deadline: "Open"
    },
    {
      title: "PM Awas Yojana",
      category: "Housing",
      description: "Housing for all initiative",
      deadline: "March 2024"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Government Schemes</h1>
        <div className="grid gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.title} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{scheme.title}</h2>
                  <Badge variant="secondary" className="mb-2">{scheme.category}</Badge>
                  <p className="text-muted-foreground mb-4">{scheme.description}</p>
                </div>
                <Button>Apply Now</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Deadline: {scheme.deadline}
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schemes;
