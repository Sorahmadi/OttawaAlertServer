import fetch from 'node-fetch';
import { Client } from 'discord.js';
import { IntentsBitField } from 'discord.js';

const client = new Client({
    intents:[
        IntentsBitField.Flags.MessageContent,
    ]
})

const EMPTY_ALERT = `[]`
let dynamic_alert = "";
let numAlerts = 0;

const channel = client.channels.cache.get('1126037711678079028')

let alerts = CheckAlerts();

var reportReset = true;

async function CheckAlerts(){
    try {
        const response = await fetch('https://outages.hydroottawa.com/geojson/outage_polygons_public.json');
        const myJson = await response.json();
        return myJson;
    } catch (error) {
        console.log("Lost Internet Connection!");
        return null;
    }
}

client.on('ready', (c) =>{
    console.log(c.user.tag + " is online.");

    setInterval(() => {
        try {
            CheckAlerts().then(function(result){ 
                if(result !== null){  
                    var parsedJSON = JSON.parse(JSON.stringify(result));
                    var allfeatures = "";
        
                    if(parsedJSON.features.length > 0){
                        for(var i = 0; i < parsedJSON.features.length; i++){
                            allfeatures += JSON.stringify(parsedJSON.features[i].geometry);
                        }
                        if(allfeatures !== dynamic_alert){
                            dynamic_alert = allfeatures;
        
                            if(parsedJSON.features.length > numAlerts){ //New Alert
                                c.channels.cache.get('1126037711678079028').send("@everyone New power outage reported! Official website might be slow to update, keep refreshing.")
                            }else if(parsedJSON.features.length < numAlerts){ //Resolved Alert
                                c.channels.cache.get('1126037711678079028').send("@everyone An outage has been resolved. But there are still on-going outage alerts.")
                            }
        
                            numAlerts = parsedJSON.features.length;
                        }
                    }else{
                        if(numAlerts > 0){
                            c.channels.cache.get('1126037711678079028').send("@everyone All outages have been resolved.")
                            dynamic_alert = "";
                        }
        
                        numAlerts = parsedJSON.features.length;
                    }
                }
            })
        } catch (error) {
            console.log("Lost Internet Connection. Retrying...");
        }
    }, 60000);
})

client.login("REDACTED");


