/**
 * axios 封装
 */
import axios from "axios";
import { getToken } from "@/utils/auth";
import router from "@/router";
import configEnv from '_conf'
import { Message } from 'element-ui';

/**
 * 请求失败后的错误统一处理
 * @param {number} code 请求失败的状态码
 */
const handleError = (code) => {
    switch (code) {
        case 401:
            // do something ...
            // 这里要清除一些全局的loading哦，例如 vant: Toast.clear()
            router.push("/Login");
            break;

        default:
            break;
    }
};
console.log(configEnv)
// create an axios instance
const service = axios.create({
    // withCredentials: true, // send cookies when cross-domain requests
    baseURL: configEnv.baseApi, // .env中配置的api前缀
    timeout: 5000, // request timeout
});
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
service.interceptors.request.use(
    (config) => {
        // 获取token
        /*const token = getToken();
        token && (config.headers.Authorization = token);*/
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error, "err");
        return Promise.reject(error);
    }
);
/**
 * 响应格式
 */
service.interceptors.response.use(
    (response) => {
        const res = response.data;

        if (typeof res.result.errorMessageList !== "undefined") {
            // 处理自定义错误
            // handleError(res.code);
            console.log("ccccccccccc:",res.result,typeof res.result.errorMessageList)
            return Promise.reject(new Error(res.result.errorMessageList[0].content || "响应未知错误"));
        } else {
            // success
            return Promise.resolve(res);
        }
    },
    (error) => {
        console.error("response error:" + error); // for debug
        Message({
            message: error.message,
            type: 'error'
        });
        return Promise.reject(error)
    }
);

export default service;
