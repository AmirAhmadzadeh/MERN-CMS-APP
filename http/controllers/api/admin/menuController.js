const Controller = require('../../controller');
const Menu = require('../../../../models/menu');


class menuController extends Controller {
    /* menu   */
   
    async getAll(req, res, next) {

        const menus = await Menu.find({});
        res.json({ menus });

    }
   
   
    // create menue 

    async create(req, res) {

        req.body.parent = req.body.parent == 'none' ? null : req.body.parent;

        const newMenu = new Menu({ ...req.body });

        try {
            await newMenu.save();
            return res.json({ status: true })

        } catch (error) {
            console.log(` Error in creating menu ${error} `)
        }
    }
   
    // delete menu 
   
    async delete(req, res) {
        // console.log(req.params.id)
        try {
            const menu = await Menu.findById(req.params.id).populate('childMenu');

            for (let m of menu.childMenu) {
                await m.remove();
            }
            await menu.remove();
            return res.json({status : true});
        } catch (error) {
            console.log('error');
        }
        
    }
   
    // edit menu  



}



module.exports = new menuController();
