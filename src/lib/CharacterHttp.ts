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
          count: characters.total_records,
          previous: characters.previous,
          next: characters.next,
          results: await Promise.all(characters.results.map(async (character: any) => {
            const id = character.url.split("/")[5];
            const characterCompleteRespose = await this.http(`${this.path}/${id}`, this.type);
            const characterComplete = await characterCompleteRespose.result.properties;
            return {
              id,
              name: characterComplete.name,
              height: characterComplete.height,
              weight: characterComplete.mass,
              birthday: characterComplete.birth_year,
            }
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

      if (this.type === "star") {
        const character = await characterRespose.result.properties;
  
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
      const character = await characterRespose;

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

      if (this.type === "star") {
        const planet = await planetResponse.result.properties;
  
        return planet;
      }
      const planetFromRick = await planetResponse;
      return planetFromRick;
    } catch (error) {
      return error.message;
    }
  }
}