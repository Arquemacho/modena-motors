import React, { useState, useEffect } from 'react';

const calculateTimeLeft = (toDate) => {
    const difference = +new Date(toDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
            horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutos: Math.floor((difference / 1000 / 60) % 60),
            segundos: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

const Countdown = ({ toDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(toDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(toDate));
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, toDate]);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval} data-aos="countdown-animation">
                {timeLeft[interval]} {interval.toUpperCase()}
            </span>
        );
    });

    return (
        <div className="countdown">
            {timerComponents.length ? timerComponents : <span>¡Tiempo cumplido!</span>}
        </div>
    );
};

export default Countdown;
