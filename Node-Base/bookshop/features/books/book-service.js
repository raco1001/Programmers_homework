const {findBooks, findBookDetail} = require("./book-repository")
const {uuidToBinary} = require("../../shared/utils/uuidToBinary");


const getBooks = async ({ category, startDate, endDate }) => {
   const params = [startDate, endDate];

   const select = "SELECT * FROM books a JOIN categories b ON a.category_id = b.id WHERE ";
   const range = "a.created_at BETWEEN ? AND ?"
   const finalCategory  = category === "ALL" ? "" : `a.main_category = ${category} AND `;
   
   const query = select + finalCategory + range;
   
   const [rows] = await findBooks(query, params);
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