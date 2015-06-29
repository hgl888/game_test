/*
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var lcj;
(function (lcj) {
    //import Multiname = Shumway.AVM2.ABC.Multiname;
    //import ByteArray = Shumway.AVM2.AS.flash.utils.ByteArray;
    //import forEachPublicProperty = Shumway.AVM2.Runtime.forEachPublicProperty;
    //import construct = Shumway.AVM2.Runtime.construct;
    //export enum AMF0Marker {
    //    NUMBER = 0x00,
    //    BOOLEAN = 0x01,
    //    STRING = 0x02,
    //    OBJECT = 0x03,
    //    NULL = 0x05,
    //    UNDEFINED = 0x06,
    //    REFERENCE = 0x07,
    //    ECMA_ARRAY = 0x08,
    //    OBJECT_END = 0x09,
    //    STRICT_ARRAY = 0x0A,
    //    DATE = 0x0B,
    //    LONG_STRING = 0x0C,
    //    XML = 0x0F,
    //    TYPED_OBJECT = 0x10,
    //    AVMPLUS = 0x11
    //}
    function utf8encode(bytes) {
        var j = 0, str = "";
        while (j < bytes.length) {
            var b1 = bytes[j++] & 0xFF;
            if (b1 <= 0x7F) {
                str += String.fromCharCode(b1);
            }
            else {
                var currentPrefix = 0xC0;
                var validBits = 5;
                do {
                    var mask = (currentPrefix >> 1) | 0x80;
                    if ((b1 & mask) === currentPrefix)
                        break;
                    currentPrefix = (currentPrefix >> 1) | 0x80;
                    --validBits;
                } while (validBits >= 0);
                if (validBits <= 0) {
                    // Invalid UTF8 character -- copying as is
                    str += String.fromCharCode(b1);
                    continue;
                }
                var code = (b1 & ((1 << validBits) - 1));
                var invalid = false;
                for (var i = 5; i >= validBits; --i) {
                    var bi = bytes[j++];
                    if ((bi & 0xC0) != 0x80) {
                        // Invalid UTF8 character sequence
                        invalid = true;
                        break;
                    }
                    code = (code << 6) | (bi & 0x3F);
                }
                if (invalid) {
                    for (var k = j - (7 - i); k < j; ++k) {
                        str += String.fromCharCode(bytes[k] & 255);
                    }
                    continue;
                }
                if (code >= 0x10000) {
                    str += String.fromCharCode((((code - 0x10000) >> 10) & 0x3FF) | 0xD800, (code & 0x3FF) | 0xDC00);
                }
                else {
                    str += String.fromCharCode(code);
                }
            }
        }
        return str;
    }
    //function writeString(ba: egret.ByteArray, s) {
    //    if (s.length > 0xFFFF) {
    //        throw 'AMF short string exceeded';
    //    }
    //    if (!s.length) {
    //        ba.writeByte(0x00);
    //        ba.writeByte(0x00);
    //        return;
    //    }
    //    var bytes = Shumway.StringUtilities.utf8decode(s);
    //    ba.writeByte((bytes.length >> 8) & 255);
    //    ba.writeByte(bytes.length & 255);
    //    for (var i = 0; i < bytes.length; i++) {
    //        ba.writeByte(bytes[i]);
    //    }
    //}
    function readString(ba) {
        var byteLength = (ba.readByte() << 8) | ba.readByte();
        if (!byteLength) {
            return '';
        }
        byteLength = 1000;
        var buffer = new Uint8Array(byteLength);
        for (var i = 0; i < byteLength; i++) {
            buffer[i] = ba.readByte();
        }
        return utf8encode(buffer);
    }
    function writeDouble(ba, value) {
        var buffer = new ArrayBuffer(8);
        var view = new DataView(buffer);
        view.setFloat64(0, value, false);
        for (var i = 0; i < buffer.byteLength; i++) {
            ba.writeByte(view.getUint8(i));
        }
    }
    function readDouble(ba) {
        var buffer = new ArrayBuffer(8);
        var view = new DataView(buffer);
        for (var i = 0; i < buffer.byteLength; i++) {
            view.setUint8(i, ba.readByte());
        }
        return view.getFloat64(0, false);
    }
    function setAvmProperty(obj, propertyName, value) {
        obj.asSetPublicProperty(propertyName, value);
    }
    //export class AMF0 {
    //    public static write(ba: ByteArray, obj) {
    //        switch (typeof obj) {
    //            case 'boolean':
    //                ba.writeByte(AMF0Marker.BOOLEAN);
    //                ba.writeByte(obj ? 0x01: 0x00);
    //                break;
    //            case 'number':
    //                ba.writeByte(AMF0Marker.NUMBER);
    //                writeDouble(ba, obj);
    //                break;
    //            case 'undefined':
    //                ba.writeByte(AMF0Marker.UNDEFINED);
    //                break;
    //            case 'string':
    //                ba.writeByte(AMF0Marker.STRING);
    //                writeString(ba, obj);
    //                break;
    //            case 'object':
    //                if (obj === null) {
    //                    ba.writeByte(AMF0Marker.NULL);
    //                } else if (Array.isArray(obj)) {
    //                    ba.writeByte(AMF0Marker.ECMA_ARRAY);
    //                    ba.writeByte((obj.length >>> 24) & 255);
    //                    ba.writeByte((obj.length >> 16) & 255);
    //                    ba.writeByte((obj.length >> 8) & 255);
    //                    ba.writeByte(obj.length & 255);
    //                    forEachPublicProperty(obj, function (key, value) {
    //                        writeString(ba, key);
    //                        this.write(ba, value);
    //                    }, this);
    //                    ba.writeByte(0x00);
    //                    ba.writeByte(0x00);
    //                    ba.writeByte(AMF0Marker.OBJECT_END);
    //                } else {
    //                    ba.writeByte(AMF0Marker.OBJECT);
    //                    forEachPublicProperty(obj, function (key, value) {
    //                        writeString(ba, key);
    //                        this.write(ba, value);
    //                    }, this);
    //                    ba.writeByte(0x00);
    //                    ba.writeByte(0x00);
    //                    ba.writeByte(AMF0Marker.OBJECT_END);
    //                }
    //                return;
    //        }
    //    }
    //
    //    public static read(ba: ByteArray) {
    //        var marker = ba.readByte();
    //        switch (marker) {
    //            case AMF0Marker.NUMBER:
    //                return readDouble(ba);
    //            case AMF0Marker.BOOLEAN:
    //                return !!ba.readByte();
    //            case AMF0Marker.STRING:
    //                return readString(ba);
    //            case AMF0Marker.OBJECT:
    //                var obj = {};
    //                while (true) {
    //                    var key = readString(ba);
    //                    if (!key.length) break;
    //                    setAvmProperty(obj, key, this.read(ba));
    //                }
    //                if (ba.readByte() !== AMF0Marker.OBJECT_END) {
    //                    throw 'AMF0 End marker is not found';
    //                }
    //                return obj;
    //            case AMF0Marker.NULL:
    //                return null;
    //            case AMF0Marker.UNDEFINED:
    //                return undefined;
    //            case AMF0Marker.ECMA_ARRAY:
    //                var arr = [];
    //                arr.length = (ba.readByte() << 24) | (ba.readByte() << 16) |
    //                (ba.readByte() << 8) | ba.readByte();
    //                while (true) {
    //                    var key = readString(ba);
    //                    if (!key.length) break;
    //                    setAvmProperty(arr, key, this.read(ba));
    //                }
    //                if (ba.readByte() !== AMF0Marker.OBJECT_END) {
    //                    throw 'AMF0 End marker is not found';
    //                }
    //                return arr;
    //            case AMF0Marker.STRICT_ARRAY:
    //                var arr = [];
    //                arr.length = (ba.readByte() << 24) | (ba.readByte() << 16) |
    //                (ba.readByte() << 8) | ba.readByte();
    //                for (var i = 0; i < arr.length; i++) {
    //                    arr[i] = this.read(ba);
    //                }
    //                return arr;
    //            case AMF0Marker.AVMPLUS:
    //                return readAmf3Data(ba, {});
    //            default:
    //                throw 'AMF0 Unknown marker ' + marker;
    //        }
    //    }
    //}
    (function (AMF3Marker) {
        AMF3Marker[AMF3Marker["UNDEFINED"] = 0x00] = "UNDEFINED";
        AMF3Marker[AMF3Marker["NULL"] = 0x01] = "NULL";
        AMF3Marker[AMF3Marker["FALSE"] = 0x02] = "FALSE";
        AMF3Marker[AMF3Marker["TRUE"] = 0x03] = "TRUE";
        AMF3Marker[AMF3Marker["INTEGER"] = 0x04] = "INTEGER";
        AMF3Marker[AMF3Marker["DOUBLE"] = 0x05] = "DOUBLE";
        AMF3Marker[AMF3Marker["STRING"] = 0x06] = "STRING";
        AMF3Marker[AMF3Marker["XML_DOC"] = 0x07] = "XML_DOC";
        AMF3Marker[AMF3Marker["DATE"] = 0x08] = "DATE";
        AMF3Marker[AMF3Marker["ARRAY"] = 0x09] = "ARRAY";
        AMF3Marker[AMF3Marker["OBJECT"] = 0x0A] = "OBJECT";
        AMF3Marker[AMF3Marker["XML"] = 0x0B] = "XML";
        AMF3Marker[AMF3Marker["BYTEARRAY"] = 0x0C] = "BYTEARRAY";
        AMF3Marker[AMF3Marker["VECTOR_INT"] = 0x0D] = "VECTOR_INT";
        AMF3Marker[AMF3Marker["VECTOR_UINT"] = 0x0E] = "VECTOR_UINT";
        AMF3Marker[AMF3Marker["VECTOR_DOUBLE"] = 0x0F] = "VECTOR_DOUBLE";
        AMF3Marker[AMF3Marker["VECTOR_OBJECT"] = 0x10] = "VECTOR_OBJECT";
        AMF3Marker[AMF3Marker["DICTIONARY"] = 0x11] = "DICTIONARY";
    })(lcj.AMF3Marker || (lcj.AMF3Marker = {}));
    var AMF3Marker = lcj.AMF3Marker;
    function readU29(ba) {
        var b1 = ba.readByte();
        if ((b1 & 0x80) === 0) {
            return b1;
        }
        var b2 = ba.readByte();
        if ((b2 & 0x80) === 0) {
            return ((b1 & 0x7F) << 7) | b2;
        }
        var b3 = ba.readByte();
        if ((b3 & 0x80) === 0) {
            return ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | b3;
        }
        var b4 = ba.readByte();
        return ((b1 & 0x7F) << 22) | ((b2 & 0x7F) << 15) | ((b3 & 0x7F) << 8) | b4;
    }
    function writeU29(ba, value) {
        if ((value & 0xFFFFFF80) === 0) {
            ba.writeByte(value & 0x7F);
        }
        else if ((value & 0xFFFFC000) === 0) {
            ba.writeByte(0x80 | ((value >> 7) & 0x7F));
            ba.writeByte(value & 0x7F);
        }
        else if ((value & 0xFFE00000) === 0) {
            ba.writeByte(0x80 | ((value >> 14) & 0x7F));
            ba.writeByte(0x80 | ((value >> 7) & 0x7F));
            ba.writeByte(value & 0x7F);
        }
        else if ((value & 0xC0000000) === 0) {
            ba.writeByte(0x80 | ((value >> 22) & 0x7F));
            ba.writeByte(0x80 | ((value >> 15) & 0x7F));
            ba.writeByte(0x80 | ((value >> 8) & 0x7F));
            ba.writeByte(value & 0xFF);
        }
        else {
            throw 'AMF3 U29 range';
        }
    }
    function readUTF8vr(ba, caches) {
        var u29s = readU29(ba);
        if (u29s === 0x01) {
            return '';
        }
        var stringsCache = caches.stringsCache || (caches.stringsCache = []);
        if ((u29s & 1) === 0) {
            return stringsCache[u29s >> 1];
        }
        var byteLength = u29s >> 1;
        var buffer = new Uint8Array(byteLength);
        for (var i = 0; i < byteLength; i++) {
            buffer[i] = ba.readByte();
        }
        var value = utf8encode(buffer);
        stringsCache.push(value);
        return value;
    }
    //function writeUTF8vr(ba: ByteArray, value, caches) {
    //    if (value === '') {
    //        ba.writeByte(0x01); // empty string
    //        return;
    //    }
    //
    //    var stringsCache = caches.stringsCache || (caches.stringsCache = []);
    //    var index = stringsCache.indexOf(value);
    //    if (index >= 0) {
    //        writeU29(ba, index << 1);
    //        return;
    //    }
    //    stringsCache.push(value);
    //
    //    var bytes = Shumway.StringUtilities.utf8decode(value);
    //    writeU29(ba, 1 | (bytes.length << 1));
    //    for (var i = 0; i < bytes.length; i++) {
    //        ba.writeByte(bytes[i]);
    //    }
    //}
    function readAmf3Data(ba, caches) {
        var marker = ba.readByte();
        switch (marker) {
            case 1 /* NULL */:
                return null;
            case 0 /* UNDEFINED */:
                return undefined;
            case 2 /* FALSE */:
                return false;
            case 3 /* TRUE */:
                return true;
            case 4 /* INTEGER */:
                return readU29(ba);
            case 5 /* DOUBLE */:
                return readDouble(ba);
            case 6 /* STRING */:
                return readUTF8vr(ba, caches);
            case 8 /* DATE */:
                return new Date(readDouble(ba));
            case 10 /* OBJECT */:
                console.log("fuck");
                return "";
                var u29o = readU29(ba);
                if ((u29o & 1) === 0) {
                    return caches.objectsCache[u29o >> 1];
                }
                if ((u29o & 4) !== 0) {
                    throw 'AMF3 Traits-Ext is not supported';
                }
                var traits, objectClass;
                if ((u29o & 2) === 0) {
                    traits = caches.traitsCache[u29o >> 2];
                    objectClass = traits.class;
                }
                else {
                    traits = {};
                    var aliasName = readUTF8vr(ba, caches);
                    traits.className = aliasName;
                    objectClass = aliasName && lcj.aliasesCache.names[aliasName];
                    traits.class = objectClass;
                    traits.isDynamic = (u29o & 8) !== 0;
                    traits.members = [];
                    var slots = objectClass && objectClass.instanceBindings.slots;
                    for (var i = 0, j = u29o >> 4; i < j; i++) {
                        var traitName = readUTF8vr(ba, caches);
                        var slot = null;
                        for (var j = 1; slots && j < slots.length; j++) {
                            if (slots[j].name.name === traitName) {
                                slot = slots[j];
                                break;
                            }
                        }
                        traits.members.push(slot ? Multiname.getQualifiedName(slot.name) : Multiname.getPublicQualifiedName(traitName));
                    }
                    (caches.traitsCache || (caches.traitsCache = [])).push(traits);
                }
                var obj = objectClass ? construct(objectClass, []) : {};
                (caches.objectsCache || (caches.objectsCache = [])).push(obj);
                for (var i = 0; i < traits.members.length; i++) {
                    var value = readAmf3Data(ba, caches);
                    obj[traits.members[i]] = value;
                }
                if (traits.isDynamic) {
                    while (true) {
                        var key = readUTF8vr(ba, caches);
                        if (!key.length)
                            break;
                        var value = readAmf3Data(ba, caches);
                        setAvmProperty(obj, key, value);
                    }
                }
                return obj;
            case 9 /* ARRAY */:
                var u29o = readU29(ba);
                if ((u29o & 1) === 0) {
                    return caches.objectsCache[u29o >> 1];
                }
                var arr = [];
                (caches.objectsCache || (caches.objectsCache = [])).push(arr);
                var densePortionLength = u29o >> 1;
                while (true) {
                    var key = readUTF8vr(ba, caches);
                    if (!key.length)
                        break;
                    var value = readAmf3Data(ba, caches);
                    setAvmProperty(arr, key, value);
                }
                for (var i = 0; i < densePortionLength; i++) {
                    var value = readAmf3Data(ba, caches);
                    setAvmProperty(arr, i, value);
                }
                return arr;
            default:
                throw 'AMF3 Unknown marker ' + marker;
        }
    }
    // Also used in linker.ts for registering/retrieving class aliases.
    lcj.aliasesCache = {
        classes: new WeakMap(),
        names: Object.create(null)
    };
    var AMF3 = (function () {
        function AMF3() {
        }
        //public static write(ba: egret.ByteArray, object) {
        //    writeAmf3Data(ba, object, {});
        //}
        AMF3.read = function (ba) {
            return readString(ba);
            return readAmf3Data(ba, {});
        };
        return AMF3;
    })();
    lcj.AMF3 = AMF3;
    AMF3.prototype.__class__ = "lcj.AMF3";
})(lcj || (lcj = {}));
