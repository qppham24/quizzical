import { useState, useEffect } from 'react'
import './App.css'
import IntroPage from '../components/IntroPage'
import QuizPage from '../components/QuizPage'

export default function App() {
  const [page, setPage] = useState('intro')

  function startQuiz() {
    setPage('quiz')
  }

  function playAgain() {
    setPage('intro')
  }
  
  return (
    <div className="App">
      {page === 'intro' && <IntroPage handleClick={startQuiz} />}
      {page === 'quiz' && <QuizPage playAgain={playAgain}/>}
    </div>
  )
}
