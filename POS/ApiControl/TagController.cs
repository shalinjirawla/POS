using POSS.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace POSS.ApiControl
{
    public class TagController : ApiController
    {
        private readonly ITag tag;
        public TagController(ITag _tag)
        {
            tag = _tag;
        }
        public IHttpActionResult GetTagsById(int id)
        {
            var data = tag.GetTagDetails(id);
            return Json(data);
        }
    }
}
