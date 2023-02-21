import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
let CreateNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleID: data.roleID,
        //positionID: data.email,
      });
      resolve("ok! create a new user succeed!");
    } catch (e) {
      reject(e);
    }
  });

  //let hashPasswordFromBcrypt = await hashUserPassword(data.password);
  console.log("data from server ");
  console.log(data);
  console.log(hashPasswordFromBcrypt);
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUser = () => {
  return new Promise((resolve, reject) => {
    try {
      let user = db.User.findAll({ raw: true });
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoByID = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userID },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = (data) => {
  // console.log("data from server ");
  // console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        //update các trường dữ liệu
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        //lưu dữ liệu lên server
        await user.save();

        // lấy tất cả dữ liệu để đổ lại table
        let userAll = db.User.findAll();

        resolve(userAll);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserByID = (userID) => {
  console.log("data from server ");
  console.log(userID);
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userID },
      });
      if (user) {
        // xóa dữ liệu
        await user.destroy();
      }
      // lấy tất cả dữ liệu để đổ lại table
      let userAll = db.User.findAll();

      resolve(userAll);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  CreateNewUser: CreateNewUser,
  getAllUser: getAllUser,
  getUserInfoByID: getUserInfoByID,
  updateUserData: updateUserData,
  deleteUserByID: deleteUserByID,
};
