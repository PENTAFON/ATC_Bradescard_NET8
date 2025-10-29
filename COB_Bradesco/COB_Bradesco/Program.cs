using Bradescard.Utils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.IO;

var builder = WebApplication.CreateBuilder(args);


builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();


builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<BradescoApi>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    return new BradescoApi(config);
});

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


try
{
    Console.WriteLine("🚀 Iniciando Bradescard...");
    Console.WriteLine($"Entorno: {app.Environment.EnvironmentName}");
    Console.WriteLine($"Ruta raíz: {Directory.GetCurrentDirectory()}");

    app.Run();
}
catch (Exception ex)
{
    try
    {
        // Guarda error en la raíz de la publicación
        var errorPath = Path.Combine(Directory.GetCurrentDirectory(), "startup-error.log");
        File.WriteAllText(errorPath, $"{DateTime.Now}\n{ex}\n");
    }
    catch { /* ignorar */ }

    Console.WriteLine("❌ Error crítico en inicio: " + ex.Message);
    throw;
}
