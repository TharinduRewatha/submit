const db = require("../models")
const Submit = db.submit
const axios = require('axios')

const dbLinks = require("../config/db.config.js")

exports.create = (req, res) => {

    const submit = new Submit({
        name: req.body.name,
        joke: req.body.joke,
        type: req.body.type,
        moderated : false,
        _active : true
    })

    submit
        .save(submit)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while submiting the joke"
            })
        })
}

exports.findAllActive = (req, res) => {
    Submit.find({ _active: true ,moderated:false})
        //.populate('roles')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving jokes."
            })
        })
}

exports.DeleteFromSubmitId = (req, res) => {
    const Id = req.params.SId

    Submit.findByIdAndUpdate({ _id: Id }, { $set: { _active: false,moderated: true } })
        .then(data => {

            if (data) {
                res.send(true)

            } else res.status(404).send({
                message: `Cannot delete joke with id=${Id}. Maybe joke was not found!`
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}

exports.ModerateSuccess = (req, res) => {
    const Id = req.params.SId

    Submit.findByIdAndUpdate({ _id: Id }, { $set: { moderated: true ,_active : false} })
        .then(data => {

            if (data) {
                res.send(true)

            } else res.status(404).send({
                message: `Cannot moderate joke with id=${Id}. Maybe joke was not found!`
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}

exports.updateJokeById = (req, res) => {
    const Id = req.params.SId

    Submit.findByIdAndUpdate({ _id: Id }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update joke with id=${Id}. Maybe joke was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: err

            })
        })
}

exports.findByJokeId = (req, res) => {
    const Id = req.params.SId
    console.log(req.query)
    var condition = Id ? {
        _id: Id
    } : {}
    Submit.find(condition)
        //.populate('iId')
        .then((data) => {
            let joke = {
                type : data[0].type,
                name : data[0].name,
                joke : data[0].joke      
            }
           
            axios.post(dbLinks.posttosql,joke)
            console.log("Posted to MySQL")
            res.send(true)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving joke."
            })
        })
    }