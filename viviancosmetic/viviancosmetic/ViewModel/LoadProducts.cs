using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viviancosmetic.Models
{
    public class LoadProducts
    {
        public int ProductId { get; set; }

        public int CategoryId { get; set; }

        public string ProductName { get; set; }

        public string ProductDescription { get; set; }

        public string ProductIngredient { get; set; }

        public int ProductSold { get; set; }

        public int ProductPrice { get; set; }

        public bool ProductFeatured { get; set; }

        public string ProductImages { get; set; }

        public int ProductSaleOff { get; set; }

        public DateTime ProductCreateDate { get; set; }

        public DateTime ProductUpdatedTime { get; set; }

        public float? RatingStar { get; set; }
    }
}
