import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//////to verify why the name doesnt display when I click on the interviewer name (Form-create)


export default function Form(props) {

  
  //useState
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  
  // function that sets student(name) and interviewer to "", it is passed to cancel
  const reset = function() {
    setName('');
    setInterviewer(null);
  };

  // function that calls reset() and props.onCancel (when clicking the cancel button)
  const cancel = function() {
    reset();
    props.onCancel();
  };



  return(

    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name={props.name}  ///to verify
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
      <Button danger onClick={cancel}>
        Cancel
        </Button>

      <Button confirm onClick={props.onSave}>
        Save
        </Button>
    </section>
  </section>
</main>


  );
}