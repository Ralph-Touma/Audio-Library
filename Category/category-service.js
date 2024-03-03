const Category = require('./category-model');

class CategoryService {
  async addCategory(categoryData) {
    const category = new Category(categoryData);
    await category.save();
    return category;
  }

  async getCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  async updateCategory(id, updateData) {
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  async deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }
}

module.exports = new CategoryService();
