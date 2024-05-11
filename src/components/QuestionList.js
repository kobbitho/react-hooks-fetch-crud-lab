import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

/*QuestionList component fetches and displays a list of questions.
 * It also provides functions to update and delete questions.
 */
function QuestionList() {
  //State variable to hold the list of questions.
  const [question, setQuestion] = useState([])
  

  //Fetches the list of questions from the server and updates the state.
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then((question) => setQuestion(question))
  }, [])

  //Updates a question on the server and updates the state.
  const handleUpdate = (id, body) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({body})
    })
    .then(response => response.json())
    .then((updatedQ) => {
      const updatedQuestion = question.map((q) => {
        if (q.id === updatedQ.id) {
          return updatedQ;
        }
        return q;
      })
      setQuestion(updatedQuestion)
    })
  }

  // Deletes a question on the server and updates the state.
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    
    .then(response => response.json())
    .then(() => {
      
      const updatedQuestions = question.filter((q) => q.id !== id)
      setQuestion(updatedQuestions)
    })
  }
  //Renders a list of questions, each with an "Update" and "Delete" button.
   const questionItems = question.map((q) => (
     <QuestionItem
       key={q.id}
       question={q}
       handleDelete={handleDelete}
       handleUpdate={handleUpdate}
     />
   ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionItems}
        </ul>
    </section>
  );
}

export default QuestionList;
