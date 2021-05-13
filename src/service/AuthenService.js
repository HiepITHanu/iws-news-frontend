import axios from "axios";

export const postAuthenticationRequest = async (user) => {
    const response = await axios.post("http://iws-news.herokuapp.com/test/accounts/auth", user, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    console.log(response)
    return response
}

export const registerUser = async (user) => {
    const response = await axios.put("http://iws-news.herokuapp.com/test/accounts/insert", user, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response
}

export const createArticle = async (article) => {
    const response = await axios.put("http://iws-news.herokuapp.com/test/articles/insert", article, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })

    return response;
}