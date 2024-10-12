using AppAny.HotChocolate.FluentValidation;
using FluentValidation.AspNetCore;
using IceAndFire.Application.Mutations;
using IceAndFire.Application.Queries;
using IceAndFire.Application.Services;
using IceAndFire.Domain;
using IceAndFire.Domain.Validators;
using IceAndFire.Infrastructure.Caching;
using IceAndFire.Infrastructure.Config;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;

namespace IceAndFire.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<MongoDbSettings>(_configuration.GetSection("MongoDbSettings"));
            services.AddSingleton<MongoDbContext>();

            services.AddScoped<CharacterService>();
            services.AddScoped<BookService>();
            services.AddScoped<HouseService>();
            services.AddScoped<UserService>();

            services.AddHttpClient<CharacterService>();
            services.AddHttpClient<BookService>();
            services.AddHttpClient<HouseService>();
            services.AddHttpClient<UserService>();

            services.AddScoped<IPasswordHasher, PasswordHasher>(); // Implement your own password hasher


            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(_configuration["RedisSettings:Connection"]));
            services.AddSingleton<RedisCacheService>();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
                 {
                     options.RequireHttpsMetadata = false;
                     options.SaveToken = true;
                     options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = _configuration["Jwt:Issuer"],
                         ValidAudience = _configuration["Jwt:Audience"],
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
                     };
                 });

            services.AddFluentValidation();
            services.AddTransient<BookInputValidator>();
            services.AddTransient<HouseInputValidator>();
            services.AddTransient<UserInputValidator>();

            services.AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddTypeExtension<CharacterQueries>()
                .AddTypeExtension<BookQueries>()
                .AddTypeExtension<HouseQueries>()
                .AddTypeExtension<CharacterMutations>()
                .AddTypeExtension<BookMutations>()
                .AddTypeExtension<HouseMutations>()
                .AddTypeExtension<UserMutations>()
                .AddAuthorization()
                .AddFluentValidation();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors("AllowAllOrigins");
            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
        }
    }
}