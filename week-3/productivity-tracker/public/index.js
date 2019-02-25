let views;
let app;


function setup() {

    console.log("setup");
    noCanvas();
    noLoop();


    views = new Views();
    app = new App(views);
    app.setup();



}


function draw() {

    app.login();

}


