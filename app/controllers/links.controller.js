let fetchLinks = require('../models/links.model');



exports.getAll = async (req, res) => {
    let results;
    try{
        results = await fetchLinks.find();
    }catch (e) {
        res.send({
            messageerror: "Error in Fetching links",
            fetched: false
        });
    }
    res.json({
        result: results.map(result => result.toObject({getters: true}) ),
        fetched: true
    });
};

