import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Step 1: Use useEffect to fetch questions when the application loads
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

    // Call fetchData when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Step 2: Handle form submission to create a new question
  const handleCreateQuestion = async (newQuestion) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      const createdQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, createdQuestion]);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  // Step 3: Handle deletion of a question
  const handleDeleteQuestion = async (questionId) => {
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "DELETE",
      });

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Step 4: Handle update of a question
  const handleUpdateQuestion = async (questionId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const updatedQuestion = await response.json();

      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? updatedQuestion : question
        )
      );
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onCreateQuestion={handleCreateQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
