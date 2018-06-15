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

        public bool DeleteRoom(int id)
        {
            try
            {
                if (id > 0)
                {
                    RoomManagement room = POS.RoomManagements.FirstOrDefault(x => x.Id == id);
                    if (room != null)
                    {
                        POS.RoomManagements.Remove(room);
                        POS.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

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

        public ManagementModel GetRoomById(int id)
        {
            try
            {
                var qur = POS.RoomManagements.Where(x => x.Id == id).FirstOrDefault();

                ManagementModel item = new ManagementModel();
                if (qur != null)
                {
                    item.id = qur.Id;
                    item.Name = qur.Name;
                    item.NoOfTables = (int)qur.NoOfTables;              
                }
                return item;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public bool InsertRoom(ManagementModel managementModel)
        {
            try
            {
                if (managementModel.id > 0)
                {
                    RoomManagement item = POS.RoomManagements.Where(x => x.Id == managementModel.id).FirstOrDefault();
                    if (item == null)
                    {
                        return false;
                    }
                    else
                    {
                        item.Name = managementModel.Name;
                        item.NoOfTables = managementModel.NoOfTables;
                        POS.SaveChanges();
                        return true;
                    }
                }
                else
                {
                    RoomManagement room = new RoomManagement();
                    room.Name = managementModel.Name;
                    room.NoOfTables = managementModel.NoOfTables;
                    POS.RoomManagements.Add(room);
                    POS.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}