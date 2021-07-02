/**
 * 格式化启明FDP后端返回的 List 数据
 * @author daixiaowei
 * @date 2021/7/2
 * @param
 * @return
 */
export function parseList(data,keys) {
    let list=[];
    data.forEach((item)=>{
        let m = {};
        keys.forEach(function(item1,index,arr){
            m[keys[index]] = item[index];
        })
        list.push(m);
    })
    return list;
}
