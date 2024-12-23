const  express = require('express')
const {handleGenerateNewShortURL,handlerGetAnalytics ,handlerGetUrl,handleAllUrl}=require("../controllers/url")
const router = express.Router()


router.post('/',handleGenerateNewShortURL)
router.get('/analytics/:shortId',handlerGetAnalytics)
router.get('/:shortId',handlerGetUrl)
router.get('/', handleAllUrl)


module.exports=router 