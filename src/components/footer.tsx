
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-secondary py-12 mt-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Accessibility Options</h3>
            <div className="flex flex-col space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Text Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Increase Text Size</DropdownMenuItem>
                  <DropdownMenuItem>Decrease Text Size</DropdownMenuItem>
                  <DropdownMenuItem>Line Height and Spacing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Visual Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Highlight Links</DropdownMenuItem>
                  <DropdownMenuItem>Dyslexia-friendly View</DropdownMenuItem>
                  <DropdownMenuItem>Invert Colors</DropdownMenuItem>
                  <DropdownMenuItem>Hide Images</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" className="justify-start">
                Text to Speech
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/grievance">Grievance Redressal</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/schemes">Schemes</FooterLink>
              <FooterLink href="/partners">Partners</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link to="#" className="text-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link to="#" className="text-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Download Our App</h4>
              <div className="flex space-x-2">
                <Link to="#">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-10"
                  />
                </Link>
                <Link to="#">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on App Store" 
                    className="h-10" 
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            This is a Digital India Project. Developed and maintained by the Yojana Dost Team under Open Governance.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Yojana Dost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
