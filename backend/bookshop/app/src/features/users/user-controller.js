const { removeAllListeners } = require('../../database/mariadb')
const {
  registerUser,
  getUser,
  updateUserPassword,
  removeUser,
} = require('./user-service')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await registerUser(email, password)
    if (result === 1) {
      res
        .status(201)
        .json({ status: 'success', message: `${email}님 가입을 환영합니다!` })
    }
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log('요청된 userId:', userId)

    const user = await getUser(userId)
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: '사용자를 찾을 수 없습니다.' })
    }

    res.json({ status: 'success', data: user })
  } catch (error) {
    console.error('getUserById 오류:', error)
    return next(error)
  }
}

const authenticatUserByEmail = async (req, res, next) => {
  try {
    console.log('authenticatUserByEmail')
    const userEmail = req.body.email

    const user = await getUserByEmail(userEmail)
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: '사용자를 찾을 수 없습니다.' })
    }

    res.json({ status: 'success', data: user })
  } catch (error) {
    console.error('getUserById 오류:', error)
    return next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const email = req.params.email
    const password = req.body.password
    console.log('resetPassword', email, password)
    const result = await updateUserPassword(email, password)
    if (result === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: '해당 회원이 존재하지 않습니다.' })
    }
    res.json({ status: 'success', message: '비밀번호가 업데이트 되었습니다.' })
  } catch (error) {
    return next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const result = await removeUser(req.params.id)
    if (result === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: '해당 회원이 존재하지 않습니다.' })
    }
    res.json({ status: 'success', message: '회원이 삭제되었습니다.' })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  register,
  getUserById,
  deleteUser,
  resetPassword,
  authenticatUserByEmail,
}
