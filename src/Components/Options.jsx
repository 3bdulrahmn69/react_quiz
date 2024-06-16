import PropTypes from 'prop-types';

const Options = ({ question, dispatch, answer }) => {
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswer
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={index}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

Options.propTypes = {
  question: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};

export default Options;
