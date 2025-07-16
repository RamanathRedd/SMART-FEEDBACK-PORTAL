namespace SmartFeedbackPortalAPI.Models;

public class Feedback
{
    public int Id { get; set; }
    public required string Heading { get; set; }
    public required string Category { get; set; }
    public required string SubCategory { get; set; }
    public required string FeedbackText { get; set; }
}