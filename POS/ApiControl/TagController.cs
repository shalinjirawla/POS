using POSS.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using POSS.ViewModel;

namespace POSS.ApiControl
{
    public class TagController : ApiController
    {
        private readonly ITag tag;
        public TagController(ITag _tag)
        {
            tag = _tag;
        }
        public IHttpActionResult getTagsWithoutId()
        {
            var data = tag.GetTagsWithoutId();
            return Json(data);
        }
        public IHttpActionResult GetTagsById(int id)
        {
            var data = tag.GetTagDetails(id);
            return Json(data);
        }
        
        public IHttpActionResult deleteItem(int id)
        {
            var data = tag.DeleteItem(id);
            return Json(data);
        }
        public IHttpActionResult insertTag(TagModel tagModel)
        {
            var data = tag.InsertTag(tagModel);
            return Json(data);
        }
        public IHttpActionResult getItemById(int id)
        {
            var data = tag.GetItemById(id);
            return Json(data);
        }
        public IHttpActionResult getTagDetails(int id)
        {
            var data = tag.GetTagDetails(id);
            return Json(data);
        }
    }
}
