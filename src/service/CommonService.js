import axios from "axios";

export const getArticles = async (page) => {
    const response = await axios.get(`http://iws-news.herokuapp.com/test/articles/index/?page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response;
}

export const getDetailArticle = async (id) => {
    const response = await axios.get(`http://iws-news.herokuapp.com/test/articles/${id}/get`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Request-Headers": "*"
        }
    })

    return response;
}

export const getCategories = async () => {
    const response = await axios.get('http://iws-news.herokuapp.com/test/categories/basic/index', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response;
}

export const getTagsName = async () => {
    const response = await axios.get("https://iws-news.herokuapp.com/test/tags/basic/index", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response;
}

export const getArticlesByCategory = async (categoryId) => {
    const response = await axios.get(`http://iws-news.herokuapp.com/test/articles/categories/${categoryId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response;
}

export const getArticlesByTag = async (tagId) => {
    const response = await axios.get(`http://iws-news.herokuapp.com/test/articles/tags/${tagId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response;
}

export const getRelevantArticles = async (articleId) => {
    const response = await axios.get(`http://iws-news.herokuapp.com/test/articles/${articleId}/relevant`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response;
}