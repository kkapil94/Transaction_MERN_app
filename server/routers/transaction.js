import { Router } from "express";
import passport from "passport";
import Transaction from "../models/Transaction.js";
import * as transactionController from '../controllers/transactionController.js'

const route = Router()

route.post("/",passport.authenticate("jwt",{session:false}),transactionController.create)

route.get("/",passport.authenticate("jwt",{session:false}),transactionController.index)

route.delete("/:id",passport.authenticate("jwt",{session:false}),transactionController.destroy)

route.patch("/:id",passport.authenticate("jwt",{session:false}),transactionController.update)


export default route