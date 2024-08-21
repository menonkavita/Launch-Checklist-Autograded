// Write your helper functions here!

require('cross-fetch/polyfill');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.

    console.log("Image URL", imageUrl);

    let divPlanet = document.getElementById("missionTarget");
    divPlanet.innerHTML =
        `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src=${imageUrl}></img>`
}

function validateInput(testInput) {
    /* validateInput() should take in a string as a parameter and return "Empty", "Not a Number", or 
    "Is a Number" as appropriate. In scriptHelper.js, you will use validateInput() to complete the formSubmission() function.
    */
    console.log("Validating Input...");

    if (testInput === "") {
        return `Empty`;
    }
    else if (isNaN(testInput)) {
        return `Not a Number`;
    }
    else {
        return `Is a Number`;
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    console.log("Form Submission");
    console.log(document, list, pilot, copilot, fuelLevel, cargoLevel);

    //let divFaultyItems = document.getElementById("faultyItems");                           // 'Faulty Items' Div container 
    let launchStatusHeader = document.getElementById("launchStatus");                       // 'launchStatus' H2 in 'Faulty Items' Div container 
    let shuttleFuelStatus = "";                                                             // Ready to launch or not Ready to launch
    let shuttleCargoStatus = "";                                                            // Ready to launch or not Ready to launch        


    // Checking if textboxes have text in them
    // Validate Input() - returns "Empty", "Not a Number", or "Is a Number" as appropriate.

    /* The list of shuttle requirements, the div with the id faultyItems, should be updated if something is not ready for launch. 
    Using template literals, update the li elements pilotStatus and copilotStatus to include the pilot’s name and the co-pilot’s name. */


    // Validate Pilot Textbox
    if (validateInput(pilot) === "Empty") {
        alert("Value for Pilot is empty. Please fill out all fields before submitting.");
        return "Empty";
    }
    else if (validateInput(pilot) === "Is a Number") {
        alert("Please enter correct values for Pilot.");
        return "Is a Number";
    }
    else if (validateInput(pilot) === "Not a Number") {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        console.log("Div Pilot List item - Pilot Status", document.getElementById("pilotStatus").innerHTML);
    }


    // Validate Co-Pilot Textbox
    if (validateInput(copilot) === "Empty") {
        alert("Value for Co-Pilot is empty. Please fill out all fields before submitting.");
        return "Empty";
    }
    else if (validateInput(copilot) === "Is a Number") {
        alert("Please enter correct values for the Co-Pilot.");
        return "Is a Number";
    }
    else if (validateInput(copilot) === "Not a Number") {
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
        console.log("Div Co-Pilot List item - Co-Pilot Status ", document.getElementById("copilotStatus").innerHTML);
    }



    /* If the user submits a fuel level that is too low (less than 10,000 liters), change faultyItems to visible with an updated fuel 
        status stating that there is not enough fuel for the journey. The text of the h2 element, launchStatus, should also change 
        to “Shuttle not ready for launch” and the color should change to red. 
        Set 'Fuel status' based on check */


    // Validate Fuel Level Textbox
    if (validateInput(fuelLevel) === "Empty") {
        alert("Value for Fuel is empty. Please fill out all fields before submitting.");
        return "Empty";
    }
    else if (validateInput(fuelLevel) === "Not a Number") {
        alert("Please enter a numeric value for Fuel.");
        return "Not a Number";
    }
    else if (validateInput(fuelLevel) === "Is a Number") {
        console.log(fuelLevel, "is a number");

        if (fuelLevel >= 0 && fuelLevel < 10000) {

            // If Fuel Level is not in range, innerHTML of h2 should change to 'Shuttle Not Ready for Launch'.
            document.getElementById("fuelStatus").innerHTML = 'Fuel level too low for launch';
            shuttleFuelStatus = "red";                                                        // Shuttle not ready to launch
        }
        else if (fuelLevel >= 10000){
            /* If the shuttle is ready to launch, set shuttleFuelStatus to green. */
            document.getElementById("fuelStatus").innerHTML = 'Fuel level high enough for launch';
            shuttleFuelStatus = "green";                                                     // Shuttle ready to launch
        }
        else{
            alert("Please enter a number above 0 for Fuel.");
            return "Is a Number";
        }
    }


    /*If the user submits a cargo mass that is too large (more than 10,000 kilograms), change the list to visible with an updated 
      cargo status stating that there is too much mass for the shuttle to take off. The text of launchStatus should also change to 
     “Shuttle not ready for launch” and the color should change to red. */
     

    // Validate Cargo Mass Level Textbox
    if (validateInput(cargoLevel) === "Empty") {
        alert("Value for Cargo Mass is empty. Please fill out all fields before submitting.");
        return "Empty";
    }
    else if (validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter a numeric value for Cargo Mass.");
        return "Not a Number";
    }
    else if (validateInput(cargoLevel) === "Is a Number") {
        console.log(cargoLevel, "is a number");

        if (cargoLevel > 10000) {
            console.log("Cargo Mass Entered by user... if... before setting cargo status", cargoLevel);

            /* 3d. Is the header message red and does it read 'Shuttle Not Ready for Launch' when either fuel or cargo are not in range?
               3e. Is the header message green and does it read 'Shuttle is Ready for Launch' when both fuel and cargo are submitted in range?  
                   Set 'Cargo status' based on check */

            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
            shuttleCargoStatus = "red";                                                        // Shuttle not ready to launch
        }
        else if (cargoLevel >= 0) {
            /* If the shuttle is ready to launch, change the text of launchStatus to green and display “Shuttle is ready for launch”. */
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
            console.log("Cargo Mass Entered by user... else... before setting cargo status", cargoLevel);

            shuttleCargoStatus = "green";                                                       // Shuttle ready to launch
        }
        else{
            alert("Please enter a number above 0 for Cargo Mass.");
            return "Is a Number";
        }
        console.log("Cargo status... after setting cargo status", shuttleCargoStatus);
    }


    // If either fuel is low or cargo mass is over limit, then shuttle launch fail.
    // Checking if either Fuel & Cargo statuses are 'red'

    if (shuttleFuelStatus === "red" || shuttleCargoStatus === "red") {
        console.log("Fuel Status(Red)", shuttleFuelStatus, "Cargo Status", shuttleCargoStatus);
        list.style.visibility = 'visible';
        launchStatusHeader.innerHTML = `Shuttle Not Ready for Launch`;                              // H2 Status Header
        launchStatusHeader.style.color = "red";                                                     // Set color of H2 Status Header to red
    }
    else if (shuttleFuelStatus === "green" && shuttleCargoStatus === "green") {         // Checking if both Fuel & Cargo statuses are 'green'
        console.log("Fuel Status(Green)", shuttleFuelStatus, "Cargo Status", shuttleCargoStatus);
        
        launchStatusHeader.innerHTML = `Shuttle is Ready for Launch`;             // H2 Status Header
        launchStatusHeader.style.color = "green";                                 // Set color of launchStatus H2 Status Header to green
        list.style.visibility = 'visible';                                        // and display “Shuttle is ready for launch”
    }
    
    return "OK";                                                        // takes back to script.js & preventDefault() to prevent form submission
} // end of function formSubmission()


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        // response.json().then(function (json) {
        //     console.log("Printing json... ", json)
        //     return json;
        // });

        return response.json();                                                         // returning response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet;
    console.log("Planets ... ", planets);

    let randNumber = Math.floor(Math.random() * 6);                               // Generating random number in the range up to 6 for 6 planets
    console.log("Random Number generated is ", randNumber);

    planet = planets[randNumber];
    console.log("Planet picked is ", planet)

    return planet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;

//  const _addDestinationInfo = addDestinationInfo;
// export { _addDestinationInfo as addDestinationInfo };
//  const _validateInput = validateInput;
// export { _validateInput as validateInput };
//  const _formSubmission = formSubmission;
// export { _formSubmission as formSubmission };
//  const _pickPlanet = pickPlanet;
// export { _pickPlanet as pickPlanet };
//  const _myFetch = myFetch;
// export { _myFetch as myFetch };