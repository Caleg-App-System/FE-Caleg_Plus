import API from "./api"

export const VoteService = {
    // Data dummy
    getVote : async () => {
        const response = await API.get('/getdata');
        // console.log(response)
        return response;
    },

    // Data real
    getAllVote : async () => {
        const response = await API.get('/suara/getall');
        console.log(response)
        return response;
    }
}