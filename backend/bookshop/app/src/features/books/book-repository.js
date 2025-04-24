const db = require('../../database/mariadb')

const findBooks = async (params) => {
  const range = `AND created_at BETWEEN '${params.startDate}' AND '${params.endDate}'`
  const limit = params.limit
  const currentPage = params.currentPage
  const category_id = params.category_id
  const keyword = params.keyword || ''

  const finalCategory =
    category_id === 'ALL'
      ? ''
      : `AND main_category_id = '${category_id.trim()}'`

  const finalKeyword =
    keyword === '' ? '' : `WHERE title LIKE '%${keyword.trim()}%'`

  const query = `
    SELECT 
      LOWER(CONCAT_WS('-',
          SUBSTR(HEX(b.id), 1, 8),
          SUBSTR(HEX(b.id), 9, 4),
          SUBSTR(HEX(b.id), 13, 4),
          SUBSTR(HEX(b.id), 17, 4),
          SUBSTR(HEX(b.id), 21)
      )) AS id
      ,b.title
      ,b.author
      ,b.summary
      ,a.likes
      ,a.price
      ,a.main_category_id
      ,a.img_path
    FROM 
      (
        SELECT 
          id
          ,likes
          ,price
          ,img_path
          ,main_category_id
        FROM
          products
        WHERE product_table_name = 'books'
        ${finalCategory} 
        ${range}
      ) a 
    JOIN  (  
      SELECT id, title, author, summary 
      FROM books
      ${finalKeyword}
        ) b 
    ON a.id = b.id
    LIMIT ${limit} OFFSET ${(currentPage - 1) * limit}
    `
  try {
    const [rows] = await db.query(query)
    return rows.length ? rows : []
  } catch (error) {
    console.error('Error in findBooks:', error)
    throw new Error('Failed to fetch books')
  }
}

const getBooksTotalCount = async (params) => {
  const range = `AND created_at BETWEEN '${params.startDate}' AND '${params.endDate}'`
  const category_id = params.category_id
  const keyword = params.keyword || ''

  const finalCategory =
    category_id === 'ALL' ? '' : `AND main_category = '${category_id}'`

  const finalKeyword = keyword === '' ? '' : `WHERE title LIKE '%${keyword}%'`

  const query = `
    SELECT COUNT(*) as count FROM products p
    JOIN (
      SELECT id, title, author, summary 
      FROM books
      ${finalKeyword}
    ) b ON p.id = b.id
    WHERE product_table_name = 'books'
    ${range}
    ${finalCategory}
  `

  try {
    const [result] = await db.query(query)
    return result[0].count
  } catch (error) {
    console.error('Error in getBooksTotalCount:', error)
    throw new Error('Failed to get books total count')
  }
}

const findBookDetail = async (bookId, userId) => {
  const isLiked = userId
    ? `,(SELECT COUNT(*) FROM user_likes WHERE user_id = ? AND product_id = ?) as isLiked`
    : ''
  const query = `
    SELECT 
      p.id ,
      p.main_category_id AS category_id,
      p.img_path AS img,
      p.likes,
      p.price,
      b.title,
      b.category_id AS sub_category_id,
      b.format,
      b.author,
      b.isbn,
      b.pages,
      b.summary,
      b.description,
      b.table_of_contents,
      b.publication_date
      ${isLiked}
    FROM (
      SELECT
        id,
        main_category_id,
        likes,
        price,
        img_path
      FROM products
      WHERE id = ?
    ) p
    JOIN (
      SELECT
        id,
        author,
        title,
        category_id,
        format,
        isbn,
        pages,
        summary,
        description,
        table_of_contents,
        publication_date
      FROM books
      WHERE id = ?
    ) b ON p.id = b.id;
    `

  try {
    let result
    if (userId) {
      ;[result] = await db.query(query, [userId, bookId, bookId, bookId])
    } else {
      ;[result] = await db.query(query, [bookId, bookId])
    }

    const bookDetail = result[0]

    if (!bookDetail) return { bookDetail: null, categoryPath: [] }

    const [categories] = await db.query(
      `
      WITH RECURSIVE CategoryPath AS (
          SELECT id, parent_id, name
          FROM categories
          WHERE id = ${bookDetail.sub_category_id}

          UNION ALL
          
          SELECT c.id, c.parent_id, c.name
          FROM categories c
          JOIN CategoryPath cp ON c.id = cp.parent_id
      )

      SELECT name
      FROM CategoryPath
      ORDER BY id ASC;`,
    )

    const categoryPath = categories.map((category) => category.name)
    const [images] = await db.query(
      `SELECT img_url, display_order FROM images WHERE product_id = ? ORDER BY display_order ASC`,
      [bookId],
    )
    const bookImages = images.map((image) => image.img_url)
    bookDetail.images = bookImages
    return { bookDetail, categoryPath }
  } catch (error) {
    console.error('Error in findBookDetail:', error)
    throw new Error('Failed to fetch book details')
  }
}

module.exports = { findBooks, findBookDetail, getBooksTotalCount }
