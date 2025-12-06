import { Phone, Mail, MapPin, Globe } from 'lucide-react';

const PremiumFooter = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About MediAI Section */}
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
              MediAI
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Advanced AI-powered healthcare platform providing intelligent medical analysis, 
              expert consultations, and emergency services. Your health, our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/treatment-suggestions" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  AI Treatment Suggestions
                </a>
              </li>
              <li>
                <a href="/analysis" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Medical Analysis
                </a>
              </li>
              <li>
                <a href="/telemedicine" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Video Consultation
                </a>
              </li>
              <li>
                <a href="/chat" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  AI Health Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">+91 96670 33839</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">support@mediai.health</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">India & Global</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-yellow-400" />
                <a href="https://mediai.health" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  www.mediai.health
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Developer Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-3">
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              Developed By
            </h4>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-yellow-400">
                Wajid Daud Tamboli
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  <span>9667033839</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <a 
                    href="mailto:wajiddaudtamboli123@gmail.com" 
                    className="hover:text-yellow-400 transition-colors"
                  >
                    wajiddaudtamboli123@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-2">
                <MapPin className="w-3 h-3 text-yellow-400" />
                <span>N.K. Orchid College of Engineering & Technology, Solapur</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-400">
            <p>
              © 2025 <span className="font-bold text-yellow-400">MediAI</span> — Intelligent Healthcare Assistant
            </p>
            <p className="mt-1 text-xs">
              All Rights Reserved | Medical AI Technology Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
