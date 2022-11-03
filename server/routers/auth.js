import { Router } from "express";
import * as authController from '../controllers/authController.js'

const auth = Router()

auth.post("/register",authController.register)

auth.post("/login",authController.login)

export default auth