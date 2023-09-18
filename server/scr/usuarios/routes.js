const {Router} = require('express')
const controller = require('./controllers')

const router = Router();

//esto hace que cunado vvayamos a la ruta /api/usuarios se llame el metodo getusers de controlles
router.get("/", controller.getUsers);

module.exports = router;
