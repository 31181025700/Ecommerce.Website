using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using viviancosmetic.Data;

namespace viviancosmetic.ViewModel
{
    public class LoadUserReview
    {
        private VivianCosmeticContext db = new VivianCosmeticContext();

        public int ProductId { get; set; }

        public int UserId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Ingredient { get; set; }

        public int Price { get; set; }

        public string Images { get; set; }

        public int SaleOff { get; set; }

        public int Sold { get; set; }

        public List<ProductRating> ListOfComment { get; set; }

        public string Comment { get; set; }

        public int? Rating { get; set; }


        public string getFullName(int id)
        { 
            User user = db.Users.Find(id);

            string fullname = user.FullName;

            return fullname;
        }
    }
}
