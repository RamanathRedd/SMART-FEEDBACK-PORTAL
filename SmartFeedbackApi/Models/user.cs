namespace SmartFeedbackPortalAPI.Models;

public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Gender { get; set; }
    public bool IsAdmin { get; set; } = false;
    public ICollection<Feedback>? Feedbacks { get; set; }
}