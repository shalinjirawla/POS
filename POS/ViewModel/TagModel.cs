using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POSS.ViewModel
{
    public class TagModel
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<int> ItemId { get; set; }
        public float TagPrice { get; set; }
    }
}