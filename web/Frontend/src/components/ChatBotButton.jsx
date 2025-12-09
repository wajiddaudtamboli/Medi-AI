import { Globe, Mic, Send, Square, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import remarkGfm from 'remark-gfm';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:5002'}/api/v1/chat`;

  // Language options
  const languageOptions = [
    {
      code: "en-US",
      name: "English",
      welcomeMessage: "Hello! I am Arogya AI. How can I help you today?",
    },
    {
      code: "hi-IN",
      name: "Hindi",
      welcomeMessage:
        "नमस्ते! मैं आरोग्य AI हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    },
    {
      code: "mr-IN",
      name: "Marathi",
      welcomeMessage:
        "नमस्कार! मी आरोग्य AI आहे. आज मी तुमची कशी मदत करू शकतो?",
    },
  ];

  // Initialize welcome message based on default language
  useEffect(() => {
    const welcomeMsg = languageOptions.find(
      (lang) => lang.code === selectedLanguage
    )?.welcomeMessage;
    setMessages([{ type: "bot", content: welcomeMsg }]);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowLanguageSelector(false);
  };

  const toggleLanguageSelector = () => {
    setShowLanguageSelector(!showLanguageSelector);
  };

  const selectLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageSelector(false);

    const langOption = languageOptions.find((lang) => lang.code === langCode);
    if (langOption) {
      setMessages([{ type: "bot", content: langOption.welcomeMessage }]);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const languageCode = selectedLanguage.split("-")[0];

      const payload = {
        message: inputMessage,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.message) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: data.message,
            timestamp: new Date().toISOString(),
          },
        ]);
        speakResponse(data.message);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);

      const errorMessages = {
        en: "Sorry, I encountered an error. Please try again.",
        hi: "क्षमा करें, मुझे एक त्रुटि मिली। कृपया पुनः प्रयास करें।",
        mr: "क्षमा करा, मला एक त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
      };

      const languageCode = selectedLanguage.split("-")[0];
      const errorMessage = errorMessages[languageCode] || errorMessages["en"];

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: errorMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text) => {
    if (!text) return;

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };

    const voices = speechSynthesisRef.current.getVoices();
    const languagePrefix = selectedLanguage.split("-")[0];
    const languageVoices = voices.filter((voice) =>
      voice.lang.startsWith(languagePrefix)
    );

    if (languageVoices.length > 0) {
      utterance.voice = languageVoices[0];
    }

    speechSynthesisRef.current.speak(utterance);
  };

  const getInputPlaceholder = () => {
    const placeholders = {
      "en-US": "Ask Arogya AI a question...",
      "hi-IN": "आरोग्य AI से प्रश्न पूछें...",
      "mr-IN": "आरोग्य AI ला प्रश्न विचारा...",
    };
    return placeholders[selectedLanguage] || placeholders["en-US"];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 ${isOpen
              ? "rotate-90 bg-red-500"
              : "bg-blue-700 hover:bg-blue-800"
            }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative">
              <img
                src="/assets/chat-bot.jpeg"
                className="w-10 h-10 object-cover rounded-full"
                alt="Chat with Arogya AI"
              />
              {messages.length > 1 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  !
                </div>
              )}
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 sm:w-96 h-[28rem] sm:h-[32rem] bg-white rounded-xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700 p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/noun-chatbot-1718966-picaai-removebg-preview.jpeg"
                className="w-8 h-8 rounded-full bg-white p-0.5"
                alt="Arogya AI"
              />
              <div>
                <h3 className="text-white font-semibold">Arogya AI</h3>
                <p className="text-xs text-blue-200">
                  Your personal health assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLanguageSelector}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                title="Select language"
              >
                <Globe className="w-4 h-4 text-white" />
              </button>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <Square className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Language Selector Dropdown */}
          {showLanguageSelector && (
            <div className="absolute left-4 top-16 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
              <div className="px-3 py-2 text-xs font-medium text-slate-500 bg-slate-50">
                Select Language
              </div>
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${selectedLanguage === lang.code
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-slate-700"
                    }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}

          {/* Chat Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-slate-50"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                    } mb-3`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${message.type === "user"
                        ? "bg-blue-700 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                      }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm rounded-bl-none">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-3 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-full transition-all ${isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={getInputPlaceholder()}
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-800 placeholder-slate-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className={`p-2.5 rounded-full transition-all ${isLoading || !inputMessage.trim()
                    ? "bg-slate-200 text-slate-400"
                    : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 text-xs text-center text-slate-400">
              <span>
                Powered by MediAI •{" "}
                {
                  languageOptions.find((lang) => lang.code === selectedLanguage)
                    ?.name
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotButton;
