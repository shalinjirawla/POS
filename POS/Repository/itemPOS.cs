using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POSS.ViewModel;
using POSS.Models;
using POSS.Interface;

namespace POSS.Repository
{
    public class itemPOS : Iitem
    {
        PosDatabaseEntities POS = new PosDatabaseEntities();

        public bool DeleteItem(int id)
        {
            try
            {
                if (id > 0)
                {
                    Item item = POS.Items.FirstOrDefault(x => x.Id == id);
                    if (item != null)
                    {
                        POS.Items.Remove(item);
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

        public ItemModel GetItemById(int id)
        {
            try
            {
                var qur = POS.Items.Where(x => x.Id == id).FirstOrDefault();

                ItemModel item = new ItemModel();
                if (qur != null)
                {
                    item.Id = qur.Id;
                    item.Name = qur.Name;
                    item.CategoryId = qur.CategoryId;
                    item.Description = qur.Description;
                    item.ItemPrice = (int)qur.ItemPrice;
                }
                return item;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public List<ItemModel> GetItemDetail()
        {
            try
            {
                List<ItemModel> itemmod = new List<ItemModel>();
                var qurey = POS.Items.ToList();
                foreach( var item in qurey)
                {
                    ItemModel itemModel = new ItemModel();
                    itemModel.Id = item.Id;
                    itemModel.Name = item.Name;
                    itemModel.Description = item.Description;
                    itemModel.CategoryId = item.CategoryId;
                    itemModel.ItemPrice = (float)item.ItemPrice;
                    itemmod.Add(itemModel);
                }
                return itemmod;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public bool InsertItem(ItemModel itemModel)
        {
            try
            {
                if (itemModel.Id >0)
                {
                    Item item = POS.Items.Where(x => x.Id == itemModel.Id).FirstOrDefault();
                    if (item == null)
                    {
                        return false;
                    }
                    else
                    {
                        item.Name = itemModel.Name;
                        item.Description = itemModel.Description;
                        item.CategoryId = itemModel.CategoryId;
                        item.ItemPrice = itemModel.ItemPrice;
                        POS.SaveChanges();
                        return true;
                    }
                }
                else
                {
                    Item item = new Item();
                    item.Name = itemModel.Name;
                    item.Description = itemModel.Description;
                    item.CategoryId = itemModel.CategoryId;
                    item.ItemPrice = itemModel.ItemPrice;
                    POS.Items.Add(item);
                    POS.SaveChanges();
                    return true;
                }  
            } 
            catch (Exception)
            {
                throw;
            }
        }

        public List<ItemModel> ItemsByName(string name)
        {
            try
            {
                var query = POS.Items.Where(x => x.Name.Contains(name)).ToList();
                List<ItemModel> itemmod = new List<ItemModel>();
                foreach (var item in query)
                {
                    ItemModel itemModel = new ItemModel();
                    itemModel.Id = item.Id;
                    itemModel.Name = item.Name;
                    itemModel.Description = item.Description;
                    itemModel.CategoryId = item.CategoryId;
                    itemModel.ItemPrice = (float)item.ItemPrice;
                    itemmod.Add(itemModel);
                }
                return itemmod;
            }
            catch (Exception e) 
            {
                throw e;
            }
        }
    }
}