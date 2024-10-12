using IceAndFire.Application.Mutations;
using IceAndFire.Application.Queries;
using IceAndFire.Application.Services;
using IceAndFire.Domain;
using IceAndFire.Infrastructure.Caching;
using IceAndFire.Infrastructure.Config;
using IceAndFire.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using StackExchange.Redis;

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

            services.AddHttpClient<CharacterService>();
            services.AddHttpClient<BookService>();
            services.AddHttpClient<HouseService>();


            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(_configuration["RedisSettings:Connection"]));
            services.AddSingleton<RedisCacheService>();

            services.AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddTypeExtension<CharacterQueries>()
                .AddTypeExtension<BookQueries>()
                .AddTypeExtension<HouseQueries>()
                .AddTypeExtension<CharacterMutations>()
                .AddTypeExtension<BookMutations>()
                .AddTypeExtension<HouseMutations>()
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

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
        }
    }
}