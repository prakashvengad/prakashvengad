'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

export default function VoiceWidget() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! You can speak to me by clicking the microphone.', sender: 'assistant' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced conversation responses
  const getAssistantResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (/hello|hi|hey/.test(input)) {
      return "Hello there! How can I assist you today?";
    }
    
    if (/help|support/.test(input)) {
      return "I can help you navigate the portfolio. Try saying 'projects', 'contact', or 'about'.";
    }
    
    if (/time|date|day/.test(input)) {
      const now = new Date();
      return `It's currently ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}.`;
    }
    
    if (/thank|thanks|appreciate/.test(input)) {
      return "You're welcome! Is there anything else I can help with?";
    }
    
    if (/how are you|how's it going/.test(input)) {
      return "I'm doing well, thanks for asking! Ready to help you.";
    }
    
    if (input.includes('projects')) {
      setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 1000);
      return "Taking you to the projects section.";
    }
    
    if (input.includes('contact')) {
      setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 1000);
      return "Opening the contact section.";
    }
    
    if (input.includes('about')) {
      setTimeout(() => document.getElementById('about')?.scrollIntoView(), 1000);
      return "Showing the about section.";
    }
    
    const responses = [
      `I understand you're asking about "${userInput}".`,
      "That's an interesting point. Could you clarify?",
      "I can help with that. What specifically would you like to know?",
      "For information about " + userInput + ", please check the relevant section.",
      "Let me think about how to best help with " + userInput + ".",
      "I'll assist you with " + userInput + ". One moment please."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Your browser doesn't support speech recognition.",
          sender: 'assistant'
        }]);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        const userMessage = {
          id: Date.now().toString(),
          text: transcript,
          sender: 'user' as const
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        
        setTimeout(() => {
          const response = getAssistantResponse(transcript);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: response,
            sender: 'assistant'
          }]);
          speak(response);
          setIsTyping(false);
        }, 1000);
      };

      recognition.onerror = (event) => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: `Error: ${event.error}`,
          sender: 'assistant'
        }]);
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [isListening]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice button */}
      <button
        onClick={() => setIsListening(!isListening)}
        className={`p-4 rounded-full ${isListening ? 'bg-red-500' : 'bg-green-500'} shadow-lg transition-colors duration-200`}
      >
        {isListening ? '🛑 Stop' : '🎤 Speak'}
      </button>

      {/* Conversation window */}
      {isListening && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200"
             style={{ height: '300px' }}>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}