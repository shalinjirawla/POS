using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POSS.ViewModel
{
    public class ItemModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public float ItemPrice { get; set; }
    }
}