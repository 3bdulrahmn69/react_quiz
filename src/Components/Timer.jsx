import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Timer = ({ dispatch, seconds }) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
    </div>
  );
};

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Timer;
