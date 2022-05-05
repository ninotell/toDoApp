import Axios from "axios"

export const createNote = ({ content, title }) => {
  return Axios.post("http://localhost:3001/api/newnote", { content, title })
    .then((response) => {
      const { data } = response
      return data
    })
}