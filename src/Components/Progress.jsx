import PropTypes from 'prop-types';

const Progress = ({ numQuestions, index, points, maxPoints, answer }) => {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions}></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
};

Progress.propTypes = {
  numQuestions: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  answer: PropTypes.number,
};

export default Progress;
