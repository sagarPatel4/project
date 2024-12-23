const  express = require('express')
const {handleGenerateNewShortURL,handlerGetAnalytics ,handlerGetUrl}=require("../controllers/url")
const router = express.Router()


router.post('/',handleGenerateNewShortURL)

router.get('/analytics/:shortId',handlerGetAnalytics)
router.get('/:shortId',handlerGetUrl)

module.exports=router 