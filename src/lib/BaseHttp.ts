import getData from '@lib/fetch';
import { FilmsType, GetData } from "@types";

export class BaseHttp {
  protected http: GetData;

  constructor() {
    this.http = getData;
  }

  public async getFilms(filmsUrls: string[], type: FilmsType = "films") {
    try {
      const typeValidation = type === "films";
      const filmsUrlsFormated = filmsUrls.map((url) => {
        return [url.split("/")[4], url.split("/")[5]].join("/")
      });
      const films = await Promise.all(filmsUrlsFormated.map((url) => (
        this.http(url, typeValidation ? "star" : "rick")
      )));

      if (typeValidation) {
        const filmsFormated = await films.map((film: any) => (
          `Title: ${film.title}     Realease date: ${film.release_date} \nDirector: ${film.director}     Producer: ${film.producer}`
        ));

        return filmsFormated
      }
      
      const filmsFormatedFromRick = await films.map((film: any) => {
        if (type === "characters") {
          return `Name: ${film.name}     Origin: ${film.origin.name}\nLocation: ${film.location.name}     Status: ${film.status}`;
        }
        return `Name: ${film.name} \nRealease date: ${film.air_date} \nEpisode: ${film.episode}`;
      });

      return filmsFormatedFromRick
    } catch (error) {
      return [error.message];
    }
  }
}