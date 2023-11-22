import { Router } from "express";

export const router = Router()

router.get('/register',(req,res) =>{
    console.log('pase1')
    res.render('register')
})

router.get('/',(req,res) =>{
    res.render('login')
})

router.get('/profile',(req,res) =>{
    res.render('profile',{
        user: req.session.user
    })
})