import express from 'express'
import {jsonApi} from './fields.js';
import cors from 'cors'

const app = express()
app.use(cors())
const router = express.Router()

app.use(router)


router.get('/form',(req,res)=> {
    res.send(jsonApi)
})


app.listen(4000,()=>{
    console.log('run')
})