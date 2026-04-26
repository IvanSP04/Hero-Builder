function Informativa() {
  return (
    <div className="tabla-container">
      <h2>Sobre la App</h2>

      <div className="info-seccion">
        <h3>Hero Builder</h3>
        <p>
          Esta app te permite explorar mas de 700 superheroes y villanos de distintas
          editoriales como Marvel, DC Comics y otros universos.
        </p>
      </div>

      <div className="info-seccion">
        <h3>Funcionalidades</h3>
        <ul>
          <li>Explora todos los heroes desde el Home</li>
          <li>Filtra por alineacion: buenos, malos o neutros</li>
          <li>Busca por nombre desde 3 caracteres</li>
          <li>Ve el detalle de cada heroe con sus stats</li>
          <li>Agrega heroes a favoritos</li>
          <li>Arma tu equipo ideal en el Builder</li>
        </ul>
      </div>

      <div className="info-seccion">
        <h3>API utilizada</h3>
        <p>
          Los datos vienen de la Superhero API, un proyecto open source con informacion
          detallada de personajes de comics.
        </p>
        <a 
          href="https://github.com/akabab/superhero-api"
          target="_blank"
          rel="noreferrer"
        >
          Ver repositorio
        </a>
      </div>
    </div>
  )
}

export default Informativa