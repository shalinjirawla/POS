using POSS.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSS.Interface
{
    public interface ITable
    {
        List<TableManagementModel> getTableByRoomID(int id);
        List<OrderModel> GetAllUnPaid(int id);
        TableManagementModel getTableByID(int id);
        TableManagementModel1 getTableByIdAndOrder(int id, int orderid);
        List<CategoryModel> getCategories();
        List<ItemModel> getItemByCategoryId(int id);
        List<TagModel> getTagByItemId(int id);

        List<TableManagementModel> GetItemDetail();
        bool InsertTable(TableManagementModel tableManagementModel);
        bool DeleteTable(int id);
        bool SaveOrder(OrderModel model);
    }
}
