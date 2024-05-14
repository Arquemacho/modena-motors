import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';
import { FaPaperPlane, FaTimes, FaComments } from 'react-icons/fa';
import ClipLoader from "react-spinners/ClipLoader";

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSender, setLastSender] = useState('user');
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
    setLastSender('user');

    try {
      const response = await axios.post('http://186.113.234.239:3001/api/chatbot', { prompt: input });
      setMessages(messages => [...messages, { text: response.data.reply, sender: 'bot' }]);
      setLastSender('bot');
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(messages => [...messages, { text: 'Tuvimos un problema con tu respuesta, por favor intenta de nuevo más tarde.', sender: 'bot' }]);
      setLastSender('bot');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lastSender === 'user') {
      const timeout = setTimeout(() => {
        setMessages(messages => [...messages, { text: 'Estamos trabajando en brindarte una respuesta. ¿Tienes más preguntas? También puedes contactarnos directamente o llamarnos.', sender: 'bot' }]);
      }, 30000);

      return () => clearTimeout(timeout);
    }
  }, [messages, lastSender]);

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
