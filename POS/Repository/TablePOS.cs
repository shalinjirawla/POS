﻿using POSS.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using POSS.ViewModel;
using POSS.Models;


namespace POSS.Repository
{
    public class TablePOS : ITable
    {
        private readonly PosDatabaseEntities posDatabase;
        public TablePOS(PosDatabaseEntities _posDatabase)
        {
            posDatabase = _posDatabase;
        }

        public bool DeleteTable(int id)
        {
            try
            {
                if (id > 0)
                {
                    TableManagement table = posDatabase.TableManagements.FirstOrDefault(x => x.Id == id);
                    if (table != null)
                    {
                        posDatabase.TableManagements.Remove(table);
                        posDatabase.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public List<OrderModel> GetAllUnPaid(int id)
        {
            try
            {
                List<OrderModel> model = new List<OrderModel>();
                var query = posDatabase.Orders.Where(x => x.IsPaid == false).ToList();
                if(query.Count() > 0)
                {
                    foreach (var item in query)
                    {
                        OrderModel mod = new OrderModel();
                        mod.orderid = item.Id;
                        mod.IsPaid = item.IsPaid;
                        mod.Amount = item.Amount;
                        mod.Date = item.Date;
                        mod.TableNo = item.TableNo;
                        model.Add(mod);
                    }
                }
                return model;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<CategoryModel> getCategories()
        {
            try
            {
                List<CategoryModel> categories = new List<CategoryModel>();
                var query = posDatabase.Categories.ToList();
                if(query.Count() > 0)
                {
                    foreach (var item in query)
                    {
                        CategoryModel cat = new CategoryModel();
                        cat.Id = item.Id;
                        cat.Name = item.Name;
                        categories.Add(cat);
                    }
                }
                return categories;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<ItemModel> getItemByCategoryId(int id)
        {
            try
            {
                List<ItemModel> listingData = new List<ItemModel>();
                var data = posDatabase.Items.Where(x => x.CategoryId == id).ToList();
                if(data.Count() > 0)
                {
                    foreach (var item in data)
                    {
                        ItemModel listing = new ItemModel();
                        listing.Id = item.Id;
                        listing.Name = item.Name;
                        listing.Description = item.Description;
                        listing.CategoryId = item.CategoryId;
                        listing.ItemPrice = (int)item.ItemPrice;
                        listingData.Add(listing);
                    }
                }
                return listingData;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<TableManagementModel> GetItemDetail()
        {
            try
            {
                List<TableManagementModel> tableManagementModels = new List<TableManagementModel>();
                var qurey = posDatabase.TableManagements.ToList();
                foreach (var item in qurey)
                {
                    TableManagementModel tableManagement = new TableManagementModel();
                    tableManagement.id = item.Id;
                    tableManagement.NoOfChair = (int)item.NoOfChair;
                    tableManagement.TableNo = (int)item.TableNo;
                    tableManagement.RoomId = (int)item.RoomId;
                    tableManagementModels.Add(tableManagement);
                }
                return tableManagementModels;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public TableManagementModel getTableByID(int id)
        {
            try
            {
                var query = posDatabase.TableManagements.Where(x => x.Id == id).FirstOrDefault();
                TableManagementModel model = new TableManagementModel();
                if(query != null)
                {
                    model.id = query.Id;
                    model.NoOfChair = (int)query.NoOfChair;
                    model.RoomId = (int)query.RoomId;
                    model.TableNo = (int)query.TableNo;
                }
                return model;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public TableManagementModel1 getTableByIdAndOrder(int id, int orderid)
        {
            try
            {
                var query = posDatabase.TableManagements.Where(x => x.Id == id).FirstOrDefault();

                TableManagementModel1 model = new TableManagementModel1();
                if (query != null)
                {
                    model.id = query.Id;
                    model.NoOfChair = (int)query.NoOfChair;
                    model.RoomId = (int)query.RoomId;
                    model.TableNo = (int)query.TableNo;
                }
                var order = posDatabase.Orders.Where(x => x.Id == orderid).ToList();
                model.OrderCom = order.Select(x => new OrderComModel()
                {
                    orderid = orderid,
                    TableNO = x.TableNo,
                    TotalAmount = x.Amount,
                    Item = x.OrderItems.Select(y => new Item1()
                    {
                        orderItemId = y.Id,
                        ItemID = y.ItemId,
                        Qty = y.Qty,
                        Tag = y.OrderItemTags.Select(z => new Tag1()
                        {
                            TagId = z.TagId
                        }).ToList()
                    }).ToList()
                }).ToList();
                return model;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<TableManagementModel> getTableByRoomID(int id)
        {
            try
            {
                List<TableManagementModel> tableData = new List<TableManagementModel>();
                var data = posDatabase.TableManagements.Where(x => x.RoomId == id).ToList();
                if (data.Count() > 0)
                {
                    foreach (var item in data)
                    {
                        TableManagementModel listing = new TableManagementModel();
                        listing.id = item.Id;
                        listing.NoOfChair = (int)item.NoOfChair;
                        listing.RoomId = (int)item.RoomId;
                        listing.TableNo = (int)item.TableNo;
                        tableData.Add(listing);
                    }
                    var query = posDatabase.Orders.Where(x => x.IsPaid == false).ToList();
                    if(query.Count > 0)
                    {
                        foreach (var item in query)
                        {
                            var da = tableData.Where(x => x.TableNo == item.TableNo).FirstOrDefault();
                            if(da != null)
                            {
                                da.orderid = item.Id;
                            }
                        }
                    }

                }
                return tableData;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<TagModel> getTagByItemId(int id)
        {
            try
            {
                List<TagModel> TagModels = new List<TagModel>();
                var data = posDatabase.Tags.Where(x => x.ItemId == id).ToList();
                if (data.Count() > 0)
                {
                    foreach (var item in data)
                    {
                        TagModel listing = new TagModel();
                        listing.id = item.id;
                        listing.ItemId = (int)item.ItemId;
                        listing.Name = item.Name;
                        listing.Description = item.Description;
                        TagModels.Add(listing);
                    }
                }
                return TagModels;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool InsertTable(TableManagementModel tableManagementModel)
        {
            try
            {
                if (tableManagementModel.id > 0)
                {
                    TableManagement  table = posDatabase.TableManagements.Where(x => x.Id == tableManagementModel.id).FirstOrDefault();
                    if (table == null)
                    {
                        return false;
                    }
                    else
                    {
                        table.NoOfChair = tableManagementModel.NoOfChair;
                        table.TableNo = tableManagementModel.TableNo;
                        table.RoomId = tableManagementModel.RoomId;                     
                        posDatabase.SaveChanges();
                        return true;
                    }
                }
                else
                {
                    TableManagement table = new TableManagement();
                    table.NoOfChair = tableManagementModel.NoOfChair;
                    table.TableNo = tableManagementModel.TableNo;
                    table.RoomId = tableManagementModel.RoomId; 
                    posDatabase.TableManagements.Add(table);
                    posDatabase.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool SaveOrder(OrderModel model)
        {
            try
            {
                int orderid = model.orderid;
                if (model.Item == null)
                {
                    return false;
                }
                else
                {
                    if (orderid != 0)
                    {
                        var ordertotal = posDatabase.Orders.Where(x => x.Id == orderid).FirstOrDefault();
                        ordertotal.Amount = model.Amount;
                        posDatabase.SaveChanges();

                        foreach (var items in model.Item)
                        {
                            OrderItem orderItem = new OrderItem();
                            orderItem.ItemId = items.orderItemId;
                            orderItem.Qty = (int)items.Qty;
                            orderItem.OrderId = orderid;
                            posDatabase.OrderItems.Add(orderItem);
                            posDatabase.SaveChanges();

                            if (items.Tag != null)
                            {
                                foreach (var item1 in items.Tag)
                                {
                                    OrderItemTag orderitemtag = new OrderItemTag();
                                    orderitemtag.OrderItemId = orderItem.Id;
                                    orderitemtag.TagId = item1.TagId;
                                    posDatabase.OrderItemTags.Add(orderitemtag);
                                    posDatabase.SaveChanges();
                                }
                            }
                        }
                        return true;
                    }
                    else
                    {
                        Order order = new Order();
                        order.TableNo = model.TableNo;
                        order.Date = DateTime.Now;
                        order.IsPaid = false;
                        order.Amount = model.Amount;
                        posDatabase.Orders.Add(order);
                        posDatabase.SaveChanges();

                        foreach (var item in model.Item)
                        {
                            OrderItem OrderItem = new OrderItem();
                            OrderItem.ItemId = item.orderItemId;
                            OrderItem.Qty = item.Qty;
                            OrderItem.OrderId = order.Id;

                            posDatabase.OrderItems.Add(OrderItem);
                            posDatabase.SaveChanges();

                            if (item.Tag != null)
                            {
                                foreach (var item1 in item.Tag)
                                {
                                    OrderItemTag orderitemtag = new OrderItemTag();
                                    orderitemtag.OrderItemId = OrderItem.Id;
                                    orderitemtag.TagId = item1.TagId;
                                    orderitemtag.Qty = item1.Qty;
                                    posDatabase.OrderItemTags.Add(orderitemtag);
                                    posDatabase.SaveChanges();
                                }
                            }
                        }
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}