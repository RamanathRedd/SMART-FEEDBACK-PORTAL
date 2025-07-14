using Microsoft.AspNetCore.Mvc;
using SmartFeedbackPortalAPI.Data;
using SmartFeedbackPortalAPI.Models;
using SmartFeedbackPortalAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace SmartFeedbackPortalAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                return BadRequest("Email already exists");


            var user = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                Password = HashPassword(registerDto.Password),
                Gender = registerDto.Gender,
                IsAdmin = registerDto.IsAdmin
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

        private string HashPassword(string password)
        {
            return Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));
        }
    }
}
