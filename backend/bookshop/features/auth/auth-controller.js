const { authenticateUser, refreshToken } = require('./auth-service')

const login = async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const { userId, userName, accessToken, refreshToken } =
      await authenticateUser(email, password)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      status: 'success',
      accessToken,
      user: { userId, userName },
    })
  } catch (error) {
    next(error)
  }
}

const updateRefreshToken = async (req, res, next) => {
  try {
    const userId = req.userId
    const userRefreshToken = req.cookies.refreshToken

    const accessToken = await refreshToken(userId, userRefreshToken)

    res.status(200).json({ status: '토큰이 새로 발급되었습니다.', accessToken })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res) => {
  res.clearCookie('refreshToken')
  res.clearCookie('accessToken')
  res.status(200).json({ status: 'success', message: '로그아웃 완료' })
}

module.exports = { login, updateRefreshToken, logout }
