import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//////to verify why the name doesnt display when I click on the interviewer name (Form-create)


export default function Form(props) {

  
  //useState
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel} = props

  
  // function that sets student(name) and interviewer to "", it is passed to cancel
  const reset = function() {
    setStudent('');
    setInterviewer(null);
  };

  // function that calls reset() and props.onCancel (when clicking the cancel button)
  const cancel = function() {
    props.onCancel();
    reset();
  };

  //console.log({student});

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
        />

    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      interviewer={interviewer} 
      setInterviewer={setInterviewer}
      
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={()=> onSave(student, interviewer)}>Save</Button>
    </section>
  </section>
</main>


  );
}