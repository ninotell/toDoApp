const notes = require("../services/notes")

exports.assignRoutes = (app) => {
    app.get("/api/notes", notes.getNotes)
    app.post("/api/newnote", notes.newnote)
    app.delete("/api/deletenote/:id", notes.deletenote)
    app.put("/api/editnote", notes.editnote)
    app.put("/api/archivenote", notes.archivenote)
}