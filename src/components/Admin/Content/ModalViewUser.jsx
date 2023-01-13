import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { MdImageSearch } from 'react-icons/md'
import { toast } from 'react-toastify'
import { putUpdateUser } from '../../../services/apiServices'
import isEmpty from 'lodash.isempty'

import './ModalViewUser.scss'

const ModalViewUser = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    if (!isEmpty(props.userView)) {
      setUsername(props.userView.username)
      setEmail(props.userView.email)
      setRole(props.userView.role)
      if (props.userView.image !== '')
        setPreviewImage(`data:image/jpeg;base64,${props.userView.image}`)
    }
  }, [props.userView])

  const handleCloseModal = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setRole('')
    setImage('')
    setPreviewImage('')
    props.setUserView({})
    props.setShow(false)
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleCloseModal}
        size="lg"
        backdrop="static"
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>View user</Modal.Title>
        </Modal.Header>
        {/* Form add new user */}
        <Modal.Body>
          <form className="row g-3">
            {/* Username */}
            <div className="col-md-6">
              <label htmlFor="inputUser" className="form-label">
                Username
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="inputUser"
                placeholder="Enter your username"
                autoComplete="on"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                disabled
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter your email"
                autoComplete="on"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                disabled
                type="password"
                className="form-control"
                id="inputPassword4"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {/* Role */}
            <div className="col-md-4">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <select
                disabled
                id="inputRole"
                className="form-select"
                style={{ color: `${!role ? '#8e8e8e' : '#000'}` }}
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option defaultValue="" hidden>
                  Choose...
                </option>
                <option value="USER" style={{ color: '#000' }}>
                  User
                </option>
                <option value="ADMIN" style={{ color: '#000' }}>
                  Admin
                </option>
              </select>
            </div>

            {/* Image */}
            <div className="col-md-12">
              <input
                type="file"
                id="inputImage"
                hidden
              />
            </div>
            <div className="col-md-12 modal-preview">
              {previewImage ? (
                <img src={previewImage} className="modal-preview-img" />
              ) : (
                <span style={{ cursor: 'default' }}>Not found image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalViewUser
