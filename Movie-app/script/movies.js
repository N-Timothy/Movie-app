import { config } from "./config"

const BASE_URL = config.api_based_url
const API_KEY = config.api_key
const LOCAL = config.localServer
const HEROKU = config.herkouServer

export default function getMovieNodes(page) { 
    return {
        popular :  `${BASE_URL}popular?api_key=${API_KEY}&page=${page}`,
        upcoming : `${BASE_URL}upcoming?api_key=${API_KEY}&page=${page}`,
        now_showing : `${BASE_URL}now_playing?api_key=${API_KEY}&page=${page}`,
        top_rated : `${BASE_URL}top_rated?api_key=${API_KEY}&page=${page}`,
    }
}

export function getMoviesModeLocal(page) {
    return {
        popular :  `${HEROKU}popular?_page=${page}&_limit=20`,
        upcoming : `${HEROKU}upcoming?_page=${page}&_limit=20`,
        now_showing : `${HEROKU}now_showing?_page=${page}&_limit=20`,
        top_rated : `${HEROKU}top_rated?_page=${page}&_limit=20`,
    }
}

export function getMoviesModeBackend(page) {
    return {
        // popular :  `${LOCAL}popular?page=${page}&limit=20`,
        // upcoming : `${LOCAL}upcoming?page=${page}&limit=20`,
        // now_showing : `${LOCAL}now_showing?page=${page}&limit=20`,
        // top_rated : `${LOCAL}top_rated?page=${page}&limit=20`
        popular :  `${HEROKU}popular?page=${page}&limit=20`,
        upcoming : `${HEROKU}upcoming?page=${page}&limit=20`,
        now_showing : `${HEROKU}now_showing?page=${page}&limit=20`,
        top_rated : `${HEROKU}top_rated?page=${page}&limit=20`
        }
    }