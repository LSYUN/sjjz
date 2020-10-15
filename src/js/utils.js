

/**
 * 
 * @param {*} obj 
 * this function will transform an obj to a string,just like
 * {name:"Tom",age:12}
 * name=Tom&age=12
 * note: property datatype object and undefined will be ignore
 */
export const serializeForm = function (obj) {
    const params = Object.keys(obj).map(ele => {
        if (typeof obj[ele] != 'object')
            return `${ele}=${obj[ele]}`
    })
    return params.join('&')
}