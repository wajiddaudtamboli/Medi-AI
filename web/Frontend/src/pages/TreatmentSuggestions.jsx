import { AlertCircle, Heart, Leaf, Pill, ShieldCheck, Sparkles, Utensils } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../axios';

function TreatmentSuggestions() {
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!symptoms.trim()) {
            toast.error('Please enter your symptoms');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await axios.post('/treatment/suggestions', {
                symptoms: symptoms.trim()
            });

            if (response.data.success) {
                setResults(response.data.data);
                toast.success('Treatment suggestions generated successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to get suggestions');
            }
        } catch (err) {
            console.error('Error fetching treatment suggestions:', err);
            const errorMessage = err.response?.data?.message || 'Failed to generate treatment suggestions. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSymptoms('');
        setResults(null);
        setError(null);
    };

    const parseSection = (text, label) => {
        const lines = text.split('\n').filter(line => line.trim());
        const sections = {};
        let currentSection = 'general';
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                const content = trimmedLine.substring(2);
                if (content.includes(':')) {
                    const [key, ...valueParts] = content.split(':');
                    currentSection = key.trim().toLowerCase().replace(/\s+/g, '_');
                    sections[currentSection] = valueParts.join(':').trim();
                } else {
                    if (!sections[currentSection]) sections[currentSection] = '';
                    sections[currentSection] += (sections[currentSection] ? '\n' : '') + content;
                }
            } else if (trimmedLine) {
                if (!sections[currentSection]) sections[currentSection] = '';
                sections[currentSection] += (sections[currentSection] ? '\n' : '') + trimmedLine;
            }
        });
        
        return sections;
    };

    const TreatmentCard = ({ title, content, icon: Icon, color, bgColor }) => {
        const sections = parseSection(content, title);
        
        return (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Card Header */}
                <div className={`${bgColor} p-6 border-b-4 ${color}`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-full shadow-md">
                            <Icon className={`w-8 h-8 ${color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-5">
                    {sections.recommended_medicines && (
                        <Section 
                            icon={Pill} 
                            title="Recommended Medicines" 
                            content={sections.recommended_medicines}
                            iconColor={color}
                        />
                    )}
                    
                    {sections.recommended_herbs_formulations && (
                        <Section 
                            icon={Leaf} 
                            title="Recommended Herbs/Formulations" 
                            content={sections.recommended_herbs_formulations}
                            iconColor={color}
                        />
                    )}
                    
                    {sections.recommended_remedies && (
                        <Section 
                            icon={Sparkles} 
                            title="Recommended Remedies" 
                            content={sections.recommended_remedies}
                            iconColor={color}
                        />
                    )}

                    {sections.dosage && (
                        <Section 
                            icon={Heart} 
                            title="Dosage" 
                            content={sections.dosage}
                            iconColor={color}
                        />
                    )}

                    {sections.duration && (
                        <Section 
                            icon={AlertCircle} 
                            title="Duration" 
                            content={sections.duration}
                            iconColor={color}
                        />
                    )}

                    {sections.precautions && (
                        <Section 
                            icon={ShieldCheck} 
                            title="Precautions" 
                            content={sections.precautions}
                            iconColor={color}
                        />
                    )}

                    {sections.diet_advice && (
                        <Section 
                            icon={Utensils} 
                            title="Diet Advice" 
                            content={sections.diet_advice}
                            iconColor={color}
                        />
                    )}

                    {sections.lifestyle_changes && (
                        <Section 
                            icon={Heart} 
                            title="Lifestyle Changes" 
                            content={sections.lifestyle_changes}
                            iconColor={color}
                        />
                    )}

                    {/* Display any remaining content */}
                    {Object.keys(sections).length === 0 && (
                        <div className="text-gray-700 whitespace-pre-wrap">{content}</div>
                    )}
                </div>
            </div>
        );
    };

    const Section = ({ icon: Icon, title, content, iconColor }) => (
        <div className="border-l-4 border-gray-200 pl-4 py-2">
            <div className="flex items-start gap-2 mb-2">
                <Icon className={`w-5 h-5 mt-0.5 ${iconColor} flex-shrink-0`} />
                <h4 className="font-semibold text-gray-800">{title}</h4>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap ml-7">
                {content}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-12 h-12 text-blue-600 animate-pulse" />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                            AI Treatment Suggestions
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Get comprehensive treatment recommendations using Conventional Medicine, Ayurveda, and Homeopathy
                    </p>
                </div>

                {/* Input Form */}
                <div className="max-w-4xl mx-auto mb-12">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                        <label htmlFor="symptoms" className="block text-lg font-semibold text-gray-800 mb-3">
                            Describe Your Symptoms
                        </label>
                        <textarea
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Example: I have a headache, fever, and body aches for the past 2 days..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all min-h-[150px] text-gray-700 resize-y"
                            disabled={loading}
                        />
                        
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={loading || !symptoms.trim()}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Analyzing Symptoms...
                                    </span>
                                ) : (
                                    'Get Treatment Suggestions'
                                )}
                            </button>
                            
                            {results && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results */}
                {results && (
                    <div className="space-y-8">
                        {/* Disclaimer */}
                        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 max-w-5xl mx-auto">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-yellow-900 mb-2">Medical Disclaimer</h3>
                                    <p className="text-yellow-800 text-sm leading-relaxed">
                                        {results.disclaimer || 'These suggestions are AI-generated and for educational purposes only. Always consult a certified medical professional before taking any treatment. This is not a substitute for professional medical advice, diagnosis, or treatment.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Symptoms Display */}
                        <div className="bg-white rounded-xl p-6 shadow-md max-w-5xl mx-auto border-l-4 border-blue-500">
                            <h3 className="font-semibold text-gray-800 mb-2">Analyzed Symptoms:</h3>
                            <p className="text-gray-700">{results.symptoms}</p>
                        </div>

                        {/* Treatment Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <TreatmentCard
                                title="Conventional Medicine"
                                content={results.conventional}
                                icon={Pill}
                                color="text-blue-600"
                                bgColor="bg-blue-50"
                            />
                            
                            <TreatmentCard
                                title="Ayurvedic Treatment"
                                content={results.ayurvedic}
                                icon={Leaf}
                                color="text-green-600"
                                bgColor="bg-green-50"
                            />
                            
                            <TreatmentCard
                                title="Homeopathic Treatment"
                                content={results.homeopathic}
                                icon={Sparkles}
                                color="text-purple-600"
                                bgColor="bg-purple-50"
                            />
                        </div>

                        {/* Action Footer */}
                        <div className="text-center pt-8">
                            <p className="text-gray-600 mb-4">
                                Need personalized consultation?
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/telemedicine"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Book Video Consultation
                                </a>
                                <a
                                    href="/chat"
                                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Chat with AI Assistant
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block">
                            <svg className="animate-spin h-16 w-16 text-blue-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                        <p className="mt-6 text-xl text-gray-600 font-semibold">
                            Analyzing your symptoms...
                        </p>
                        <p className="mt-2 text-gray-500">
                            Generating personalized treatment suggestions
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!results && !loading && !error && (
                    <div className="text-center py-16 max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-10 border-2 border-gray-100">
                            <Sparkles className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                How It Works
                            </h3>
                            <div className="text-left space-y-4 text-gray-700">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">1</span>
                                    <p>Describe your symptoms in detail in the text box above</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">2</span>
                                    <p>Our AI analyzes your symptoms using advanced medical knowledge</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">3</span>
                                    <p>Get comprehensive treatment suggestions from three different medical approaches</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">4</span>
                                    <p>Always consult a healthcare professional before starting any treatment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TreatmentSuggestions;
