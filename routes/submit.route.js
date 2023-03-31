module.exports = app => {
    const submit = require("../controllers/submit.controller.js");

    var router = require("express").Router();

    router.post("/", submit.create);
    router.get("/allactive",submit.findAllActive);
    router.put("/delete/:SId",submit.DeleteFromSubmitId);
    router.put("/moderate/:SId",submit.ModerateSuccess);
    router.put("/editjoke/:SId",submit.updateJokeById);
    router.get("/getone/:SId",submit.findByJokeId);

    app.use('/api/submit', router);
}