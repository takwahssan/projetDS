const express = require('express');
const Joi = require('joi');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
//var Daten = require("dateFormat");


var films = [
    {id:1,name:"harry pooter",acteur :["takwa","nourhen"],seance : [{id:1,datee:"17/03/2017",temps:"2:00",nbplacedispo:"4"}]},
    {id:2,name:"choufli hal",acteur:["mayma","nourhen","sleh"],seance:[{id:2,datee:"03/03/2021",temps:"1:30",nbplacedispo:"10"}]},
    {id:3,name:"the ring",acteur:["bella","alexsandra","mohamed"],seance:[{id:3,datee:"20/03/2015",temps:"3:30",nbplacedispo:"15"}]},
    {id:4,name:"harry",acteur:["pytter","salah","bond"],seance:[{id:4,datee:"23/03/2007",temps:"1:30",nbplacedispo:"6"}]},
    {id:5,name:"dark",acteur:["james","paul"],seance:[{id:4,datee:"01/02/2010",temps:"1:30",nbplacedispo:"6"}]},
]

app.get('/api/films', (req,res) => {
    res.send(films);
})

app.get('/api/films/:id', (req,res) => {
    let film = films.find(f => f.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Films with this id is not found');
    res.send(film);
})

const Film_schema = Joi.object().keys({
    name : Joi.string().min(3).max(50).required(),
    acteur : Joi.array().min(3).max(50).required(),
    seance : Joi.object({
        datee: Joi.date().required(),
        temps: Joi.string().required(),
        nbplacedispo: Joi.number().integer().min(1).max(300).required()})
    
});

    
app.post('/api/films', (req,res) => {
    
    let validation_result = Joi.validate(req.body,Film_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
    
    let film = {
        id : films.length + 1,
        name : req.body.name,

        acteur : req.body.acteur,

        seance : req.body.seance
    };

    films.push(film);
    res.send(film);
})
app.put('/api/films/update/:id', (req,res) => {
    let film = films.find(s => s.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Film with this id is not found');

    let validation_result = Joi.validate(req.body, Film_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
        
    film.name =  req.body.name;
    film.acteur =  req.body.acteur;
    film.seance =  req.body.seance;
    res.send(film);
})
app.delete('/api/films/delete/:id', (req,res) => {
    
    let film = films.find(s => s.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Film with this id is not found');
      
    films.splice(films.indexOf(film),1)
     
    res.status(200).json(films)
       
    })
//reservation seance
app.post("/api/films/reservations/:id",function(req,res){

    let film = films.find(f => f.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Films with this id is not found!!');
           
    let snc=film.seance.find(e=>e.id === parseInt(req.body.id));
    if  (!snc) return res.status(404).send('Seance with this id is not found!!');

    if (snc.nbplacedispo!==0 && snc.nbplacedispo >= req.body.nbrplace){
        snc.nbplacedispo-=req.body.nbrplace;
        return(res.status(200).send('Reservation Avec SUCCESS'));
    }else{
        return(res.status(401).send('Nombre De Place N\'est Pas Dispo'));
    }
    })
    
app.listen(port,() => console.log(`Server starts on ${port}...`));