// Foursquare API Info
const clientId = 'PVI50PROWXJ442YPTULKSX5EKRL115D5WO5GA2MYDGMQMVRP';
const clientSecret = 'O434BHXK5DP0LLRFAKSP4M4BDET13ULYONTQSZT0KVGNMTWK';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '6e0c19ca46a648d4b7223418182407';
const forecastUrl = 'http://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async() => {
  const city=$input.val();
  const urlToFetch=url+city+'&limit=10&client_id='+clientId+'client_secret='+clientSecret+'&v=20180723';
  try{
    const response=await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse=await response.json();
      const venues=jsonResponse.response.groups[0].items.map(item=>item.venue);
      return venues;
      
    }
  }catch(error){
console.log(error)
  }

}

const getForecast =async () => {
  const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11';
  try{
    const response=await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse=await response.json();
      const days=jsonResponse.forecast.forecastday;
      return days;
    }
    
  }catch(error){
    console.log(error);
  }

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

    let venueContent = createVenueHTML(venue.name,venue.location,venuImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    const currentDay=days[index];
    const venue=venues[index];
    const venuIcon=venu.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;

    // Add your code here:


    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues=>renderVenues(venues));
  getForecast().then(forecast=>renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
