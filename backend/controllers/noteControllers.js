const noteModel = require('../models/noteModel');

module.exports.getNote = async (req, res) => {
    const note = await noteModel.find();

    res.send(note);
};

module.exports.saveNote = async (req, res) => {

    const { name } = req.body;

    noteModel
        .create({ name })
        .then(data => console.log('add success ', data))
        .catch(err => console.log('add note err: ', err))
};

module.exports.updateNote = async (req, res) => {
    const { _id, name } = req.body;
    
    noteModel
        .findByIdAndUpdate(_id, {name})
        .then(() => res.send('update success'))
        .catch(err => console.log('update note err: ', err))
};

module.exports.deleteNote = async (req, res) => {
    const { _id, name } = req.body;
    
    noteModel
        .findByIdAndDelete(_id, {name})
        .then(() => res.send('deleted'))
        .catch(err => console.log('deleted note err: ', err))
};