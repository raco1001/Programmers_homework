const { getLike, createLike, deleteLikeIfExists } = require('./like-service')
const {
  uuidToBinary,
  binaryToUUID,
} = require('./../../shared/utils/convertIds')
const addLike = async (req, res, next) => {
  try {
    const userId = req.userId
    const productId = req.params.bookId

    const likeUser = await getLike(userId, productId)

    if (likeUser === 1) {
      return res
        .status(400)
        .json({ status: 'error', message: '이미 좋아요를 눌렀습니다.' })
    }

    const result = await createLike(userId, productId)

    if (result === 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '좋아요를 누를 수 없습니다.' })
    }
    console.log(
      'addLike success++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
    )
    res
      .status(200)
      .json({ status: 'success', data: { message: '좋아요 추가 성공' } })
  } catch (error) {
    next(error)
  }
}

const removeLike = async (req, res, next) => {
  try {
    const userId = req.userId
    const productId = req.params.bookId

    if (!productId || !userId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'parameters required.' })
    }

    const result = await deleteLikeIfExists(userId, productId)

    if (result === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'like not found.' })
    }

    res.status(200).json({ status: 'success', data: result })
  } catch (error) {
    next(error)
  }
}

module.exports = { addLike, removeLike }
