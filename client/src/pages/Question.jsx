// src/DisplayQuestions.js
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
    await axios.delete(`${base_url}/api/questions/${id}`);
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((q) => q._id !== id);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      return updatedQuestions;
    });
  };

  return (
    <div className="p-4 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-6">Live Questions</h1>
      <div className="w-full max-w-md space-y-4">
        {questions.map((q) => (
          <div
            key={q._id}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg animate-slideIn text-xl font-semibold">
            {q.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
