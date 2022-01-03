const jwt = require('jsonwebtoken')

module.exports.authMiddlewares = async(req,res,next) =>{

    // authTokenとして保存しているcookieを取得。
    const { authToken } = req.cookies

    if(authToken){
        const decodeToken = await jwt.verify(authToken,process.env.SECRET)
        // 解凍したuser情報をmyIdとしてrequestする。=> 自分のprofile画面に自動的に移動する。
        req.myId = decodeToken.id;
        next();
    }else{
        res.status(400).json({ errro: { errorMessage: "Please Login first."}})
    }
}