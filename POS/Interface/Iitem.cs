using System.Collections.Generic;
using POSS.ViewModel;

namespace POSS.Interface
{
    public interface Iitem
    {
        List<ItemModel> GetItemDetail();
        bool InsertItem(ItemModel itemModel);
        ItemModel GetItemById(int id);
        bool DeleteItem(int id);
        List<ItemModel> ItemsByName(string name);
    }
}
