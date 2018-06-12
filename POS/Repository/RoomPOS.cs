using POSS.Interface;
using POSS.Models;
using POSS.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POSS.Repository
{
    public class RoomPOS : IRoom
    {
        PosDatabaseEntities POS = new PosDatabaseEntities();
        public List<ManagementModel> GetManagements()
        {
            var query = POS.RoomManagements.ToList();

            List<ManagementModel> managements = new List<ManagementModel>();

            foreach (var item in query)
            {
                ManagementModel manag = new ManagementModel();
                manag.id = item.Id;
                manag.Name = item.Name;
                manag.NoOfTables = (int)item.NoOfTables;
                managements.Add(manag);
            }
            return managements;
        }
    }
}