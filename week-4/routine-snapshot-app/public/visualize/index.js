let data;
let $entries;




function preload() {

    loadJSON("/entries", (result) => {
        data = result;
    });

}
function setup() {
    noCanvas();
    noLoop();

    $entries = select("#viz-grid");
    // console.log($entries);

}

function draw() {
    renderEntries();
}



function renderEntries() {



    data.forEach((item, idx) => {
        // let item = data[p];
        // console.log(JSON.stringify(item));
        // console.log(`rendering view: ${JSON.stringify(item, null, null)}`);
        let view = getEntryView(item, idx);
        // console.log(view);
        $entries.elt.innerHTML += view;
    });


    // for (p in data) {

    //     // console.log("P " + p);

    //     let item = data[p];
    //     console.log(JSON.stringify(item));
    //     console.log(`rendering view: ${JSON.stringify(item, null, null)}`);
    //     let view = getEntryView(item, p);
    //     console.log(view);
    //     $entries.elt.innerHTML += view;

    // }



}


function getEntryView(item, index) {

    const image = `<img class="data-image-container" src="${item.image}">`;

    const wakeupClass = (item.wakeup) ? 'habit-done' : 'habit-missed';
    const meditateClass = (item.meditate) ? 'habit-done' : 'habit-missed';
    const breakfastClass = (item.breakfast) ? 'habit-done' : 'habit-missed';
    const workoutClass = (item.workout) ? 'habit-done' : 'habit-missed';
    const dontRushClass = (item.dontRush) ? 'habit-done' : 'habit-missed';
    const verticalPosition = (index % 2 === 0) ? '' : 'data-block-bottom';

    let html = `<div class="data-block ${verticalPosition}">
    <div class="data-image-container">${image}</div>
    <div class="data-information-container">
        <p class="data-value" id="data-temp">${item.temperature}</p>
        <p class="data-value" id="data-points">${item.points}</p>
        <p class="data-value" id="data-city">${item.city}</p>
        <p class="data-value" id="data-date">${item.date}</p>
        <p class="data-value" id="data-time">${item.time}</p>
        <div class="data-habit-container">
            <p class="data-habit ${wakeupClass}" id="habit-wakeup">W</p>
            <p class="data-habit ${meditateClass}" id="habit-meditate">M</p>
            <p class="data-habit ${breakfastClass}" id="habit-breakfast">B</p>
            <p class="data-habit ${workoutClass}" id="habit-workout">K</p>
            <p class="data-habit ${dontRushClass}" id="habit-dont-rush">R</p>
        </div>
    </div>
    
</div>`;

    return html;


}

