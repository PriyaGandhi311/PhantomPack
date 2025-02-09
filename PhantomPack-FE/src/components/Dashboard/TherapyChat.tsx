// src/TherapyChat.tsx
import './TherapyChat.css'
import React, { useState, useRef, useEffect } from 'react';

const TherapyChat: React.FC = () => {
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const appendMessage = (content: string, isUser: boolean) => {
    setMessages((prevMessages) => [...prevMessages, { content, isUser }]);
  };

  const handleSendMessage = async () => {
    const message = messageInputRef.current?.value.trim();
    if (!message) return;

    appendMessage(message, true);
    if (messageInputRef.current) messageInputRef.current.value = '';
    setIsTyping(true);

    try {
        
      const response = await fetch('http://localhost:5000/therapy-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json();
      console.log(data);
      setIsTyping(false);
      appendMessage(data.response, false);
    } catch (error) {
      setIsTyping(false);
      appendMessage('Error connecting to server.', false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center h-screen p-4">
      <div className="chat-wrapper">
      <div className="chat-container bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-200 flex flex-col">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Therapy Chat</h1>

        <div ref={chatBoxRef} className="chat-box border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto bg-gray-50 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                msg.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow-md ${
                  msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                } max-w-[75%] break-words`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {isTyping && (
          <div className="text-gray-500 italic text-sm mt-2">Therapist is typing...</div>
        )}

        <div className="input-container flex mt-4 items-center border border-gray-300 rounded-lg p-2 bg-white">
          <textarea
            ref={messageInputRef}
            className="input-message flex-grow p-2 outline-none resize-none border-none"
            rows={2}
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            className="send-button bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 transition-transform transform hover:scale-105 hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TherapyChat;