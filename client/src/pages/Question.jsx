import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { base_url } from '../config';

const socket = io(`${base_url}`);

function Questions() {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  useEffect(() => {
    socket.on('newQuestion', (newQuestion) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [newQuestion, ...prevQuestions];
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        return updatedQuestions;
      });

      setTimeout(() => {
        removeQuestion(newQuestion._id);
      }, 10000); // 10 seconds
    });

    return () => {
      socket.off('newQuestion');
    };
  }, []);

  const removeQuestion = async (id) => {
    document.getElementById(id).classList.add('shrink-out');

    setTimeout(async () => {
      await axios.delete(`${base_url}/api/questions/${id}`);
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.filter((q) => q._id !== id);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        return updatedQuestions;
      });
    }, 1000); // 1-second delay for animation to complete
  };

  return (
    <div className="p-4 h-[100vh] flex flex-col justify-center items-center bg-gradient-to-r from-green-500">
      <h1 className="text-4xl font-bold mb-6 text-center">Ask me </h1>
      <div className="flex flex-col md:flex-row w-full  border-2 h-full gap-4 items-center">
        {/* Left Side: Questions */}
        <div className="flex flex-col w-[70%] items-center gap-4">
          {questions.map((q) => (
            <div
              id={q._id}
              key={q._id}
              className="p-4 w-[90%] max-w-[350px] text-center bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg shadow-lg text-xl font-semibold expand-in"
            >
              {q.content}
            </div>
          ))}
        </div>
        {/* Right Side: QR Code */}
        <div className="flex flex-col  w-[30%] items-center">
          <img src="qr.png" alt="QR Code" className="w-60 h-60 object-contain" />
          <h3 className="text-xl font-semibold mt-4 text-center">Scan Me</h3>
        </div>
      </div>
    </div>
  );
}

export default Questions;
