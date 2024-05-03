let px = 0 // pixel
let cm =  0.4 // centimetro
let dpi = 96 // decidad de pixel
const cxp = 2.54 // centimetro por pulgada 

px = cm * (dpi/cxp)
finalPx = px.toFixed(2)
console.log(finalPx)

console.log(process.cwd());
