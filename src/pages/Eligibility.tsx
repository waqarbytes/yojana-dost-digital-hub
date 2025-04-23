import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { toast } from "@/components/ui/sonner";
import { Check, FileText, List, MessageSquare } from "lucide-react";
import { useStatisticsStore } from "@/services/statisticsService";

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
  district: z.string().optional(),
  area: z.enum(["rural", "urban"], { required_error: "Please select area type" }),
  occupation: z.string({ required_error: "Please select your occupation" }),
  hasAadhaar: z.boolean().default(false),
  hasPanCard: z.boolean().default(false),
  hasIncomeCertificate: z.boolean().default(false),
  preferredLanguage: z.string().default("english"),
  phoneNumber: z.string().optional(),
});

// Mock data for eligible schemes
const allSchemes = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi",
    description: "Income support scheme providing farmers with up to ₹6,000 per year",
    eligibility: "All farmers, with certain exclusions",
    documents: ["Aadhaar Card", "Land Records", "Bank Account"],
    benefits: "Financial assistance of ₹6,000 per year in three equal installments",
    link: "https://pmkisan.gov.in/",
    deadline: "Ongoing",
    occupation: ["farmer"],
    minAge: 18,
    maxAge: 100,
    maxIncome: 100000,
    caste: ["general", "obc", "sc", "st"],
    area: ["rural", "urban"],
  },
  {
    id: 2,
    name: "Pradhan Mantri Awaas Yojana",
    description: "Housing scheme providing financial assistance to build homes",
    eligibility: "Low income households without a pucca house",
    documents: ["Aadhaar Card", "Income Certificate", "Land Documents"],
    benefits: "Financial assistance up to ₹2.5 lakhs for home construction",
    link: "https://pmaymis.gov.in/",
    deadline: "December 31, 2024",
    occupation: ["all"],
    minAge: 21,
    maxAge: 100,
    maxIncome: 50000,
    caste: ["sc", "st", "obc"],
    area: ["rural"],
  },
  {
    id: 3,
    name: "Ayushman Bharat",
    description: "Health insurance scheme providing coverage up to ₹5 lakhs per family per year",
    eligibility: "Low income families based on SECC data",
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    benefits: "Health insurance coverage up to ₹5 lakhs per family per year",
    link: "https://pmjay.gov.in/",
    deadline: "Ongoing",
    occupation: ["all"],
    minAge: 0,
    maxAge: 100,
    maxIncome: 60000,
    caste: ["general", "obc", "sc", "st"],
    area: ["rural", "urban"],
  },
  {
    id: 4,
    name: "PM Ujjwala Yojana",
    description: "Scheme providing LPG connections to women from BPL households",
    eligibility: "Women from BPL households without LPG connection",
    documents: ["Aadhaar Card", "BPL Certificate", "Bank Account"],
    benefits: "Free LPG connection with financial assistance for first refill",
    link: "https://pmuy.gov.in/",
    deadline: "March 31, 2025",
    occupation: ["all"],
    minAge: 18,
    maxAge: 100,
    maxIncome: 40000,
    caste: ["general", "obc", "sc", "st"],
    area: ["rural"],
  },
  {
    id: 5,
    name: "PM Jan Dhan Yojana",
    description: "Financial inclusion scheme providing bank accounts with no minimum balance requirement",
    eligibility: "All Indian citizens without a bank account",
    documents: ["Aadhaar Card", "Address Proof"],
    benefits: "Zero balance bank account, accident insurance cover, overdraft facility",
    link: "https://pmjdy.gov.in/",
    deadline: "Ongoing",
    occupation: ["all"],
    minAge: 18,
    maxAge: 100,
    maxIncome: 1000000,
    caste: ["general", "obc", "sc", "st"],
    area: ["rural", "urban"],
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

// Occupation options
const occupationOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "student", label: "Student" },
  { value: "unemployed", label: "Unemployed" },
  { value: "self_employed", label: "Self-employed" },
  { value: "private_job", label: "Private Sector Employee" },
  { value: "government_job", label: "Government Employee" },
  { value: "retired", label: "Retired" },
  { value: "homemaker", label: "Homemaker" },
  { value: "other", label: "Other" },
];

// Language options
const languageOptions = [
  { value: "english", label: "English" },
  { value: "hindi", label: "हिन्दी (Hindi)" },
  { value: "tamil", label: "தமிழ் (Tamil)" },
  { value: "telugu", label: "తెలుగు (Telugu)" },
  { value: "marathi", label: "मराठी (Marathi)" },
  { value: "bengali", label: "বাংলা (Bengali)" },
  { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
];

export default function Eligibility() {
  const [schemes, setSchemes] = useState<null | typeof allSchemes>(null);
  const [activeTab, setActiveTab] = useState("form");
  const { incrementServices } = useStatisticsStore();

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      income: "",
      caste: "",
      state: "",
      area: "urban",
      occupation: "",
      hasAadhaar: false,
      hasPanCard: false,
      hasIncomeCertificate: false,
      preferredLanguage: "english",
      phoneNumber: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Match schemes based on user inputs
    const eligibleSchemes = allSchemes.filter(scheme => {
      let isEligible = true;
      
      // Check age eligibility
      const userAge = parseInt(values.age);
      if (userAge < scheme.minAge || userAge > scheme.maxAge) {
        isEligible = false;
      }
      
      // Check income eligibility
      const userIncome = parseInt(values.income);
      if (userIncome > scheme.maxIncome) {
        isEligible = false;
      }
      
      // Check caste eligibility
      if (!scheme.caste.includes(values.caste)) {
        isEligible = false;
      }
      
      // Check occupation eligibility
      if (scheme.occupation[0] !== "all" && !scheme.occupation.includes(values.occupation)) {
        isEligible = false;
      }
      
      // Check area eligibility
      if (!scheme.area.includes(values.area)) {
        isEligible = false;
      }
      
      return isEligible;
    });

    setSchemes(eligibleSchemes);
    setActiveTab("results");
    
    // Track service usage
    incrementServices();
    
    // Show toast notification
    toast.success(`Found ${eligibleSchemes.length} matching schemes for you!`);
  }

  // Function to handle WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    const phoneNumber = form.getValues("phoneNumber");
    
    if (!phoneNumber) {
      toast.error("Please enter your phone number to continue");
      return;
    }
    
    // In a real app, this would connect to a WhatsApp Business API
    toast.success(`WhatsApp service requested for number: ${phoneNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Check Eligibility for Government Schemes</h1>
            <p className="text-muted-foreground">
              Find government schemes you may be eligible for based on your profile
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="form">Eligibility Form</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="space-y-6">
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
                        
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area Type</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex space-x-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rural" id="rural" />
                                    <label htmlFor="rural">Rural</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="urban" id="urban" />
                                    <label htmlFor="urban">Urban</label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="occupation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Occupation</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your occupation" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {occupationOptions.map((option) => (
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
                      
                      <div className="space-y-4 border-t pt-4">
                        <h3 className="text-sm font-medium">Available Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="hasAadhaar"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Aadhaar Card</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hasPanCard"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>PAN Card</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="hasIncomeCertificate"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Income Certificate</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="preferredLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {languageOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-center">
                        <Button type="submit" size="lg">
                          Check Eligibility
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="results">
              {schemes && schemes.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Schemes You May Be Eligible For
                  </h2>
                  <div className="grid gap-6">
                    {schemes.map((scheme) => (
                      <Card key={scheme.id} className="overflow-hidden">
                        <CardHeader className="bg-primary/5">
                          <CardTitle>{scheme.name}</CardTitle>
                          <CardDescription className="font-medium">{scheme.benefits}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <p className="text-sm">{scheme.description}</p>
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Required Documents:</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              {scheme.documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2">
                            <div>
                              <span className="text-xs text-muted-foreground block">
                                Deadline: {scheme.deadline}
                              </span>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <a href="#" onClick={() => setActiveTab("guide")}>
                                  <FileText className="mr-1 h-4 w-4" /> Guide
                                </a>
                              </Button>
                              <Button size="sm" asChild>
                                <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                                  Apply Now
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center space-y-4">
                    <div className="bg-muted p-4 rounded-lg inline-block mx-auto">
                      <p className="text-sm">
                        Want to receive updates about new schemes and deadlines?
                      </p>
                      <Button variant="outline" className="mt-2" onClick={() => setActiveTab("whatsapp")}>
                        <MessageSquare className="mr-2 h-4 w-4" /> Get Updates on WhatsApp
                      </Button>
                    </div>
                    
                    <Button variant="link" onClick={() => setActiveTab("form")}>
                      Check eligibility for different criteria
                    </Button>
                  </div>
                </div>
              ) : schemes && schemes.length === 0 ? (
                <div className="text-center p-10 space-y-4">
                  <h2 className="text-2xl font-medium">No Matching Schemes Found</h2>
                  <p className="text-muted-foreground">
                    We couldn't find any schemes matching your criteria. Try adjusting your inputs.
                  </p>
                  <Button onClick={() => setActiveTab("form")}>
                    Back to Eligibility Form
                  </Button>
                </div>
              ) : (
                <div className="text-center p-10 space-y-4">
                  <h2 className="text-2xl font-medium">Please Complete the Eligibility Form</h2>
                  <p className="text-muted-foreground">
                    Fill in your details to see which government schemes you may qualify for.
                  </p>
                  <Button onClick={() => setActiveTab("form")}>
                    Go to Eligibility Form
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="whatsapp" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-6 w-6 text-green-500" />
                    WhatsApp Assistance
                  </CardTitle>
                  <CardDescription>
                    Get scheme information and updates directly on WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm">
                      Enter your phone number to receive scheme information, updates, and assistance via WhatsApp.
                      Our service can help you:
                    </p>
                    
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Check eligibility for schemes through simple chat</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Receive updates about application deadlines</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Get document checklists in your preferred language</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">Track your application status</span>
                      </li>
                    </ul>
                    
                    <div className="py-4">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your WhatsApp number" 
                                type="tel" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button onClick={handleWhatsAppInquiry} className="w-full bg-green-600 hover:bg-green-700">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Connect via WhatsApp
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By proceeding, you agree to receive messages from our service. You can 
                      unsubscribe anytime by sending "STOP" on WhatsApp.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
