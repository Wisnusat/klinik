'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                ♥
              </div> */}
              <span className="text-lg font-bold text-foreground">Klinik</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Your trusted partner in healthcare, providing quality care for you and your family.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">General Practice</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pediatrics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dental Care</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cardiology</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3 text-foreground/60 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>123 Health Street, Medical Plaza, City 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:info@carewell.com" className="hover:text-primary transition-colors">info@carewell.com</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-foreground/50 text-sm">
            © {currentYear} CareWell Medical Clinic. All rights reserved.
          </p>
          <p className="text-foreground/50 text-sm mt-4 md:mt-0">
            Emergency: Available 24/7 | Call (123) 456-7890
          </p>
        </div>
      </div>
    </footer>
  )
}
