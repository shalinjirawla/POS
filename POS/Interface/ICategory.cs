using System.Collections.Generic;
using POSS.ViewModel;

namespace POSS.Interface
{
    public interface ICategory
    {
        List<CategoryModel> GetCategoriesDetail();
        CategoryModel GetCategoryById(int id);
        bool InsertCategory(CategoryModel category);
        bool DeleteCategory(int id);
    }
}
