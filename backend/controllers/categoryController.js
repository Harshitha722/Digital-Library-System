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

exports.updateCategory =
async (req, res) => {

    try {

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { categoryName: req.body.categoryName },
            { new: true }
        );

        res.json(category);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};