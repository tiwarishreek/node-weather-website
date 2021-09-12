const request = require('request');

const weather = (lattitude,longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=30a8a89e515336b145c7fe8e2780f649&query='+encodeURIComponent(lattitude)+","+encodeURIComponent(longitude);

    // console.log("weatherStackUrl >> ", weatherStackUrl);
    // Weather API
    request({
        url:weatherStackUrl,
        json:true
    },(err,res)=>{
        if(err){
            callback(err, undefined)
        } else if(res.body.error){
            const error = new Error(res.body.error);
            callback(error,undefined)
        } else{
            callback(undefined, res.body.current)
        }
    });
}

module.exports = weather;