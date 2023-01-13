import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { deleteUser } from '../../../services/apiServices'

const ModalDeleteUser = (props) => {
  const handleClose = () => props.setShow(false)

  const handleConfirm = async () => {
    const dataResponse = await deleteUser(props.userDelete?.id)
    console.log(dataResponse)

    if (dataResponse && dataResponse.EC === 0) {
      toast.success(dataResponse.EM)
      // await props.fetchDataUserList()
      await props.fetchDataUserListWithPaginate(props.currentPage)

      handleClose()
    }

    if (dataResponse && dataResponse.EC !== 0) {
      toast.error(dataResponse.EM)
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete this user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete the user with email{' '}
          <b>{props.userDelete?.email ? props.userDelete.email : ''}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteUser
