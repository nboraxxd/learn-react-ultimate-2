import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalResult = (props) => {
  const handleClose = () => props.setShow(false)

  return (
    <>
      <Modal show={props.show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Your result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total correct answers: <b>{props?.dataModalResult?.countCorrect}</b>
          </div>
          <div>
            Total question: <b>{props?.dataModalResult?.countTotal}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Show anwers
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalResult
