using Bradescard.Managers;
using Bradescard.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Security.Cryptography;
using System.Text;
using Bradescard.ViewModel;

namespace Bradescard.Controllers
{
    public class CrmController : Controller
    {
        private readonly BradescardContext _db = new BradescardContext();
        private readonly CrmManager _mg = new CrmManager();
        //=======================================================
        // GET: CrmController
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public ActionResult Index()
        {   
            CrmDetalles vm = new CrmDetalles();

            vm.Bin = Request.Query["BIN"];
            vm.Bin8 = Request.Query["BIN8"];
            vm.Org = Request.Query["ORG"];
            vm.Producto = Request.Query["PRODUCTO"];
            vm.Socio = Request.Query["SOCIO"];
            vm.NombreComercial = Request.Query["NOMBRECOMERCIAL"];
            vm.OpcionMenu = Request.Query["OPCIONMENU"];
            vm.NombreCola = Request.Query["NOMBRECOLA"];
            vm.Telefono = Request.Query["ANI"];
            vm.ChainId = Request.Query["CHAIN_ID"];

            if (string.IsNullOrWhiteSpace(vm.Org))
            {
                ViewBag.OrgTxt = "Si";
            }



            int r = 0;
            if (int.TryParse(vm.ChainId, out r))
            {
                try
                {
                    var data = _mg.GetCliente(r);
                    vm.Clientes = data;

                    vm.NumeroCuenta = vm.Clientes.NumeroCliente;
                    vm.NumeroTarjeta = vm.Clientes.NumeroTarjeta;
                    vm.Org = vm.Clientes.ORG;

                    if (!string.IsNullOrEmpty(data.ErrorMessage))
                    {
                        return RedirectToAction("Error", "Result", new { message = data.ErrorMessage });
                    }
                                       
                  
                }
                catch (Exception ex)
                {

                    return RedirectToAction("Error", "Result", new { message = ex.Message });

                }
            }
            else
            {
                vm.Clientes = new CrmClientesVm();
            }

            ViewBag.MotivoLlamada = new SelectList(_db.catMotivoLlamada.Where(a => a.Activo == true), "Id", "MotivoLlamada");
            ViewBag.ListaVacia = new SelectList(string.Empty, "Value", "Text");

        
            return View(vm);
        }
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -        
        //APARTADO DE BUSQUEDA DE CLIENTES
        [HttpPost]
        public JsonResult SearchClientes(string DatoBuscar, int IdBuscador)
        {
            var data = _mg.GetClientesManual(DatoBuscar, IdBuscador);

            return Json(data);
        }
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        [HttpPost]
        public ActionResult GuardaIndex(CrmDetalles vm) 
        {
            try
            {
            _mg.SaveCrmIndex(vm);
              
                return RedirectToAction("Success", "Result");
            }
            catch (Exception e)
            {
                vm.ErrorMessage = e.Message;

                return RedirectToAction("ErrorCrm", "Result", new { message = vm.ErrorMessage });
            }

        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public JsonResult SearchAutenticacion(int id)
        {
            try
            {
                var data = new List<catAutenticacion>();
                data = _db.catAutenticacion.Where(a => a.IdMotivoLlamada == id && a.Activo).ToList();

                return Json(data);
            }
            catch (Exception ex)
            {
                return Json("Error");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -        
             public JsonResult SearchProtocolo(int id)
        {
            try
            {
                var data = new List<catProtocoloUtilizado>();
                data = _db.catProtocoloUtilizado.Where(a => a.IdAutenticacion == id && a.Activo).ToList();

                return Json(data);
            }
            catch (Exception ex)
            {
                return Json("Error");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -        
               public JsonResult SearchResultado(int id)
        {
            try
            {
                var data = new List<catResultados>();
                data = _db.catResultados.Where(a => a.IdProtocolo== id && a.Activo).ToList();

                return Json(data);
            }
            catch (Exception ex)
            {
                return Json("Error");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public JsonResult SearchSubCla(int id)
        {
            try
            {
                var data = new List<catsubClasificaciones>();
                data = _db.catsubClasificaciones.Where(a => a.IdResultado == id && a.Activo).ToList();

                return Json(data);
            }
            catch (Exception ex)
            {
                return Json("Error");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public JsonResult SearchSubCla2(int id)
        {
            try
            {
                var data = new List<catsubClasificaciones2>();
                data = _db.catsubClasificaciones2.Where(a => a.IdSubClasificacion == id && a.Activo).ToList();

                return Json(data);
            }
            catch (Exception ex)
            {
                return Json("Error");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    }
}
