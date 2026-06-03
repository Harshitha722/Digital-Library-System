const Category =
require("../models/Category");

exports.getCategories =
async(req,res)=>{

    const categories =
    await Category.find();

    res.json(categories);
};

exports.addCategory =
async(req,res)=>{

    const category =
    await Category.create({
        categoryName:
        req.body.categoryName
    });

    res.status(201).json(category);
};

exports.deleteCategory =
async(req,res)=>{

    await Category.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:
        "Category Deleted"
    });
};