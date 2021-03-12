(async () => {

    const $ = (selector) => document.querySelector(selector);
    const createElement = (tagName) => document.createElement(tagName);

    const fetchPlanets = async (page = 1) => {
        console.log(`Carregando planetas...`);
        const responseAsStream = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
        const response = await responseAsStream.json();
        console.log(`Base de planetas atualizada!`);
        return response;
    }

    const response = await fetchPlanets();
    
    console.log(response);
    
    const planets = Adapter.adapt(
        Planet, 
        (model) => response.results.map(planet => model.adapt(planet))
    );
    
    const planetsTableBody = $('#planets-table-tbody-js');
    planetsTableBody.innerHTML = '';
    const planetsListSize = planets.length;

    for (let i = 0; i < planetsListSize; i++) {
        const {
            name,
            terrain,
            climate,
            population
        } = planets[i];

        const tr = createElement('tr');

        const thNumber = createElement('th');
        thNumber.innerText = i + 1;

        const thName = createElement('th');
        thName.innerText = name;

        const thTerrain = createElement('th');
        thTerrain.innerText = terrain;

        const thClimate = createElement('th');
        thClimate.innerText = climate

        const thPopulation = createElement('th');
        thPopulation.innerText = population;

        tr.appendChild(thNumber);
        tr.appendChild(thName);
        tr.appendChild(thTerrain);
        tr.appendChild(thClimate);
        tr.appendChild(thPopulation);

        planetsTableBody.appendChild(tr);
    }

    planets.forEach(planet => {
        console.log(`Planeta: ${planet.name} - Quantidade de residentes: ${planet.countResidents()}`)
    });

})();