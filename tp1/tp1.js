//Variable
let Estado = 0;
let frameActual = 0;
let tiempoAnterior = 0;
let tiempoEstado = 0;
let VelocidadAnimacion = 150;
let animacionActual;
let posX = 0;

// Arrays de Animaciones
let sonicRun = [];
let sonicIdle = [];
let sonicPrisa = [];

let archivosRun = [
  "Corriendo1.png",
  "Corriendo2.png",
  "Corriendo3.png",
  "Corriendo4.png",
  "Corriendo5.png",
  "Corriendo6.png",
];

let archivosIdle = [
  "Esperando1.png",
  "Esperando2.png",
  "Esperando3.png",
  "Esperando4.png",
  "Esperando5.png",
];

let archivosPrisa = ["Prisa1.png", "Prisa2.png", "Prisa3.png", "Prisa4.png"];

let fondo;

function preload() {
  fondo = loadImage("Fondo.png");

  cargarFrames(sonicRun, archivosRun);

  cargarFrames(sonicIdle, archivosIdle);

  cargarFrames(sonicPrisa, archivosPrisa);
}

function setup() {
  createCanvas(800, 600);

  noSmooth();

  posX = 0;

  Estado = 0;

  frameActual = 0;

  tiempoAnterior = millis();

  tiempoEstado = millis();
}

function draw() {
  image(fondo, 0, 0, 800, 600); //Fondo

  animacionActual = PrepararAnimacion(Estado);

  if (Estado == 0) {
    posX = posX + 2;

    // Cuando llega al centro
    if (posX >= 350) {
      Estado = 1;

      frameActual = 0;

      tiempoAnterior = millis();

      tiempoEstado = millis();

      posX = 350;
    }
  } else if (Estado == 1) {
    if (millis() > tiempoEstado + 3000) {
      Estado = 2;

      frameActual = 0;

      tiempoAnterior = millis();

      tiempoEstado = millis();
    }
  } else if (Estado == 2) {
    posX = posX + 8;
  }

  if (millis() > tiempoAnterior + VelocidadAnimacion) {
    if (Estado == 1) {
      if (frameActual < animacionActual.length - 1) {
        frameActual++;
      }
    } else {
      frameActual++;
      if (frameActual >= animacionActual.length) {
        frameActual = 0;
      }
    }

    tiempoAnterior = millis();
  }

  mostrarAnimacion(animacionActual, frameActual, posX, 360, 2); //Carga de sonic y su accion
}

function cargarFrames(animacion, archivos) {
  for (let i = 0; i < archivos.length; i++) {
    animacion.push(loadImage(archivos[i]));
  }
}

function PrepararAnimacion(estado) {
  if (estado == 0) {
    return sonicRun;
  } else if (estado == 1) {
    return sonicIdle;
  } else if (estado == 2) {
    return sonicPrisa;
  }

  return sonicRun;
}

function mostrarAnimacion(animacion, frame, x, y, escala) {
  let imagen = animacion[frame];

  image(imagen, x, y, imagen.width * escala, imagen.height * escala);
}

// Reset

function resetear() {
  Estado = 0;

  frameActual = 0;

  posX = 0;

  tiempoAnterior = millis();

  tiempoEstado = millis();
}

function keyPressed() {
  //Tecla R para repetir la escena
  if (key == "r" || key == "R") {
    resetear();
  }
}
