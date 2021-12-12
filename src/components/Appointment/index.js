import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {
  const { id, time, interview, interviewers } = props;

  const {mode, transition, back } = useVisualMode (props.interview ? SHOW : EMPTY )



  return (

    <article className="appointment">
         <Header time={ time }></Header>

         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
         {mode === SHOW && (

          <Show 
         student={interview.student}
         interviewer={interview.interviewer}
         /> 
         )}
         {mode === CREATE &&
          <Form
            interviewers={ [] }
            onCancel={() => back()}
            />
         }
         </article>
         );
         }
         
