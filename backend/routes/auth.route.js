const auth_controller = require('../controllers/auth.controller');
const authMw = require('../middleware/auth.mw');
 module.exports = (app) =>{
app.post("/todoApp/api/v1/auth/signup",[authMw.verifySignupBody],auth_controller.signup)
}