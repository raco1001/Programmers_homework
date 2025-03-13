const{ getBooks, getBookDetail} = require('./book-service')
const { format, subMonths } = require('date-fns');

const getBooksByRange = async (req, res, next) => {
    try {
        const { category = "ALL", startDate, endDate } = req.query;
        const defaultStartDate = format(subMonths(new Date(), 3), "yyyy-MM-dd");
        const defaultEndDate = format(new Date(), "yyyy-MM-dd");

        const books = await getBooks({
            category,
            startDate: startDate || defaultStartDate,
            endDate: endDate || defaultEndDate,
        });

        res.status(200).json({ status: "success", data: books });
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
   try {
       const bookId = req.params.id; 
       console.log(bookId);
       if (!bookId) {
           return res.status(400).json({ status: "error", message: "Book ID is required." });
       }

       const bookDetails = await getBookDetail({ bookId });

       if(bookDetails.bookDetail === 0){
         return res.status(404).json({ status: "error", message: "Book not found." });
       }

       res.status(200).json({ status: "success", data: bookDetails });
   } catch (error) {
       next(error);
   }
};


module.exports = {getBooksByRange, getBookById};