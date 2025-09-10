using Microsoft.EntityFrameworkCore;

namespace Bradescard.Models
{
    public class BradescardContext:DbContext
    {
        public DbSet<CrmDetalles> CrmDetalles { get; set; }
        public DbSet<catMotivoLlamada> catMotivoLlamada { get; set; }
        public DbSet<catAutenticacion> catAutenticacion { get; set; }
        public DbSet<catProtocoloUtilizado> catProtocoloUtilizado { get; set; }
        public DbSet<catResultados> catResultados{ get; set; }
        public DbSet<catsubClasificaciones> catsubClasificaciones { get; set; }
        public DbSet<catsubClasificaciones2> catsubClasificaciones2 { get; set; }
        public DbSet<catSocio> catSocio { get; set; }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var server = "10.200.20.226";
            var db = "Bradesco";
            var user = "AppBradesco";
            var pass = "cdEKDAL$$k7d3x4d";

            // Construir la cadena de conexión utilizando los parámetros
            var connectionString =
                $"Data Source={server};Initial Catalog={db};" +
                $"Persist Security Info=True;User ID={user};Password={pass};TrustServerCertificate=True";


            optionsBuilder.UseSqlServer(connectionString);
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    }
}
