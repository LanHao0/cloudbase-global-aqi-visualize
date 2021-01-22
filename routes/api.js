const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get("/FOG_getByBounds", async function (req, res, next) {
    const query = req.query;
    let date = new Date().getTime();

    await axios
        .get('https://api.waqi.info/mapq/bounds/?bounds='
            + query.leftDown + ',' + query.upRight
            + '&inc=placeholders&k=085f8517137bddf244a523b16384f7d7e94c802a&_='
            + date)
        .then(response => {
            res.json(response.data);
        })
});


router.get("/FOG_getByGeo",async function (req,res,next) {
    const query=req.query;
    let date = new Date().getTime();
    await axios
        .get('https://api.waqi.info/feed/geo:'
            + query.latitude + ';' + query.longitude
            + '/?token=085f8517137bddf244a523b16384f7d7e94c802a&time='
            + date)
        .then(response => {
            res.json(response.data);
        })
});

router.get("/FOG_getBySearch",async function (req,res,next) {
    const query=req.query;
    let date = new Date().getTime();
    await axios
        .get('https://api.waqi.info/search/?token=085f8517137bddf244a523b16384f7d7e94c802a&time='
            + date + '&keyword=' + encodeURI(query.keyword))
        .then(response => {
            res.json(response.data);
        })
});

router.get("/FOG_getCountryJSON/:country",async function (req,res,next) {
    if (req.params.country.length===2){
        let date = new Date().getTime();
        await axios
            .get('https://waqi.info/rtdata/ranking/'+req.params.country+'.json?token=085f8517137bddf244a523b16384f7d7e94c802a&time=' + date)
            .then(response => {
                res.json(response.data);
            })
    }else{
        res.json({err:"invalid country code"})
    }

});


router.get("/allCountry",async function (req,res,next) {
    let date = new Date().getTime();
    await axios
        .get('https://waqi.info/rtdata/ranking/index2.json?_' + date)
        .then(response => {
            res.json(response.data);
        })
});


module.exports = router;
