//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace POSS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Tag
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<double> TagPrice { get; set; }
    
        public virtual Item Item { get; set; }
    }
}
