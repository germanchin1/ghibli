// src/hooks/useFilms.js
import { useEffect, useState } from 'react'
/**
* Normaliza una película cruda de la API de Ghibli a un objeto estable para la
UI.
* Si la API cambia nombres, solo hay que ajustar aquí.
*/
function normalizeFilm(raw) {
 return {
 id: raw.id, // ya viene en la API
 name: raw.title ?? 'Untitled', // preferimos trabajar siemprecon "name"
 image: raw.image ?? raw.movie_banner ?? '', // fallback si no hay image
 description: raw.description ?? 'Sin descripción'
 }
}
/**
* Custom hook: useFilms
* - Carga la lista de películas desde la API de Ghibli.
* - Cachea el resultado en localStorage para no pedirlo cada vez.
* - Devuelve estado de carga, error y una función reload para forzar recarga.
* - Usa promesas (then/catch) para que el flujo se vea claro a beginners.
*/
export default function useFilms() {
 // 1) Estados que expondrá el hook
 const [films, setFilms] = useState([]) // la lista ya normalizada
 const [loading, setLoading] = useState(true) // true al arrancar hasta decidirsi hay cache
 const [error, setError] = useState(null) // objeto Error o null
 // 2) Clave de cache en localStorage
 const CACHE_KEY = 'ghibli_films_v1' // añade _v1 por si cambias el formato en un futuro
 /**
 * Función interna: pide a la API, normaliza, guarda en estado y cache.
 * La separamos para poder reutilizarla en "reload()".
 */
 function fetchFromAPI() {
 setLoading(true)
 setError(null)
 // Petición HTTP con fetch
 return fetch('https://ghibliapi.vercel.app/films')
 .then((response) => {
 if (!response.ok) {
 throw new Error('HTTP ' + response.status)
 }return response.json()
 })
 .then((data) => {
 // data es un array de películas crudas. Las normalizamos.
 const normalized = Array.isArray(data) ? data.map(normalizeFilm) : []
 // Guardamos en estado para que la UI se actualice
 setFilms(normalized)
 // Guardamos también en cache (como texto)
 localStorage.setItem(CACHE_KEY, JSON.stringify(normalized))
 })
 .catch((err) => {
 // Si falla, propagamos el error al estado
 setError(err)
 })
 .finally(() => {
 // Dejamos de cargar pase lo que pase
 setLoading(false)
 })
 }
 /**
 * Efecto de montaje: al cargar el hook, miramos si hay cache.
 * - Si hay cache, la usamos al instante (experiencia instantánea).
 * - Aún así, podríamos decidir refrescar en segundo plano (opcional).
 * - Si no hay cache, pedimos a la API.
 */
 useEffect(() => {
 const cachedText = localStorage.getItem(CACHE_KEY)
 if (cachedText) {
 // Hay cache: pintamos al momento
 try {
 const cached = JSON.parse(cachedText)
 setFilms(cached)
 setLoading(false) // mostramos ya la UI
 // Si quieres "refrescar en background" para tener datos nuevos:
 // fetchFromAPI()
 } catch (e) {
 // Si la cache está corrupta, la ignoramos y pedimos a la API
 localStorage.removeItem(CACHE_KEY)
 fetchFromAPI()
 }
 } else {
 // No hay cache: pedimos a la API
 fetchFromAPI()
 }
 }, []) // [] => solo al montar
 /**
 * API pública del hook: una función para forzar recarga real.
 * Útil para un botón "Recargar".
 */
 function reload() {
 // Opción A: borrar cache y volver a API
 localStorage.removeItem(CACHE_KEY)
 return fetchFromAPI() // Opción B (alternativa): pedir a la API y sobreescribir cache sin borrar antes.
 }
 // Devolvemos un objeto con lo que el componente necesita
 return { films, loading, error, reload }
}