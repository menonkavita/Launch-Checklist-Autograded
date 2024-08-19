// Write your helper functions here!

require('cross-fetch/polyfill');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.

    console.log("Image URL", imageUrl);

    let divPlanet= document.getElementById("missionTarget");
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
        //alert("String is empty.")
        return `Empty`;
    }
    else if (isNaN(testInput)) {
        //alert(testInput, " is not a number.")
        return `Not a Number`;
    }
    else {
        //alert(testInput, "is a number.")
        return `Is a Number`;
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    console.log("Form Submission");
    console.log(document, list, pilot, copilot, fuelLevel, cargoLevel);

    // Created an object to store all input values from textboxes
    let textBoxValues = {};
    textBoxValues["pilotNameEntered"] = pilot;
    textBoxValues["coPilotNameEntered"] = copilot;
    textBoxValues["fuelLevelEntered"] = fuelLevel;
    textBoxValues["cargoMassEntered"] = cargoLevel;


    //let divFaultyItems = document.getElementById("faultyItems");                           // 'Faulty Items' Div container 
    let launchStatusHeader = document.getElementById("launchStatus");                       // 'launchStatus' H2 in 'Faulty Items' Div container 
    let shuttleFuelStatus = "";                                                             // Ready to launch or not Ready to launch
    let shuttleCargoStatus = "";                                                            // Ready to launch or not Ready to launch        

    // Checking if textboxes have text in them
    // Validate Input() - returns "Empty", "Not a Number", or "Is a Number" as appropriate.
    for (item in textBoxValues) {
        if (validateInput(textBoxValues[item]) === "Empty") {
            console.log(item, "is missing");
            alert("Some values are missing. Please fill out all fields and submit.")
            break;

        }
        else if (validateInput(textBoxValues[item]) === "Not a Number") {
            /* The list of shuttle requirements, the div with the id faultyItems, should be updated if something is not ready 
            for launch. Using template literals, update the li elements pilotStatus and copilotStatus to include the pilot’s name 
            and the co-pilot’s name. */

            console.log(textBoxValues[item], "is not a number");

            document.getElementById("pilotStatus").innerHTML = `Pilot Chris is ready for launch`;
            console.log("Div Pilot List item - Pilot Status", document.getElementById("pilotStatus").innerHTML);

            document.getElementById("copilotStatus").innerHTML = `Co-pilot Bob is ready for launch`;
            console.log("Div Co-Pilot List item - Co-Pilot Status ", document.getElementById("copilotStatus").innerHTML);

        }
        else if (validateInput(textBoxValues[item]) === "Is a Number") {
            console.log(textBoxValues[item], "is a number");

            /* If the user submits a fuel level that is too low (less than 10,000 liters), change faultyItems to visible with an updated fuel 
            status stating that there is not enough fuel for the journey. The text of the h2 element, launchStatus, should also change 
            to “Shuttle not ready for launch” and the color should change to red. */

            if (textBoxValues.fuelLevelEntered < 10000) {

                // If Fuel Level is not in range, innerHTML of h2 should change to 'Shuttle Not Ready for Launch'.
                document.getElementById("fuelStatus").innerHTML = 'Fuel level too low for launch';
                shuttleFuelStatus = "red";                                                        // Shuttle not ready to launch
            }
            else {
                /* If the shuttle is ready to launch, change the text of launchStatus to green and display “Shuttle is ready for launch”. */
                document.getElementById("fuelStatus").innerHTML = 'Fuel level high enough for launch';

                launchStatusHeader.innerHTML = `Shuttle is Ready for Launch`;             // H2 Status Header
                launchStatusHeader.style.color = "green";                                 // Set color of H2 Status Header to green

                shuttleFuelStatus = "green";                                                     // Shuttle ready to launch
            }

            /*If the user submits a cargo mass that is too large (more than 10,000 kilograms), change the list to visible with an updated 
              cargo status stating that there is too much mass for the shuttle to take off. The text of launchStatus should also change to 
             “Shuttle not ready for launch” and the color should change to red. */

            if (textBoxValues.cargoMassEntered > 10000) {


                /* 3 d. Is the header message red and does it read 'Shuttle Not Ready for Launch' when either fuel or cargo are 
                        not in range?
                   3 e. Is the header message green and does it read 'Shuttle is Ready for Launch' when both fuel and cargo are
                        submitted in range?  */

                document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
                shuttleCargoStatus = "red";                                                        // Shuttle not ready to launch
            }
            else {
                /* If the shuttle is ready to launch, change the text of launchStatus to green and display “Shuttle is ready for launch”. */
                document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;

                launchStatusHeader.innerHTML = `Shuttle is Ready for Launch`;                       // H2 Status Header
                launchStatusHeader.style.color = "green";                                           // Set color of H2 Status Header to green
                shuttleCargoStatus = "green";                                                       // Shuttle ready to launch
            }
        }
    }

    // If either fuel is low or cargo mass is over limit, then shuttle launch fail.
    if (shuttleFuelStatus === "red" || shuttleCargoStatus === "red") {
        list.style.visibility = 'visible';
        launchStatusHeader.innerHTML = `Shuttle Not Ready for Launch`;                              // H2 Status Header
        launchStatusHeader.style.color = "red";                                                     // Set color of H2 Status Header to red
    }
    else if (shuttleFuelStatus === "green" || shuttleCargoStatus === "green") {
        list.style.visibility = 'visible';
    }


} // end of function formSubmission()

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        // response.json().then(function (json) {
        //     console.log("Printing json... ", json)
        //     return json;
        // });

        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet;
    console.log("Planets ... ", planets);

    let randNumber = Math.floor(Math.random() * 6);
    console.log("Random Number generated is ", randNumber);

    planet=planets[randNumber];
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