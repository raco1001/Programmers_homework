const jwt = require('jsonwebtoken')
const { binaryToUUID } = require('../../shared/utils/convertIds')

const checkAccessToken = async (req, res, next) => {
  try {
    // 디버그를 위한 쿠키 정보 로깅
    console.log('cookies in log middleware+++++++++++++++++: ', {
      cookies: req.cookies,
      headers: req.headers,
      rawCookies: req.headers.cookie,
    })

    const token = req.cookies?.token

    if (!token) {
      const logData = {
        ...req.body,
        timestamp: new Date().toISOString(),
        type: 'anonymous',
        cookies: req.cookies,
        headers: req.headers,
      }
      return next()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 토큰에서 추출한 정보를 req 객체에 저장
    req.userId = decoded.id
    req.userName = decoded.name
    req.userEmail = decoded.email
    req.tokenId = decoded.tokenId

    const userInfo = {
      userId: req.userId,
      userName: req.userName,
      userEmail: req.userEmail,
      tokenId: req.tokenId,
      timestamp: new Date().toISOString(),
    }

    next()
  } catch (error) {
    const errorLog = {
      error: error.message,
      timestamp: new Date().toISOString(),
      type: 'token_validation_failed',
      cookies: req.cookies,
      headers: req.headers,
    }
    next()
  }
}

module.exports = {
  checkAccessToken,
}
