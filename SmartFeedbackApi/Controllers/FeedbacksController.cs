using Microsoft.AspNetCore.Mvc;
using SmartFeedbackPortalAPI.Data;
using SmartFeedbackPortalAPI.Models;
using SmartFeedbackPortalAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace SmartFeedbackPortalAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/feedback")]
    public class FeedbacksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FeedbacksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackDto feedbackDto)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("User ID claim missing");

            int userId = int.Parse(userIdClaim.Value);
            var feedback = new Feedback
            {
                Heading = feedbackDto.Heading,
                Category = feedbackDto.Category,
                SubCategory = feedbackDto.SubCategory,
                FeedbackText = feedbackDto.FeedbackText,
                UserId = userId
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback submitted successfully." });
        }

        [HttpGet("user")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetUserFeedbacks()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("User ID claim missing");

            int userId = int.Parse(userIdClaim.Value);
            var feedbacks = await _context.Feedbacks
                                  .Where(f => f.UserId == userId)
                                  .ToListAsync();

            if (feedbacks == null || feedbacks.Count == 0)
            {
                return NotFound(new { message = "No feedbacks found for the user." });
            }

            return Ok(feedbacks);

        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            var feedbacks = await _context.Feedbacks.ToListAsync();
            Console.WriteLine(feedbacks);
            if (feedbacks == null || feedbacks.Count == 0)
            {
                return NotFound(new { message = "No feedbacks found." });
            }

            return Ok(feedbacks);

        }
    }
}
