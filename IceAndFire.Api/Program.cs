using IceAndFire.Infrastructure.Config;
using IceAndFire.Infrastructure.Persistence;
using IceAndFire.Application.Queries;
using IceAndFire.Infrastructure.Caching;
using StackExchange.Redis;
using IceAndFire.Application.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<MongoDbContext>();

builder.Services.AddHttpClient<CharacterService>();

builder.Services.AddScoped<CharacterService>();
builder.Services.AddScoped<RedisCacheService>();

builder.Services.AddControllers();

builder.Services.AddGraphQLServer()
    .AddQueryType<CharacterQueries>();

builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(builder.Configuration["RedisSettings:Connection"]));
builder.Services.AddSingleton<RedisCacheService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); 
}

app.UseRouting(); 

app.MapControllers();

app.MapGraphQL();

app.MapGet("/", () => "API is running.");


app.Run();