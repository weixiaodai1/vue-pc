import httpcc from "@/utils/request";

export function info(params) {
  return httpcc.request({
    url: "/user/info",
    method: "get",
    params,
  });
}

export function login(data) {
  debugger
  return httpcc.request({
    url: "?fromClient=QMBS&ModuleName=SYS",
    method: "post",
    data,
  });
}

export function logout() {
  return httpcc.request({
    url: "/user/logout",
    method: "post",
  });
}

export function domainList(data) {
  return httpcc.request({
    url: "/auth/domainList",
    method: "post",
    data
  });
}

export function childMenu(data) {
  return httpcc.request({
    url: "/auth/searchChildMenu",
    method: "post",
    data
  });
}
