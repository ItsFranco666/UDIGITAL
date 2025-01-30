import Link from 'next/link';
import './style.css'

export default function Home() {
  return (
    <>
      <section className="hero">
        <h2>Bienvenido a UDigital</h2>
        <p>Accede fácilmente a todos los recursos digitales de tu universidad.</p>
        <Link href="/resources" className="cta">Explorar Recursos</Link>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Biblioteca Digital</h3>
          <p>Consulta libros, artículos y otros recursos académicos en línea.</p>
        </div>
        <div className="feature">
          <h3>Material Multimedia</h3>
          <p>Accede a videos, conferencias y más contenido visual de interés académico.</p>
        </div>
        <div className="feature">
          <h3>Documentos de Investigación</h3>
          <p>Explora proyectos de investigación y trabajos de estudiantes y profesores.</p>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 UDigital. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
