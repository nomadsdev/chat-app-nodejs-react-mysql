import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatComponent() {

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [currentUser, setCurrentUser] = useState('User');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
        const response = await axios.get('http://localhost:3001/api/messages');
        setMessages(response.data);
        } catch (error) {
        console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
        await axios.post('http://localhost:3001/api/messages', { user: currentUser, message: userInput });
        setUserInput('');
        fetchMessages();
        } catch (error) {
        console.error('Error sending message:', error);
        }
    };

  return (
    <div>
        <div className='flex justify-center'>
            <div className='p-10'>
            <h1 className='text-red-600 text-2xl'>Chat App</h1>
            <div className='bg-red-600 w-5 h-1 rounded-full'></div>
            </div>
        </div>
        <div className='flex justify-center'>
            <div>
                <div>
                    {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}: </strong>
                        <span>{msg.message}</span>
                    </div>
                    ))}
                </div>
                <div className='flex gap-2 pt-5'>
                    <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className='border border-red-600 rounded-md pl-2 text'
                    placeholder="Type your message..."
                    />
                    <button onClick={sendMessage} className='bg-red-600 text-white px-5 rounded-md shadow-md'>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatComponent