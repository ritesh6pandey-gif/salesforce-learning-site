import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import integrationPatterns from '@site/src/data/quizzes/integration-patterns.json';
import outboundCallouts from '@site/src/data/quizzes/outbound-callouts.json';

// Register each topic's quiz JSON here. To add a quiz for a new topic:
// 1. Create src/data/quizzes/<topic>.json with the same shape as the files above.
// 2. Import it above and add it to this map.
// 3. Drop <Quiz quizId="<topic>" /> into that lesson's .md page.
// To add more questions to an EXISTING quiz, just edit its JSON file — no code changes needed.
const QUIZ_MAP = {
  'integration-patterns': integrationPatterns,
  'outbound-callouts': outboundCallouts,
};

export default function Quiz({quizId}) {
  const quiz = QUIZ_MAP[quizId];
  const questions = quiz?.questions ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswered = selectedOption !== null;

  const progressLabel = useMemo(
    () => `Question ${Math.min(currentIndex + 1, questions.length)} of ${questions.length}`,
    [currentIndex, questions.length],
  );

  if (!quiz || questions.length === 0) {
    return (
      <div className={styles.quizBox}>
        <p>Quiz coming soon for this lesson.</p>
      </div>
    );
  }

  function handleSelect(optionIndex) {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
  }

  function handleRetake() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className={styles.quizBox}>
        <h3 className={styles.quizTitle}>Quiz results</h3>
        <p className={styles.scoreLine}>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
        </p>
        <button className={styles.retakeButton} onClick={handleRetake}>
          Retake quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizBox}>
      <div className={styles.quizHeader}>
        <h3 className={styles.quizTitle}>Check your understanding</h3>
        <span className={styles.progress}>{progressLabel}</span>
      </div>
      <p className={styles.questionText}>{currentQuestion.question}</p>
      <div className={styles.options}>
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctIndex;
          const isSelected = index === selectedOption;
          let optionClass = styles.option;
          if (hasAnswered && isCorrect) {
            optionClass = clsx(styles.option, styles.optionCorrect);
          } else if (hasAnswered && isSelected && !isCorrect) {
            optionClass = clsx(styles.option, styles.optionIncorrect);
          }
          return (
            <button
              key={index}
              type="button"
              className={optionClass}
              disabled={hasAnswered}
              onClick={() => handleSelect(index)}>
              {option}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div
          className={clsx(
            styles.feedback,
            selectedOption === currentQuestion.correctIndex
              ? styles.feedbackCorrect
              : styles.feedbackIncorrect,
          )}>
          <strong>
            {selectedOption === currentQuestion.correctIndex ? 'Correct! ' : 'Not quite. '}
          </strong>
          {currentQuestion.explanation}
        </div>
      )}

      {hasAnswered && (
        <button className={styles.nextButton} onClick={handleNext}>
          {isLastQuestion ? 'See results' : 'Next question'}
        </button>
      )}
    </div>
  );
}
