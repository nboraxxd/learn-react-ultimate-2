import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { MdImageSearch } from 'react-icons/md'
import { toast } from 'react-toastify'
import { putUpdateUser } from '../../../services/apiServices'
import isEmpty from 'lodash.isempty'

import './ModalUpdateUser.scss'

const ModalUpdateUser = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    if (!isEmpty(props.userUpdate)) {
      setUsername(props.userUpdate.username)
      setEmail(props.userUpdate.email)
      setRole(props.userUpdate.role)
      if (props.userUpdate.image !== '')
        setPreviewImage(`data:image/jpeg;base64,${props.userUpdate.image}`)
    }
  }, [props.userUpdate])

  const handleCloseModal = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setRole('')
    setImage('')
    setPreviewImage('')
    props.setUserUpdate({})
    props.setShow(false)
  }

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
  }

  // validate email conditions
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  // validate role conditions
  const validateRole = (role) => {
    return Boolean(role)
  }

  const handleClickUpdateBtn = async () => {
    // validate email
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('Invalid email')
    }

    // validate role
    const isValidRole = validateRole(role)
    if (!isValidRole) toast.error('Please select role')

    // submit data
    const id = props.userUpdate.id
    const userUpdata = { id, username, role, image }
    const dataResponse = await putUpdateUser(userUpdata)
    console.log('response', dataResponse)

    if (dataResponse && dataResponse.EC === 0) {
      toast.success(dataResponse.EM)
      // await props.fetchDataUserList()
      await props.fetchDataUserListWithPaginate(props.currentPage)
      
      handleCloseModal()
    }

    if (dataResponse && dataResponse.EC !== 0) {
      toast.error(dataResponse.EM)
    }
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
          <Modal.Title>Update user</Modal.Title>
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
                placeholder="Enter your password"
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
              <label htmlFor="inputImage" className="form-label modal-label btn btn-primary">
                <MdImageSearch style={{ fontSize: '24px' }} />
                Update image
              </label>
              <input
                type="file"
                id="inputImage"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 modal-preview">
              {previewImage ? (
                <img src={previewImage} className="modal-preview-img" />
              ) : (
                <label htmlFor="inputImage" style={{ cursor: 'pointer' }}>
                  Preview image
                </label>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickUpdateBtn}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateUser
