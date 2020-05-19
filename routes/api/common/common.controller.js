const MtsSigungu = require("../../../models").mts_sigungu;
const MtsArea = require("../../../models").mts_area;

exports.setArea = (req, res) => {
    MtsArea.findAll().then(result => {
        res.json(result)
    })
};

exports.setSigungu = (req, res) => {
    MtsSigungu.findAll().then(result => {
        res.json(result)
    })
};