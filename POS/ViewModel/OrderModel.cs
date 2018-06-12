using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POSS.ViewModel
{
    public class OrderModel
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsPaid { get; set; }
        public Nullable<int> TableNo { get; set; }
        public Nullable<double> Amount { get; set; }
    }
}