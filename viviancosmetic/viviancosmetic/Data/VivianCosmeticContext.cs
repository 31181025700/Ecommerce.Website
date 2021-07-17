using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace viviancosmetic.Data
{
    public class VivianCosmeticContext : DbContext
    {
       

        public VivianCosmeticContext()
        {
        }

        public VivianCosmeticContext(DbContextOptions<VivianCosmeticContext> options)
            : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
                var connectionString = configuration.GetConnectionString("VivianCosmeticContext");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable(name: "Categories");
            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable(name: "Products");
            });
            modelBuilder.Entity<ProductRating>(entity =>
            {
                entity.ToTable(name: "ProductRatings");
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable(name: "Users");
            });
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductRating> ProductRatings { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
