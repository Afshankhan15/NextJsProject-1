import axios from 'axios'
import {deserialize} from '../../../utils/serialization'

export default async (req, res) => {
    try {
        console.log("Req body: ",req)
        // console.log("Req body afshan")
       
        const payload = deserialize(req.body.payload)
        console.log("Payload : ",payload)

        const url = payload.path

        const obj = {id: 1, message: "success"}
        // return res.status(200).json(obj)

        const handleResponse = (promise) => {
            return promise
            .then((response) => {
                res.status(response.status).json(response.data)
            })
            .catch((error) => {
                console.error("Axios error", error.message)
            })
        }

        let result
        switch(payload.method) {
            case "POST":
                result = handleResponse(axios.post(url, payload.body))
                break;
            case "GET":
                result = handleResponse(axios.get(url))
                break;
        }
    } catch (error) {
        console.error("Catch error", error)
    }
}