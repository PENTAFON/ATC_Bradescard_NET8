using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bradescard.Models
{
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    [Table("cat_MotivoLlamada")]
    public class catMotivoLlamada
    {
        [Key]
        public int Id { get; set; }
        public string MotivoLlamada { get; set; }
        public bool Activo { get; set; }
        public int LineaNegocioId { get; set; }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
