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
        createdBy:req.user._id
    })
    console.log(shortId);
    
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
    console.log(req +" req");
    
    const shortId = req.params.shortId
    console.log(shortId + " shortId");
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    console.log(entry +" entry");
    
    res.redirect(entry.redirectURL)
}

async function handleAllUrl(req,res) {

    if(!req.user) return res.redirect('/signin')
        const allUrls = await URL.find({createdBy:req.user._id})
        return res.render("home", { urls: allUrls ,});
    
}

module.exports = {
    handleGenerateNewShortURL
    , handlerGetAnalytics
    ,handlerGetUrl,
    handleAllUrl
}