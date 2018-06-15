using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POSS.ViewModel;
using POSS.Models;
using POSS.Interface;

namespace POSS.Repository
{
    public class OrderPOS : IOrder
    {
        PosDatabaseEntities POS = new PosDatabaseEntities();

        public bool DeleteOrder(int id)
        {
            try
            {
                if (id > 0)
                {
                    Order order = POS.Orders.FirstOrDefault(x => x.Id == id);
                    if (order != null) {
                        var query = POS.OrderItems.Where(x => x.OrderId == order.Id).ToList();
                        if (query.Count() > 0) {
                            foreach (var item in query)
                            {
                                var querys = POS.OrderItemTags.Where(x => x.OrderItemId == item.Id).ToList();
                                if (querys.Count() > 0) {
                                    querys.ForEach(x => POS.OrderItemTags.Remove(x));
                                }
                            }
                            query.ForEach(x => POS.OrderItems.Remove(x));
                        }
                        POS.Orders.Remove(order);
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

        public List<OrderModel> GetOrderDetail()
        {
            try
            {
                List<OrderModel> orders = new List<OrderModel>();
                var query = POS.Orders.ToList();
                foreach (var item in query)
                {
                    OrderModel orderModel = new OrderModel();
                    orderModel.Id = item.Id;
                    orderModel.Date = item.Date;
                    orderModel.IsPaid = item.IsPaid;
                    orderModel.TableNo = item.TableNo;
                    orderModel.Amount = item.Amount;
                    orders.Add(orderModel);
                }
                return orders;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
    }
}