using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bradescard.Models
{
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    [Table("cat_subClasificaciones")]
    public class catsubClasificaciones
    {
        [Key]
        public int Id { get; set; }
        public int IdResultado { get; set; }
        public string Subclasificacion { get; set; }
        public bool Activo { get; set; }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
