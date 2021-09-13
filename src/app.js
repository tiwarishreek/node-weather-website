const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine','hbs');

// Setup handlebars and views
const viewsPath = path.join(__dirname,'../templates/views');
app.set('views',viewsPath);

const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));

app.get('/',function(req,res){
	// res.send('Hello express!');
    res.render('index',{
        name:"Shree Krishna Tiwari",
        title:"Weater App"
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        });
    }
    const address = req.query.address;

    geoCode(address,(error, response)=>{
        // console.log(error);
        
        if(error){
            return res.send({
                error:error.message
            })
        }

        forecast(response[0].lattitude,response[0].longitude,(err, result)=>{
            // console.log(err);
            
            if(err){
                return res.send({
                    error:err.message
                })
            }
            const foreCastPrediction =  `It is currently ${result.temperature} degree out, It feels like ${result.feelslike} `;
            const location = response[0].location;
            return res.send({
                address,
                location,
                forecast: foreCastPrediction
            })

        });
    });

})

app.get('/about',(req,res) => {
    // res.send("About page!");
    res.render('about',{
        title:"About me!",
        name:"Shree Krishna Tiwari"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        messgae:"Hello from HELP Page",
        name:"Shree Krishna Tiwari",
        title:"Help Page"
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404 Error",
        name:"Shree krishna tiwari",
        errorMsg : "Help article not found!",
    })
})


app.get('*',(req,res)=>{
    res.render("404",{
        title:"404 Error",
        name:"Shree krishna tiwari",
        errorMsg : "Page not found!",
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    const randomNumber = Math.round(Math.abs(Math.random()*1000));
	console.log('Server started on PORT >> ', PORT, ",Random Nu>>" + randomNumber);
})