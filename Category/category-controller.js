const Category = require('./category-model');

class CategoryController {
    async addCategory(req, res, next) {
        try {
            const { name, description, createdBy } = req.body;
            const newCategory = new Category({
                name,
                description,
                createdBy
            });

            await newCategory.save();
            res.status(201).json({ message: 'Category created successfully', category: newCategory });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new CategoryController();
