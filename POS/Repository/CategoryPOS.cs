using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POSS.ViewModel;
using POSS.Models;
using POSS.Interface;

namespace POSS.Repository
{
    public class CategoryPOS : ICategory
    {
        PosDatabaseEntities POS = new PosDatabaseEntities();

        public bool DeleteCategory(int? id)
        {
            try
            {
                if(id > 0)
                {
                    Category category = POS.Categories.FirstOrDefault(x => x.Id == id);
                    if( category != null)
                    {
                        POS.Categories.Remove(category);
                        POS.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public List<CategoryModel> GetCategoriesDetail()
        {
            try
            {
                List<CategoryModel> catmod = new List<CategoryModel>();
                var query = POS.Categories.ToList();
                foreach (var item in query)
                {
                    CategoryModel category = new CategoryModel();
                    category.Id = item.Id;
                    category.Name = item.Name;
                    catmod.Add(category);
                }
                return catmod;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public CategoryModel GetCategoryById(int id)
        {
            try
            {
                var qur = POS.Categories.Where(x => x.Id == id).FirstOrDefault();

                CategoryModel catmodel = new CategoryModel();
                if( qur != null)
                {
                    catmodel.Id = qur.Id;
                    catmodel.Name = qur.Name;
                }
                return catmodel;
            }
            catch (Exception e)
            {

                throw e;
            }  
        }
        public bool InsertCategory(CategoryModel category)
        {
            try
            {    if( category.Id > 0 )
                {
                    Category cate = new Category();
                    cate.Name = category.Name;
                    POS.Categories.Add(cate);
                    POS.SaveChanges();
                    return true;
                }
                else
                {
                    Category cate = new Category();
                    cate.Name = category.Name;
                    POS.Categories.Add(cate);
                    POS.SaveChanges();
                    return true;
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }
    }
}