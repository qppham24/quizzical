import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'

export default function Question(props) {
    const [answers, setAnswers] = useState([])

    function loadAnswers() {
        let arr = props.incorrect_answers.map(i => ({value: i, isCorrect:false}))
        arr.splice(Math.random() * arr.length, 0, {value: props.correct_answer, isCorrect:true})
        setAnswers(arr.map(i => ({
            ...i, 
            id: nanoid(),
            isSelected: false
        })))
    }

    useEffect(() => {
        loadAnswers()
    }, [])

    function selectAnswer(id, isCorrect) {
        props.handleSelectAnswer(isCorrect)
        setAnswers(answers => answers.map(ans => {
            return ans.id == id ? 
                {...ans, isSelected: true} :
                {...ans, isSelected: false}
        }))
    }

    const answerElements = answers.map(ans => 
        <button
            key={ans.id}
            className={'answer ' + 
                (ans.isSelected ? 
                    (props.isShown ? 
                        (ans.isCorrect ? 'correct' : 'incorrect') : 'selected') : 'not-selected')}
            onClick={props.isShown ? null : () => selectAnswer(ans.id, ans.isCorrect)}
        >
            {ans.value}
        </button>
    )

    return (
        <div>
            <h3 className='question'>{props.question}</h3>
            <div className='answers-container'>
                {answerElements}
            </div>
            <hr />
        </div>
    )
}