const shortid = require("shortid")
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    
    if (!body.url) return res.status(400).json({ erroe: 'url is required' })
    const shortId = shortid.generate()

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    console.log("ID being passed to template:", shortId);
    return res.render("home",{id:shortId})
}

async function handlerGetAnalytics(req, res) {
    const shortId = req.params.shortId
    console.log(shortId);

    const result = await URL.findOne({ shortId })
    return res.json({
        totalclick: result.visitHistory.length
        , analytics: result.visitHistory
    })
}

async function handlerGetUrl (req, res) {
    
    const shortId = req.params.shortId
    console.log(shortId + " shortId");
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    res.redirect(entry.redirectURL)
}

async function handleAllUrl(req,res) {
    const allUrls=await URL.find({})
    console.log("done" +allUrls);
    
    return res.render("home",{urls:allUrls})
}

module.exports = {
    handleGenerateNewShortURL
    , handlerGetAnalytics
    ,handlerGetUrl,
    handleAllUrl
}