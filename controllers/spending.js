const SpendingModels = require('../dao/spending.dao');

let spendingModels = new SpendingModels();

exports.getSpendings = async (req, res) => {
    try {
        let response = await spendingModels.getSpendings(req.auth.id);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getOneSpending = async (req, res) => {
    try {
        let response = await spendingModels.getOneSpending(req.params.id);

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json(error);
    }
}

exports.createSpending = async (req, res) => {
    try {
        let data = {
            ...req.body,
            userId : req.auth.id
        }
        
        let response = await spendingModels.createSpending(data);
        res.status(200).json({ response });
        
    } catch (error) {

        console.log(error);
        res.status(400).json(error);
    }
}

exports.updateSpending = async (req, res) => {
    try {
        let data = {
            ...req.body
        };
        let response = await spendingModels.updateSpending(req.params.id, data);

        res.status(201).json({message: "La dépense a été modifiée !"});
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.deleteSpending = async (req, res) => {
    try {
        let response = await spendingModels.deleteSpending(req.params.id);

        if(response.affectedRows === 0){
            res.status(200).json({ message: "L'élément que vous tentez de supprimer n'existe pas !"})
        } else {
            res.status(200).json({ message: "L'élément est supprimé !"})
        }

    } catch (error) {
        res.status(400).json(error);
    }
}

