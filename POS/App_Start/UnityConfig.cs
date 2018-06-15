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

            container.RegisterType<IRoom, RoomPOS>();
            container.RegisterType<ITable, TablePOS>();
            container.RegisterType<ICategory, CategoryPOS>();
            container.RegisterType<Iitem, itemPOS>();
            container.RegisterType<ITag, TagPOS>();
            container.RegisterType<IOrder, OrderPOS>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}