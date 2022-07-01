const ytdl = require('ytdl-core');
const fs = require('fs');
const axios = require('axios');
const querystring = require("querystring");

//secret key
require('dotenv').config({ path: './key.env' });

let download_ytb = async(link) => {
    await ytdl(link)
        .pipe(fs.createWriteStream('./video.mp4'));
};

let search = async(list , query, download) => {
    var params = {
        key: process.env.KEY,
        q : query,
        part : "snippet"
    }

    await axios.get('https://www.googleapis.com/youtube/v3/search?' + querystring.stringify(params))
    .then(function (response) {
        var result = response.data;
        if(list == true){
            result.items.forEach((item,index) => {
                console.log(index, item.snippet.title, item.snippet.description, "https://www.youtube.com/watch?v=" + item.id.videoId,"\n\n")
            })
        }

        if(download == true){
            download_ytb("https://www.youtube.com/watch?v=" + result.items[0].id.videoId);

            console.log("video downloaded")
        }
        return true;
    }).catch((err) => {
        console.log(err.message);
        return null;
    })
}

let set_key = (key) => {
    let content = "KEY=" + key;
    fs.writeFile('./key.env', content, err => {
        if (err) {
          console.error(err);
        }
        else console.log("key updated");
      });
}

let main = () => {
    let list = false, query, download = false, restart = false;

    process.argv.forEach((arg , index) => {
        if(arg == "-q"){
            query = process.argv[index + 1];
        }

        if(arg == '-list'){
            list = true;
        }

        if(arg == '-download'){
            download = true;
        }

        if(arg == '-key'){
            set_key(process.argv[index + 1]);
            restart = true;
        }
    })

    if(!restart)
        search(list, query || "blank", download);
    else return 0;
}

main();
