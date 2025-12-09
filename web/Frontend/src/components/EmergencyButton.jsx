import { AlertTriangle, Brain, Phone, Video, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../axios';

const EmergencyButton = () => {
    const [loading, setLoading] = useState(false);
    const [showAssessment, setShowAssessment] = useState(false);
    const [symptoms, setSymptoms] = useState('');
    const [aiAssessment, setAiAssessment] = useState('');
    const [assessmentLoading, setAssessmentLoading] = useState(false);
    const { user } = useSelector((state) => state.user);

    const handleEmergencyCall = async () => {
        if (!user) {
            toast.error('Please login to access emergency services');
            window.location.href = '/login';
            return;
        }

        try {
            setLoading(true);
            toast.info('🚨 Initiating Emergency Consultation...', {
                position: "top-center",
                autoClose: 2000,
            });

            // Create emergency notification
            await axios.post('/emergency/notify');

            // Redirect to emergency video call
            window.location.href = "https://video-call-final-git-main-orthodox-64s-projects.vercel.app/?roomID=emergency";

        } catch (error) {
            console.error('Emergency consultation error:', error);
            toast.error('Failed to initiate emergency consultation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAIAssessment = async () => {
        if (!symptoms.trim()) {
            toast.error('Please describe your symptoms first');
            return;
        }

        setAssessmentLoading(true);
        try {
            const prompt = `EMERGENCY MEDICAL ASSESSMENT:

Patient reports: "${symptoms}"

As an emergency medical AI assistant, provide:

1. **URGENCY LEVEL** (1-5 scale):
   - 5: CRITICAL - Call 911 immediately
   - 4: URGENT - Seek emergency care within 1 hour
   - 3: MODERATE - Seek medical care within 4-6 hours
   - 2: LOW - Schedule appointment within 24-48 hours
   - 1: MINIMAL - Monitor and home care

2. **IMMEDIATE ACTIONS** (if urgency 3+):
   - What to do right now
   - What NOT to do
   - When to call emergency services

3. **RED FLAGS** to watch for that require immediate 911 call

4. **LIKELY CAUSES** (differential considerations)

5. **NEXT STEPS** recommendation

Remember: This is AI assistance only. For severe symptoms, always call emergency services immediately.`;

            const result = await axios.post('/chat', {
                message: prompt
            });

            setAiAssessment(result.data.message || result.data.response || 'Assessment unavailable');
        } catch (error) {
            console.error('AI Assessment error:', error);
            setAiAssessment('Unable to generate assessment. Please contact emergency services if this is urgent.');
        } finally {
            setAssessmentLoading(false);
        }
    };

    const handlePhoneEmergency = () => {
        const emergencyNumber = '8047492503';
        if (typeof window !== 'undefined') {
            window.location.href = `tel:${emergencyNumber}`;
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <div className="flex flex-col space-y-3">
                    {/* AI Assessment Button */}
                    <button
                        onClick={() => setShowAssessment(true)}
                        className="group relative bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-400 hover:via-purple-500 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-300/50 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-75 animate-pulse"></div>
                        <div className="relative flex items-center justify-center">
                            <Brain className="w-6 h-6" />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            AI Emergency Assessment
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                        </div>
                    </button>

                    {/* Emergency Video Call Button */}
                <button
                    onClick={handleEmergencyCall}
                    disabled={loading}
                    className="group relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:via-red-500 hover:to-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-red-300/50 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400/50"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-75 animate-pulse"></div>
                    <div className="relative flex items-center justify-center">
                        {loading ? (
                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            <AlertTriangle className="w-6 h-6 animate-pulse" />
                        )}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Emergency Video Call
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                </button>

                {/* Emergency Phone Call Button */}
                <button
                    onClick={handlePhoneEmergency}
                    className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-300/50 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-0 group-hover:opacity-75 animate-pulse"></div>
                    <div className="relative flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Call Emergency: 8047492503
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                </button>
            </div>
        </div>

        {/* AI Emergency Assessment Modal */}
        {showAssessment && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-slate-900/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Emergency Assessment</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setShowAssessment(false);
                                    setSymptoms('');
                                    setAiAssessment('');
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500 dark:text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                    Describe your symptoms in detail:
                                </label>
                                <textarea
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    placeholder="Please describe what you're experiencing - symptoms, pain level, duration, any other relevant details..."
                                    className="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none h-32 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                                    disabled={assessmentLoading}
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleAIAssessment}
                                    disabled={!symptoms.trim() || assessmentLoading}
                                    className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                >
                                    {assessmentLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Analyzing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Brain className="w-5 h-5" />
                                            <span>Get AI Assessment</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {aiAssessment && (
                                <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl border border-purple-200 dark:border-purple-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                                        Emergency Assessment Results
                                    </h3>
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-slate-300">
                                        {aiAssessment.split('\n').map((line, index) => (
                                            line.trim() ? (
                                                <p key={index} className="mb-2">{line}</p>
                                            ) : null
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-700">
                                        <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-3">Emergency Actions:</p>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={handleEmergencyCall}
                                                disabled={loading}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                            >
                                                <Video className="w-4 h-4" />
                                                <span>Video Emergency</span>
                                            </button>
                                            <button
                                                onClick={handlePhoneEmergency}
                                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                            >
                                                <Phone className="w-4 h-4" />
                                                <span>Call 8047492503</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default EmergencyButton;
