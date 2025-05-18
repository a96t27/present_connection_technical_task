namespace backend;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy => policy.WithOrigins("http://localhost:5173") // Vite default port
                                .AllowAnyHeader()
                                .AllowAnyMethod());
        });

        builder.Services.AddControllers();
        builder.Services.AddOpenApi(); // Configure OpenApi
        builder.Services.AddDbContext<GroupContext>(opt =>
        opt.UseInMemoryDatabase("Groups")); // Configure InMemory database

        builder.Services.AddAutoMapper(typeof(MappingProfile)); // Configure AutoMapper

        builder.Services.AddControllers()
            .AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

        var app = builder.Build();

        app.UseCors("AllowFrontend");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi(); // Configure swagger
            app.UseSwaggerUi(options =>
            {
                options.DocumentPath = "/openapi/v1.json";
            });
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();

    }
}

