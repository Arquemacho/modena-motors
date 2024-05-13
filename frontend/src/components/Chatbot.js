import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';
import { FaPaperPlane, FaTimes, FaComments } from 'react-icons/fa';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://192.168.1.12:3001/api/chatbot', { prompt: input });
      setMessages(messages => [...messages, { text: response.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(messages => [...messages, { text: 'Error fetching response from the server.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button onClick={toggleChat} className="chat-toggle">
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="messages">
            {messages.map((msg, index) => (
              <p key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </p>
            ))}
            {isLoading && <div className="loading"><ClipLoader color="#123abc" /></div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="message-form">
            <input type="text" value={input} onChange={handleInputChange} placeholder="Escribe tu mensaje aquí..." />
            <button type="submit"><FaPaperPlane /></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
