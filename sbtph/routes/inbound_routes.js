const express = require('express')
const router = express.Router()
const inboundController = require('../controllers/inbound_controller')


router.get('/loginlogoutdetails/',inboundController.getLoginLogoutDetails)


router.get('/active', inboundController.getActive)

router.get('/inactive', inboundController.getInactive)


router.get('/call_summary', inboundController.callSummary)
router.get('/agent_call_details', inboundController.getAgentCallDetails)
router.get('/', inboundController.getIndex)

module.exports = router