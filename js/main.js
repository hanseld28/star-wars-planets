(async () => {

    const $ = (selector) => document.querySelector(selector);
    const createElement = (tagName) => document.createElement(tagName);

    const fetchPlanets = async (page = 1) => {
        const responseAsStream = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
        const response = await responseAsStream.json();
        console.log(`Base de planetas atualizada!`);
        return response;
    };

    const renderOnSubContainer = (child) => {
        const subContainer = $('#sub-container-js');
        subContainer.innerHTML = '';
        subContainer.appendChild(child);
    };

    const renderLoadingSpinner = () => {
        const spinnerAlign = createElement('div');
        spinnerAlign.classList.add('d-flex');
        spinnerAlign.classList.add('justify-content-center');

        const spinner = createElement('div');
        spinner.setAttribute('id', 'spinner-js');
        spinner.setAttribute('role', 'status');
        spinner.classList.add('spinner-border');
        spinner.classList.add('text-danger');
        
        const label = createElement('span');
        label.classList.add('sr-only');
        label.innerText = 'Carregando...';

        spinner.appendChild(label);
        spinnerAlign.appendChild(spinner);

        renderOnSubContainer(spinnerAlign);
    };

    const renderTable = (planets = []) => {
        const table = createElement('table');
        table.setAttribute('id', 'planets-table-js');
        table.classList.add('table');
        table.classList.add('table-bordered');
        table.classList.add('table-borderless');
        table.classList.add('table-hover');

        const setCollumnScopeAttributeFor = (th) => th.setAttribute('scope', 'col');

        const thead = createElement('thead');
        
        const trOfThead = createElement('tr');

        const thNumber = createElement('th');
        thNumber.innerText = '#';
        setCollumnScopeAttributeFor(thNumber);
        
        const thName = createElement('th');
        thName.innerText = 'Name';
        setCollumnScopeAttributeFor(thName);
        
        const thTerrain = createElement('th');
        thTerrain.innerText = 'Terrain';
        setCollumnScopeAttributeFor(thTerrain);
        
        const thClimate = createElement('th');
        thClimate.innerText = 'Climate';
        setCollumnScopeAttributeFor(thClimate);
        
        const thPopulation = createElement('th');
        thPopulation.innerText = 'Population';
        setCollumnScopeAttributeFor(thPopulation);

        trOfThead.appendChild(thNumber);
        trOfThead.appendChild(thName);
        trOfThead.appendChild(thTerrain);
        trOfThead.appendChild(thClimate);
        trOfThead.appendChild(thPopulation);

        thead.appendChild(trOfThead);        

        const tbody = createElement('tbody');
        tbody.setAttribute('id', 'planets-table-tbody-js');
        
        const planetsQuantity = planets.length;

        if (planetsQuantity === 0) {
            const tr = createElement('tr');
            const th = createElement('th');
            th.setAttribute('colspan', '5');
            th.classList.add('text-center');
            th.innerText = 'Nenhum planeta à vista...';

            tr.appendChild(th);
            tbody.appendChild(tr);
        } else {
            for (let i = 0; i < planetsQuantity; i++) {
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
    
                tbody.appendChild(tr);
            }
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        renderOnSubContainer(table);
    }

    const toggleDisplay = (elementId) => {
        const element = $(`#${elementId}`);
        
        const HIDE_CLASS = 'hide';

        if (element.classList.contains(HIDE_CLASS)) {
            element.classList.remove(HIDE_CLASS)
        } else {
            element.classList.add(HIDE_CLASS);
        }
    }

    // const toggleTable = () => {
    //     toggleDisplay('planets-table-js');
    // }

    // const toggleLoadingSpinner = () => {
    //     toggleDisplay('spinner-js');
    // };

    const render = (planets = []) => {
        
        // if (planets.length) {
        //     createTemporallyRowInTableWith("Nenhum planeta à vista...");
        // }
        renderLoadingSpinner();
        setTimeout(
            () => {
                renderTable(planets);        
            }, 
            2000
        );
        
    };

    try {
        
        const response = await fetchPlanets();

        const planets = Adapter.adapt(
            Planet, 
            (model) => response.results.map(planet => model.adapt(planet))
        );
        
        render(planets);

        planets.forEach(planet => {
            console.log(`Planeta: ${planet.name} - Quantidade de residentes: ${planet.countResidents()}`)
        });

    } catch(exception) {
        render();
        console.log(exception);
    } 

})();