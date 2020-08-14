const { v4 : uuidV4 } = require('uuid');
const router = require('express').Router();

router.get('/new-meeting',(req,res)=>{
    res.redirect(`/start-meeting/${uuidV4()}`);
});

router.get('/start-meeting/:roomId',(req,res)=>{
    const data = req.params.roomId;
    res.render('setup',{
        roomId:data
    });
})

router.get('/room/:roomId',(req,res)=>{
    const setup = req.params.roomId;
    // console.log(video,audio)
    // res.send('Hello')
    res.render('room',{
        roomId:setup,
    });
});

router.post('/join-meeting',(req,res)=>{
    console.log(req.body);
    res.redirect(`/${req.body.id}`);
});

router.get('/',(req,res)=>{
    res.render('home');
    // res.redirect(`/${uuidV4()}`)
});

module.exports = router;