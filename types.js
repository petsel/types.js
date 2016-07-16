(function (Function, Array) {

    var
        function_prototype = Function.prototype,

        isFunction = (function (TYPEOF_FUNCTION) {
            return function (type) {

                return ((typeof type        == TYPEOF_FUNCTION)
                    &&  (typeof type.call   == TYPEOF_FUNCTION)
                    &&  (typeof type.apply  == TYPEOF_FUNCTION)
                );
            };
        }(typeof function_prototype)),

        isObject = function (type) {
            return (!!type && (typeof type == "object"));
        },

        array_from = (isFunction(Array.from) && Array.from) || (function (array_prototype_slice) {
            return function (type) {

                return array_prototype_slice.call(type);
            };
        }(Array.prototype.slice));

    function extendType(SuperType, protoType) {
        var
            BaseType = this;

        protoType = (isObject(protoType) && protoType) || (isFunction(SuperType) && (new SuperType));

        function SubType() {
            var
                type = this;

            if (isFunction(SuperType)) {
                SuperType.apply(type, arguments);
            }
            if (isFunction(BaseType)) {
                BaseType.apply(type, arguments);
            }
            return type;
        }

        if (protoType) {
            SubType.prototype = protoType;
        }
        return SubType;
    }/*

    function withTraits() {
        var
          Type      = this,
          traitList = array_from(arguments);

        function composeType() {
            var
              type/ * = this* /,
              args = arguments;

            if (this instanceof composeType) {

                type = composeType.apply(null, args);

            } else if (isFunction(Type)) {

                type = (new Type(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]));
              //type = (new Type);

              //traitList.unshift(Type);
                applyTraitList(traitList, args, type)
            }
            return type; // [Object | undefined]
        }
        return composeType;
    }*/

    function withTraits() {
        var
            Type      = this,

            protoType = (isFunction(Type) && (new Type)),
            traitList = array_from(arguments);

        traitList.unshift(Type);

        function ComposedType() {
            var
              type = this;

            applyTraitList(traitList, arguments, type);

            return type;
        }

        if (protoType) {
            ComposedType.prototype = protoType;
        }
        return ComposedType;
    }

    function applyTraitList(traitList, args, type) {
        traitList.forEach(function (Trait) {
            if (isFunction(Trait)) {

                Trait.apply(type, args);
            }
        });
    }
    function_prototype.extendType = extendType;
    function_prototype.withTraits = withTraits;

    return Function;

}(Function, Array));


/*


  [https://closure-compiler.appspot.com/home]


- Simple          -   658 byte
(function(g,d){function h(a,b,c){a.forEach(function(a){e(a)&&a.apply(c,b)})}var f=g.prototype,e=function(a){return function(b){return typeof b==a&&typeof b.call==a&&typeof b.apply==a}}(typeof f),k=e(d.from)&&d.from||function(a){return function(b){return a.call(b)}}(d.prototype.slice);f.extendType=function(a,b){function c(){e(a)&&a.apply(this,arguments);e(d)&&d.apply(this,arguments);return this}var d=this;if(b=!!b&&"object"==typeof b&&b||e(a)&&new a)c.prototype=b;return c};f.withTraits=function(){function a(){h(c,arguments,this);return this}var b=e(this)&&new this,c=k(arguments);c.unshift(this);b&&(a.prototype=b);return a};return g})(Function,Array);


*/
