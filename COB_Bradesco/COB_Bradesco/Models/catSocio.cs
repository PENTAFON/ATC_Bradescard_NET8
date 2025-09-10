using Microsoft.Identity.Client;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Bradescard.Models
{
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    [Table("cat_Socio")]
    public class catSocio
    {
        [Key]
        public int Id { get; set; }
        public string Socio { get; set; }
        public bool Activo { get; set; }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
