"use strict";

const fs = require("fs");

function jsonReader(file) {
  let rawdata = fs.readFileSync(file, "UTF8") || "[]";
  let objects = JSON.parse(rawdata);
  return objects;
}

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    fs.openSync(`${nombreArchivo}`, "w");
    console.log(`${nombreArchivo} creado!`);
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  save(object) {
    let objects = jsonReader(this.nombreArchivo);
    if (objects.length > 0) {
      object.id =
        Math.max.apply(
          Math,
          objects.map(function (obj) {
            return obj.id;
          })
        ) + 1;
    } else {
      object.id = 1;
    }

    objects.push(object);

    fs.writeFileSync(`${this.nombreArchivo}`, JSON.stringify(objects));
    console.log(`Se guardo el objeto con el id: ${object.id}`);
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  getById(id) {
    let objects = jsonReader(this.nombreArchivo);
    const found = objects.find((element) => element.id === id);
    console.log("getById", found);
    return found ? found : null;
  }

  // Devuelve un array con los objetos presentes en el archivo.
  getAll() {
    let objects = jsonReader(this.nombreArchivo);
    console.log("getAll", objects);
    return objects;
  }

  // Elimina del archivo el objeto con el id buscado.
  deleteById(id) {
    let objects = jsonReader(this.nombreArchivo);
    const filtered = objects.filter((element) => element.id !== id);
    fs.writeFileSync(`${this.nombreArchivo}`, JSON.stringify(filtered));

    console.log(`Se elimino correctamente el objeto con id: ${id}`);
  }

  // Elimina todos los objetos presentes en el archivo.
  deleteAll() {
    fs.writeFileSync(`${this.nombreArchivo}`, "[]");
    console.log("Se elimino todo el contenido del archivo");
  }
}

module.exports = Contenedor;
