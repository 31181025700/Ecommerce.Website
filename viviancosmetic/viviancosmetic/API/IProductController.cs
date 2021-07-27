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
    public class IProductController : ControllerBase
    {
        private VivianCosmeticContext db = new VivianCosmeticContext();

        //Get List Products
        [HttpGet]
        [Route("api/Product/Get")]
        public IEnumerable<Product> Get()
        {
            var products = db.Products.Select(p => new Product
            {
                Id = p.Id,
                CategoryId = p.CategoryId,
                Name = p.Name,
                Description = p.Description,
                Ingredient = p.Ingredient,
                Price = p.Price,
                Featured = p.Featured,
                Images = p.Images,
                SaleOff = p.SaleOff,
                Sold = p.Sold,
                Stock = p.Stock,
                CreateDate = p.CreateDate,
                UpdatedTime = p.UpdatedTime,
                Category = db.Categories.Where(c => c.Id == p.CategoryId).FirstOrDefault(),
                ProductRating = db.ProductRatings.Where(r => r.ProductId == p.Id).ToList()
            }).ToList();

            return products;
        }

        //Get Product
        [HttpGet]
        [Route("api/Product/Get/{id}")]
        public Product Get(int id)
        {
            var products = db.Products.Select(p => new Product
            {
                Id = p.Id,
                CategoryId = p.CategoryId,
                Name = p.Name,
                Description = p.Description,
                Ingredient = p.Ingredient,
                Price = p.Price,
                Featured = p.Featured,
                Images = p.Images,
                SaleOff = p.SaleOff,
                Sold = p.Sold,
                Stock = p.Stock,
                CreateDate = p.CreateDate,
                UpdatedTime = p.UpdatedTime,
                Category = db.Categories.Where(c => c.Id == p.Category.Id).FirstOrDefault(),
                ProductRating = db.ProductRatings.Where(r => r.Product.Id == p.Id).ToList()
            }).Where(p => p.Id == id).FirstOrDefault();

            return products;
        }

        //Create product
        [HttpPost]
        [Route("api/Product/Create")]
        public int Create(Product _product)
        {
            var product = new Product()
            {
                Name = _product.Name,
                Description = _product.Description,
                Ingredient = _product.Ingredient,
                Price = _product.Price,
                Featured = _product.Featured,
                Images = _product.Images,
                SaleOff = _product.SaleOff,
                Sold = _product.Sold,
                Stock = _product.Stock,
                CreateDate = _product.CreateDate,
                UpdatedTime = _product.UpdatedTime,
                Category = db.Categories.Find(_product.CategoryId)
            };

            db.Products.Add(product);
            db.SaveChanges();
            if (product.Id > 0)
            {
                return 1;
            }
            return 0;
        }

        [HttpPut]
        [Route("api/Product/Edit/{id}")]
        public int Edit(int id, Product _product)
        {
            var product = db.Products.Find(id);
            product.Name = _product.Name;
            product.Description = _product.Description;
            product.Ingredient = _product.Ingredient;
            product.Price = _product.Price;
            product.Featured = _product.Featured;
            product.Images = _product.Images;
            product.SaleOff = _product.SaleOff;
            product.Sold = _product.Sold;
            product.Stock = _product.Stock;
            product.CreateDate = _product.CreateDate;
            product.UpdatedTime = _product.UpdatedTime;
            product.Category = db.Categories.Find(_product.CategoryId);

            db.SaveChanges();
            return 1;
        }

        [HttpDelete]
        [Route("api/Product/Delete/{id}")]
        public int Delete(int id)
        {
            //Xóa danh sách đánh giá của sản phẩm này trước
            db.ProductRatings.RemoveRange(db.ProductRatings.Where(r => r.Product.Id == id));

            //Xóa sản phẩm này
            var product = db.Products.Find(id);
            db.Products.Remove(product);

            db.SaveChanges();
            return 1;
        }
    }
}
