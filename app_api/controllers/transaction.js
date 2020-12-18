const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

module.exports.getTransactions = function (req, res) {
    Transaction.find().exec(function (err, data) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        res
            .status(200)
            .json(data);
    });
};

module.exports.getBalance = function (req, res) {
    var balance = 0;
    Transaction.find().exec(function (err, data) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        for (transaction in data){
            // console.log("Transaction:");
            // console.log(data[transaction].type);
            if(data[transaction].type === "income"){
                //console.log(data[transaction].amount);
                balance += data[transaction].amount;
            } else if(data[transaction].type === "expense"){
                balance -= data[transaction].amount;
            }
        }
        //console.log(balance);
        res
            //console.log(data);
            .status(200)
            .json(balance);
    });
};

module.exports.getIncome = function (req, res) {
    var income = 0;
    Transaction.find().exec(function (err, data) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        for (transaction in data){
            // console.log("Transaction:");
            // console.log(data[transaction].type);
            if(data[transaction].type === "income"){
                //console.log(data[transaction].amount);
                income += data[transaction].amount;
            } 
            // else if(data[transaction].type === "expense"){
            //     balance -= data[transaction].amount;
            // }
        }
        //console.log(balance);
        res
            //console.log(data);
            .status(200)
            .json(income);
    });
};

module.exports.getExpense = function (req, res) {
    var expense = 0;
    Transaction.find().exec(function (err, data) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        for (transaction in data){
            // console.log("Transaction:");
            // console.log(data[transaction].type);
            if(data[transaction].type === "expense"){
                //console.log(data[transaction].amount);
                expense += data[transaction].amount;
            } 
            // else if(data[transaction].type === "expense"){
            //     balance -= data[transaction].amount;
            // }
        }
        //console.log(balance);
        res
            //console.log(data);
            .status(200)
            .json(expense);
    });
};

module.exports.createTransaction = function (req, res) {
    Transaction.create({
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        amount: parseFloat(req.body.amount)
    }, (err, data) => {
        console.log(data);
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(data);
        }
    });
};

module.exports.getSingleTransaction = function (req, res) {
    if (req.params && req.params.transactionid) {
        Transaction
            .findById(req.params.transactionid)
            .exec((err, data) => {
                if (!data) {
                    res
                        .status(404)
                        .json({
                            "message": "transactionid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(data);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No transactionid in request"
            });
    }
};

module.exports.updateTransaction = function (req, res) {

    if (!req.params.transactionid) {
        res
            .status(404)
            .json({
                "message": "Not found"
            });
        return;
    }

    Transaction.findById(req.params.transactionid)
        .exec((err, data) => {
            if (!data) {
                res
                    .status(404)
                    .json({
                        "message": "transactionid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            data.type = req.body.type,
                data.category = req.body.category,
                data.description = req.body.description,
                data.date = req.body.date,
                data.amount = parseFloat(req.body.amount)

            data.save((err, data) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    res
                        .status(201)
                        .json(data);
                }
            });
        });
};

module.exports.deleteTransaction = function (req, res) {
    const transactionid = req.params.transactionid;

    if (transactionid) {
        Transaction
            .findByIdAndRemove(transactionid)
            .exec((err, data) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "Not found"
            });
    }
};
