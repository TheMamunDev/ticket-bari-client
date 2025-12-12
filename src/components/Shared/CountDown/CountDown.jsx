import React, { useState, useEffect } from 'react';

const CountDown = ({ targetDate, targetTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  if (!targetDate || !targetTime) {
    return <span>Loading...</span>;
  }

  useEffect(() => {
    const parseDateTime = (dateStr, timeStr) => {
      const timeParts = timeStr.match(/(\d+):(\d+) (AM|PM)/);
      if (!timeParts) return new Date();

      let hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const modifier = timeParts[3];

      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      const date = new Date(dateStr);
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const target = parseDateTime(targetDate, targetTime);

    const updateTimeLeft = () => {
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onExpire(true);
      } else {
        onExpire(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime, onExpire]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral text-neutral-content rounded-box">
        <span className="countdown font-mono text-3xl">
          <span style={{ '--value': timeLeft.days }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-neutral text-neutral-content rounded-box">
        <span className="countdown font-mono text-3xl">
          <span style={{ '--value': timeLeft.hours }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral text-neutral-content rounded-box">
        <span className="countdown font-mono text-3xl">
          <span style={{ '--value': timeLeft.minutes }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral text-neutral-content rounded-box">
        <span className="countdown font-mono text-3xl">
          <span style={{ '--value': timeLeft.seconds }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountDown;
