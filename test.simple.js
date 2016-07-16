

function BaseType (state, options, traitList) {
    this.getState = function () {
        return state;
    };
    this.getOptions = function () {
        return options;
    };
    this.getTraitList = function () {
        return traitList;
    };
}
BaseType.prototype = (new BaseType({}, {}, []));


function SpecificType(state) {
    this.getType = function () {
        return state.type;
    };
}
function UnspecificType() {}


function withTypeTrait(state) {
    this.getType = function () {
        return state.type;
    };
}
function withFooTrait(state) {
    this.getFoo = function () {
        return state.foo;
    };
}
function withBarTrait(state) {
    this.getBar = function () {
        return state.bar;
    };
}
var myType;


var MyExtendedType = SpecificType.extendType(BaseType/*, {}*/);

myType = new MyExtendedType({type: "my_extended_type"});

console.log("Object.keys(myType) : ", Object.keys(myType));

console.log("(myType instanceof MyExtendedType) ? ", (myType instanceof MyExtendedType));
console.log("(myType instanceof BaseType) ? ", (myType instanceof BaseType));
console.log("(myType instanceof SpecificType) ? ", (myType instanceof SpecificType));

console.log("myType.getType() : ", myType.getType());


var MyComposedType = UnspecificType.withTraits(withTypeTrait, withFooTrait, withBarTrait);

myType = new MyComposedType({type: "my_composed_type", foo: "foo foo", bar: "bar bar bar"});

console.log("Object.keys(myType) : ", Object.keys(myType));

console.log("(myType instanceof MyComposedType) ? ", (myType instanceof MyComposedType));
console.log("(myType instanceof BaseType) ? ", (myType instanceof BaseType));
console.log("(myType instanceof UnspecificType) ? ", (myType instanceof UnspecificType));

console.log("myType.getType() : ", myType.getType());
console.log("myType.getFoo() : ", myType.getFoo());
console.log("myType.getBar() : ", myType.getBar());


var MyCompositeType = SpecificType.extendType(BaseType).withTraits(withFooTrait, withBarTrait);

myType = new MyCompositeType({type: "my_composite_type", foo: "foo", bar: "bar bar"});

console.log("Object.keys(myType) : ", Object.keys(myType));

console.log("(myType instanceof MyCompositeType) ? ", (myType instanceof MyCompositeType));
console.log("(myType instanceof BaseType) ? ", (myType instanceof BaseType));
console.log("(myType instanceof SpecificType) ? ", (myType instanceof SpecificType));

console.log("myType.getType() : ", myType.getType());
console.log("myType.getFoo() : ", myType.getFoo());
console.log("myType.getBar() : ", myType.getBar());





var BaseTypeModule = (function () {

    var
        baseTypeState     = {},
        baseTypeOptions   = {},
        baseTypeTraitList = [];

    function BaseType (state, options, traitList) {
        this.getState = function () {
            return state;
        };
        this.getOptions = function () {
            return options;
        };
        this.getTraitList = function () {
            return traitList;
        };
    }
    BaseType.prototype = createType(baseTypeState, baseTypeOptions, baseTypeTraitList);

    function createType(state, options, traitList) {
        return (new BaseType(state, options, traitList))
    }

    function isBaseType(type) {
        return (type instanceof BaseType);
    }

    function getConstructor() {
        return BaseType;
    }

    return {
        create          : createType,
        isBaseType      : isBaseType,
        getConstructor  : getConstructor
    };

}());


var MyTypeModule = (function (BaseTypeModule) {

    var
        MyType = SpecificType.extendType(BaseTypeModule.getConstructor()/*, {}*/);

    function SpecificType(state) {
        this.getType = function () {
            return state.type;
        };
    }

    function createType(state, options, traitList) {
        return (new MyType(state, options, traitList))
    }

    function isMyType(type) {
        return (type instanceof MyType);
    }

    function getConstructor() {
        return MyType;
    }

    return {
        create          : createType,
        isMyType        : isMyType,
        getConstructor  : getConstructor
    };

}(BaseTypeModule));


var myType = MyTypeModule.create({type: "mytype"});

console.log("Object.keys(myType) : ", Object.keys(myType));

console.log("MyTypeModule.isMyType ? ", MyTypeModule.isMyType(myType));
console.log("BaseTypeModule.isBaseType ? ", BaseTypeModule.isBaseType(myType));


