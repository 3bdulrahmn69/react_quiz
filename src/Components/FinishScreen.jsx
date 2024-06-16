import PropTypes from 'prop-types';

const FinishScreen = ({ points, maxPoints, highscore, dispatch }) => {
  const percentage = (points / maxPoints) * 100;

  let emoji = '';

  if (percentage === 100) emoji = '🎉';
  if (percentage >= 80) emoji = '👏';
  if (percentage >= 60) emoji = '🙂';
  if (percentage >= 40) emoji = '😬';
  if (percentage >= 20) emoji = '😕';
  if (percentage > 0) emoji = '😢';

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your scored <strong>{points}</strong> out of{' '}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz <span>🔄</span>
      </button>
    </>
  );
};

FinishScreen.propTypes = {
  points: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  highscore: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default FinishScreen;
