const { authenticateUser, refreshToken } = require('./auth-service')
const { AuthError } = require('./auth-utils')
const authLogger = require('./auth-logger')
const { handleAuthError } = require('./auth-middleware')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { user, tokens } = await authenticateUser(email, password)

    authLogger.logLogin(user.id, user.email, req.requestId)

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
      status: 'success',
      data: {
        user,
        accessToken: tokens.accessToken,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      authLogger.logLoginFailure(req.body.email, req.requestId, error.message)
    }
    next(error)
  }
}

const updateRefreshToken = async (req, res, next) => {
  try {
    const userId = req.userId
    const userRefreshToken = req.cookies.refreshToken

    const { accessToken, updatedRefreshToken } = await refreshToken(
      userId,
      userRefreshToken,
    )

    authLogger.logTokenRefresh(userId, req.requestId)
    res.cookie('refreshToken', updatedRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
      status: 'success',
      message: 'Token refreshed successfully',
      data: { accessToken },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const userId = req.user?.id
    console.log('Starting logout process...')
    if (userId) {
      authLogger.logLogout(userId, req.requestId)
    }

    res.clearCookie('refreshToken')
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  updateRefreshToken,
  logout,
  handleAuthError,
}
