const fs = require('fs')

const wagon = JSON.parse(fs.readFileSync('wagon.example.json'))

var newItems = wagon.items;

// newItens = wagon.items.map((item, idx) => {
//     item.boxes.map( (b, idx) =>{
        
//     })    
// });

wagon.items.push(newItems)

console.log(newItems)

newItems.map( n => console.log(n.boxes))

