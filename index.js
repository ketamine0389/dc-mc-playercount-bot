const { Client, ActivityType, } = require('discord.js');
const axios = require('axios');
const { token, serverIP, interval } = require('./config.json');

const client = new Client({intents:[]});

function updatePresence(str) {
    client.user.setPresence({
        activities: [{
            name: str,
            type: ActivityType.Playing
        }],
        status: 'online'
    });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    setInterval(async () => 
        await axios.get(`https://api.mcsrvstat.us/1/${serverIP}`).then(res => {
            if (res.data.offline) return updatePresence('Server Offline');
            updatePresence(`${res.data.players.online} / ${res.data.players.max} Players`);
        }),
        parseInt(interval) * 1000
    );
});

client.login(token);