using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POSS.ViewModel
{
    public class OrderModel
    {
        public int orderid { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsPaid { get; set; }
        public Nullable<int> TableNo { get; set; }
        public IEnumerable<Item2> Item { get; set; }
        public Nullable<double> Amount { get; set; }
    }
    public class Item2
    {
        public int? orderItemId { get; set; }
        public int? CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int? ItemID { get; set; }
        public string ItemName { get; set; }
        public double? ItemPrice { get; set; }
        public int Qty { get; set; }
        public IEnumerable<Tag2> Tag { get; set; }
    }
    public class Tag2
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
        public int Qty { get; set; }
        public int Tagprice { get; set; }
    }
}