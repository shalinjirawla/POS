using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POSS.ViewModel;
using POSS.Interface;
using POSS.Models;

namespace POSS.Repository
{
    public class TagPOS : ITag
    {
        PosDatabaseEntities POS = new PosDatabaseEntities();

        public bool DeleteItem(int? id)
        {
            try
            {
                if (id > 0)
                {
                    Tag tag = POS.Tags.FirstOrDefault(x => x.id == id);
                    if (tag != null)
                    {
                        POS.Tags.Remove(tag);
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

        public TagModel GetItemById(int id)
        {
            try
            {
                var qur = POS.Tags.Where(x => x.id == id).FirstOrDefault();

                TagModel tag = new TagModel();
                if (qur != null)
                {
                    tag.id = qur.id;
                    tag.Name = qur.Name;
                    tag.ItemId = qur.ItemId;
                    tag.TagPrice = (float)qur.TagPrice;
                }
                return tag;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public List<TagModel> GetTagDetails(int id)
        {
            try
            {
                List<TagModel> tagModels = new List<TagModel>();
                var qurey = POS.Tags.Where(x=>x.ItemId == id).ToList();
                foreach (var item in qurey)
                {
                    TagModel TagModel = new TagModel();
                    TagModel.id = item.id;
                    TagModel.Name = item.Name;
                    TagModel.Description = item.Description;
                    TagModel.ItemId = item.ItemId;
                    TagModel.TagPrice = (float)item.TagPrice;
                    tagModels.Add(TagModel);
                }
                return tagModels;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool InsertTag(TagModel tagModel)
        {
            try
            {
                if (tagModel.id > 0)
                {
                    Tag tag = new Tag();
                    tag.Name = tagModel.Name;
                    tag.Description = tagModel.Description;
                    tag.ItemId = tagModel.ItemId;
                    tag.TagPrice = tagModel.TagPrice;
                    POS.Tags.Add(tag);
                    POS.SaveChanges();
                    return true;
                }
                else
                {
                    Tag tag = new Tag();
                    tag.Name = tagModel.Name;
                    tag.Description = tagModel.Description;
                    tag.ItemId = tagModel.ItemId;
                    tag.TagPrice = tagModel.TagPrice;
                    POS.Tags.Add(tag);
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