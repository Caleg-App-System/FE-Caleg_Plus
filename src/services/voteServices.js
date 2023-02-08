import API from "./api"

export const VoteService = {
    getVote : async () => {
        const response = await API.get('/getdata');
        console.log(response)
        return response;
    }
}