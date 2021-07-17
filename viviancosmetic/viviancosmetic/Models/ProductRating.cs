using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace viviancosmetic.Data
{
    public class ProductRating
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public string Comments { get; set; }

        public DateTime? CreateDate { get; set; }

        public float Rating { get; set; }

        public virtual Product Product { get; set; }

        public virtual User User { get; set; }

    }
}
