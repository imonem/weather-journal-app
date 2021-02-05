/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
//added +1 to .getMonth as it counts starting from 0 for Jan
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//URL and query elements
//add units=metric for degrees Celcius or units=imperial for Fahrenheit or remove for Kelvins [todo add options to UI]
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
let zip = '';

//My openweathermap API key
const apiKey = '&appid=2601297e1f1af656fbf077358d94f808';

//event listener callback fn
document.getElementById('generate').addEventListener('click', weatherUpdate);

function weatherUpdate(e) {
    //get zip code from html #zip element
    let newZip = document.getElementById('zip').value;
    //pass zip along with baseURL and apiKey to the main hero fn
    weatherApiCall(baseURL, newZip, apiKey);
}


/**Helper functions */

//main hero fn, gets weather from dynamically created url then calls postToServer() to post data to server endpoint, then calls the updateRecentEntryHolder() fn to update HTML
const weatherApiCall = async (baseURL, zip, key) => {
    //fetch the openweathermap data from dynamic URL
    const res = await fetch(baseURL + zip + key);
    //try/catch block that awaits data from openweathermap then fetches temp key value asynchronously then gets feelings then updates the html most recent entry holder
    try {
        const data = await res.json();
        //Once data is received from openweathermap.org, assign the temperature value to newTemp using .notation
        let newTemp = await data.main.temp;
        let newFeelings = await document.getElementById('feelings').value;
        //posting data from openweathermap to server end point
        await postToServer('/updateprojectdata', {
            date: newDate,
            temperature: newTemp,
            feelings: newFeelings
        });
        // console.log(`${newDate}, ${newTemp}, ${newFeelings}`);
    } catch (error) {
        // console.log the error if any
        console.log("error", error);
    }
    //Call update entry to update HTML
    updateRecentEntryHolder();
};

// asynchronous function to post the data to the server endpoint
const postToServer = async (url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//updating the UI after all data is saved on server endpoint
const updateRecentEntryHolder = async () => {
    const request = await fetch('/getdatafromserver');
    try {
        const readyData = await request.json();
        console.log(readyData);
        document.getElementById('date').innerHTML = readyData.date;
        document.getElementById('temp').innerHTML = readyData.temp;
        document.getElementById('content').innerHTML = readyData.feelings;
    } catch (error) {
        console.log("Error", error);
    }
};
