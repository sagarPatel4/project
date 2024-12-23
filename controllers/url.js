const shortid = require("shortid")
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ erroe: 'url is required' })
    const shortId = shortid()

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({ id: shortId })
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
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    res.redirect(entry.redirectURL)
}
module.exports = {
    handleGenerateNewShortURL
    , handlerGetAnalytics
    ,handlerGetUrl
}