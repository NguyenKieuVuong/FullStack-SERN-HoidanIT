import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  //kết nối đến DB sẽ dùng try catch
  try {
    let data = await db.User.findAll();
    // console.log("-------------------");
    // console.log(data);
    // console.log("-------------------");
    //return res.render("homepage.ejs");
    //thêm data
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }

  //return res.send("Hello world");
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
  //return res.send("Hello world");
};
let getCRUD = (req, res) => {
  return res.render("CRUD.ejs");
};

let postCRUD = async (req, res) => {
  let messenger = await CRUDService.CreateNewUser(req.body);
  console.log(messenger);
  //console.log(req.body);
  return res.send("post crud from server");
};
let readCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log("-------------------");
  // console.log(data);
  // console.log("-------------------");
  return res.render("readCRUD.ejs", {
    dataRead: data,
  });
  //return res.send("read crud from server");
};
let editCRUD = async (req, res) => {
  let userID = req.query.id;
  console.log(userID);
  // kiểm tra có userID giá trị
  if (userID) {
    let userData = await CRUDService.getUserInfoByID(userID);
    return res.render("editCRUD.ejs", {
      editData: userData,
    });
  } else {
  }
  return res.send("read crud from server");
  //console.log(userID);
  // let data = await CRUDService.getAllUser();
  // console.log("-------------------");
  // console.log(data);
  // console.log("-------------------");
  // return res.render("editCRUD.ejs", {
  //   dataRead: data,
  // });
  //return res.send("read crud from server");
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let userAll = await CRUDService.updateUserData(data);
  // return res.send("update done");
  return res.render("readCRUD.ejs", {
    dataRead: userAll,
  });
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  readCRUD: readCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
};
