const Note = require("../models/Note")

exports.getNotes = async (request, response) => {
    const notes = await Note.findAll()
    response.json(notes)
}

exports.newnote = async (request, response) => {
    const title = request.body.title
    const content = request.body.content;
    const newNote = await Note.create(
        {
            title: title,
            content: content
        }
    );
    response.send(newNote)
}

exports.deletenote = async (request, response) => {
    const idToDelete = request.params.id;
    const result = await Note.destroy(
        {
            where: { id: idToDelete }
        }
    )
}

exports.editnote = async (request, response) => {
    const idToEdit = request.body.id;
    const title = request.body.title;
    const newContent = request.body.content;
    const lastArchivedState = request.body.archived
    const result = await Note.upsert(
        {
            id: idToEdit,
            title: title,
            content: newContent,
            archived: lastArchivedState
        }
    )
    response.send(result)
}

exports.archivenote = async (request, response) => {
    const idToArchive = request.body.id;
    const title = request.body.title;
    const lastContent = request.body.content;
    const archived = request.body.archived
    const result = await Note.upsert(
        {
            id: idToArchive,
            title: title,
            content: lastContent,
            archived: archived
        }
    )
    response.send(result)
}