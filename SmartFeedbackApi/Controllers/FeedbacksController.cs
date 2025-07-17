using Microsoft.AspNetCore.Mvc;
using SmartFeedbackPortalAPI.Data;
using SmartFeedbackPortalAPI.Models;
using SmartFeedbackPortalAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace SmartFeedbackPortalAPI.Controllers
{
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
            var feedback = new Feedback
            {
                Heading = feedbackDto.Heading,
                Category = feedbackDto.Category,
                SubCategory = feedbackDto.SubCategory,
                FeedbackText = feedbackDto.FeedbackText,
                UserId = 2
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback submitted successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetUserFeedbacks()
        {
            var feedbacks = await _context.Feedbacks
                                  .Where(f => f.UserId == 2)
                                  .ToListAsync();

            if (feedbacks == null || feedbacks.Count == 0)
            {
                return NotFound(new { message = "No feedbacks found for the user." });
            }

            return Ok(feedbacks);

        }
    }
}
