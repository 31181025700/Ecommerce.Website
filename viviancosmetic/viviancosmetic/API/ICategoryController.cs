using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using viviancosmetic.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace viviancosmetic.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ICategoryController : ControllerBase
    {
        private VivianCosmeticContext db = new VivianCosmeticContext();

        //Get List Categories
        [HttpGet]
        [Route("api/Category/Get")]
        public IEnumerable<Category> Get()
        {
            var categories = db.Categories.Select(p => new Category
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
            }).ToList();

            return categories;
        }

        //Get Category
        [HttpGet]
        [Route("api/Category/Get/{id}")]
        public Category Get(int id)
        {
            var category = db.Categories.Select(p => new Category
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
            }).Where(p => p.Id == id).FirstOrDefault();

            return category;
        }

        //Create Category
        [HttpPost]
        [Route("api/Category/Create")]
        public int Create(Category _category)
        {
            var category = new Category()
            {
                Name = _category.Name,
                Description = _category.Description
            };

            db.Categories.Add(category);
            db.SaveChanges();
            if (category.Id > 0)
            {
                return 1;
            }
            return 0;
        }

        [HttpPut]
        [Route("api/Category/Edit/{id}")]
        public int Edit(int id, Category _category)
        {
            var product = db.Products.Find(id);
            product.Name = _category.Name;
            product.Description = _category.Description;

            db.SaveChanges();
            return 1;
        }

        [HttpDelete]
        [Route("api/Category/Delete/{id}")]
        public int Delete(int id)
        {
            var productList = db.Products.Where(p => p.Category.Id == id).ToList();
            foreach (var p in productList)
            {
                //Xóa danh sách đánh giá của sản phẩm này trước
                db.ProductRatings.RemoveRange(db.ProductRatings.Where(r => r.Product.Id == p.Id));

                //Xóa sản phẩm này sau
                db.Products.Remove(p);
            }

            //Xóa danh mục
            var category = db.Categories.Find(id);
            db.Categories.Remove(category);

            db.SaveChanges();
            return 1;
        }
    }
}