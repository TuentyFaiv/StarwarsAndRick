import { TypeGetData } from "@types";
import ifetch from "isomorphic-fetch";

// const BASE_API = "https://www.swapi.tech/api/";
const BASE_API = "https://swapi.dev/api/";
const BASE_API_RICK_AND_MORTY = "https://rickandmortyapi.com/api/";

export default async function getData(path: string, type: TypeGetData = "star") {
  try {
    const API = type === "star" ? BASE_API : BASE_API_RICK_AND_MORTY;
    const response = await ifetch(`${API}${path}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message }
  }
}