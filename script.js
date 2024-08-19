// Write your JavaScript code here!





window.addEventListener("load", function () {

    console.log("Window load...");



    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();                      // 'listedPlanetsResponse' is a Promise
    console.log("listedPlanets: After fetch() ");

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

        // pickPlanet(planets) {};

        let pickedPlanet =  pickPlanet(listedPlanets);
        console.log("Picked Planet is... ", pickedPlanet);


        // addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {};
        addDestinationInfo(document, pickedPlanet.name, pickedPlanet.diameter, pickedPlanet.star, pickedPlanet.distance, pickedPlanet.moons, pickedPlanet.image);


    })

    console.log("After Window load... div Container");

    alert("Please enter values for all fields.");

    let divContainer = document.getElementById("launchForm");
    divContainer.addEventListener("submit", function (event) {
        let pilotNameEntered = document.querySelector("input[name='pilotName']");
        let coPilotNameEntered = document.querySelector("input[name='copilotName']");
        let fuelLevelEntered = document.querySelector("input[name='fuelLevel']");
        let cargoMassEntered = document.querySelector("input[name='cargoMass']");

        console.log("Pilot Name", pilotNameEntered.value);
        console.log("Co-Pilot Name", coPilotNameEntered.value);
        console.log("Fuel Level", fuelLevelEntered.value);
        console.log("Cargo Mass", cargoMassEntered.value);


        let divFaultyItems = document.getElementById("faultyItems");                        // 'Faulty Items' Div container 

        formSubmission(document, divFaultyItems, pilotNameEntered.value, coPilotNameEntered.value, fuelLevelEntered.value, cargoMassEntered.value)

        // Preventing form submission
        console.log("preventDefault()");
        event.preventDefault();

    });

});