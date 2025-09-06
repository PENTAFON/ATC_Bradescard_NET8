using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Bradescard.Models
{ 
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    [Table("cat_subClasificaciones2")]
    public class catsubClasificaciones2
    {
        [Key]
        public int Id { get; set; }
        public int IdSubClasificacion { get; set; }
        public string SubClasificacion2 { get; set; }
        public bool Activo { get; set; }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
