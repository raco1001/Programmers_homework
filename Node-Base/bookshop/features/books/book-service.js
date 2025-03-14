const {findBooks, findBookDetail} = require("./book-repository")
const {uuidToBinary} = require("../../shared/utils/uuidToBinary");


const getBooks = async ({ category, startDate, endDate, page, limit }) => {
   const params = [startDate, endDate];
   console.log(category, startDate, endDate, page, limit);

   const range = "WHERE publication_date BETWEEN ? AND ?"
   const finalCategory  = category === "ALL" ? "" : `AND main_category = '${category}'`;
   
   console.log('final category: '+finalCategory);
   const query = `SELECT 
                     HEX(b.id) as id
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
                  LIMIT ${limit} OFFSET ${(page-1)*limit}`
                  ;

   const rows= await findBooks(query, params);
   console.log(rows);
   return rows;
};


const getBookDetail = async ({ bookId }) => {
   const hexId = uuidToBinary(bookId);
   const bookDetails = await findBookDetail(hexId);
   bookDetails[0].id = bookId;
   console.log(bookDetails);
   return {
            bookDetail: bookDetails[0],
            categoryPath: bookDetails[1]
         };
};


module.exports = {getBooks, getBookDetail}; 