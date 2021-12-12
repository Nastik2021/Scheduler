import { useState } from "react";

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  
  //allows to transition to a new mode
  const transition = (newMode, replace = false) => {
    
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode])
      
    } else {
      setHistory((prev) => [...prev, newMode]);
      
    }
    setMode(newMode);
  };


  
  // allows to call back to return to previous mode
  const back = () => {
    setHistory((prev)=> {
      if (prev.length === 1) {
        return [...prev];
      }
      const lastMode = [...prev.slice(0, -1)];
      setMode(lastMode[lastMode.length-1])
      return lastMode
    })
  }
    
    
  
 
  return { mode, transition, back };

}





