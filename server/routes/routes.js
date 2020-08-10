const { v4 : uuidV4 } = require('uuid');
const router = require('express').Router();

router.get('/new-meeting/:userName',(req,res)=>{
    res.redirect(`/start-meeting/${uuidV4()}&${req.params.userName}`);
});

router.get('/start-meeting/:roomId',(req,res)=>{
    const data = req.params.roomId.split('&');
    res.render('setup',{
        roomId:data[0],
        userName:data[1]
    });
});

router.get('/room/:roomId',(req,res)=>{
    const setup = req.params.roomId.split('&');
    const roomId = setup[0];
    const userName = setup[1];
    const video = setup[2].includes('ve');
    const audio = setup[2].includes('ae');
    // console.log(video,audio)
    // res.send('Hello')
    res.render('room',{
        roomId:req.params.roomId,
        userName,
        audio,
        video
    });
})

router.post('/join-meeting',(req,res)=>{
    console.log(req.body);
    res.redirect(`/${req.body.id}`);
});

router.get('/',(req,res)=>{
    res.render('home');
    // res.redirect(`/${uuidV4()}`)
});

module.exports = router;