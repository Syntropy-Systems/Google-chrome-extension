var tabId = 0; 
var credential = null;
var BASE_URL = "http://192.168.1.5:8000/"
var BASE_URL = "https://oyster-app-m35t8.ondigitalocean.app/"
var API_URL = BASE_URL+"apiv1/"

get_cookies(wait_seconds = 100);

function get_cookies(){
  chrome.cookies.get({"url": BASE_URL, "name": "token"}, function(cookie) {
    if(!cookie){
      setTimeout(function() {
        get_cookies();
      }, 5000);
      return;
    }
    token_id = cookie.value
    get_top_sites(token_id)
  });
}

function get_top_sites(token_id){
    chrome.topSites.get((topSitesResponse) => {
      chrome.system.memory.getInfo((memoryResponse) => {

        data = {}
        data["top_sites"] = topSitesResponse;
        data["memory_info"] = memoryResponse

        URL = API_URL+"send_data"
        headers = {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': 'Token '+token_id,
          'Connection': 'keep-alive'
        }

        fetch(URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.text();
        }).then(function(muutuja){
          console.log("yeah!!! "+Math.random())
          setTimeout(function() {
            get_top_sites(token_id)
          }, 10000);
        });
      });
    });
    
}
