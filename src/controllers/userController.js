import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let userEmail = req.body.userEmail;
  let password = req.body.password;
  //cong viec backend
  //1. check user email nhap vao hop le
  //2. check mat khau
  //3. return info user

  //if (!userEmail) === if(userEmail ==='' || userEmail === null || userEmail ==='undefined')
  if (!userEmail || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameters!",
    });
  }
  let userData = await userService.handleUserLogin(userEmail, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},

    //userData,
    // errCode: 0,
    // message: "good",
    // test: "test",
    // userEmail: userEmail,
  });
};
module.exports = {
  handleLogin: handleLogin,
};
