import { Router } from 'express'
import {sendFile} from '../controller/DownloadFile.controller.js'

const router=Router()

router.route('/downloadfile').post(sendFile)

export default router