using Bradescard.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bradescard.ViewModel;

namespace Bradescard.Managers
{
    public class CrmManager : Controller
    {
        // GET: CrmManager
        private readonly BradescardContext _db = new BradescardContext();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public CrmClientesVm GetCliente(int id)
        {

            try
            {
                var cliente = _db.Database.SqlQueryRaw<CrmClientesVm>("EXEC dbo.GET_INFO_CLIENTES @Chainid = {0}", id).AsEnumerable().FirstOrDefault();

                return cliente ?? new CrmClientesVm();
            }
            catch (Exception ex)
            {

                return new CrmClientesVm { ErrorMessage = ex.Message };
            }

        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public List<BusquedaClientesVm> GetClientesManual(string DatoBuscar, int IdBuscador)
        {
            var lista = new List<BusquedaClientesVm>();


            if (IdBuscador == 1)
            {

                //QUITAR ESPACIOS
                char[] TextToTrim = { ' ', '*', ' ', '.', ',' };

                var dtobusNom = DatoBuscar.Trim(TextToTrim);


                //NOMBRE
                lista = _db.Database.SqlQueryRaw<BusquedaClientesVm>
                    ("EXEC DBO.GET_BUSQUEDA_INFO_CLIENTES @NumCliente={0}", dtobusNom).ToList();


            }

            return lista;
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public void SaveCrmIndex(CrmDetalles vm)
        {
            try
            {

                //Validar que no se duplique el InteractionId

                bool isDuplicated = false;

                if (vm.InteractionId != null)
                {
                    var interInfo = _db.Database
                        .SqlQueryRaw<int?>("EXEC dbo.GET_DETALLES_INTERACCIONES @InteractionId={0}", vm.InteractionId).AsEnumerable()
                        .FirstOrDefault();

                    isDuplicated = interInfo != null;
                }

                if (!isDuplicated)
                {
                    vm.FechaRegistro = DateTime.Now;
                    _db.CrmDetalles.Add(vm);
                    _db.SaveChanges();
                }

            }
            catch (Exception ex)
            {

                vm.ErrorMessage = "Error al guardar los detalles CRM: " + ex.Message;

                throw;
            }

        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        }
}
