// Concepto: "props" = datos de solo lectura que el padre pasa al hijo.
// Aquí desestructuramos { name } para usarlo directamente.
function Greeting({ name }) {
 return <p>Hola, {name}</p>
}
export default Greeting