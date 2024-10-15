using IceAndFire.Infrastructure.Config;
using IceAndFire.Infrastructure.Persistence;
using IceAndFire.Application.Queries;
using IceAndFire.Infrastructure.Caching;
using StackExchange.Redis;
using IceAndFire.Application.Services;
using IceAndFire.Api;
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}