import express from "express";
import {gettask , createtask  , updatetask , deletetask  , getspecifictask} from '../controller/allfunctions.js'
const router = express.Router();


router.post('/', createtask);
router.get('/' , gettask )
router.get('/:id'  ,getspecifictask)
router.patch('/:id' , updatetask)
router.delete('/:id' , deletetask )

export default router