import express from "express"

const app=express()
app.use(express.json())

import {router as bookRouter} from './routes/book.routes.js'
app.use('/',bookRouter)

export {app}