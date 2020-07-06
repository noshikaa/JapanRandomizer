const getParticulas = (particulasCompletas, cantidadParticulas) => {
  listaParticulas = '';

  //Sacamos el numero de la unidad más avanzada elegida
  let arrayUnidadesSeleccionadas = getArrayUnidadesSeleccionadas();
  let indexMasAlto;
  arrayUnidadesSeleccionadas.forEach((unidadElegida,index) => {
    if(unidadElegida) indexMasAlto = index;
  });
  const particulasElegidas = particulasCompletas[indexMasAlto];

  if(particulasElegidas.length === 0 && cantidadParticulas > 0) return 'no hay particulas para las unidades elegidas';
  for (i = 0; i < cantidadParticulas; i++) {
    listaParticulas += `La particula: ${particulasElegidas[Math.floor(Math.random()*particulasElegidas.length)]} \n`;
  }
  return listaParticulas;
};

const getVerbos = (verbosCompletos, cantidadVerbos) => {
  verbosElegidos = getContenidoPorUnidades(verbosCompletos);
  listaVerbos = '';

  if(verbosElegidos.length === 0 && cantidadVerbos > 0) return 'no hay verbos para las unidades elegidas';
  for (i = 0; i < cantidadVerbos; i++) {
    listaVerbos += `El verbo: ${verbosElegidos[Math.floor(Math.random()*verbosElegidos.length)]} \n`;
  }
  return listaVerbos;
};

const getVocabulario = (vocabularioCompleto, cantidadVocabulario) => {
  vocabularioElegido = getContenidoPorUnidades(vocabularioCompleto);
  listaVocabulario = '';

  if(vocabularioElegido.length === 0 && cantidadVocabulario > 0) return 'no hay vocabulario para las unidades elegidas';
  for (i = 0; i < cantidadVocabulario; i++) {
    listaVocabulario += `La palabra: ${vocabularioElegido[Math.floor(Math.random()*vocabularioElegido.length)]} \n`;
  }
  return listaVocabulario;
};

const getContenidoPorUnidades = contenidoCompleto => {
  let contenidoPorUnidades = [];
  let arrayUnidadesSeleccionadas = getArrayUnidadesSeleccionadas();

  // Checkeamos cada unidad, y si esta se eligió, se añade su contenido
  unidades.forEach((unidad, index) => {
    // Se eligió esta unidad?
    if(arrayUnidadesSeleccionadas[index]) {
      contenidoPorUnidades = contenidoPorUnidades.concat(contenidoCompleto[index]);
    }
  });

  return contenidoPorUnidades;
};

const getArrayUnidadesSeleccionadas = () => {
  let arrayUnidadesSeleccionadas = [];

  // Por cada unidad
  unidades.forEach((unidad, index) => {
    // Si la unidad se eligió
    if (document.getElementById(`unidad${unidad.numero}`).checked) {
      arrayUnidadesSeleccionadas[index] = true;
    } else {
      arrayUnidadesSeleccionadas[index] = false;
    }
  });

  return arrayUnidadesSeleccionadas;
};

const generate = (particulas, verbos, vocabulario, cantidadPalabras) => {
  const nothingSelected = checkNothingSelected();

  if(!nothingSelected) {
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').value = 'Intentá armar una frase con: \n' +
      `${getParticulas(particulas, Number(cantidadPalabras.cantidadParticulas))}` +
      `${getVocabulario(vocabulario, Number(cantidadPalabras.cantidadVocabulario))}` +
      `${getVerbos(verbos, Number(cantidadPalabras.cantidadVerbos))} \n`;
  }
};

//////////// Logica selector unidades ////////////

// Selector de todas las unidades
document.getElementById('listaUnidades').innerHTML = `
<div class="flex">
  <div class="unselectable">Todas las unidades:</div>
  <input type="checkbox" id="todasUnidades" class="class-checkbox" onClick="onAllUnitsClick()">
</div>
`
// Lista de selectores unidad por unidad
unidades.forEach(unidad => {
  document.getElementById('listaUnidades').innerHTML += `
    <div class="flex">
      <div class="unselectable">Unidad ${unidad.numero}:</div>
      <input type="checkbox" id="unidad${unidad.numero}" class="class-checkbox" onClick="onSingleUnitClick(${unidad.numero})">
      <span class="unselectable">&nbsp;${unidad.tema}</span>
    </div>
  `
});

const onSingleUnitClick = numero => {
  //deseleccionamos el checkbox de todas las unidades
  document.getElementById(`todasUnidades`).checked = false;
};

const onAllUnitsClick = () => {
  if (document.getElementById(`todasUnidades`).checked === false) {
    unidades.forEach(unidad => {
      document.getElementById(`unidad${unidad.numero}`).checked = false;
    });
  } else {
    unidades.forEach(unidad => {
      document.getElementById(`unidad${unidad.numero}`).checked = true;
    });
  }
};

const checkNothingSelected = () => {
  let nothingSelected = true;

  // se checkeo por lo menos una unidad?
  unidades.forEach(unidad => {
    if(document.getElementById(`unidad${unidad.numero}`).checked) {
      nothingSelected = false;
    }
  });

  return nothingSelected;
};
