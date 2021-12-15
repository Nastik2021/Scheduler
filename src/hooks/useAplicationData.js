import React, { useState, useEffect} from "react";
import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";



export default function useApplicationData() {


  //combining day, days, appointments into State object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });



  //function to get free spots
  const getFreeSpots = (appointments) => {
    const appID = state.days.filter(day => day.name === state.day);
    const todayApp = appID[0].appointments;
    const emptyApp = todayApp.filter(app => !appointments[app].interview).length;

    return emptyApp
  }



  

  function bookInterview(id, interview) {
    //console.log(id, interview)

    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [ ...state.days]

    const dayIndex = state.days.findIndex((day)=> day.appointments.includes(id))
    console.log(appointments)
    days[dayIndex].spots = getFreeSpots(appointments);

      


    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {setState((prev) => ({...prev, appointments, days}))
      })
    //.catch((err) => { console.log(err) });
  }




  function editInterview(id, interview) { ////// ?????
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview
      },
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, {
        interview
      })
      .then((res) => {
        setState(prev => ({
          ...prev,
          appointments
        }))
      })
  }





  //cancel interview
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];

    const dayIndex = state.days.findIndex((day) => day.appointments.includes(id))

    days[dayIndex].spots = getFreeSpots(appointments)

    return axios
      .delete(`api/appointments/${id}`)
      .then((res) => {
        setState((prev) => ({...prev, appointments, days}));
      })
  }




  //function that updates the state with the new date
  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ])
      .then((all) => {
        const [first, second, third] = all
        setState(prev => ({
          ...prev,
          days: first.data,
          appointments: second.data,
          interviewers: third.data
        }));
        //console.log(state.interviewers)


      })
      .catch((err)=> console.log(err))
  }, []);

  return { state, setDay, bookInterview, cancelInterview }

}

