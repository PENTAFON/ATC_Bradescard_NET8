using Microsoft.Identity.Client;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bradescard.ViewModel
{
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    public class CrmClientesVm
    {
        public int Id { get; set; } 
        public int IdBase { get; set; } 
        public string? Etiqueta { get; set; } 
        public string? NumeroCliente { get; set; } 
        public string? ORG { get; set; } 
        public string? NumeroTarjeta { get; set; } 
        public string? AumentoLC { get; set; } 
        public string? RetiroEfectivo { get; set; } 
        public string? SeguroActivo { get; set; } 
        public string? MesesRestantesMembresia { get; set; } 
        public string? AntiguedadCliente { get; set; } 
        public string? PLCC { get; set; } 
        public string? PL { get; set; } 
        public string? DesinteresanteActivo { get; set; } 
        public string? AnualidadCondicionada { get; set; } 
        public string? OtraVISA { get; set; } 
        public string? MesesDesinteresante { get; set; } 
        public int ChainId { get; set; }
        [NotMapped] public string ErrorMessage { get; set; }
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    public class BusquedaClientesVm
    {

        public string NumeroCliente { get; set; }
        public string NumeroTarjeta { get; set; }
        public int ChainId { get; set; }
        [NotMapped] public string ErrorMessage { get; set; }


    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
