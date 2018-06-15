using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using POSS.ViewModel;

namespace POSS.Interface
{
    public interface IOrder
    {
        List<OrderModel> GetOrderDetail();
        bool DeleteOrder(int id);
    }
}
