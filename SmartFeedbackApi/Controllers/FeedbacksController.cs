using Microsoft.AspNetCore.Mvc;
using SmartFeedbackPortalAPI.Data;
using SmartFeedbackPortalAPI.Models;
using SmartFeedbackPortalAPI.DTOs;

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
                FeedbackText = feedbackDto.FeedbackText
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback submitted successfully." });
        }
    }
}
