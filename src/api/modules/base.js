import http from "@/utils/request";

export function searchZoneList(data) {
    debugger
    return http.request({
        url: "?fromClient=QMBS&ModuleName=bas&service=FusionTableService",
        method: "post",
        data,
    });
}

export function zoneSave(data) {
    debugger
    return http.request({
        url: "?fromClient=QMBS&ModuleName=bas&SDOModule=PUB&service=Bas202Service",
        method: "post",
        data,
    });
}
