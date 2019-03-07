


let capture;
let submitButton;
let locationData;

let formData = {};


function setup() {

    createCanvas(200, 200).parent("#mySketch");
    capture = createCapture(VIDEO);
    capture.hide()
    capture.size(width, height);
    imageMode(CENTER);

    getCurrentPosition(onLocationReady);
    getCurrentDate();
    getCurrentTime();
    getCurrentWeather();

    pixelDensity(0.5);

    submitButton = select("#captureButton");
    submitButton.mousePressed(handleSubmit);



}

function draw() {
    background(220);
    image(capture, width / 2, height / 2, width * 1.3, height)
}


function handleSubmit(e) {


    getHabits();

    const last_img = get();
    formData.image = last_img.canvas.toDataURL();

    console.log(last_img);

    postEntryToServer();

    // httpPost("/api", output, (result) =>{
    //     // console.log(result);
    //     console.log("success")
    // });
}



function postEntryToServer() {


    console.log(JSON.stringify(formData, null, null));

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(formData)
    }
    fetch(`/entries`, options).then(result => {

        console.log('entry submitted');
        window.location.href = '/visualize/index.html';
    })

}




function onLocationReady(position) {
    locationData = position;
    console.log(position.latitude);
    console.log(position.longitude);
    console.log(nfc(position.latitude, 4))
    console.log(nfc(position.longitude, 4))

    const city = `${nfc(position.latitude, 4)} , ${nfc(position.longitude, 4)}`;
    select("#form-city").html(city);
    formData.city = city;


}

function getCurrentDate() {

    const date = moment().format('MMMM Do YYYY');
    // console.log(date);
    select("#form-date").html(date);
    formData.date = date;

}


function getCurrentTime() {

    const today = new Date();
    const time = formatAMPM(today);
    select("#form-time").html(time);

    formData.time = time;

    // console.log(time);

}

function getCurrentWeather() {

    loadJSON('/weather', (result) => {

        console.log(JSON.stringify(result, null, null));
        let temp = `${result.temperature} ˚C`;
        select("#form-weather").html(temp);

        formData.temperature = temp;

    });

}


function getHabits() {


    let wakeup = select("#input-wakeup");
    let meditate = select("#input-meditate");
    let workout = select("#input-workout");
    let breakfast = select("#input-breakfast");
    let dontRush = select("#input-dontRush");

    formData.wakeup = wakeup.checked();
    formData.meditate = meditate.checked();
    formData.workout = workout.checked();
    formData.breakfast = breakfast.checked();
    formData.dontRush = dontRush.checked();


    let points = 0;
    if (formData.wakeup) points++;
    if (formData.meditate) points++;
    if (formData.workout) points++;
    if (formData.breakfast) points++;
    if (formData.dontRush) points++;


    formData.points = points;

}


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

console.log(formatAMPM(new Date));
