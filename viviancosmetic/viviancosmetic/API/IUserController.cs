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
    public class IUserController : ControllerBase
    {
        private VivianCosmeticContext db = new VivianCosmeticContext();

        //Get List User
        [HttpGet]
        [Route("api/User/Get")]
        public IEnumerable<User> Get()
        {
            var users = db.Users.Select(p => new User
            {
                Id = p.Id,
                FullName = p.FullName,
                Email = p.Email,
                Password = p.Password,
            }).ToList();

            return users;
        }

        //Get User
        [HttpGet]
        [Route("api/User/Get/{id}")]
        public User Get(int id)
        {
            var user = db.Users.Select(p => new User
            {
                Id = p.Id,
                FullName = p.FullName,
                Email = p.Email,
                Password = p.Password,
            }).Where(p => p.Id == id).FirstOrDefault();

            return user;
        }

        //Create User
        [HttpPost]
        [Route("api/User/Create")]
        public int Create(User _user)
        {
            var user = new User()
            {
                FullName = _user.FullName,
                Email = _user.Email,
                Password = _user.Password,
            };

            db.Users.Add(user);
            db.SaveChanges();
            if (user.Id > 0)
            {
                return 1;
            }
            return 0;
        }

        [HttpPut]
        [Route("api/User/Edit/{id}")]
        public int Edit(int id, User _user)
        {
            var user = db.Users.Find(id);

            user.FullName = _user.FullName;
            user.Email = _user.Email;
            user.Password = _user.Password;

            db.SaveChanges();
            return 1;
        }

        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        public int Delete(int id)
        {
            //Xóa danh sách đánh giá của sản phẩm 
            db.ProductRatings.RemoveRange(db.ProductRatings.Where(r => r.User.Id == id));

            //Xóa user
            var user = db.Users.Find(id);
            db.Users.Remove(user);

            db.SaveChanges();
            return 1;
        }
    }
}
