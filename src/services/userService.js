import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (userEmail, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(userEmail);
      if (isExist) {
        //user already exist - tai khoan da ton tai

        let user = await db.User.findOne({
          where: { email: userEmail },
          //chi lay cac truong can lay,van phai lay password de kiem tra phia duoi
          attributes: ["email", "roleID", "password"],
          raw: true,
        });
        if (user) {
          //compare password - so sanh mat khau
          let checkPassword = bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = `ok`;
            //xoa truong password khi tra du lieu
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
        }
        //resolve(user);
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exist in your system.Please try other email!`;
        //return error
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let comparePassword = () => {};
module.exports = {
  handleUserLogin: handleUserLogin,
};
