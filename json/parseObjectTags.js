(function () {
    'use strict';
    var DOMObjectToJSON = {
        /**
         *
         */
        objs: null,
        /**
         *
         */
        getObjectTags: function () {
            this.objs = document.getElementsByTagName('object');
            if (this.objs[0].style.position)
            console.log(this.objs[0].style.position);
        },
        /**
         *
         */
        getJSONObject: function () {
            var JSONObject = {objs: []},
                allAttr, obj,
                i, lenObjs, j, lenAttrs;

            function parseStylesToObject (str) {
                var objWithStyles = {},
                    stylesArr = [],
                    splitStr, trimStr, delStr;

                trimStr = str.trim(); // delete spaces left & right
                if (trimStr.lastIndexOf(';') === trimStr.length - 1) { // if last char = ';'...
                    delStr = trimStr.slice(0, -1); // need remove before parse
                }
                splitStr = delStr ? delStr.split(';') : trimStr.split(';');

                splitStr.forEach(function (arr) {
                    stylesArr.push(arr.trim().split(':'));
                });
                stylesArr.forEach(function (arr) {
                    objWithStyles[arr[0]] = arr[1].trim();
                });

                return objWithStyles;
            }

            this.getObjectTags();
            for (i = 0, lenObjs = this.objs.length; i < lenObjs; i += 1) {
                obj = this.objs[i];
                allAttr = {};
                for (j = 0, lenAttrs = obj.attributes.length; j < lenAttrs; j += 1) {
                    if (obj.attributes[j].name === 'style') {
                        allAttr.styles = parseStylesToObject(obj.attributes[j].value);
                    } else {
                        allAttr[obj.attributes[j].name] = obj.attributes[j].value;
                    }
                }
                JSONObject.objs.push(allAttr);
            }
            return JSON.stringify(JSONObject);
        }
    };
    /**
     *  @description Assign JSONObject to global variable
     */
    window.onload = function () {
        window.JSONObject = DOMObjectToJSON.getJSONObject();
    };
}());