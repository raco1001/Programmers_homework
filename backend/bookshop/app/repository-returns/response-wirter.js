const fs = require('fs')
const path = require('path')

const db = require('../../app/src/database/mariadb')

const { uuidToBinary } = require('../../app/src/shared/utils/convertIds')

// 책
const findResponse = async () => {
  const [response] = await db.query('SELECT * FROM books')

  // Create returns directory if it doesn't exist
  const returnsDir = path.join(__dirname, '.', 'returns')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'read.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

const findBooks = async () => {
  const [response] = await db.query(`    
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
      ) a 
    JOIN  (  SELECT id, title, author, summary 
          FROM books
        ) b 
    ON a.id = b.id
  `)
  const returnsDir = path.join(__dirname, '.', 'returns/books')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'read.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

const findBookDetail = async (
  userId = '5648a3d2-00da-4f47-96d6-ee596e380d92',
  bookId = 'ebb7b7cd-0dee-11f0-910e-c277ba14597b',
) => {
  try {
    const userBid = uuidToBinary(userId)
    const bookBid = uuidToBinary(bookId)

    // Use parameterized query to prevent SQL injection
    const [response] = await db.query(
      `
      SELECT 
        p.id as bookId,
        p.main_category,
        JSON_ARRAYAGG(bi.img_url ORDER BY bi.display_order) AS images,
        p.price,
        b.title,
        b.category_id,
        b.format,
        b.author,
        b.isbn,
        b.pages,
        b.summary,
        b.description,
        b.table_of_contents,
        b.publication_date,
        (SELECT COUNT(*) FROM user_likes WHERE user_id = ? AND product_id = ?) as isLiked
      FROM (
        SELECT
          id,
          main_category,
          likes,
          price,
          img_path
        FROM products
        WHERE id = ?
      ) p
      LEFT OUTER JOIN (
        SELECT * FROM images
        WHERE product_id = ?
      ) bi ON p.id = bi.product_id
      JOIN (
        SELECT
          id,
          title,
          category_id,
          format,
          author,
          isbn,
          pages,
          summary,
          description,
          table_of_contents,
          publication_date
        FROM books
        WHERE id = ?
      ) b ON p.id = b.id
      GROUP BY p.id, p.main_category, p.price, b.title, b.category_id, b.format, 
              b.author, b.isbn, b.pages, b.summary, b.description, b.table_of_contents, b.publication_date
    `,
      [userBid, bookBid, bookBid, bookBid, bookBid],
    )

    const returnsDir = path.join(__dirname, '.', 'returns/books')
    if (!fs.existsSync(returnsDir)) {
      fs.mkdirSync(returnsDir, { recursive: true })
    }

    // Write response to JSON file
    const filePath = path.join(returnsDir, 'detailRead.json')
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

    return response
  } catch (error) {
    console.error('Error in findBookDetail:', error)
    throw error
  }
}

const findCategoryPath = async () => {
  const [response] = await db.query(`    
    WITH RECURSIVE category_path (id, parent_id, name, depth) AS (
      SELECT id, parent_id, name, 1
      FROM categories
      WHERE id = 4

      UNION ALL

      SELECT c.id, c.parent_id, c.name, cp.depth + 1
      FROM categories c
      JOIN category_path cp ON cp.parent_id = c.id
    )
    SELECT * FROM category_path ORDER BY depth DESC
  `)
  const returnsDir = path.join(__dirname, '.', 'returns/books')
  if (!fs.existsSync(returnsDir)) {
    fs.mkdirSync(returnsDir, { recursive: true })
  }

  // Write response to JSON file
  const filePath = path.join(returnsDir, 'categoryPath.json')
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2))

  return response
}

module.exports = {
  findResponse,
  findBooks,
  findBookDetail,
}

findCategoryPath()
findBooks()
findResponse()
findBookDetail()
