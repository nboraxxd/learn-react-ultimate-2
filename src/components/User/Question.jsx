import _ from 'lodash'

const Question = (props) => {
  const { data, currentQuestion, handleCheckbox } = props

  const handleOnChangCheckbox = (event, questionId, anwserId) => {
    handleCheckbox(questionId, anwserId)
  }

  return (
    <>
      {!_.isEmpty(data) && (
        <>
          {data.questionImage ? (
            <div className="quiz-left__image">
              <img
                src={`data:image/jpeg;base64,${data.questionImage}`}
                alt="image question"
                className="img-fluid img-thumbnail"
              />
            </div>
          ) : (
            <div className="quiz-left__image"></div>
          )}

          <div className="quiz-left__question">
            Question {currentQuestion + 1}: {data.questionDescription}
          </div>
          <div className="quiz-left__anwer">
            {data.answers &&
              data.answers.length > 0 &&
              data.answers.map((item, index) => {
                return (
                  <div className="form-check" key={item.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`flexCheck${item.id}`}
                      checked={item.isSelected}
                      onChange={(event) => handleOnChangCheckbox(event, data.questionId, item.id)}
                    />
                    <label className="form-check-label" htmlFor={`flexCheck${item.id}`}>
                      {item.description}
                    </label>
                    {/* {item.id === 1 ? 'A' : item.id === 2 ? 'B' : 'C'}. {item.description} */}
                  </div>
                )
              })}
          </div>
        </>
      )}
    </>
  )
}

export default Question
