import { useLocation } from 'react-router-dom';
import "./Result.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


function Result() {
  const location = useLocation();
  const { correctCount = 0, incorrectCount = 0, history = [] } = location.state || {};

  const correctAnswers = history.filter(item => item.isCorrect);
  const incorrectAnswers = history.filter(item => !item.isCorrect);

  return (
    <div className='wrapper'>
      <main className="quiz">
        <div className="result-page">
          <h2>Quiz Results</h2>
          <div className='result-page-innner'>
            <div className='block'>
            <h3>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '0.3em' }} />
              Words you got right
            </h3>
            {correctAnswers.length > 0 ? (
              <ul>
                {correctAnswers.map((item, idx) => (
                  <li key={idx}>
                    <div><strong>{item.word}</strong></div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: 'green' }}>Your answer:</span>{' '}
                      <span style={{ color: 'green' }}>{item.choice}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li>None</li>
              </ul>
            )}
            </div>
            <div className='block'>
            <h3>
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'crimson', marginRight: '0.3em' }} />
              Words you got wrong
            </h3>
           
            {incorrectAnswers.length > 0 ? (
            <ul>
              {incorrectAnswers.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '1em' }}>
                  <div><strong>{item.word}</strong></div>
                  <div>
                    <span style={{ fontWeight: 'bold', color: 'crimson' }}>Your answer:</span>{' '}
                    <span style={{ color: 'crimson' }}>{item.choice}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold', color: 'green' }}>Correct answer:</span>{' '}
                    <span style={{ color: 'green' }}>{item.answer}</span>
                  </div>
                </li>
              ))}
            </ul>

            ) : (
              <ul>
                <li>None</li>
              </ul>
            )}
            {/* <p>Incorrect answers: {incorrectCount}</p> */}
            </div>
          </div>

          <a href="/">TOP</a>
        </div>
      </main>
    </div>
  );
}

export default Result;
