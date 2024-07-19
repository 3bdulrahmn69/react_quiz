import PropTypes from 'prop-types';

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'nextQuestion' })}
        className="btn btn-ui"
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: 'finished' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
};

NextButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
  index: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
};

export default NextButton;
