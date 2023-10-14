import React, {useState, useEffect} from 'react';
import './Timer.css';


const Timer = () => {
    const [time, setTime] = useState();

    useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date().toLocaleString('en-GB',{day:'numeric',month:'short', year:'numeric', hour:'numeric', minute:'numeric'}));
        }, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }, []);
  return (    
   <div className='todo__timer'>{time}</div>   
  )
}

export default Timer
