var totalInfectedGlobal = document.getElementById("totalInfected-global")
var todayInfectedGlobal = document.getElementById("todayInfected-global")
var totalRecoveredGlobal = document.getElementById("totalRecovered-global")
var todayRecoveredGlobal = document.getElementById("todayRecovered-global")
var totalDeathsGlobal = document.getElementById("totalDeaths-global")
var todayDeathsGlobal = document.getElementById("todayDeaths-global")
var totalInfectedCountry = document.getElementById("totalInfected-country")
var todayInfectedCountry = document.getElementById("todayInfected-country")
var totalRecoveredCountry = document.getElementById("totalRecovered-country")
var todayRecoveredCountry = document.getElementById("todayRecovered-country")
var totalDeathsCountry = document.getElementById("totalDeaths-country")
var todayDeathsCountry = document.getElementById("todayDeaths-country")
var countrySearchName = document.getElementById("countrySearchName")

var newsHolder = document.getElementById("newsHolder")

var country = ""
var countrySearch = document.getElementById("countrySearch")
var countryInput

function getApi() {

  var covidNewsUrl = `https://content.guardianapis.com/search?q=covid&q=mexico&api-key=962e64d3-a7ad-4bb9-8881-a000ce805d15`;

 
  fetch(covidNewsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (newsData) {
      // sanity check
      console.log(newsData)

    
    var date = newsData.response.results[0].webPublicationDate;
    var title = newsData.response.results[0].webTitle;
    var newsUrl = newsData.response.results[0].webUrl;
    console.log(date)
    console.log(title)
    console.log(newsUrl)
    
    // var newsElement = document.createElement("a");
    // newsHolder.appendChild(newsElement);
    // newsHolder.lastChild.textContent = title;
    
    for (var i = 0; i < newsData.response.results.length; i++){
    var newsElement = document.createElement("a");
    newsHolder.appendChild(newsElement);
    newsHolder.lastChild.textContent = newsData.response.results[i].webTitle + newsData.response.results[i].webPublicationDate;
    console.log(newsData.response.results[i].webPublicationDate);
    console.log(newsData.response.results[i].webTitle);
    console.log(newsData.response.results[i].webUrl);
    }
    });

 var globalCasesUrl = `https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=true`;

   fetch(globalCasesUrl)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (globalData) {
      // sanity check
      console.log(globalData)
    var cases = globalData.cases;
    totalInfectedGlobal.textContent = cases.toLocaleString("en-US");
    var deaths = globalData.deaths;
    totalDeathsGlobal.textContent = deaths.toLocaleString("en-US");
    var recovered = globalData.recovered;
    totalRecoveredGlobal.textContent = recovered.toLocaleString("en-US");
    var todayCases = globalData.todayCases;
    todayInfectedGlobal.textContent = todayCases.toLocaleString("en-US");
    var todayDeaths = globalData.todayDeaths;
    todayDeathsGlobal.textContent = todayDeaths.toLocaleString("en-US");
    var todayRecovered = globalData.todayRecovered;
    todayRecoveredGlobal.textContent = todayRecovered.toLocaleString("en-US");
    console.log(cases.toLocaleString("en-US"))
    console.log(deaths)
    console.log(recovered)
    console.log(todayCases)
    console.log(todayDeaths)
    console.log(todayRecovered)
    });

    countryInput = countrySearch.children[0].value.toLowerCase()
 var countryCasesUrl = "https://disease.sh/v3/covid-19/countries/"+countryInput+"?yesterday=false&twoDaysAgo=false&strict=true&allowNull=true";

   fetch(countryCasesUrl)
    .then(function (response3) {
      return response3.json();
    })
    .then(function (countryData) {
      // sanity check
      console.log(countryData)

      var countryCases = countryData.cases;
      var countryDeaths = countryData.deaths;
      var countryRecovered = countryData.recovered;
      var countryTodayCases = countryData.todayCases;
      var countryTodayDeaths = countryData.todayDeaths;
      var countryTodayRecovered = countryData.todayRecovered;
      console.log(countryCases)
      console.log(countryDeaths)
      console.log(countryRecovered)
      console.log(countryTodayCases)
      console.log(countryTodayDeaths)
      console.log(countryTodayRecovered)

    });
    

    // for (var i = 0; i < data.length; i++) {
    //   console.log(data[i].url);
    //   console.log(data[i].user.login);
    // }
    // read local storage
    // show local storage on the page
    // onclick execute the function
    //  save info in localstorage


    };
    
    

getApi()

countrySearch.addEventListener("submit",function(event){
    event.preventDefault()
    console.log(countrySearch.children[0].value.toLowerCase())
    countryInput = countrySearch.children[0].value.toLowerCase()
    var countryCasesUrl = "https://disease.sh/v3/covid-19/countries/"+countryInput+"?yesterday=false&twoDaysAgo=false&strict=true&allowNull=true";

   fetch(countryCasesUrl)
    .then(function (response3) {
      return response3.json();
    })
    .then(function (countryData) {
      // sanity check
      console.log(countryData)

      var countryCases = countryData.cases;
      totalInfectedCountry.textContent = countryCases.toLocaleString("en-US");
      var countryDeaths = countryData.deaths;
      totalDeathsCountry.textContent = countryDeaths.toLocaleString("en-US");
      var countryRecovered = countryData.recovered;
      totalRecoveredCountry.textContent = countryRecovered.toLocaleString("en-US");
      var countryTodayCases = countryData.todayCases;
      if (countryData.todayCases === null){
       todayInfectedCountry.textContent = "Not Reported";
      } else{
       todayInfectedCountry.textContent = countryTodayCases.toLocaleString("en-US");
      }
      var countryTodayDeaths = countryData.todayDeaths;
      if (countryData.todayDeaths === null){
        todayDeathsCountry.textContent = "Not Reported";
       } else{
        todayDeathsCountry.textContent = countryTodayDeaths.toLocaleString("en-US");
       }
      var countryTodayRecovered = countryData.todayRecovered;
      if (countryData.todayRecovered === null){
        todayRecoveredCountry.textContent = "Not Reported";
       } else{
        todayRecoveredCountry.textContent = countryTodayRecovered.toLocaleString("en-US");
       }
      console.log(countryCases)
      console.log(countryDeaths)
      console.log(countryRecovered)
      console.log(countryTodayCases)
      console.log(countryTodayDeaths)
      console.log(countryTodayRecovered)

    });

   
}); 



// function init() {
//     var citySearchs = JSON.parse(localStorage.getItem("citySearchs"));
//     if (citySearchs) {
//       console.log(citySearchs);
//       for (var i = 0; i < citySearchs.length; i++) {
//         searchHist.append("<button>" + citySearchs[i].city + "</button>");
//         searchHist
//           .children()
//           .eq()
//           .prevObject[i].setAttribute(
//             "class",
//             "btn btn-secondary rounded-3 w-100 mb-2"
//           );