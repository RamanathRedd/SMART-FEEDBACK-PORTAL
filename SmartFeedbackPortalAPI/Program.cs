using Microsoft.EntityFrameworkCore;
using SmartFeedbackPortalAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=SmartFeedbackPortal.db"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
;

app.UseAuthorization();
app.MapControllers();
app.Run();