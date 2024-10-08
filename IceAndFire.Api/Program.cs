using IceAndFire.Infrastructure.Config;
using IceAndFire.Infrastructure.Persistence;
using IceAndFire.Application.Queries;

var builder = WebApplication.CreateBuilder(args);
// Add services before building the app
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<MongoDbContext>();

// Add controller services
builder.Services.AddControllers();

builder.Services.AddGraphQLServer()
    .AddQueryType<CharacterQueries>();

var app = builder.Build();

// Add middleware for routing
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Show detailed errors in development mode
}

app.UseRouting(); // Enable routing

app.MapControllers(); // Map controllers to their routes

app.MapGraphQL();

// Default route to test if API is running
app.MapGet("/", () => "API is running.");


app.Run();