const {Router} = require('express')
const controller = require('./controllers')

const router = Router();

//esto hace que cunado vvayamos a la ruta /api/usuarios se llame el metodo getusers de controlles
router.get("/todos", controller.getUsers);
router.get("/verificarMail", controller.verificarMail);
router.get("/verificarMailContrasena", controller.verificarMailContrasena);

module.exports = router;
