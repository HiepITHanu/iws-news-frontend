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

export const deleteArticle = async (articleId) => {
    const response = await axios.delete(`http://iws-news.herokuapp.com/test/articles/${articleId}/delete`, {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })

    return response;
}

export const editArticle = async (articleId, article) => {
    const response = await axios.patch(`http://iws-news.herokuapp.com/test/articles/${articleId}/edit`, article, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })

    return response;
}

export const insertComment = async (articleId, comment) => {
    const response = await axios.put(`http://iws-news.herokuapp.com/test/comments/articles/${articleId}/insert`, comment, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return response;
}

export const editComment = async (commentId, newComment) => {
    const response = await axios.patch(`http://iws-news.herokuapp.com/test/comments/${commentId}/edit`, newComment, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return response;
}

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`http://iws-news.herokuapp.com/test/comments/${commentId}/delete`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return response;
}