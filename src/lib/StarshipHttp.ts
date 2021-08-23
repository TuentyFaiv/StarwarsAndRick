import { GetAllStarships, Starship } from "@interfaces";
import { BaseHttp } from "@lib/BaseHttp";
import { TypeGetData } from "@types";

export class StarshipHttp extends BaseHttp{
  constructor(private path: string, private type: TypeGetData = "star") {
    super();
  }

  public async getAll(page: string = "1"): Promise<GetAllStarships> {
    try {
      const allStarshipsData = await this.http(`${this.path}?page=${page}`, this.type);
      const starships = await allStarshipsData;

      if (this.type === "star") {
        const starshipsFormated: GetAllStarships = {
          count: starships.count,
          previous: starships.previous,
          next: starships.next,
          results: await Promise.all(starships.results.map(async (starship: any) => {
            const id = starship.url.split("/")[5];
            const moviesRequest = await this.getFilms([...starship.films].splice(0, 1));
            const movies = await moviesRequest;

            return {
              id,
              name: starship.name,
              model: starship.model,
              creditsCost: starship.cost_in_credits,
              cargoCapacity: starship.cargo_capacity,
              movies
            };
          }))
        };

        return starshipsFormated;
      }

      const starshipsFormatedFromRick: GetAllStarships = {
        count: starships.info.count,
        previous: starships.info.prev,
        next: starships.info.next,
        results: await Promise.all(starships.results.map(async (episode: any) => ({
          id: episode.id,
          name: episode.name,
          model: `${episode.episode} | ${episode.air_date}`,
          creditsCost: null,
          cargoCapacity: null,
          movies: await this.getFilms([...episode.characters].splice(0, 2), "characters") || ["No show characters at this moment"]
        })))
      };

      return starshipsFormatedFromRick;
    } catch (error) {
      return {
        count: 1,
        next: "",
        previous: "",
        results: [],
      };
    }
  }

  public async getOne(id: string): Promise<Starship> {
    const idStarship = id;
    try {
      const starshipResponse = await this.http(`${this.path}/${idStarship}`, this.type);
      const starship = await starshipResponse;

      if (this.type === "star") {
        const starshipFormated: Starship = {
          id: starship.url.split("/")[5],
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          creditsCost: starship.cargo_capacity,
          width: starship.length,
          passengers: starship.passengers,
          cargoCapacity: starship.cargo_capacity,
          movies: starship.films ? starship.films : ["No has data"]
        };
  
        return starshipFormated;
      }

      const starshipFormatedFromRick: Starship = {
        id: starship.id,
        name: starship.name,
        model: `${starship.episode} | ${starship.air_date}`,
        manufacturer: "No has value",
        creditsCost: "No has value",
        width: "No has value",
        passengers: "No has value",
        cargoCapacity: "No has value",
        movies: starship.characters
      };

      return starshipFormatedFromRick;
    } catch (error) {
      return {
        id: idStarship,
        name: "",
        model: "",
        manufacturer: "",
        creditsCost: "",
        width: "",
        passengers: "",
        cargoCapacity: "",
        movies: []
      };
    }
  }
}