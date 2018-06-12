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
    public class ItemController : ApiController
    {
        private Iitem Item;
        public ItemController(Iitem _item)
        {
            this.Item = _item;
        }
        public IHttpActionResult getItemDetail()
        {
            var Data = Item.GetItemDetail();
            return Json(Data);
        }
        [HttpPost]
        public IHttpActionResult insertItem(ItemModel itemModel)
        {
            var Data = Item.InsertItem(itemModel);
            return Json(Data);
        }
        public IHttpActionResult getItemById(int id)
        {
            var Data = Item.GetItemById( id);
            return Json(Data);
        }
        public IHttpActionResult deleteItem(int id)
        {
            var Data = Item.DeleteItem(id);
            return Json(Data);
        }
        public IHttpActionResult getItemsByName(string Name)
        {
            var data = Item.ItemsByName(Name);
            return Json(data);
        }
    }
}
