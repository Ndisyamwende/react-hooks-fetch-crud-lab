import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ onDeleteQuestion, onUpdateQuestion }) {
  const [questions, setQuestions] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };


    fetchData();
  }, []); 

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateQuestion={onUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
