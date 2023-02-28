import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuizByUser } from '../../services/apiServices'
import './QuizList.scss'

const QuizList = () => {
  const [quizList, setQuizList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getQuizData()
  }, [])

  const getQuizData = async () => {
    const response = await getQuizByUser()
    console.log(response)
    if (response && response.EC === 0) {
      setQuizList(response.DT)
    }
  }

  return (
    <div className="container card-list">
      {quizList &&
        quizList.length > 0 &&
        quizList.map((quizItem) => (
          <div key={quizItem.id} className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src={`data:image/jpeg;base64, ${quizItem.image}`}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Quizzz {quizItem.id}</h5>
              <p className="card-text">{quizItem.description}</p>
              <button className="btn btn-primary" onClick={() => navigate(`/quiz/${quizItem.id}`, {state: {quizTitle: quizItem.description}})}>
                Start now
              </button>
            </div>
          </div>
        ))}

      {quizList && quizList.length === 0 && <p>You don't have any quizzz now...</p>}
    </div>
  )
}

export default QuizList
