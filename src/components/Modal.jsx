import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./Modal.css";

function Modal({ modalContent, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: modalContent.isCorrect ? 'green' : '#dc2626'
        }}>
          <FontAwesomeIcon icon={modalContent.isCorrect ? faCircleCheck : faCircleXmark} />
          {modalContent.isCorrect ? ' 正解' : ' 不正解'}
        </h2>

        <p><strong>お題:</strong> {modalContent.word}</p>

        {!modalContent.isCorrect && (
          <>
            <p><strong>あなたの解答:</strong> {modalContent.choice}</p>
            <p><strong>正しい答え:</strong> {modalContent.answer}</p>
          </>
        )}

        {modalContent.isCorrect && (
          <p><strong>単語:</strong> {modalContent.answer}</p>
        )}

        <p><strong>例文:</strong><br />{modalContent.example}</p>

        <div className="button">
          <button onClick={onClose}>The next question</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
