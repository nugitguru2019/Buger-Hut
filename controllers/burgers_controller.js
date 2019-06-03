const express = require(`express`);

const burger = require(`../models/burger`);



const router = express.Router();



router.get(`/`, (req, res) => {

    burger.all(data => {

        const hbsObj = {

            burgers: data

        };

        res.render(`index`, hbsObj);

    });

});



router.post(`/api/burgers`, (req, res) => {

    burger.create(["burger_name"], [req.body.name], result => {

        res.json({ id: result.insertId });

    });

});



router.put(`/api/burgers/:id`, (req, res) => {

    const condition = `id = ${req.params.id}`;



    burger.update({ devoured: true }, condition, result => {

        if (result.affectedRows === 0) {

            return res.status(404).end();

        } else {

            res.status(200).end();

        }

    });

});



module.exports = router;
