using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POSS.ViewModel
{
    public class TableManagementModel1
    {
        public int id { get; set; }
        public int TableNo { get; set; }
        public int NoOfChair { get; set; }
        public int RoomId { get; set; }
        public IEnumerable<OrderComModel> OrderCom { get; set; }
    }
    public class OrderComModel
    {
        public int? TableNO { get; set; }
        public Double? TotalAmount { get; set; }
        public Double? TotalAmountforTransaction { get; set; }
        public IEnumerable<Item1> Item { get; set; }
        public int? orderid { get; set; }
        public DateTime? Date { get; set; }
    }

    public class Item1
    {
        public int? orderItemId { get; set; }
        public int? CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int? ItemID { get; set; }
        public string ItemName { get; set; }
        public int? Qty { get; set; }
        public IEnumerable<Tag1> Tag { get; set; }
    }

    public class Tag1
    {
        public int? TagId { get; set; }
        public string TagName { get; set; }
        public int Qty { get; set; }
    }
}