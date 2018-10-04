const lazy = require('lazy')


const pick_data =(obj)=>{ 
    lazy(obj).pick(['categoryName','categories'])
    }

module.exports={
    pick_data
}