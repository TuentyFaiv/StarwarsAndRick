import { GetAllCharacters, Character, Planet } from "@interfaces";
import { BaseHttp } from "@lib/BaseHttp";
import { TypeGetData } from "@types";

export class CharacterHttp extends BaseHttp {
  constructor(private path: string, private type: TypeGetData = "star") {
    super();
  }

  public async getAll(page: string = "1"): Promise<GetAllCharacters> {
    try {
      const allCharactersData = await this.http(`${this.path}?page=${page}`, this.type);
      const characters = await allCharactersData;
      if (this.type === "star") {
        const charactersFormated: GetAllCharacters = {
          count: characters.count,
          previous: characters.previous,
          next: characters.next,
          results: characters.results.map((character: any) => ({
            id: character.url.split("/")[5],
            name: character.name,
            height: character.height,
            weight: character.mass,
            birthday: character.birth_year,
          }))
        };
        return charactersFormated;
      }

      const charactersFormatedFromRick: GetAllCharacters = {
        count: characters.info.count,
        previous: characters.info.prev,
        next: characters.info.next,
        results: characters.results.map((character: any) => ({
          id: character.id,
          name: character.name,
          height: character.species,
          weight: character.status,
          birthday: character.origin.name,
        }))
      };

      return charactersFormatedFromRick;
    } catch (error) {
      return {
        count: 1,
        next: "",
        previous: "",
        results: [],
      };
    }
  }

  public async getOne(id: string): Promise<Character> {
    const idCharacter = id;
    try {
      const characterRespose = await this.http(`${this.path}/${idCharacter}`, this.type);
      const character = await characterRespose;

      if (this.type === "star") {  
        const characterFormated: Character = {
          id: character.url.split("/")[5],
          name: character.name,
          height: character.height,
          weight: character.mass,
          planet: character.homeworld,
          birthday: character.birth_year,
          genre: character.gender,
          movies: character.films ? character.films : ["No has data"]
        };
  
        return characterFormated;
      }

      const characterFormatedFromRick: Character = {
        id: character.id,
        name: character.name,
        height: character.species,
        weight: character.status,
        planet: character.location.url,
        birthday: character.origin.name,
        genre: character.gender,
        movies: character.episode
      };

      return characterFormatedFromRick;
    } catch (error) {
      return {
        id: idCharacter,
        name: "",
        height: "",
        weight: "",
        planet: "",
        birthday: "",
        genre: "",
        movies: []
      };
    }
  }

  public async getPlanet(planetUrl: string): Promise<Planet> {
    try {
      const planetPath = [planetUrl.split("/")[4], planetUrl.split("/")[5]].join("/");
      const planetResponse = await this.http(`${planetPath}/`, this.type);
      const planet = await planetResponse;

      return planet;
    } catch (error) {
      return error.message;
    }
  }
}