import Axios from "axios"

export const deleteNote = (id) => {
  return Axios.delete("http://localhost:3001/api/deletenote/" + id)
    .then((response) => {
      const { data } = response
      return data
    })
}