
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <Button variant="outline">Download Report</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Applications</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Total applications submitted</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Active Schemes</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Currently enrolled schemes</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Updates</h3>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Pending notifications</p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
