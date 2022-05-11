const express = require("express");
const res = require("express/lib/response");
const app = express();      
const https = require('https');       

app.set('view engine', 'ejs');

app.use(express.static('./public'));     

app.listen(process.env.PORT || 5000, function (err) {     // anonymous function as the second parameter
    if(err) console.log(err);
})

// url里的内容属于request
// res.send()一般用一次， res.write()会把string concatenate, 可以连用好多个

// app.get('/profile/:id', function (req, res){      
//     res.send(`Hi there, the pokemon has the id ${req.params.id}`) 
// })

app.get('/profile/:id', function (req, res) {   
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`;
    let data = "";
    https.get(url, function(https_res) {
        https_res.on("data", function(chunk) {  
            data += chunk;
        })
        https_res.on("end", function() {
            data = JSON.parse(data);

            let hpArray = data.stats.filter((obj) => {
                return obj.stat.name == "hp"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            let attackArray = data.stats.filter((obj) => {
                return obj.stat.name == "attack"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            let defenseArray = data.stats.filter((obj) => {
                return obj.stat.name == "defense"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            let specialAttackArray = data.stats.filter((obj) => {
                return obj.stat.name == "special-attack"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            let specialDefenseArray = data.stats.filter((obj) => {
                return obj.stat.name == "special-defense"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            let speedArray = data.stats.filter((obj) => {
                return obj.stat.name == "speed"
            }).map((obj_) => {
                return obj_.base_stat     // 这个返回的是一个array
            })

            res.render("profile.ejs", {  
                "id": req.params.id,
                "name": data.name,
                "hp": hpArray[0],
                "attack": attackArray[0],        
                "defense": defenseArray[0],        
                "spAttack": specialAttackArray[0],        
                "spDefense": specialDefenseArray[0],        
                "speed": speedArray[0]       
            })
        })
    })              
})

// sendFile 和res.render一样也可以send整个page to client, 但是sendFile只能send一个static page
// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/index.html");
// })

