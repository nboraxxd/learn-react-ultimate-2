import React from 'react'
import ReactPaginate from 'react-paginate'

const TableUserPaginate = (props) => {
  const {
    userList,
    pageCount,
    onClickViewBtn,
    onClickUpadateBtn,
    onClickDeleteBtn,
    fetchDataUserListWithPaginate,
    defaultPage,
    currentPage,
    setCurrentPage,
  } = props

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchDataUserListWithPaginate(+event.selected + 1)
    setCurrentPage(+event.selected + 1)
    // console.log(`User requested page number ${event.selected}`)
  }

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
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
        style={{ justifyContent: 'center' }}
      />
    </>
  )
}

export default TableUserPaginate
