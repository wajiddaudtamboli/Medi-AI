import { Loader, Send, Stethoscope, X } from 'lucide-react';
import { useState } from 'react';
import axios from '../axios';

const HealthAdvisory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const generateHealthAdvice = async () => {
        if (!symptoms.trim()) {
            alert('Please enter your symptoms');
            return;
        }

        setLoading(true);
        try {
            const prompt = `The user has reported the following symptoms: ${symptoms}

Please provide comprehensive health guidance in the following format without any bold formatting or asterisks:

CONVENTIONAL MEDICINE APPROACH:
- Likely causes or conditions based on symptoms
- Common over-the-counter medicines (specific names like Paracetamol, Ibuprofen, etc.)
- General medical advice and precautions
- When to see a doctor

AYURVEDIC APPROACH:
- Dosha imbalance explanation (Vata, Pitta, Kapha)
- Ayurvedic medicines and formulations (specific names like Triphala, Ashwagandha, etc.)
- Herbal remedies and natural treatments
- Dietary recommendations and lifestyle changes

HOMEOPATHIC APPROACH:
- Recommended homeopathic remedies (specific medicine names like Arnica, Belladonna, etc.)
- Constitutional indications for each remedy
- Homeopathic treatment principles
- Supportive lifestyle measures

GENERAL PREVENTIVE AND LIFESTYLE TIPS:
- Daily habits and hygiene practices
- Exercise and stress management
- Dietary guidelines
- Sleep and wellness recommendations

IMPORTANT DISCLAIMER:
This information is for educational purposes only. Please consult a qualified healthcare practitioner before starting any treatment or medication.

Please provide detailed, practical advice covering all these areas with specific medicine names where appropriate.`;

            const result = await axios.post('/chat', {
                message: prompt
            });

            setResponse(result.data.response || result.data.message || 'Unable to generate advice at this time.');
        } catch (error) {
            console.error('Error generating health advice:', error);
            setResponse('Error generating health advice. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setSymptoms('');
        setResponse('');
    };

    return (
        <>
            {/* Health Advisory Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
                <Stethoscope className="w-4 h-4" />
                <span>Health Advisory</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Stethoscope className="w-6 h-6" />
                                    <h2 className="text-xl font-bold">Health Advisory System</h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="text-green-100 mt-2">Get comprehensive health guidance from multiple medical approaches</p>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {/* Input Section */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Describe your symptoms:
                                </label>
                                <div className="relative">
                                    <textarea
                                        value={symptoms}
                                        onChange={(e) => setSymptoms(e.target.value)}
                                        placeholder="Please describe your symptoms in detail (e.g., headache, fever, fatigue, etc.)"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={generateHealthAdvice}
                                            disabled={loading || !symptoms.trim()}
                                            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            {loading ? (
                                                <Loader className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                            <span>{loading ? 'Analyzing...' : 'Get Health Advice'}</span>
                                        </button>
                                        <button
                                            onClick={clearForm}
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Response Section */}
                            {response && (
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Health Advisory Response</h3>
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                                            {response.split('\n').map((line, index) => (
                                                <div key={index} className="mb-2">
                                                    {line.trim() ? (
                                                        <p className="text-gray-800">
                                                            {line.replace(/\*\*/g, '').replace(/\*/g, '')}
                                                        </p>
                                                    ) : (
                                                        <br />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HealthAdvisory;
