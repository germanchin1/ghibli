import { useEffect, useState } from 'react'
export default function Counter() {
 const [count, setCount] = useState(0)
 // Efecto: cada vez que cambia count, cambiamos el título del documento.
 useEffect(() => {
 document.title = `Contador: ${count}`
 // Limpieza opcional (no necesaria en este ejemplo).
 // Retornar aquí una función si te suscribes a algo y quieres cancelar.
 }, [count]) // Dependencias: cuando cambia count, se ejecuta el efecto.
 function handleClick() {
 setCount(prev => prev + 1)
 } return (
 <section>
 <strong>Contador:</strong> {count}
 <div>
 <button onClick={handleClick}>Sumar 1</button>
 </div>
 </section>
 )
}