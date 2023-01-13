import axios from '../utils/axiosCustomize'

const postCreateNewUser = ({ username, email, password, role, image }) => {
  const data = new FormData()
  data.append('username', username)
  data.append('email', email)
  data.append('password', password)
  data.append('role', role)
  data.append('userImage', image)

  return axios.post('api/v1/participant', data)
}

const putUpdateUser = ({ id, username, role, image }) => {
  const data = new FormData()
  data.append('id', id)
  data.append('username', username)
  data.append('role', role)
  data.append('userImage', image)

  return axios.put('api/v1/participant', data)
}

const getAllUers = () => axios.get('api/v1/participant/all')

const deleteUser = (userDeleteId) =>
  axios.delete('api/v1/participant', { data: { id: userDeleteId } })

const getUserWithpaginate = (page, limit) =>
  axios.get(`api/v1/participant?page=${page}&limit=${limit}`)

const postSignUp = ({ username, email, password }) =>
  axios.post(`/api/v1/register`, { username, email, password })

const postLogin = (email, password) => axios.post(`/api/v1/login`, { email, password })

export {
  postCreateNewUser,
  getAllUers,
  putUpdateUser,
  deleteUser,
  getUserWithpaginate,
  postSignUp,
  postLogin,
}
