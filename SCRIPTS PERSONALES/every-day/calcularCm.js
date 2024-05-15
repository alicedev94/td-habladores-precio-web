let px = 0 // pixel
let cm =  0.5// centimetro
let dpi = 96 // decidad de pixel
const cxp = 2.54 // centimetro por pulgada 

px = cm * (dpi/cxp)
finalPx = px.toFixed(2)
console.log(finalPx)

console.log(process.cwd());

// UN OBJETO
let obj = { codigo_prueba: '00_2', nombre_prueba: 'tablet', precio_prueba: 673 };

// ESTO DEVUELVE UN ARREGLO CON LAS CLAVES DEL ARRREGLO
let claves = Object.keys(obj);

// EL ARREGLO ES EL UNICO COMPONENTE QUE SE PUEDE RECORRER DENTRO DEL CODIGO 
for (let i = 0; i < claves.length; i++) {
    console.log(claves[i]);
}


