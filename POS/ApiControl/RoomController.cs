using System.Web.Http;
using POSS.Interface;

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
    }
}