function tokenConfig(method, token, body) {
    const config = {
        method,
        headers: {
            "Content-type": "application/json",
        },
    }
    if (token) config.headers['x-auth-token'] = localStorage.getItem('accessToken');
    if (body) config.body = body;
    return config;
}

export function getPostById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/posts/${id}`, tokenConfig('GET', false));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    })
}

export function updatePost(id, data) {
    const body = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/posts/${id}`, tokenConfig('PUT', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function getPostsByUser() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/dev/postsByUser`, tokenConfig('GET', true));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function createPost(data) {
    return new Promise(async (resolve, reject) => {
        const body = JSON.stringify(data);
        try {
            const response = await fetch('/dev/posts', tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch(error) {
            return reject({ error });
        }
    });
}

export function verifyToken() {
    return new Promise(async (resolve, reject) => {       
        try {
            const response = await fetch('/dev/auth', tokenConfig('GET', true));
            const data = await response.json();
            // check for errors
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);                
            } 
        } catch (error) {
            return reject({ error });
        }
    });
}

export function signInRequest({ email, password }) {
    return new Promise(async (resolve, reject) => {
        // Request body
        const body = JSON.stringify({ email, password });
        // Headers
        try {
            const response = await fetch('/dev/auth', tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({ error: data.error });
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}

export function registerRequest(values) {
    return new Promise(async (resolve, reject) => {
        // Request body
        const body = JSON.stringify(values);
        // Headers
        try {
            const response = await fetch('/dev/users', tokenConfig('POST', false, body));
            const data = await response.json();
            if (data.error) {
                return reject({error: data.error});
            } else {
                return resolve(data);
            }
        } catch (error) {
            return reject({ error });
        }
    });
}