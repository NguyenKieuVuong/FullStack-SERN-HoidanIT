import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.readCRUD);
  router.get("/edit-crud", homeController.editCRUD);
  router.post("/put-crud", homeController.putCRUD);
  //   router.get("/", (req, res) => {
  //     return res.send("Hello world width Vuong");
  //   });
  //   router.get("/trang-chu", (req, res) => {
  //     return res.send("Hello world Trang chủ");
  //   });
  //rest api
  return app.use("/", router);
};
module.exports = initWebRoutes;
