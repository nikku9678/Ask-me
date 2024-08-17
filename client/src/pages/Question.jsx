// src/DisplayQuestions.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { base_url } from '../config';
// import './animations.css'; // Import the custom CSS file

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
    document.getElementById(id).classList.add('shrink-out'); // Add shrink-out animation

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
      <h1 className="text-4xl font-bold mb-6">Live Questions</h1>
      <div className="relative w-[90vw] h-[80vh] flex flex-col gap-3 justify-center items-center">
        {questions.map((q) => (
          <div
            id={q._id}
            key={q._id}
            className={`p-4 w-[350px] text-center bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg shadow-lg text-xl font-semibold expand-in`}
          >
            {q.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
