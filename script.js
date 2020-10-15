window.addEventListener("load", function() {
  let form = document.querySelector("form");
  let pilotName = document.querySelector("input[name=pilotName]");
  let copilotName = document.querySelector("input[name=copilotName]");
  let fuelLevel = document.querySelector("input[name=fuelLevel]");
  let cargoMass = document.querySelector("input[name=cargoMass]");
  const pilotStatus = document.getElementById("pilotStatus");
  const copilotStatus = document.getElementById("copilotStatus");
  const fuelStatus = document.getElementById("fuelStatus");
  const cargoStatus = document.getElementById("cargoStatus");
  const statusVisibility = document.getElementById("faultyItems");
  const launchStatus = document.getElementById("launchStatus");
  const missionTarget = document.getElementById("missionTarget");
  const index = Math.floor(Math.random() * 6);

  form.addEventListener("submit", function(event) {
    if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
      alert("All fields are required!");
      event.preventDefault();
    }
  });

  form.addEventListener("submit", function(event) {
    if (!isNaN(Number(pilotName.value)) || !isNaN(Number(copilotName.value))) {
      alert("Make sure to enter valid text to name fields.");
      event.preventDefault();
    }
  });

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    pilotStatus.innerHTML = `Pilot: ${pilotName.value} is ready for launch.`;
    copilotStatus.innerHTML = `Copilot: ${copilotName.value} is ready for launch.`;
    if (fuelLevel.value < 10000) {
      statusVisibility.style.visibility = 'visible';
      launchStatus.style.color = 'red';
      launchStatus.innerHTML = 'Shuttle not ready for launch.'
      fuelStatus.innerHTML = 'There is not enough fuel for your journey.'
    }
    if (cargoMass.value > 10000) {
      statusVisibility.style.visibility = "visible";
      launchStatus.style.color = "red";
      launchStatus.innerHTML = 'Shuttle not ready for launch.'
      cargoStatus.innerHTML = 'There is too much mass for the shuttle to take off.'
    }
    if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
      launchStatus.style.color = 'green';
      launchStatus.innerHTML = 'Shuttle is ready for launch!'
    }
  });

  let jsonResponse = [];
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
     response.json().then(function(jsonResponse){
       missionTarget.innerHTML =
       `<h2>Mission Destination</h2>
       <ol>
          <li>Name: ${jsonResponse[index].name}</li>
          <li>Diameter: ${jsonResponse[index].diameter}</li>
          <li>Star: ${jsonResponse[index].star}</li>
          <li>Distance from Earth: ${jsonResponse[index].distance}</li>
          <li>Number of Moons: ${jsonResponse[index].moons}</li>
       </ol>
       <img src="${jsonResponse[index].image}">
         `;
       });
     });
});
