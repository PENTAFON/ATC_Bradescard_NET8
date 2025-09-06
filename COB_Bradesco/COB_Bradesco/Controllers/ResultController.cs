using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bradescard.Controllers
{
    public class ResultController : Controller
    {
        // GET: Result
        //=======================================================
        public ActionResult Success()
        {

            return View();
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public ActionResult ErrorCrm(string message)
        {
            ViewBag.ErrorMessage = message;
            return View();
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        public ActionResult Error(string message)
        {
            ViewBag.ErrorMessage = message;
            return View();
        }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    }
}
