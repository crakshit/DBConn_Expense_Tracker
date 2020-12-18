const mongoose = require('mongoose');
const Category = mongoose.model('Category');

module.exports.getCategories = function (req, res) {
    Category.find().exec(function (err, data) {
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

module.exports.createCategory = function (req, res) {
    Category.create({
        category: req.body.category
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

module.exports.getSingleCategory = function (req, res) {
    if (req.params && req.params.categoryid) {
        Category
            .findById(req.params.categoryid)
            .exec((err, data) => {
                if (!data) {
                    res
                        .status(404)
                        .json({
                            "message": "categoryid not found"
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
                "message": "No categoryid in request"
            });
    }
};

module.exports.updateCategory = function (req, res) {

    if (!req.params.categoryid) {
        res
            .status(404)
            .json({
                "message": "Not found"
            });
        return;
    }

    Category.findById(req.params.categoryid)
        .exec((err, data) => {
            if (!data) {
                res
                    .status(404)
                    .json({
                        "message": "categoryid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            data.category = req.body.category

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

module.exports.deleteCategory = function (req, res) {
    const categoryid = req.params.categoryid;

    if (categoryid) {
        Category
            .findByIdAndRemove(categoryid)
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
