class App {

    constructor(_views) {
        this.views = _views;
        this.setup = this.setup.bind(this);
        this.submitSession = this.submitSession.bind(this);

    }

    async showVis() {

        select("#app").elt.innerHTML = this.views.visView;

        let dataSessions = await client.service('sessions').find({
            query: {
                $sort: { createdAt: -1 },
                $limit: false
            }
        });

        this.createDataSessions(dataSessions);

    }

    createDataSessions(_dataSessions) {
        _dataSessions.data.forEach((item, idx) => {
            let newSketch = new Session(item);
            let newDiv = createDiv();
            let divId = `vis-${idx}`;
            newDiv.parent('vis-grid');
            newDiv.class('grid-item');
            newDiv.elt.id = divId;
            newDiv.elt.innerHTML = `<small style="font-size:9px">${item.createdAt}</small>`;
            new p5(newSketch.render, divId);
        });
    }

    async showAdmin() {
        select("#app").elt.innerHTML = this.views.adminView;

        const areas = select("#sitting-area");
        const area = areas.value;

        const intendedWorkInput = select("#intended-work-input");
        const realWorkInput = select("#real-work-input");

        const internalInterruptions = select("#internal-interruptions-input");
        const externalInterruptions = select("#external-interruptions-input");

        const successNoInput = select("#satisfaction-no-input");
        const successMehInput = select("#satisfaction-meh-input");
        const successYesInput = select("#satisfaction-yes-input");

        const submitBt = select("#submit-input");

        submitBt.mousePressed(this.submitSession);

        const rangeInputs = [intendedWorkInput, realWorkInput, internalInterruptions, externalInterruptions];
        rangeInputs.forEach(i => {

            let label = select(`#${i.elt.id}-label`);
            label.elt.innerHTML = i.elt.value;

            i.changed(function (e) {
                label.elt.innerHTML = i.elt.value;
            });

        });



    }

    async showLogin() {

        if (selectAll(".login").length) {
            select(".heading").elt.insertAdjacentHTML('beforeend', `<p>There was an error: ${error.message}</p>`);
        } else {
            select("#app").elt.innerHTML = this.views.loginView;
        }
    }


    getCredentials() {
        const user = {
            email: document.querySelector('[name="email"]').value,
            password: document.querySelector('[name=password]').value

        }


        console.log("Credentials: ", JSON.stringify(user, null, null));
        return user;
    }


    async submitSession(e) {

        try {
            console.log("Submitting");
            const form = new FormData(document.querySelector("#sessionForm"));
            const payload = {
                sittingArea: form.get("sitting-area"),
                intendedAmountOfWork: form.get('intended-work-input'),
                realAmountOfWork: form.get('real-work-input'),
                internalInterruptions: form.get('internal-interruptions-input'),
                externalInterruptions: form.get('external-interruptions-input'),
                result: this.getRadioResultValue()
            }

            console.log(JSON.stringify(payload, null, null));

            await client.authenticate();
            let newData = await client.service('sessions').create(payload);
            await this.showVis();

        } catch (error) {
            console.log(error);
            return error;
        }



    }



    async login(credentials) {


        console.log("login");

        try {

            if (!credentials) {
                await client.authenticate();
            } else {
                const payload = Object.assign({
                    strategy: 'local'
                }, credentials);
                await client.authenticate(payload);
            }

            this.showVis();

        } catch (error) {
            console.log("Creds : " + credentials);
            this.showLogin(error);
        }

    }


    async signup(credentials) {

        try {
            await client.service('users').create(credentials, {
                headers: {
                    'X-Requested-With': 'FeathersJS'
                }
            });
            console.log("Successfully added new user");
        } catch (error) {
            console.log("Error adding new user");
            console.log(error);
            this.showLogin(error);
        }


    }

    setup() {

        document.addEventListener('click', async e => {

            switch (e.target.id) {
                case 'signup': {
                    const user = this.getCredentials();
                    await this.signup(user);
                    await this.login(user);

                    break;
                }
                case 'login': {

                    const user = this.getCredentials();
                    await this.login(user);
                    break;
                }//blocks to scope the user var?

                case 'logout':

                    await client.logout();
                    select("#app").elt.innerHTML = views.loginView;

                    break;

                case 'admin':

                    await this.showAdmin();

                    break;

                case 'submitSession':

                    await this.submitSession();

                    break;

                case 'vis':

                    await client.authenticate();
                    await this.showVis();
                    break;

                case 'back-arrow':
                    await this.showVis();
                    break;


            }

        })



    }


    getRadioResultValue() {
        const radios = [select("#satisfaction-no-input"), select("#satisfaction-meh-input"), select("#satisfaction-yes-input")];
        let id = "no-radio-found";
        radios.forEach(r => {
            console.log(r);
            if (r.elt.checked) {
                console.log("ESTA CHECKED");

                id = r.elt.id;
                console.log(id);


            }
        });
        console.log("estoy fuera del loop-> " + id);
        id = id.split('-')[1];
        console.log("valor final_>>> " + id);
        return id;
    }

}