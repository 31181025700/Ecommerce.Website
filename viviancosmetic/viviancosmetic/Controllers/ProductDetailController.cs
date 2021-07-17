using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using viviancosmetic.Data;
using viviancosmetic.Models;
using viviancosmetic.ViewModel;

namespace viviancosmetic.Controllers
{
    public class ProductDetailController : Controller
    {
        private VivianCosmeticContext db = new VivianCosmeticContext();
        public ActionResult Index(int? id)
        {
            Product product = db.Products.Find(id);
            LoadUserReview review = new LoadUserReview();

            review.ProductId = (int)id;
            review.Name = product.Name;
            review.Description = product.Description;
            review.Ingredient = product.Ingredient;
            review.Price = product.Price;
            review.Images = product.Images;
            review.SaleOff = product.SaleOff;
            review.Sold = product.Sold;

            var comments = db.ProductRatings.Where(d => d.ProductId.Equals(id.Value)).OrderByDescending(d=> d.CreateDate).ToList();
            review.ListOfComment = comments;

            var ratings = db.ProductRatings.Where(d => d.ProductId.Equals(id.Value)).ToList();
            if (ratings.Count() > 0)
            {
                var ratingSum = ratings.Sum(d => d.Rating);
                var ratingCount = ratings.Count();

                var average = ratingSum / ratingCount;
                ViewBag.Average = average;
            }
            else
            {
                ViewBag.Average = 0;
            }

            return View(review);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult PostReview(LoadUserReview review)
        {
            var userId = review.UserId;
            var comment = review.Comment;
            var productId = review.ProductId;
            var rating = review.Rating;

            ProductRating productRating = new ProductRating()
            {
                UserId = userId,
                ProductId = productId,
                Comments = comment,
                Rating = (float)rating,
                CreateDate = DateTime.Now
            };

            db.ProductRatings.Add(productRating);
            db.SaveChanges();

            return RedirectToAction("Index", "ProductDetail", new { id = productId });
        }

        // GET: ProductDetailController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ProductDetailController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProductDetailController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductDetailController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ProductDetailController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductDetailController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ProductDetailController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
