namespace SmartFeedbackPortalAPI.DTOs;

public class FeedbackDto
{
    public required string Heading { get; set; }
    public required string Category { get; set; }
    public required string SubCategory { get; set; }
    public required string FeedbackText { get; set; }
}