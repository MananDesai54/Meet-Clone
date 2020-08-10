const { v4 : uuidV4 } = require('uuid');
const router = require('express').Router();

router.get('/start-meeting',(req,res)=>{
    res.redirect(`/${uuidV4()}`)
})

router.post('/join-meeting',(req,res)=>{
    console.log(req.body);
    res.redirect(`/${req.body.id}`);
})

router.get('/',(req,res)=>{
    res.render('home');
    // res.redirect(`/${uuidV4()}`)
});

router.get('/:roomId',(req,res)=>{
    res.render('room',{
        roomId:req.params.roomId
    });
})

module.exports = router;