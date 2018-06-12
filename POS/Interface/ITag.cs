using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using POSS.ViewModel;

namespace POSS.Interface
{
    public interface ITag
    {
        List<TagModel> GetTagDetails(int id);

        bool InsertTag( TagModel tagModel);

        TagModel GetItemById(int id);

        bool DeleteItem(int? id);
    }
}
