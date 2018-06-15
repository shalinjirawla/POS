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
    public class OrderController : ApiController
    {
        private IOrder Order;
        public OrderController(IOrder _Order)
        {
            this.Order = _Order;
        }
        [HttpGet]
        public IHttpActionResult getOrderDetail()
        {
            var Data = Order.GetOrderDetail();
            return Json(Data);
        }
        public IHttpActionResult deleteOrder(int id)
        {
            var Data = Order.DeleteOrder(id);
            return Json(Data);
        }
    }
}