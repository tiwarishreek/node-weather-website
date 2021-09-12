const request = require('request');

const geoCode = (address, callback)=>{
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidGl3YXJpc2hyZWVrIiwiYSI6ImNrdGFubWVqejBkaGUybms0aTIyZmdyczQifQ.oLUVLk62i8S6qDHVb88-mg&limit=1';

    request({ url: mapBoxUrl, json:true}, (err,res) => {
        if(err){
            callback(err,undefined);
        } else if(res.body.features.length === 0) {
            //  console.log();
            const error =  new Error('Error - unable to find details, try for other location')
            callback(error,undefined);

        } else {
             // console.log(res.body.features);
             const data = [];
             const result = res.body.features;

             result.forEach(place=>{
                 let singleRow = {
                     lattitude: place.center[1],
                     longitude: place.center[0],
                     location: place.place_name
                 }
                 data.push(singleRow);
             });

             callback(undefined, data);
        }
         
     });
}

module.exports = geoCode;