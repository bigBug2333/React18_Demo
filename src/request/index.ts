import axios from 'axios';

const baseURL = '/api'; // 使用代理的基本 URL

const instance = axios.create({
  baseURL,
});

// 添加请求拦截器（可选）
instance.interceptors.request.use(
  (config: any) => {
    // console.log(config, localStorage.getItem("token"))
    // 在发送请求之前可以做一些处理，例如添加请求头等
    // 在这里添加 Authorization 头
    config.headers.Authorization = localStorage.getItem("token"); // 替换为实际的访问令牌

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器（可选）
instance.interceptors.response.use(
  (response) => {
    // console.log(response)
    // 在接收响应数据之前可以做一些处理
    return response;
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error);
  }
);

// 封装具体的请求函数
export const queryIdentByUsername = (name: string) => {
  return instance.get('/base/common/queryIdentByUsername/' + name);
};
export const login = (data: { identId: any; password: string; }) => {
  return instance.post('/login', data);
};

export const queryMenuByToken = (data: string | null) => {
  return instance.post('/base/common/queryMenuByToken/' + data);
};

// 税收法规库
// 1.常用搜索+轮播图+Tab
export const queryHomeFixedNew = () => {
  return instance.get('/gttaxmanage/Home/queryHomeFixedNew');
};

// 获取法规库常用链接常用工具
export const queryCommon = (data: any) => {
  return instance.post('/gttaxmanage/Common/queryCommon', data);
};

// 获取法规库左侧树内容
export const queryArticleCount = (fcolumnid: string) => {
  return instance.get('/gttaxmanage/ArticleContent/queryArticleCount?fColumnId=' + fcolumnid);
};
// 获取法规库右侧列表内容
export const queryHomeData = (data: any) => {
  return instance.post('/gttaxmanage/Home/queryHomeData', data);
};
// 获取法规详情
export const queryRepArticleContent = (data: any) => {
  return instance.post('/gttaxmanage/ArticleContent/queryRepArticleContent', data);
};

