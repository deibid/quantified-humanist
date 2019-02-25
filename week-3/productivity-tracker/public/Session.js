class Session {


    constructor(_data) {
        this.sittingArea = _data.sittingArea;
        this.intendedWork = _data.intendedWork;
        this.realWork = _data.realWork;
        this.externalInterruptions = _data.externalInterruptions;
        this.internalInterruptions = _data.internalInterruptions;
        this.result = _data.result;

        this.data = _data;
        this.render = this.render.bind(this);

        this.background = {
            no: "#F8BBD0",
            meh: "#CFD8DC",
            yes: "#B2DFDB"
        };

    }

    render(sketch) {

        const s = sketch;
        const w = 250;
        const h = 250;
        const data = this.data;
        const rectBase = 30;
        const scaleFactor = 8;
        const hScaleFactor = 6;
        const rectHeight = 30;


        s.setup = function () {
            s.createCanvas(w, h);
            s.noLoop();
        }

        s.draw = function () {

            console.log("Data:  " + JSON.stringify(data));

            let color = s.getBackgroundColor(data);
            console.log("Color: " + color);
            s.background(color);
            s.push();

            s.translate(s.width / 2, s.height / 2);



            s.rectMode(CORNERS);
            s.noStroke();
            s.rect((-s.width / 3) - rectBase / 2, -data.intendedAmountOfWork * scaleFactor, (-s.width / 3) + rectBase / 2, 0);

            s.pop();
            s.fill(0, 0, 0);
            s.translate(s.width / 2, s.height / 2);
            s.rectMode(CORNERS);
            s.noStroke();
            s.rect((s.width / 3) - rectBase / 2, -data.intendedAmountOfWork * scaleFactor, (s.width / 3) + rectBase / 2, 0);
            s.push();



            s.fill("#313E52");
            s.noStroke();
            s.rect(-data.externalInterruptions * hScaleFactor, -rectHeight, 0, 0);
            s.fill("#282B37");
            s.rect(data.internalInterruptions * hScaleFactor, -rectHeight, 0, 0);
            // s.rect(-10, -10, 0, 0);

            s.textSize(26);
            let textWidth = s.textWidth(data.sittingArea);
            s.translate(-textWidth / 2, 50);
            s.text(data.sittingArea, 0, 0);




        }

        s.getBackgroundColor = function (d) {

            let color;
            switch (d.result) {
                case 'no':
                    color = "#F8BBD0";
                    break;

                case 'meh':
                    color = "#CFD8DC";
                    break;

                case 'yes':

                    color = "#B2DFDB";
                    break;
            }
            return color;

        }

    }


    getBackgroundColor() {

        let color;

        switch (this.result) {
            case 'no':
                color = this.background.no;
                break;

            case 'meh':
                color = this.background.meh;
                break;

            case 'yes':
                color = this.background.yes;
                break;
        }

        return color;

    }





}