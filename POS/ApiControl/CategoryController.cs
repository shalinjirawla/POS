using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using POSS.Interface;
using POSS.Repository;
using POSS.ViewModel;

namespace POSS.ApiControl
{
    public class CategoryController : ApiController
    {
        private ICategory Category;
        public CategoryController(ICategory _category)
        {
            this.Category = _category;
        }
        public IHttpActionResult getCategoriesDetail()
        {
            var Data = Category.GetCategoriesDetail();
            return Json(Data);
        }
        public IHttpActionResult getCategoryById(int id)
        {
            var Data = Category.GetCategoryById(id);
            return Json(Data);
        }
        [HttpPost]
        public IHttpActionResult insertCategory(CategoryModel category)
        {
            var Data = Category.InsertCategory( category);
            return Json(Data);
        }
       
        public IHttpActionResult deleteCategory(int id)
        {
            var Data = Category.DeleteCategory(id);
            return Json(Data);
        }
    }
}
