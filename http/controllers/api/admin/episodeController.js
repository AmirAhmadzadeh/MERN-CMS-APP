


const Controller = require('../../controller');
const Epsiode = require('../../../../models/Episode');



class EpsiodeController extends Controller {

    async getEpisodes(req, res) {
        const epsiodes = await Epsiode.find({});
        res.json(epsiodes);
    }

    async createNewEpisode(req, res) {

        try {

            const newEpisode = new Epsiode({
                ...req.body.data
            });

            const savedEpisdoe = await newEpisode.save();

            res.json({
                status: true
            })

        } catch (error) {
            console.log('ERROR IN SAVING AND CREATIGN EPISODE [EPISODE CONTROLLER]', error);
        }

    }
}



module.exports = new EpsiodeController();
