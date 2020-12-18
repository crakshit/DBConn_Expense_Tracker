const express = require('express');
const router = express.Router();
const ctrlTransaction = require('../controllers/transaction');
const ctrlCategory = require('../controllers/category');


router
    .route('/transaction')
    .get(ctrlTransaction.getTransactions)
    .post(ctrlTransaction.createTransaction);

router
    .route('/transaction/:transactionid')
    .get(ctrlTransaction.getSingleTransaction)
    .put(ctrlTransaction.updateTransaction)
    .delete(ctrlTransaction.deleteTransaction);

router
    .route('/getBalance')
    .get(ctrlTransaction.getBalance);

router
    .route('/getIncome')
    .get(ctrlTransaction.getIncome);
router
    .route('/getExpense')
    .get(ctrlTransaction.getExpense);

router
    .route('/category')
    .get(ctrlCategory.getCategories)
    .post(ctrlCategory.createCategory);

router
    .route('/category/:categoryid')
    .get(ctrlCategory.getSingleCategory)
    .put(ctrlCategory.updateCategory)
    .delete(ctrlCategory.deleteCategory);

module.exports = router;