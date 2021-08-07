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
          count: starships.total_records,
          previous: starships.previous,
          next: starships.next,
          results: await Promise.all(starships.results.map(async (starships: any) => {
            const id = starships.url.split("/")[5];
            const movies = await this.getFilms(starships.films);
            const starshipResponse = await this.http(`${this.path}/${id}`, this.type);
            const starship = await starshipResponse.result.properties;
            return {
              id,
              name: starship.name,
              model: starship.model,
              creditsCost: starship.cost_in_credits,
              cargoCapacity: starship.cargo_capacity,
              movies: starships.films ? await movies : ["No has data"],
            };
          })) as Starship[]
        };

        return starshipsFormated;
      }

      const starshipsFormatedFromRick: GetAllStarships = {
        count: starships.info.count,
        previous: starships.info.prev,
        next: starships.info.next,
        results: starships.results.map((episode: any) => ({
          id: episode.id,
          name: episode.name,
          model: `${episode.episode} | ${episode.air_date}`,
          creditsCost: null,
          cargoCapacity: null,
          movies: ["No show characters at this moment"],
        }))
      };
      // const characters = await this.getFilms(episode.characters.splice(1, 3), "characters");

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

      if (this.type === "star") {
        const starship = await starshipResponse.result.properties;
  
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

      const episode = await starshipResponse;
      const starshipFormatedFromRick: Starship = {
        id: episode.id,
        name: episode.name,
        model: `${episode.episode} | ${episode.air_date}`,
        manufacturer: "No has value",
        creditsCost: "No has value",
        width: "No has value",
        passengers: "No has value",
        cargoCapacity: "No has value",
        movies: episode.characters
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