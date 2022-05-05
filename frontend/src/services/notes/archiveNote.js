import Axios from "axios"

export const archiveNote = ({ id, archived, content, title }) => {
    return Axios.put("http://localhost:3001/api/archivenote", { id, archived, content, title })
        .then((response) => {
            const { data } = response
            return data
        })
}