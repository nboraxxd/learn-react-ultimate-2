import React, { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { getAllUers, getUserWithpaginate } from '../../../services/apiServices'
import ModalCreateUser from './ModalCreateUser'
import ModalUpdateUser from './ModalUpdateUser'
import TableUser from './TableUser'
import TableUserPaginate from './TableUserPaginate'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'
import './ManageUser.scss'

const ManageUser = () => {
  const DEFAULT_PAGE = 1
  const LIMIT_USER = 5
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE)
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)

  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

  const [userList, setUserList] = useState([])
  const [userUpdate, setUserUpdate] = useState({})
  const [userView, setUserView] = useState({})
  const [userDelete, setUserDelete] = useState({})

  const handleOnClickViewBtn = (userItem) => {
    setShowModalViewUser(true)
    setUserView(userItem)
  }

  const handleOnClickUpdateBtn = (userItem) => {
    setShowModalUpdateUser(true)
    setUserUpdate(userItem)
  }

  const handleOnClickDeleteBtn = (userItem) => {
    setShowModalDeleteUser(true)
    setUserDelete(userItem)
  }

  const fetchDataUserList = async () => {
    const response = await getAllUers()

    if (response.EC === 0) setUserList(response.DT)
  }

  const fetchDataUserListWithPaginate = async (page) => {
    const response = await getUserWithpaginate(page, LIMIT_USER)

    if (response.EC === 0) {
      setUserList(response.DT.users)
      setTotalPages(response.DT.totalPages)
    }
  }

  useEffect(() => {
    // fetchDataUserList()
    fetchDataUserListWithPaginate(DEFAULT_PAGE)
  }, [])

  return (
    <div className="manage-user">
      <h4 className="manage-user-title">Manage user</h4>
      <div className="manage-user-content">
        <button
          className="btn btn-primary manage-user-btn"
          onClick={() => setShowModalCreateUser(true)}
        >
          <FiUserPlus style={{ fontSize: '22px' }} /> Add new user
        </button>

        <div className="manage-user-table">
          {/* <TableUser
            userList={userList}
            onClickViewBtn={handleOnClickViewBtn}
            onClickUpadateBtn={handleOnClickUpdateBtn}
            onClickDeleteBtn={handleOnClickDeleteBtn}
          /> */}
          <TableUserPaginate
            userList={userList}
            pageCount={totalPages}
            onClickViewBtn={handleOnClickViewBtn}
            onClickUpadateBtn={handleOnClickUpdateBtn}
            onClickDeleteBtn={handleOnClickDeleteBtn}
            fetchDataUserListWithPaginate={fetchDataUserListWithPaginate}
            defaultPage={DEFAULT_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          // fetchDataUserList={fetchDataUserList}
          fetchDataUserListWithPaginate={fetchDataUserListWithPaginate}
          defaultPage={DEFAULT_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          userView={userView}
          setUserView={setUserView}
        />

        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
          // fetchDataUserList={fetchDataUserList}
          fetchDataUserListWithPaginate={fetchDataUserListWithPaginate}
          defaultPage={DEFAULT_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          userDelete={userDelete}
          // fetchDataUserList={fetchDataUserList}
          fetchDataUserListWithPaginate={fetchDataUserListWithPaginate}
          defaultPage={DEFAULT_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ManageUser
