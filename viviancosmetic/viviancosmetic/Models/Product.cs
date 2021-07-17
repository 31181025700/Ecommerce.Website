using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viviancosmetic.Data
{
    public class Product
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Ingredient { get; set; }

        public int Price { get; set; }

        public bool Featured { get; set; }

        public string Images { get; set; }

        public int SaleOff { get; set; }

        public int Sold { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdatedTime { get; set; }

        public virtual Category Category { get; set; }

        public List<ProductRating> ProductRating { get; set; } = new List<ProductRating>();
    }
}
