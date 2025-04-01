const { getLikes, createLike, deleteLikeIfExists } = require('./like-service')

const addLike = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const bookId = req.body.bookId

    const likeUser = await getLikes(userId, bookId)

    if (likeUser === 1) {
      return res
        .status(400)
        .json({ status: 'error', message: '이미 좋아요를 눌렀습니다.' })
    }

    const result = createLike(userId, bookId)

    if (result === 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '좋아요를 누를 수 없습니다.' })
    }

    res.status(200).json({ status: 'success', data: result })
  } catch (error) {
    next(error)
  }
}

const removeLike = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const bookId = req.body.bookId

    if (!bookId || !userId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'parameters required.' })
    }

    const result = await deleteLikeIfExists(userId, bookId)

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
