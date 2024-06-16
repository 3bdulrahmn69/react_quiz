import { useEffect, useReducer } from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Loader from './Components/Loader';
import Error from './Components/Error';
import StartScreen from './Components/StartScreen';
import Questions from './Components/Questions';
import NextButton from './Components/NextButton';
import Progress from './Components/Progress';
import FinishScreen from './Components/FinishScreen';
import Timer from './Components/Timer';

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};

const SECONDS_PER_QUESTION = 10;

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFiled':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        seconds: state.questions.length * SECONDS_PER_QUESTION,
      };
    case 'newAnswer':
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore: Math.max(state.highscore, state.points),
      };
    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
        highscore: state.highscore,
      };
    case 'tick':
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const App = () => {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((error) => dispatch({ type: 'dataFiled', payload: error }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              Question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} seconds={seconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
