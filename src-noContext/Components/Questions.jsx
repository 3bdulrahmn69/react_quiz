import PropTypes from 'prop-types';
import Options from './Options';

const Questions = ({ Question, dispatch, answer }) => {
  return (
    <div>
      <h4>{Question.question}</h4>
      <Options question={Question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

Questions.propTypes = {
  Question: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};

export default Questions;
