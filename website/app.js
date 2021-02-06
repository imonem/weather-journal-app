/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
//added +1 to .getMonth as it counts starting from 0 for Jan
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//URL and query elements
//add units=metric for degrees Celcius or units=imperial for Fahrenheit or remove for Kelvins [todo add options to UI]
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
let zip = '';

//My openweathermap API key
const apiKey = '2601297e1f1af656fbf077358d94f808';

//event listener and callback fn
document.getElementById('generate').addEventListener('click', weatherUpdate);

function weatherUpdate(e) {
    let newZip = document.getElementById('zip').value;
    let newFeelings = document.getElementById('feelings').value;
    weatherApiCall(baseURL, newZip, apiKey)
        .then((data) => {
            postToServer('/updateprojectdata', {
                date: newDate,
                temp: data.data.main.temp,
                feelings: newFeelings
            });
        })
        .then(() => {
            updateRecentEntryHolder();
        });
}


/**Helper functions */

//main hero fn, gets weather from dynamically created url then calls postToServer() to post data to server endpoint, then calls the updateRecentEntryHolder() fn to update HTML

// Using Axios
const weatherApiCall = async (url, zip, key) => {
    const res = await axios.get(url, {
        method: 'get',
        params: {
            zip: zip,
            units: 'metric',
            appid: key
        }
    });
    try {
        const data = await res; //res is already a JavaScript Object so using .json() method does not work
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// asynchronous function to post the data to the server endpoint
// Using Axios
const postToServer = async (url = '', data) => {
    const response = await axios.post(url, data);
    try {
        const newData = await response;
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//updating the UI after all data is saved on server endpoint using Axios.get
const updateRecentEntryHolder = async () => {
    const request = await axios.get('/getdatafromserver');
    try {
        const readyData = await request;
        document.getElementById('date').innerHTML = `Today is ${readyData.data.date}`;
        document.getElementById('temp').innerHTML = `Temperature is currently ${readyData.data.temp} &#176;C`;
        document.getElementById('content').innerHTML = `You are feeling ${readyData.data.feelings}`;
    } catch (error) {
        console.log("Error", error);
    }
};