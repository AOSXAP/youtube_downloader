# youtube_downloader

## Download youtube videos easily. (cli tool)

### Instalation
    1.git clone git@github.com:AOSXAP/youtube_downloader.git
    2.npm install
    3.node main.js -key <..your key...> (program won t work without this Youtube data v3 api key)

### Simple Documentation
Possible arguments : 
-key (Youtube data v3 api key)
    
    example: node main.js -key <...key...>
    
-q (stands for query, the argument following q should be the search query)
    
    example: node main.js -q "black sabbath" 
    
-list (lists first 5 results of the query)
    
    example: node main.js -q "black sabbath" -list
    
-download (downloads the first result of the query)
   
    example: node main.js -q "black sabbath" -download
