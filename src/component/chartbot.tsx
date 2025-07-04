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
    { id: '1', text: 'Hello! I\'m PrakashVenkat personal assistant. How can I help you today?', sender: 'assistant' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    }]);
    setInputValue('');

    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: getAssistantResponse(inputValue),
        sender: 'assistant'
      }]);
    }, 1000);
  };

  const getAssistantResponse = (userInput: string) => {
    const responses = [
      "I understand you're asking about: " + userInput,
      "Let me check that for you...",
      "I'll help you with that right away!",
      "That's an interesting question. Here's what I found...",
      "As your personal assistant, I recommend...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <span className="text-xl">💁</span> // Assistant icon
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl flex flex-col border border-violet-200"
             style={{ height: '500px' }}>
          
          {/* Header */}
          <div className="bg-violet-600 text-white p-4 rounded-t-lg flex items-center">
            <div className="w-8 h-8 rounded-full bg-violet-400 flex items-center justify-center mr-2">
              <span className="text-white text-lg">👩</span> {/* Assistant avatar */}
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