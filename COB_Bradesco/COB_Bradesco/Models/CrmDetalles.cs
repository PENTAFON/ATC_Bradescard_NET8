﻿using Microsoft.Identity.Client;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bradescard.ViewModel;

namespace Bradescard.Models
{
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    [Table("tbl_CrmDetalles")]
    public class CrmDetalles
    {
        [Key]
        public int Id { get; set; }
        public string? NombreComercial { get; set; }
        public string? OpcionMenu { get; set; }
        public string? NombreCola { get; set; }
        public string? Telefono{ get; set; }
        public string? NombreCliente { get; set; }
        public string? NumeroTarjeta { get; set; }
        public string? NumeroCuenta { get; set; }
        public int? MotivoLlamada { get; set; }
        public int? Autenticacion { get; set; }
        public int? ProtocoloUtilizado { get; set; }
        public int? Resultado { get; set; }
        public int? Subclasificacion { get; set; }
        public int? Subclasificacion2 { get; set; }
        //Datos de Interacción
        public string? Bin{ get; set; }
        public string? Bin8{ get; set; }
        public string? Org{ get; set; }
        public string? Producto{ get; set; }
        public string? Socio{ get; set; }
        public DateTime? FechaRegistro { get; set; }
        public string? ChainId { get; set; }
        //Manejo de errores
        [NotMapped] public CrmClientesVm Clientes { get; set; }
        [NotMapped] public string ErrorMessage { get; set; }

    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
