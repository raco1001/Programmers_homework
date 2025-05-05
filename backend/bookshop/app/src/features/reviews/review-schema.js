class ReviewSchema {
  constructor(review) {
    this.review = review
  }

  static getSortBy() {
    return {
      created_at: 'created_at',
      updated_at: 'updated_at',
      rating: 'rating',
    }
  }

  static getSortOrder() {
    return {
      asc: 'ASC',
      desc: 'DESC',
    }
  }
}

module.exports = ReviewSchema
