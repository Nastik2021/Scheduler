import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

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
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
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

      //code that validates the interviewers props (testing activity)
      InterviewerList.propTypes = {
        interviewers: PropTypes.array.isRequired

      }


   


