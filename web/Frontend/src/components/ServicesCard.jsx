import React from 'react';
import { Video, Activity, Scan, ArrowRight } from 'lucide-react';

const ServicesCard = () => {
    const services = [
        {
            id: 1,
            title: "WebRTC Video Calls",
            description: "Low bandwidth, high-quality video calling for seamless doctor consultations",
            image: "/assets/webrtc.jpg",
            icon: Video,
            color: "blue"
        },
        {
            id: 2,
            title: "ECG Analysis",
            description: "AI-powered ECG analysis with instant results and expert interpretation",
            image: "/assets/ecg.png",
            icon: Activity,
            color: "red"
        },
        {
            id: 3,
            title: "X-Ray Analysis",
            description: "Advanced X-ray analysis with detailed diagnostic insights",
            image: "/assets/xray.png",
            icon: Scan,
            color: "purple"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: { badge: "bg-blue-100 text-blue-700", border: "border-blue-200" },
            red: { badge: "bg-red-100 text-red-700", border: "border-red-200" },
            purple: { badge: "bg-purple-100 text-purple-700", border: "border-purple-200" }
        };
        return colors[color] || colors.blue;
    };

    return (
        <section className="w-full bg-white py-12 md:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Reliable Healthcare Services
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Advanced AI-powered medical tools designed to provide accurate diagnostics and seamless healthcare experiences.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service) => {
                        const colorClasses = getColorClasses(service.color);
                        const IconComponent = service.icon;
                        
                        return (
                            <div 
                                key={service.id} 
                                className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden bg-white">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`${colorClasses.badge} p-2 rounded-lg`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                                    <button className="flex items-center gap-2 text-blue-700 font-medium text-sm group-hover:gap-3 transition-all">
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesCard;