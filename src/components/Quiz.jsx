import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import Modal from './Modal';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import "./Quiz.css";

function Quiz() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const removeDuplicatesByWord = (array) => {
    const seen = new Set();
    return array.filter(item => {
      if (seen.has(item.word)) return false;
      seen.add(item.word);
      return true;
    });
  };

  useEffect(() => {
    fetch('/quiz-data01.json')
      .then(res => res.json())
      .then(data => {
        const unique = removeDuplicatesByWord(data);
        const shuffled = shuffleArray(unique);
        const selected = shuffled.slice(0, 10);
        setQuizList(selected);
        setCurrentQuiz(selected[0]);
      });
  }, []);

  const handleAnswer = (choice) => {
    const isCorrect = choice === currentQuiz.answer;

    const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
    const newIncorrectCount = !isCorrect ? incorrectCount + 1 : incorrectCount;

    setCorrectCount(newCorrectCount);
    setIncorrectCount(newIncorrectCount);

    const message = {
      isCorrect,
      word: currentQuiz.word,
      answer: currentQuiz.answer,
      choice,
      example: currentQuiz.example || '（例文なし）',
      isLast: questionCount + 1 >= 10,
      nextCount: questionCount + 1,
    };

    setModalContent(message);
    setShowModal(true);

    setHistory(prev => [...prev, message]);
  };

  const handleNext = () => {
    setShowModal(false);
    setQuestionCount(modalContent.nextCount);

    if (modalContent.isLast) {
      navigate('/result', {
        state: {
          correctCount,
          incorrectCount,
          history,
        },
      });
    } else {
      const nextIndex = (quizIndex + 1) % quizList.length;
      setQuizIndex(nextIndex);
      setCurrentQuiz(quizList[nextIndex]);
      setFeedback('');
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    const voices = speechSynthesis.getVoices();
    const preferredVoices =
      ['Google US English', 'Samantha', 'Karen', 'Victoria', 'Moira'];

    const femaleVoice = voices.find(
      (voice) =>
        voice.lang === 'en-US' &&
        preferredVoices.includes(voice.name)
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  };

  if (!currentQuiz) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <main className="quiz">
        <Title />
        <div className="inner-block">
          <div className="quiz-content">
            <h2 className="quiz-question">
              {currentQuiz.word}
              <button onClick={() => speak(currentQuiz.word)} className="speak-button">
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            </h2>
            <ul className="quiz-answer">
              {currentQuiz.choices.map((choice, index) => (
                <li className="quiz-button" key={index}>
                  <label className="quiz-button">
                    <input
                      name="radio"
                      type="radio"
                      onClick={() => handleAnswer(choice)}
                    />
                    <span className="quiz-text01">{choice}</span>
                  </label>
                </li>
              ))}
            </ul>
            {feedback && (
              <div className="quiz-feedback">
                <strong>{feedback}</strong>
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <Modal modalContent={modalContent} onClose={handleNext} />
      )}
    </div>
  );
}

export default Quiz;
