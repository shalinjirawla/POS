using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace POSS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult Room()
        {
            ViewBag.Title = "Room";
            return View();
        }
        public ActionResult Tables(int id)
        {
            ViewBag.Title = "Tables";
            ViewBag.id = id;
            return View();
        }
        public ActionResult Category(int id,int? orderid)
        {
            ViewBag.Title = "Category";
            ViewBag.id = id;
            ViewBag.orderid = orderid;
            return View();
        }
        public ActionResult ItemList()
        {
            ViewBag.Title = "ItemList";
            return View();
        }
    }
}
