import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//////to verify why the name doesnt display when I click on the interviewer name (Form-create)


export default function Form(props) {

  //useState
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel} = props
  const [error, setError] = useState("");

  
  // function that sets student(name) and interviewer to "", it is passed to cancel
  const reset = function() {
    setStudent('');
    setInterviewer(null);
  };

  // function that calls reset() and props.onCancel (when clicking the cancel button)
  const cancel = function() {
    onCancel();
    reset();
  };

  //console.log({student});

  // function from testing exercise
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    //setError("");
    onSave(student, interviewer);
  }

  return(

    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name" ///to verify
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          data-testid="student-name-input" ////
        />

    </form>
    <section className="appointment__validation">{error}</section> 
    <InterviewerList 
      interviewers={interviewers}
      interviewer={interviewer} 
      setInterviewer={setInterviewer}
      
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={ validate }>Save</Button>
    </section>
  </section>
</main>


  );
}