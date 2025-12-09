import React, { useState } from "react";
import HealthcareCards from "../components/HealthCareCard";
import ServicesCard from "../components/ServicesCard";
import { useNavigate } from "react-router-dom";
import { Video, MessageSquare, Watch, AlertCircle, ChevronDown } from "lucide-react";

const Landing = () => {
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 text-slate-900 w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-slate-900">
              Get Better Care For{" "}
              <span className="text-blue-700">Your Health</span>
            </h1>
            <p className="text-slate-600 mt-4 md:mt-6 text-lg md:text-xl leading-relaxed">
              AI-powered healthcare platform connecting you with quality medical care, expert consultations, and emergency services.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/treatment-suggestions">
                <button className="w-full sm:w-auto bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-md">
                  Get Started
                </button>
              </a>
              <a href="/health">
                <button className="w-full sm:w-auto bg-white text-blue-700 px-6 py-3 rounded-lg font-medium border-2 border-blue-700 hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </a>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/assets/doctors.png" 
              alt="Healthcare professionals" 
              className="w-full max-w-lg mx-auto lg:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Watch Insights Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2.5 rounded-lg">
                <Watch className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-slate-900 font-semibold text-xl">Watch Insights</h2>
            </div>
            <p className="text-slate-600 mb-6">Get your live health data synced from your smartwatch for comprehensive monitoring.</p>
            <button 
              onClick={() => navigate('/account')}
              className="bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full hover:bg-blue-800 transition-colors"
            >
              View Watch Insights
            </button>
          </div>

          {/* Emergency Consulting Card */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2.5 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-slate-900 font-semibold text-xl">Emergency Consulting</h2>
            </div>
            <p className="text-slate-600 mb-6">Get immediate medical assistance through video or chat consultations.</p>
            <button 
              onClick={() => setShowEmergencyOptions(!showEmergencyOptions)}
              className="bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Select Consultation Type</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showEmergencyOptions ? 'rotate-180' : ''}`} />
            </button>

            {/* Emergency Options */}
            {showEmergencyOptions && (
              <div className="mt-4 space-y-3">
                <button 
                  onClick={() => navigate('/telemedicine')}
                  className="w-full bg-slate-50 p-4 rounded-lg border border-slate-200 text-left hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-blue-700" />
                    <div>
                      <h3 className="text-slate-900 font-medium group-hover:text-blue-700 transition-colors">Video Consultation</h3>
                      <p className="text-slate-500 text-sm">Connect with doctors through secure video calls</p>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/chat')}
                  className="w-full bg-slate-50 p-4 rounded-lg border border-slate-200 text-left hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-700" />
                    <div>
                      <h3 className="text-slate-900 font-medium group-hover:text-blue-700 transition-colors">Chat Consultation</h3>
                      <p className="text-slate-500 text-sm">Get medical advice through AI-powered text chat</p>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Healthcare Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <HealthcareCards />
      </section>

      {/* Services Section */}
      <ServicesCard />
    </div>
  );
};

export default Landing;
