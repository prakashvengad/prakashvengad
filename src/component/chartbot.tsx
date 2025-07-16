"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

export default function PersonalAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I\'m your personal assistant. How can I help you today?', sender: 'assistant' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced conversation responses
  const getAssistantResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Greetings
    if (/hello|hi|hey/.test(input)) {
      return "Hello there! How can I assist you today?";
    }
    
    // Help
    if (/help|support/.test(input)) {
      return "Of course! I can help with scheduling, information, reminders, or general questions. What do you need?";
    }
    
    // Time
    if (/time|date|day/.test(input)) {
      const now = new Date();
      return `It's currently ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}.`;
    }
    
    // Thanks
    if (/thank|thanks|appreciate/.test(input)) {
      return "You're very welcome! Is there anything else I can do for you?";
    }
    
    // Personal
    if (/how are you|how's it going/.test(input)) {
      return "I'm doing well, thank you for asking! Ready to help you with whatever you need.";
    }
    
    // Default intelligent responses
    const responses = [
      `I understand you're asking about "${userInput}". Let me think...`,
      "That's an interesting question. Based on my knowledge, I'd suggest...",
      "I can help with that. First, let me gather some information...",
      "I've made a note about your request regarding " + userInput + ". Here's what I recommend...",
      "As your personal assistant, I'd be happy to help with " + userInput + ". Here's what I found...",
      "Let me check that for you...",
      "I'll look into " + userInput + " right away.",
      "For " + userInput + ", I recommend considering these options..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate assistant thinking
    setTimeout(() => {
      const typingMessages = [
        { id: 'typing1', text: "Let me think about that...", sender: 'assistant' as const },
        { id: 'typing2', text: "Just a moment...", sender: 'assistant' as const }
      ];
      
      // Show typing indicators
      setMessages(prev => [...prev, typingMessages[0]]);
      
      setTimeout(() => {
        setMessages(prev => [...prev.slice(0, -1), typingMessages[1]]);
        
        setTimeout(() => {
          // Remove typing indicators and show final response
          setMessages(prev => [
            ...prev.filter(msg => !msg.id.startsWith('typing')),
            {
              id: Date.now().toString(),
              text: getAssistantResponse(inputValue),
              sender: 'assistant'
            }
          ]);
          setIsTyping(false);
        }, 800);
      }, 1000);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
   <div className="fixed bottom-[20%] right-[5%] z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-xl">💁</span>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl flex flex-col border border-violet-200"
             style={{ height: '500px' }}>
          
          {/* Header */}
          <div className="bg-violet-600 text-white p-4 rounded-t-lg flex items-center">
            <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center mr-2">
              <span className="text-white text-lg">👩</span>
            </div>
            <div>
              <h3 className="font-semibold">Your Personal Assistant</h3>
              <p className="text-xs text-violet-200">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-violet-50">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${message.sender === 'user' ? 'bg-violet-600 text-white' : 'bg-white text-violet-900 border border-violet-200'}`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-violet-900 border border-violet-200 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-violet-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your assistant..."
                className="flex-1 border border-violet-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-violet-500 text-violet-900"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white p-2 px-4 rounded-r transition-colors duration-200"
                disabled={isTyping}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}