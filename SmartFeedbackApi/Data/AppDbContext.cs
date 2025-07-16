using Microsoft.EntityFrameworkCore;
using SmartFeedbackPortalAPI.Models;

namespace SmartFeedbackPortalAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

    }
}
