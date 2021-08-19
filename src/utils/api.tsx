import axios from 'axios'
import Cookie from "js-cookie";
const loginApi = "https://ess.aapico.com/auth/local";

export const checkLogin = async (identifier: string, password: string) => {
    // if (typeof window === "undefined") {
    //     return;
    //   }
    return await axios
        .post(`${loginApi}`, {
            identifier: identifier.toUpperCase(),
            password,
        })
        .then((res) => {
            // console.log(res)
            // Cookie.set("token", res.data.jwt);
            return res;
        })
        .catch((err) => {
            return { err: err };
        });
}