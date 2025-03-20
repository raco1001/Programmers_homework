const PaymentService = require('./payment-service');



const createPayment = async (req, res, next) => {
    try {
        const body = req.body;
        
        await PaymentService.processPayment(body);

        res.status(201).json({ status: 'success', orderId, message: '결제 완료' });
    } catch (err) {
        next(err);
    }
};



const addPaymentProvider = async (req, res, next) => {
   try{
      const {providerName, providerType} = req.body;
      console.log(providerName);
      const paymentProvider = await PaymentService.createPaymentProvider(providerName, providerType);
      
      if(!paymentProvider){
         return res.status(400).json({status: 'fail', message: '결제사 등록 실패'});
      }
      res.status(201).json({status: 'success', providerName, message: '결제사 등록 완료' });
   }catch(err){

   }

}

module.exports = {
    createPayment,
    addPaymentProvider
}