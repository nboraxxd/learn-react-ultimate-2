import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { getAllUers } from '../../../services/apiServices'

const TableUser = (props) => {
  const { userList, onClickViewBtn, onClickUpadateBtn, onClickDeleteBtn } = props

  const handleOnClickViewBtn = (userItem) => {
    if (!onClickViewBtn) return

    onClickViewBtn(userItem)
  }

  const handleOnClickUpdateBtn = (userItem) => {
    if (!onClickUpadateBtn) return

    onClickUpadateBtn(userItem)
  }

  const handleOnClickDeleteBtn = (userItem) => {
    if (!onClickDeleteBtn) return

    onClickDeleteBtn(userItem)
  }

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length > 0 ? (
            userList.map((userItem) => {
              return (
                <tr key={userItem.id}>
                  <th scope="col">{userItem.id}</th>
                  <td>{userItem.username}</td>
                  <td>{userItem.email}</td>
                  <td>{`${userItem.role[0]?.toUpperCase()}${userItem.role
                    ?.substring(1)
                    ?.toLowerCase()}`}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleOnClickViewBtn(userItem)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleOnClickUpdateBtn(userItem)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleOnClickDeleteBtn(userItem)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="5">Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default TableUser
