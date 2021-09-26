export function doLogin(email, password) {
    return new Promise((response, reject) => {
        if (email === 'contato@gmail.com' 
            && password === '123456') {
            response(true);
        }
        reject("E-mail e/ou Senha Inválida");
    })
}

export function doLogout() {
    
}