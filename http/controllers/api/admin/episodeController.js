


const Controller = require('../../controller');
const Epsiode = require('../../../../models/Episode');



class EpsiodeController extends Controller {

    async getEpisodes(req,res) {
        const epsiodes = await Epsiode.find({}) ; 
        res.json(epsiodes) ;
    }
}



module.exports = new EpsiodeController();
