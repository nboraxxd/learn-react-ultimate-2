import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuiz, postSubmitQuiz } from '../../services/apiServices'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question'
import ModalResult from './ModalResult'

const DetailQuiz = () => {
  const params = useParams()
  const location = useLocation()
  const [dataQuiz, setDataQuiz] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModalResult, setDataModalResult] = useState({})

  useEffect(() => {
    fetchQuestion()
  }, [params.id])

  const fetchQuestion = async () => {
    const response = await getDataQuiz(params.id)
    // console.log('question', response)

    if (response && response.EC === 0) {
      const raw = response.DT

      const data = _.chain(raw)
        .groupBy('id')
        .map((value, key) => {
          let questionDescription
          let questionImage
          const answers = []
          // console.log(value)
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description
              questionImage = item.image
            }
            item.answers.isSelected = false
            answers.push(item.answers)
          })

          return { questionId: key, answers, questionDescription, questionImage }
        })
        .value()

      console.log('data', data)
      setDataQuiz(data)
    }
  }

  const handleBackBtn = () => {
    setCurrentQuestion(currentQuestion - 1)
  }

  const handleNextBtn = () => {
    setCurrentQuestion(currentQuestion + 1)
  }

  const handleCheckbox = (questionId, anwserId) => {
    const dataQuizClone = _.cloneDeep(dataQuiz)
    let question = dataQuizClone.find((item) => +item.questionId === +questionId)

    if (question && question.answers) {
      const newAnwser = question.answers?.map((item) => {
        if (+item.id === +anwserId) item.isSelected = !item.isSelected

        return item
      })

      question.answers = newAnwser
    }

    const index = dataQuizClone.findIndex((item) => +item.questionId === +questionId)

    if (index > -1) {
      dataQuizClone[index] = question
      setDataQuiz(dataQuizClone)
    }
  }

  const handleFinishQuiz = async () => {
    const payload = {
      quizId: +params.id,
      answers: [],
    }
    const answers = []
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        const questionId = question.questionId
        const userAnswerId = []

        question.answers.forEach((item) => {
          if (item.isSelected) userAnswerId.push(item.id)
        })

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        })
      })
    }

    payload.answers = answers

    //submit API
    const response = await postSubmitQuiz(payload)

    if (response && response.EC === 0) {
      // console.log(response)
      setDataModalResult({
        countCorrect: response?.DT?.countCorrect,
        countTotal: response?.DT?.countTotal,
        quizData: response?.DT?.quizData,
      })
      setIsShowModalResult(true)
    } else {
      console.log('goi API bi sai gồ kìaa')
    }
  }

  return (
    <div className="quiz container">
      <div className="quiz-left">
        <h1 className="quiz-left__title">
          Quiz {params.id}: {location?.state?.quizTitle}
        </h1>
        <hr />
        <div className="quiz-left__content">
          <Question
            data={dataQuiz[currentQuestion]}
            currentQuestion={currentQuestion}
            handleCheckbox={handleCheckbox}
          />
        </div>
        <div className="quiz-left__footer">
          <button
            className="btn btn-secondary me-3"
            disabled={currentQuestion <= 0 ? true : false}
            onClick={handleBackBtn}
          >
            Back
          </button>
          <button
            className="btn btn-secondary me-3"
            disabled={currentQuestion >= dataQuiz.length - 1 ? true : false}
            onClick={handleNextBtn}
          >
            Next
          </button>
          <button className="btn btn-warning" onClick={handleFinishQuiz}>
            Finish
          </button>
        </div>
      </div>
      <div className="quiz-right">Count down</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  )
}

export default DetailQuiz
