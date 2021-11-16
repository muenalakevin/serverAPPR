
const checkOrigin= (req, res, next)=>{
    const host = req.headers['host'];
    const origin = req.headers['origin'];
    if(host ==  process.env.HOST && origin ==  process.env.ORIGIN){
        next();
    }else{
        res.sendStatus(403);
    }
}



module.exports = checkOrigin