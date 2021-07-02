import http from "@/utils/request";

export function getCell(params) {
  return http.request({
    url: "/cell/info",
    method: "get",
    params,
  });
}
