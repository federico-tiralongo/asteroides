const asteroid = require('../models/asteroid');

function index(req,res){
    asteroid.find({})
        .then(asteroids => {
            if(asteroids.length) return res.status(200).send({asteroids});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}

function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.asteroids) return res.status(404).send({message: 'NOT FOUND'});
    let asteroids = req.body.asteroids;
    return res.status(200).send({asteroids});
    
}

function create(req,res){
    new asteroid(req.body).save().then(asteroid => res.status(201).send({asteroid})).catch(error => res.status(500).send({error}));
}

function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.asteroids) return res.status(404).send({message: 'NOT FOUND'});
    let asteroid = req.body.asteroids[0];
    asteroid = Object.assign(asteroid,req.body);
    asteroid.save().then(asteroid => res.status(200).send({message: "UPDATED", asteroid})).catch(error => res.status(500).send({error}));
}

function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.asteroids) return res.status(404).send({message: 'NOT FOUND'});
    req.body.asteroids[0].remove().then(asteroid => res.status(200).send({message: 'REMOVED', asteroid})).catch(error => res.status(500).send({error}));
}

function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    asteroid.find(query).then(asteroids => {
        if(!asteroids.length) return next();
        req.body.asteroids = asteroids;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find
}