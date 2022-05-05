import Axios from "axios"

export const editNote = ({ id, content, archived, title }) => {
    return Axios.put("http://localhost:3001/api/editnote", { id, content, archived, title })
        .then((response) => {
            const { data } = response
            return data
        })
}