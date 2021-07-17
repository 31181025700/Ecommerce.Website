using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viviancosmetic.Data
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Product> Product { get; set; } = new List<Product>();
    }
}
