const fs = require('fs');
const file = 'openapi.json';
let api = JSON.parse(fs.readFileSync(file, 'UTF-8'));
// console.log(api.components.schemas.Product);

let paths = api.paths;
let peroperties = {};

for (let path in paths) {

}




let product = api.components.schemas.Product;
let newProduct = {};

for (let props in product.properties) {
    newProduct[props] = product.properties[props].type
}


let productString = JSON.stringify(mapPropsTypes(newProduct)).replace(/({|}|")/g,"");
productString = productString.replace(/,/g,";\n");
console.log(productString);

fs.writeFile("./openapiTS.ts", 'interface Product{\n' + productString + '\n}', function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});



function mapPropsTypes(props) {
    for(let prop in props) {
        switch (props[prop]) {
            case "string":
                props[prop] = "string";
                break;
            case "integer":
                props[prop] = "number";
                break;
        }
    }
    return props
}