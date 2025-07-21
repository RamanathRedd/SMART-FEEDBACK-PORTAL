using Microsoft.AspNetCore.Mvc;
using SmartFeedbackPortalAPI.Data;
using SmartFeedbackPortalAPI.Models;
using SmartFeedbackPortalAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;

namespace SmartFeedbackPortalAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
                return NotFound("User Not Found");
            var hashedPassword = HashPassword(loginDto.Password);
            if (hashedPassword != user.Password)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(new
            {
                message = "Login successful",
                user = new { user.Id, user.Name, user.Email }
            });
        }

        public string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                // Add other claims if necessary
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(jwtSettings.ExpirationMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private string HashPassword(string password)
        {
            return Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(password)));
        }
    }
}
