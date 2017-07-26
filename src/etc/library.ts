export class Library {

    randomString() {
        let d = new Date();
        let unique = d.getTime() + '_';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 8; i++) {
            unique += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return unique;
    }





    get storage() {
        return {
            get: (key) => {
                let value = localStorage.getItem(key);
                if (value) {
                    try {
                        return JSON.parse(value);
                    }
                    catch (e) {
                        return null;
                    }
                }
                else return value;
            },
            set: (key, data) => {
                // console.log("storage::set()", data);
                return localStorage.setItem(key, JSON.stringify(data));
            }
        }
    }



    // /**
    //  * Returns the body of POST method.
    //  *
    //  * @attention This addes 'module', 'submit'. If you don't needed just user http_build_query()
    //  *
    //  * @param params must be an object.
    //  */
    // protected buildQuery(params) {
    //     // params[ 'module' ] = 'ajax'; // 'module' must be ajax.
    //     // params[ 'submit' ] = 1; // all submit must send 'submit'=1
    //     return this.http_build_query(params);
    // }




    // protected http_build_query(formdata, numericPrefix = '', argSeparator = '') {
    //     var urlencode = this.urlencode;
    //     var value
    //     var key
    //     var tmp = []
    //     var _httpBuildQueryHelper = function (key, val, argSeparator) {
    //         var k
    //         var tmp = []
    //         if (val === true) {
    //             val = '1'
    //         } else if (val === false) {
    //             val = '0'
    //         }
    //         if (val !== null) {
    //             if (typeof val === 'object') {
    //                 for (k in val) {
    //                     if (val[k] !== null) {
    //                         tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
    //                     }
    //                 }
    //                 return tmp.join(argSeparator)
    //             } else if (typeof val !== 'function') {
    //                 return urlencode(key) + '=' + urlencode(val)
    //             } else {
    //                 throw new Error('There was an error processing for http_build_query().')
    //             }
    //         } else {
    //             return ''
    //         }
    //     }

    //     if (!argSeparator) {
    //         argSeparator = '&'
    //     }
    //     for (key in formdata) {
    //         value = formdata[key]
    //         if (numericPrefix && !isNaN(key)) {
    //             key = String(numericPrefix) + key
    //         }
    //         var query = _httpBuildQueryHelper(key, value, argSeparator)
    //         if (query !== '') {
    //             tmp.push(query)
    //         }
    //     }

    //     return tmp.join(argSeparator)
    // }



    // protected urlencode(str) {
    //     str = (str + '')
    //     return encodeURIComponent(str)
    //         .replace(/!/g, '%21')
    //         .replace(/'/g, '%27')
    //         .replace(/\(/g, '%28')
    //         .replace(/\)/g, '%29')
    //         .replace(/\*/g, '%2A')
    //         .replace(/%20/g, '+')
    // }



}