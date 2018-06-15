using System.Web.Http;
using POSS.Interface;
using POSS.ViewModel;

namespace POSS.ApiControl
{
    public class RoomController : ApiController
    {
        public IRoom Room;
        public RoomController(IRoom _room)
        {
            Room = _room;
        }
      
        public IHttpActionResult GetRooms()
        {
            var Data = this.Room.GetManagements();
            return Json(Data);      
        }
        public IHttpActionResult deleteRoom(int id)
        {
            var Data = this.Room.DeleteRoom(id);
            return Json(Data);
        }
        public IHttpActionResult getRoomById(int id)
        {
            var Data = this.Room.GetRoomById(id);
            return Json(Data);
        }
        public IHttpActionResult insertRoom(ManagementModel managementModel)
        {
            var Data = this.Room.InsertRoom(managementModel);
            return Json(Data);
        }
    }
}