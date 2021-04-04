const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    if(req.path != '/asteroid/login'){
        if(req.headers.asteroid){
            let token = req.headers.asteroid.split(' ')[1];
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...',error});
                if(req.method != 'GET'){
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
                }else{
                    next();
                }
            });
        }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
    }else next();
}