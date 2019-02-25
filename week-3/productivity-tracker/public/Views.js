class Views {

    constructor() {

        this.loginView = `<main class="login-container">
        <section>
          <h1>Productivity Tracker</h1>
          <p>What is the best to work at ITP?</p>
        </section>
  
        <section>
          <h2>Log in or sign up</h2>
  
          <form class="form">
            <fieldset>
              Email<br>
              <input type="email" class="block" name="email" placeholder="Email">
            </fieldset>
  
            <fieldset>
              Password <br>
              <input type="password" class="block" name="password" placeholder="Password">
            </fieldset>
  
            <button type="button" id="login" class="">
              Log In
            </button>
  
            <button type="button" id="signup" class="">
              Sign Up
            </button>
          </form>
        </section>
      </main>`;


        this.visView = `<main>
        <header>
          <h1>Productivity Tracker <i class="btn material-icons" id="admin">add</i> <i id="logout"
              class="btn material-icons">close</i></h1>
          <p>This is a series of productivity visualization based on seating position at the ITP floor</p>
        </header>
        <section class="grid-container" id="vis-grid"></section>
      </main>`;

        this.adminView = `<main>
        <header>
          <h1>ProductivityTracker</h1>
          <p>Log your work session here</p>
          <i id='back-arrow' class="material-icons">arrow_back</i>
        </header>
  
        <section class='' id="myControls">
  
          <form id="sessionForm" onsubmit="submitSession()" method="post">
            <fieldset>
              <legend>Work session</legend>
              <select id='sitting-area' name="sitting-area" size="6">
                <option value="Lobby">Lobby</option>
                <option value="J Area">J Area</option>
                <option value="Shop">Shop</option>
                <option value="Lounge">Kitchen Lounge</option>
                <option value="IMA L.">IMA Lounge</option>
                <option value="Classroom">Classroom</option>
              </select>
            </fieldset>
  
            <fieldset>
              <legend>Intended amount of work to do</legend>
              <input type="range" id="intended-work-input" name="intended-work-input" min="1" max="10">
              <span id="intended-work-input-label"></span>
            </fieldset>
  
            <fieldset>
              <legend><b>Real </b>amount of work done</legend>
              <input type="range" id="real-work-input" name="real-work-input" min="1" max="10">
              <span id="real-work-input-label"></span>
            </fieldset>
  
  
            <fieldset>
              <legend>Number of internal interruptions</legend>
              <input type="range" id="internal-interruptions-input" name="internal-interruptions-input" min="1" max="10">
              <span id="internal-interruptions-input-label"></span>
            </fieldset>
  
            <fieldset>
              <legend>Number of external interruptions</legend>
              <input type="range" id="external-interruptions-input" name="external-interruptions-input" min="1" max="10">
              <span id="external-interruptions-input-label"></span>
            </fieldset>
  
            <fieldset>
              <legend>Satisfied with work session?</legend>
                <input type="radio" id="satisfaction-no-input" name="satisfaction">
                <label for="satisfaction-no-input">No</label>
                <input type="radio" id="satisfaction-meh-input" name="satisfaction">
                <label for="satisfaction-meh-input">Meh</label>
                <input type="radio" id="satisfaction-yes-input" name="satisfaction">
                <label for="satisfaction-yes-input">Yes!</label>
              
            </fieldset>
          </form>
          <button id="submit-input">Submit! 🚀</button>
        </section>
      </main>
  `;


    }


}