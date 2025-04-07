const db = require('../../database/mariadb')

const findBooks = async (params) => {
  const range = 'WHERE publication_date BETWEEN ? AND ?'
  const finalCategory =
    category === 'ALL' ? '' : `AND main_category = '${category}'`

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
      ,a.img_path
    FROM 
      (
        SELECT 
          id
          ,likes
          ,price
          ,img_path
        FROM
          products
        WHERE product_table_name = 'books'
        ${finalCategory} 
      ) a 
    JOIN  (  SELECT id, title, author, summary 
          FROM books
          ${range}
        ) b 
    ON a.id = b.id
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `

  const [rows] = await db.query(query, params)

  return rows.length ? rows : []
}

const findBookDetail = async (bookId, userId) => {
  const query = `
    SELECT 
      p.id as bookBid,
      p.main_category AS mainCategory,
      p.img_path AS img,
      p.likes,
      p.price,
      b.title,
      b.category_id AS categoryId,
      b.format,
      b.author,
      b.isbn,
      b.pages,
      b.summary,
      b.description,
      b.table_of_contents,
      b.publication_date
      ${userId ? `,(SELECT COUNT(*) FROM user_likes where user_id = ${userId} AND product_id = ${bookId}) as isLiked` : ''}
    FROM (
      SELECT
        id
        ,main_category
        ,likes
        ,price
        ,img_path
      FROM products
      WHERE id = ${bookId}
    ) p
    JOIN (
      SELECT
        id
        ,title
        ,category_id
        ,format
        ,author
        ,isbn
        ,pages
        ,summary
        ,description
        ,table_of_contents
        ,publication_date
      FROM books
      WHERE id = ${bookId}
    ) b ON p.id = b.id;
    `
  const [result] = await db.query(query)

  const bookDetail = result[0]

  if (!bookDetail) return [0, 0]

  const [categories, info] = await db.query(
    `
    WITH RECURSIVE CategoryPath AS (
        SELECT id, parent_id, name
        FROM categories
        WHERE id = ?

        UNION ALL
        
        SELECT c.id, c.parent_id, c.name
        FROM categories c
        JOIN CategoryPath cp ON c.id = cp.parent_id
    )

    SELECT name
    FROM CategoryPath
    ORDER BY id ASC;`,
    [bookDetail.category_id],
  )

  const categoryPath = categories.map((category) => category.name)

  return { bookDetail: bookDetail, categoryPath: categoryPath }
}

module.exports = { findBooks, findBookDetail }
