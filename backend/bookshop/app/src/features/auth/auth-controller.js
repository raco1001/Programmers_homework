const {
  authenticateUser,
  logout,
  logoutFromAllDevices,
} = require('./auth-service')
const { AuthError } = require('./auth-utils')
const authLogger = require('./auth-logger')

const handleAuthError = (err, req, res, next) => {
  console.error(`Auth Error [${req.requestId}]:`, err)

  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      requestId: req.requestId,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
    requestId: req.requestId,
  })
}

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
    // Log failed login attempt
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

    const { accessToken, refreshToken } = await refreshToken(
      userId,
      userRefreshToken,
    )

    authLogger.logTokenRefresh(userId, req.requestId)
    res.cookie('refreshToken', refreshToken, {
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
    const refreshToken = req.cookies.refreshToken

    await logout(userId, refreshToken)

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

const logoutFromAllDevices = async (req, res, next) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      throw new AuthError('User ID is required', 400)
    }

    await logoutFromAllDevices(userId)

    authLogger.logLogout(userId, req.requestId, true)

    res.clearCookie('refreshToken')
    res.status(200).json({
      status: 'success',
      message: 'Logged out from all devices successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  updateRefreshToken,
  logout,
  logoutFromAllDevices,
  handleAuthError,
}
