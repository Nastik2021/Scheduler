import { useState } from "react";

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  
  //allows to transition to a new mode
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
    }
    setMode(newMode)
  };


    
  
  // allows to call back to return to previous mode
  const back = () => {
    if (history.length < 1) {
      return undefined;
    }
   const lastMode = history.pop();
   setHistory(history);
   setMode(lastMode)
  } ;
  return { mode, transition, back };
};tment 





