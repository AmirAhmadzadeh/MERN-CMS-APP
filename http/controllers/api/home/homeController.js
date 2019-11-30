const Controller = require('./../Controller');
const Menu = require('../../../../models/menu');

class HomeController extends Controller {

    async getHome(req, res, next) {
        const menus = await Menu.find({});
        return res.json({ menus })
    }

    async getUserData(req, res) {
        res.json(req.user);
    }
}



module.exports = new HomeController();