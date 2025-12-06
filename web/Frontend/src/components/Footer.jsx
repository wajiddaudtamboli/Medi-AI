'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Twitter, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative w-full">
      {/* Background Section */}
      <div className="bg-blue-100 pt-10 md:pt-16 pb-6 md:pb-8 w-full">
        <div className="max-w-full px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Column 1 - Brand */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-800 p-1.5 mr-2 rounded-md">
                  <span className="text-white text-sm font-bold">+</span>
                </div>
                <span className="font-bold text-gray-800 text-xl">HealthBridge AI</span>
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Advanced AI-powered healthcare platform providing comprehensive medical analysis, expert consultations, and emergency services.<br />
                <span className="font-medium mt-2 block">Your trusted partner in digital healthcare innovation.</span>
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a href="#" aria-label="Instagram" className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Instagram className="w-4 h-4 text-blue-800" />
                </a>
                <a href="https://www.linkedin.com/in/wajid-daud-tamboli-3217b031a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Linkedin className="w-4 h-4 text-blue-800" />
                </a>
                <a href="https://wa.me/9667033839?text=Hi! I need assistance via MediAI." aria-label="WhatsApp" className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <svg className="w-4 h-4 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Twitter className="w-4 h-4 text-blue-800" />
                </a>
                <a href="mailto:wajiddaudtamboli123@gmail.com" aria-label="Email" className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Mail className="w-4 h-4 text-blue-800" />
                </a>
                <a href="https://cureconnect.ai" target="_blank" rel="noopener noreferrer" aria-label="Website" className="bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Globe className="w-4 h-4 text-blue-800" />
                </a>
              </div>
            </div>

            {/* Column 2 - Useful Pages */}
            <div className="mt-6 sm:mt-0">
              <h3 className="font-semibold text-gray-800 mb-4 md:mb-6">Our Services</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><a href="/analysis" className="hover:text-blue-800 transition-colors">Medical AI Analysis</a></li>
                <li><a href="/telemedicine" className="hover:text-blue-800 transition-colors">Video Consultation</a></li>
                <li><a href="/chat" className="hover:text-blue-800 transition-colors">AI Health Chat</a></li>
                <li><a href="/health" className="hover:text-blue-800 transition-colors">Health Tips & Wellness</a></li>
                <li><a href="https://video-call-final-git-main-orthodox-64s-projects.vercel.app/?roomID=emergency" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors">Emergency Services</a></li>
              </ul>
            </div>

            {/* Column 3 - Contacts */}
            <div className="mt-6 lg:mt-0">
              <h3 className="font-semibold text-gray-800 mb-4 md:mb-6">Contact Information</h3>
              <div className="text-gray-700 space-y-3">
                <p className="font-medium">HealthBridge AI Headquarters</p>
                <p className="text-sm">Solapur, Maharashtra, India</p>
                <p className="mt-3 flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-blue-800" /> +91 9667033839</p>
                <p className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-blue-800" /> support@healthbridge.ai</p>
              </div>
            </div>

            {/* Column 4 - Newsletter */}
            <div className="mt-6 lg:mt-0">
              <h3 className="font-semibold text-gray-800 mb-4 md:mb-6">Stay Informed</h3>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                Subscribe to receive the latest updates on healthcare innovations, medical insights, and wellness tips.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white px-3 py-2 rounded-l-md flex-grow border border-gray-200"
                />
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2 rounded-r-md font-medium border border-l-0 border-blue-800 hover:bg-blue-900"
                >
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-blue-800 py-4 md:py-5 text-white text-center text-xs md:text-sm w-full">
        <div className="max-w-full px-4 md:px-8">
          <p className="mb-1">© 2025 <span className="font-bold">MediAI</span> — Intelligent Healthcare Assistant</p>
          <p className="text-xs text-blue-200">Developed with <Heart className="inline h-3 w-3 text-red-400 animate-pulse" /> by Team Synergy | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
