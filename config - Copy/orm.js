const connection = require(`./connection`);



// Helper function to print out question marks if multiple new values are being added to the database with one request

function printQMarks(num) {

    const arr = [];



    for (i = 0; i < num; i++) {

        arr.push(`?`);

    }



    return arr.toString();

}



// Helper function to print out out multiple new column values in a MySQL-friendly manner if multiple columns are being updated in the database with one request

function objToSql(ob) {

    const arr = [];



    for (var key in ob) {

        const value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === `string` && value.indexOf(` `) >= 0) {

                value = `'${value}'`;

            }

            arr.push(`${key}=${value}`);

        }

    }



    return arr.toString();

}



const orm = {

    selectAll: function(table, cb) {

        const queryString = `SELECT * FROM ${table};`;

        connection.query(queryString, (err, result) => {

            if (err) {

                console.log(err);

            }

            cb(result);

        });

    },



    insertOne: function(table, cols, vals, cb) {

        const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQMarks(

            vals.length

        )});`;



        console.log(queryString);



        connection.query(queryString, vals, (err, result) => {

            if (err) {

                console.log(err);

            }



            cb(result);

        });

    },



    updateOne: function(table, objOfColVals, condition, cb) {

        var queryString = `UPDATE ${table} SET ${objToSql(

            objOfColVals

        )} WHERE ${condition}`;



        console.log(queryString);

        connection.query(queryString, function(err, result) {

            if (err) {

                console.log(err);

            }



            cb(result);

        });

    }

};



module.exports = orm;