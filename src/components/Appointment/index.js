import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const {mode, transition, back } = useVisualMode (props.interview ? SHOW : EMPTY )

  
  const save = (name, interviewer) => {   /////////
    //console.log("NAME:", name);
    if(!name || !interviewer) {
      return;
    }

    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
       
  }
  //console.log({interview});

  const confirmDelete = () => {  ///////
    transition(CONFIRM);
  }
  
  
  const deleteInterview = (id) => {  //////
    transition(DELETING, true);
          cancelInterview(id)
             .then(() => {
               transition(EMPTY);
             }) 
             .catch((err) => {
               transition(ERROR_DELETE, true);
             });
  };


  // from compass...to be removed
  // const deleteInterview = (event) => {
  //   transition(DELETING, true);
  //   props
  //   .cancelInterview(props.id)
  //   .then(() => transition(EMPTY))
  //   .catch(err => transition(ERROR_DELETE, true));
  // }

  




  
  // selecting edit from Show, transition to Confirm ///
  const edit = () => { 
      transition(EDIT)
  }





  return (

    <article className="appointment">
         <Header time={ time }></Header>

         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
         {mode === SHOW && (

          <Show 
         id={id}
         student={interview.student}
         interviewer={interview.interviewer}
         onDelete={() => confirmDelete()}
         onEdit={() => edit()}
         /> 
         )}
         {mode === CREATE &&
          <Form
            interviewers={ interviewers }
            onCancel={() => back()}
            onSave={ save }
            />
         }
         { mode === SAVING && <Status message='Saving' />}
         { mode === DELETING && <Status message='Deleting' />}
         { mode === CONFIRM && (
           <Confirm 
              message="Are you sure you want to delete this Appointment?"
              onCancel={() => back()}
              onConfirm={() => deleteInterview(id)}
              />
         )}
         { mode === EDIT &&
          <Form
            interviewers={interviewers}
            student={interview.student}
            interviewer={interview.interviewer.id}
            onCancel={() => back()}
            onSave={save}
            />
         }
         { mode === ERROR_DELETE &&
          <Error
            message="Error, cannot delete Appointment, please try again"
            onClose={()=> back()}
            />
         }
         { mode === ERROR_SAVE &&
          <Error  
            message="Error, cannot save Appointment, please try again"
            onClose={() => back()}
            />
          }
         </article>
         );
         }
         
