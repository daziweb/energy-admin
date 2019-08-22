const Router = require('koa-router');
const router = new Router();
const controller = require('../controllers/index');

router.prefix('/energy');

router.get('/list', controller.findAll);
router.post('/create', controller.createData);
router.post('/delete', controller.deleteData);

module.exports = router;
