using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using viviancosmetic.Data;
using viviancosmetic.Models;

namespace viviancosmetic.Controllers
{
    public class HomeController : Controller
    {
        private VivianCosmeticContext db = new VivianCosmeticContext();

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(int categoryId = 0)
        {
            var featuredproduct = (from p in db.Products select p).Where(p => p.Featured).ToList().Take(6);
            ViewBag.featuredproduct = featuredproduct;

            var categories = (from c in db.Categories select c).ToList();
            ViewBag.categories = categories;

            var products = db.Products.Select(p => new LoadProducts
            {
                ProductId = p.Id,
                ProductImages = p.Images,
                ProductName = p.Name,
                ProductPrice = p.Price,
                ProductSaleOff = p.SaleOff,
                CategoryId = p.CategoryId,
                RatingStar = p.ProductRating.Average(pr => pr.Rating)
            });

            if(categoryId != 0)
            {
                products = products.Where(p => p.CategoryId == categoryId);
            }

            return View(products.ToList());
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(User _user)
        {
            if (ModelState.IsValid)
            {
                var check = db.Users.FirstOrDefault(s => s.Email == _user.Email);
                if (check == null)
                {
                    db.Users.Add(_user);
                    db.SaveChanges();
                    return RedirectToAction("Login");
                }
                else
                {
                    ViewBag.error = "Email không tồn tại";
                    return View();
                }
            }
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string email, string password)
        {
            if (ModelState.IsValid)
            {

                var input = db.Users.Where(s => s.Email.Equals(email) && s.Password.Equals(password)).ToList();
                if (input.Count() > 0)
                {
                    HttpContext.Session.SetString("FullName", input.FirstOrDefault().FullName);
                    HttpContext.Session.SetString("Email", input.FirstOrDefault().Email);
                    HttpContext.Session.SetString("Id", input.FirstOrDefault().Id.ToString());
               
                    return RedirectToAction("Index");
                }
                else
                {
                    ViewBag.error = "Đăng nhập thất bại";
                    return RedirectToAction("Login");
                }
            }
            return View();
        }

        public ActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
