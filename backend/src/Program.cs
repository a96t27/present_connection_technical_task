namespace backend;
using Microsoft.EntityFrameworkCore;

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
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.Services.AddDbContext<GroupContext>(opt =>
        opt.UseInMemoryDatabase("Groups"));

        var app = builder.Build();

        app.UseCors("AllowFrontend");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
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

