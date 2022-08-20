import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import he from 'he'
import Question from './Question'

export default function QuizPage(props) {
    const [questions, setQuestions] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [fillCount, setFillCount] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
  
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestions(data.results.map(obj => ({
                    ...obj, 
                    id: nanoid(),
                    hasSelectedAnswer:false,
                    hasCorrectAnswer:false,
                }
            ))))
    }, [])

    useEffect(() => {
        let fill = 0
        let correct = 0
        questions.map(q => {
            fill = fill + (q.hasSelectedAnswer ? 1 : 0)
            correct = correct + (q.hasCorrectAnswer ? 1 : 0)
        })
        setFillCount(fill)
        setCorrectCount(correct)
    }, [questions])
    
    const questionElements = questions.map(q => (
        <Question 
            key={q.id}
            id={q.id}
            question={he.decode(q.question)}
            correct_answer={he.decode(q.correct_answer)}
            incorrect_answers={q.incorrect_answers.map(i => he.decode(i))}
            isShown={isShown}
            hasSelectedAnswer={q.hasSelectedAnswer}
            hasCorrectAnswer={q.hasCorrectAnswer}
            handleSelectAnswer={selectAnswer}
        />
    ))

    function selectAnswer(questionId, isCorrect) {
        setQuestions(questions.map(q => {
            if (questionId === q.id) {
                return {...q, hasSelectedAnswer: true, hasCorrectAnswer: isCorrect}
            } else {
                return q
            }
        }))
    }
  
    function checkAnswers() {
        setIsShown(true)
    }

    function playAgain() {
        setIsShown(false)
        props.playAgain()
    }

    return (
        <div>
            {questionElements}
            {fillCount==5 && <button 
                onClick={isShown ? playAgain : checkAnswers} 
                className='quiz--btn'
            >
                    {isShown ? 'Play again' : 'Check answers'}
            </button>}
            {isShown && <h4>Your total score is: {correctCount}</h4>}
        </div>
    )
}