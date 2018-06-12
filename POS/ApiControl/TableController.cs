using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using POSS.Interface;
using POSS.Repository;

namespace POSS.ApiControl
{
    public class TableController : ApiController
    {
        private ITable Table;
        public TableController(ITable _table)
        {
            Table = _table;
        }
        public IHttpActionResult GetTableByRoomID(int id)
        {
            var Data = Table.getTableByRoomID(id);
            return Json(Data);
        }
        public IHttpActionResult GetAllunPaid(int id)
        {
            var Data = Table.GetAllUnPaid(id);
            return Json(Data);
        }
        public IHttpActionResult GetTableById(int id)
        {
            var Data = Table.getTableByID(id);
            return Json(Data);
        }
        public IHttpActionResult GetTableByIdandOrder(int id, int orderid)
        {
            var Data = Table.getTableByIdAndOrder(id, orderid);
            return Json(Data);
        }
        public IHttpActionResult GetCategories()
        {
            var Data = Table.getCategories();
            return Json(Data);
        }
        public IHttpActionResult GetItemByCategoryId(int id)
        {
            var Data = Table.getItemByCategoryId(id);
            return Json(Data);
            
        }
        public IHttpActionResult GetTagByItemId(int id)
        {
            var Data = Table.getTagByItemId(id);
            return Json(Data);
        }

    }
}
