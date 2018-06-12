using System.Web.Http;
using Unity;
using Unity.WebApi;
using POSS.Interface;
using POSS.Repository;

namespace POSS
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IRoom, RoomPOS>();
            container.RegisterType<ITable, TablePOS>();
            container.RegisterType<ICategory, CategoryPOS>();
            container.RegisterType<Iitem, itemPOS>();
            container.RegisterType<ITag, TagPOS>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}