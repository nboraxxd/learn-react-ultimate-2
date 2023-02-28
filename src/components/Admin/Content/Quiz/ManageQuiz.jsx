import React, { useState } from 'react'
import Select from 'react-select'
import './ManageQuiz.scss'

const ManageQuiz = () => {
  const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
  ]

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('EASY')
  const [image, setImage] = useState()

  const handleChangeFile = (event) => {
    console.log('hihi')
  }

  return (
    <div className="manage-quiz container">
      <h1 className="manage-quiz__title">title</h1>
      <br />
      {/* Add new quizzz */}
      <div className="manage-quiz__new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add Quizzz</legend>
          {/* Name quizzz */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name Quizzz"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="floatingInput">Name Quizzz</label>
          </div>
          {/* Description quizzz */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>
          {/* Style quizzz */}
          <Select
            // defaultValue={selectedOption}
            // onChange={setSelectedOption}
            options={options}
            value={type}
            placeholder={'Quizzz style'}
            className="my-3"
          />
          {/* Image quizzz */}
          <div>
            <label className="mb-2">Upload Image</label>
            <input type="file" className="form-control" />
          </div>
        </fieldset>
      </div>
      <div className="manage-quiz__detail">table</div>
    </div>
  )
}

export default ManageQuiz
