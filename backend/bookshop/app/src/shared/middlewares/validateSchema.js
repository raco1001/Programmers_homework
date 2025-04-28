const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    console.log('validateSchema: ', req.body)
    if (error) {
      const errors = error.details.map((detail) => detail.message)
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      })
    }
    next()
  }
}

module.exports = validateSchema
