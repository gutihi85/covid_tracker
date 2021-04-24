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
var country = "";
var countrySearch = document.getElementById("countrySearch")
var countryInput;
const baseURL = "https://disease.sh/v3/covid-19/countries/";
const newsURL = "https://content.guardianapis.com/search?q=covid&q=";
let searchedCountryName = document.getElementById("searchedCountryName");

function retrieveGlobalCases(){
    var globalCasesUrl = `https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=true`;
    fetch(globalCasesUrl)
    .then(function (response2) {
        return response2.json();
    })
    .then(function (globalData) {
        putGlobalCases(globalData);
    }).catch(error => {
        alert(error)
    });
}

function putGlobalCases(globalData){
    var cases = globalData.cases;
    var deaths = globalData.deaths;
    var recovered = globalData.recovered;
    var todayCases = globalData.todayCases;
    var todayDeaths = globalData.todayDeaths;
    var todayRecovered = globalData.todayRecovered;

    totalInfectedGlobal.textContent = cases.toLocaleString("en-US");
    totalDeathsGlobal.textContent = deaths.toLocaleString("en-US");
    totalRecoveredGlobal.textContent = recovered.toLocaleString("en-US");
    todayInfectedGlobal.textContent = todayCases.toLocaleString("en-US");
    todayDeathsGlobal.textContent = todayDeaths.toLocaleString("en-US");
    todayRecoveredGlobal.textContent = todayRecovered.toLocaleString("en-US");
}

countrySearch.addEventListener("submit",function(event){
    event.preventDefault()
    countryInput = countrySearch.children[0].value.toUpperCase();
    var countryCasesUrl = `${baseURL}${countryInput}?yesterday=false&twoDaysAgo=false&strict=true&allowNull=true`
    fetch(countryCasesUrl).then(function (response3) {
        return response3.json();
    }).then(function (countryData) {
        getCountryCases(countryData, countryInput);
        getCountryNews(countryInput);
    }).catch(error => {
        alert("Enter a valid country name");
    });
});

function getCountryCases(countryData){
    var countryCases = countryData.cases;
    var countryDeaths = countryData.deaths;
    var countryRecovered = countryData.recovered;
    
    totalInfectedCountry.textContent = countryCases.toLocaleString("en-US");
    totalDeathsCountry.textContent = countryDeaths.toLocaleString("en-US");
    totalRecoveredCountry.textContent = countryRecovered.toLocaleString("en-US");

    var countryTodayCases = countryData.todayCases;
    var countryTodayDeaths = countryData.todayDeaths;
    var countryTodayRecovered = countryData.todayRecovered;

    if (countryTodayCases === null){
        todayInfectedCountry.textContent = "Not Reported"
    } else {
        todayInfectedCountry.textContent = countryTodayCases.toLocaleString("en-US");
    }

    if (countryTodayDeaths === null){
        todayDeathsCountry.textContent = "Not Reported"
    } else {
        todayDeathsCountry.textContent = countryTodayDeaths.toLocaleString("en-US");
    }

    if (countryTodayRecovered === null){
        todayRecoveredCountry.textContent = "Not Reported"
    } else {
        todayRecoveredCountry.textContent = countryTodayRecovered.toLocaleString("en-US");
    }

    searchedCountryName.innerHTML = countryInput;
}

function getCountryNews(countryInput){
    var covidNewsUrl = `${newsURL}${countryInput}&api-key=962e64d3-a7ad-4bb9-8881-a000ce805d15`;
    fetch(covidNewsUrl).then(function (response) {
      return response.json();
    }).then(function (newsData) {
        insertCovidNews(newsData);
    }).catch(error => {
        alert(error);
    });
}

function insertCovidNews(newsData){
    var aElement = "";
    newsHolder.innerHTML = "";
    for (var i = 0; i < newsData.response.results.length - 1; i++){
        var date = newsData.response.results[i].webTitle + newsData.response.results[i].webPublicationDate;
        var title = newsData.response.results[i].webTitle;
        var newsUrl = newsData.response.results[i].webUrl;
        aElement += `
            <a class="button round secondary column large-3 margin-horizontal-1" target="_blank" href="${newsUrl}">
                ${title}
                <div>${date}</div>
            </a>
        `
    }
    newsHolder.innerHTML = aElement;
}

retrieveGlobalCases()