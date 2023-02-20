import db from "../models/index";

let getHomePage = async (req, res) => {
  //kết nối đến DB sẽ dùng try catch
  try {
    let data = await db.User.findAll();
    console.log("-------------------");
    console.log(data);
    console.log("-------------------");
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
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
