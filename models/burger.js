const orm = require(`../config/orm`);



const burger = {

    all: function(cb) {

        orm.selectAll(`burgers`, res => {

            cb(res);

        });

    },



    create: function(cols, vals, cb) {

        orm.insertOne(`burgers`, cols, vals, res => {

            cb(res);

        });

    },



    update: function(colVals, condition, cb) {

        orm.updateOne(`burgers`, colVals, condition, res => {

            cb(res);

        });

    }

};



module.exports = burger;



// burger.all(result => console.log(result))

// burger.create([`burger_name`], [`Loaded veggie burger`], result => console.log(result))

// burger.update({devoured: false}, `burger_name = 'Loaded veggie burger'`, result => console.log(result))

