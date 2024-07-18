export default class BasicApi {
    static createPromise<T>(callback: Function, parameter:{}, token: boolean = true):Promise<T> {
        let combinedParams = Object.assign(parameter);

        if(token) {
            combinedParams["Authorization"] = localStorage.getItem('auth.token');
        }

        return new Promise(async (resolve, reject) => {
            try {
                const response = await callback(combinedParams);
                resolve(response.data)
            }catch(error) {
                reject(error)
            }
        });
    }
}