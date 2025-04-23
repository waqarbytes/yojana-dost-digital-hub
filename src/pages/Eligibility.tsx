
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

// Define form schema with zod
const formSchema = z.object({
  age: z.string().min(1, "Age is required").refine((val) => !isNaN(parseInt(val)), {
    message: "Age must be a number",
  }),
  income: z.string().min(1, "Monthly income is required").refine((val) => !isNaN(parseInt(val)), {
    message: "Income must be a number",
  }),
  caste: z.string({ required_error: "Please select a caste category" }),
  state: z.string({ required_error: "Please select your state" }),
});

// Mock data for eligible schemes
const mockSchemes = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi",
    description: "Income support scheme providing farmers with up to ₹6,000 per year",
    eligibility: "All farmers, with certain exclusions",
    link: "#",
  },
  {
    id: 2,
    name: "Pradhan Mantri Awaas Yojana",
    description: "Housing scheme providing financial assistance to build homes",
    eligibility: "Low income households without a pucca house",
    link: "#",
  },
  {
    id: 3,
    name: "Ayushman Bharat",
    description: "Health insurance scheme providing coverage up to ₹5 lakhs per family per year",
    eligibility: "Low income families based on SECC data",
    link: "#",
  },
  {
    id: 4,
    name: "PM Jan Dhan Yojana",
    description: "Financial inclusion scheme providing bank accounts with no minimum balance requirement",
    eligibility: "All Indian citizens",
    link: "#",
  },
];

// State data
const stateOptions = [
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "delhi", label: "Delhi" },
  { value: "gujarat", label: "Gujarat" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya_pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "uttar_pradesh", label: "Uttar Pradesh" },
  { value: "west_bengal", label: "West Bengal" },
];

// Caste categories
const casteOptions = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
];

export default function Eligibility() {
  const [schemes, setSchemes] = useState<null | typeof mockSchemes>(null);

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      income: "",
      caste: "",
      state: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you would call an API to get eligible schemes based on the form data
    // For this demo, we'll use the mock data
    setSchemes(mockSchemes);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Check Eligibility for Government Schemes</h1>
            <p className="text-muted-foreground">
              Fill in your details to find government schemes you may be eligible for
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Eligibility Checker</CardTitle>
              <CardDescription>
                Enter your information below to check which schemes you might qualify for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your age" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="income"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your monthly income" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="caste"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caste Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select caste category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {casteOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stateOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" size="lg">
                      Check Eligibility
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {schemes && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Schemes You May Be Eligible For
              </h2>
              <div className="grid gap-6">
                {schemes.map((scheme) => (
                  <Card key={scheme.id}>
                    <CardHeader>
                      <CardTitle>{scheme.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{scheme.description}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Eligibility:</span> {scheme.eligibility}
                      </p>
                      <Button asChild variant="outline">
                        <a href={scheme.link}>Apply Now</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
