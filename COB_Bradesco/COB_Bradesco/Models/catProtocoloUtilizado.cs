using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Bradescard.Models
{
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    [Table("cat_ProtocoloUtilizado")]
    public class catProtocoloUtilizado
    {
        [Key]
        public int Id { get; set; }
        public int IdAutenticacion { get; set; }
        public string ProtocoloUtilizado { get; set; }
        public bool Activo { get; set; }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
