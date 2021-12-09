import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

/* Our InterviewerList receives three props:

interviewers:array - an array of objects 
setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
interviewer:number - id
*/



export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {

  return (

    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />

    );
  });

    return (

      <section className="interviewers">
       <h4 className="interviewers__header text--light">Interviewer</h4>
       <ul className="interviewers__list">{interviewers}</ul>
      </section>

    );
  }


   


