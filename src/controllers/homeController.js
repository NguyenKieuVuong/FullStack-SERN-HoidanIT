let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
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
