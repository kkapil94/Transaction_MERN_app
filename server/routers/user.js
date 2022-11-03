import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from "passport";
import * as userController from '../controllers/userController.js'

const user = Router()

user.get("/",passport.authenticate("jwt",{session:false}),userController.user)

export default user