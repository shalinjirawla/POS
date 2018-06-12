using POSS.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSS.Interface
{
    public interface IRoom
    {
        List<ManagementModel> GetManagements();
    }
}
