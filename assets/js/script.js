

function getApi() {

  var covidNewsUrl = `https://content.guardianapis.com/search?q=covid&api-key=962e64d3-a7ad-4bb9-8881-a000ce805d15`;

 
  fetch(covidNewsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (newsData) {
      // sanity check
      console.log(newsData)
      localStorage.setItem("newsData", JSON.stringify(newsData));
    });

 var countryCasesUrl = `https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=true`;

   fetch(countryCasesUrl)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (globalData) {
      // sanity check
      console.log(globalData)
      localStorage.setItem("globalData", JSON.stringify(globalData));
    });

 var countryCasesUrl = `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true`;

   fetch(countryCasesUrl)
    .then(function (response3) {
      return response3.json();
    })
    .then(function (countryData) {
      // sanity check
      console.log(countryData)
      localStorage.setItem("countryData", JSON.stringify(countryData));
    });


    };
    
    

getApi()