import { Link } from 'react-router-dom'
// Tarjeta básica tolerante a datos normalizados
export default function CharacterCard({ character }) {
 // OJO: con el hook useFilms ya normalizamos a { id, name, image, description }
 const { id, name, image, description } = character
 return (
 <li>
 {/* Enlace a la página de detalle de esta película */}
 <Link to={`/characters/${id}`} style={{ textDecoration: 'none', color:
'inherit' }}>
 <h3 style={{ marginBottom: '.5rem' }}>{name}</h3>
 {image && (
 <img
 src={image}
 alt={name}
 style={{ width: '100%', height: 'auto', borderRadius: 4, marginBottom:
'.5rem' }}
 />
 )}
 </Link>
 <p style={{ color: '#444' }}>{description}</p>
 {/* También podemos ofrecer un enlace explícito */}
 <div style={{ marginTop: '.5rem' }}>
 <Link to={`/characters/${id}`}>Ver detalle</Link>
 </div>
 </li>
 )
}