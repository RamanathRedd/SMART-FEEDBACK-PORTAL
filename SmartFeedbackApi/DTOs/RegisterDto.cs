namespace SmartFeedbackPortalAPI.DTOs;

public class RegisterDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Gender { get; set; }
    public bool IsAdmin { get; set; } = false;
}