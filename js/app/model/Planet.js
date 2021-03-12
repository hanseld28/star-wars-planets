class Planet {

    constructor(args = {}) {
        this.name = args?.name, 
        this.rotationPeriod = args?.rotationPeriod, 
        this.orbitalPeriod = args?.orbitalPeriod, 
        this.diameter = args?.diameter,
        this.climate = args?.climate,
        this.gravity = args?.gravity,
        this.terrain = args?.terrain,
        this.surfaceWater = args?.surfaceWater
        this.population = args?.population 
        this.residents = args?.residents || []
        this.created = args?.created
        this.edited = args?.edited
    }

    adapt(data = {}) {
        return new Planet(
            {
                name: data?.name, 
                rotationPeriod: data?.rotation_period, 
                orbitalPeriod: data?.orbital_period, 
                diameter: data?.diameter,
                climate: data?.climate,
                gravity: data?.gravity,
                terrain: data?.terrain,
                surfaceWater: data?.surface_water,
                population: data?.population,
                residents: data?.residents, 
                created: data?.created,
                edited: data?.edited
            }
        );
    }

    countResidents() {
        return this.residents && this.residents.length 
            ? this.residents.length
            : 'DESCONHECIDO'; 
    }
}