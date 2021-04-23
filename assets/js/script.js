var totalInfectedGlobal = document.getElementById("totalInfected-global")
var newsHolder = document.getElementById("newsHolder")

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
    totalInfectedGlobal.textContent = cases;
    var deaths = globalData.deaths;
    var recovered = globalData.recovered;
    var todayCases = globalData.todayCases;
    var todayDeaths = globalData.todayDeaths;
    var todayRecovered = globalData.todayRecovered;
    console.log(cases)
    console.log(deaths)
    console.log(recovered)
    console.log(todayCases)
    console.log(todayDeaths)
    console.log(todayRecovered)
    });

 var countryCasesUrl = `https://disease.sh/v3/covid-19/countries/mexico?yesterday=false&twoDaysAgo=false&strict=true&allowNull=true`;

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