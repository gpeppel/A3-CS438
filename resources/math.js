//////////////////////////////////////////////////////////////////////////////
//
//  math.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

function _argumentsToArray(args) {
    return [].concat.apply([], Array.prototype.slice.apply(args));
}

//----------------------------------------------------------------------------

function radians(degrees) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

function vec2() {
    var result = _argumentsToArray(arguments);

    switch (result.length) {
        case 0: result.push(0.0);
        case 1: result.push(0.0);
    }

    return result.splice(0, 2);
}

function vec3() {
    var result = _argumentsToArray(arguments);

    switch (result.length) {
        case 0: result.push(0.0);
        case 1: result.push(0.0);
        case 2: result.push(0.0);
    }

    return result.splice(0, 3);
}

function vec4() {
    var result = _argumentsToArray(arguments);

    switch (result.length) {
        case 0: result.push(0.0);
        case 1: result.push(0.0);
        case 2: result.push(0.0);
        case 3: result.push(1.0);
    }

    return result.splice(0, 4);
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2() {
    var v = _argumentsToArray(arguments);

    var m = [];
    switch (v.length) {
        case 0:
            v[0] = 1;
        case 1:
            m = [
                vec2(v[0], 0.0),
                vec2(0.0, v[0])
            ];
            break;

        default:
            m.push(vec2(v)); v.splice(0, 2);
            m.push(vec2(v));
            break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat3() {
    var v = _argumentsToArray(arguments);

    var m = [];
    switch (v.length) {
        case 0:
            v[0] = 1;
        case 1:
            m = [
                vec3(v[0], 0.0, 0.0),
                vec3(0.0, v[0], 0.0),
                vec3(0.0, 0.0, v[0])
            ];
            break;

        default:
            m.push(vec3(v)); v.splice(0, 3);
            m.push(vec3(v)); v.splice(0, 3);
            m.push(vec3(v));
            break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat4() {
    var v = _argumentsToArray(arguments);

    var m = [];
    switch (v.length) {
        case 0:
            v[0] = 1;
        case 1:
            m = [
                vec4(v[0], 0.0, 0.0, 0.0),
                vec4(0.0, v[0], 0.0, 0.0),
                vec4(0.0, 0.0, v[0], 0.0),
                vec4(0.0, 0.0, 0.0, v[0])
            ];
            break;

        default:
            m.push(vec4(v)); v.splice(0, 4);
            m.push(vec4(v)); v.splice(0, 4);
            m.push(vec4(v)); v.splice(0, 4);
            m.push(vec4(v));
            break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal(u, v) {
    if (u.length != v.length) { return false; }

    if (u.matrix && v.matrix) {
        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) { return false; }
            for (var j = 0; j < u[i].length; ++j) {
                if (u[i][j] !== v[i][j]) { return false; }
            }
        }
    }
    else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
        return false;
    }
    else {
        for (var i = 0; i < u.length; ++i) {
            if (u[i] !== v[i]) { return false; }
        }
    }

    return true;
}

//----------------------------------------------------------------------------

function add(u, v) {
    var result = [];

    if (u.matrix && v.matrix) {
        if (u.length != v.length) {
            throw "add(): trying to add matrices of different dimensions";
        }

        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                throw "add(): trying to add matrices of different dimensions";
            }
            result.push([]);
            for (var j = 0; j < u[i].length; ++j) {
                result[i].push(u[i][j] + v[i][j]);
            }
        }

        result.matrix = true;

        return result;
    }
    else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
        throw "add(): trying to add matrix and non-matrix variables";
    }
    else {
        if (u.length != v.length) {
            throw "add(): vectors are not the same dimension";
        }

        for (var i = 0; i < u.length; ++i) {
            result.push(u[i] + v[i]);
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function subtract(u, v) {
    var result = [];

    if (u.matrix && v.matrix) {
        if (u.length != v.length) {
            throw "subtract(): trying to subtract matrices" +
            " of different dimensions";
        }

        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                throw "subtract(): trying to subtact matrices" +
                " of different dimensions";
            }
            result.push([]);
            for (var j = 0; j < u[i].length; ++j) {
                result[i].push(u[i][j] - v[i][j]);
            }
        }

        result.matrix = true;

        return result;
    }
    else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
        throw "subtact(): trying to subtact  matrix and non-matrix variables";
    }
    else {
        if (u.length != v.length) {
            throw "subtract(): vectors are not the same length";
        }

        for (var i = 0; i < u.length; ++i) {
            result.push(u[i] - v[i]);
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function mult(u, v) {
    var result = [];

    if (u.matrix && v.matrix) {
        if (u.length != v.length) {
            throw "mult(): trying to add matrices of different dimensions";
        }

        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                throw "mult(): trying to add matrices of different dimensions";
            }
        }

        for (var i = 0; i < u.length; ++i) {
            result.push([]);

            for (var j = 0; j < v.length; ++j) {
                var sum = 0.0;
                for (var k = 0; k < u.length; ++k) {
                    sum += u[i][k] * v[k][j];
                }
                result[i].push(sum);
            }
        }

        result.matrix = true;

        return result;
    }

    if (u.matrix && (u.length == v.length)) {
        for (var i = 0; i < v.length; i++) {
            var sum = 0.0;
            for (var j = 0; j < v.length; j++) {
                sum += u[i][j] * v[j];
            }
            result.push(sum);
        }
        return result;
    }

    else {
        if (u.length != v.length) {
            throw "mult(): vectors are not the same dimension";
        }

        for (var i = 0; i < u.length; ++i) {
            result.push(u[i] * v[i]);
        }

        return result;
    }
}

multiplyMatrices = function (a, b) {
  
    // TODO - Simplify for explanation
    // currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337
    
    var result = [];
    
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  
    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    result[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    result[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    result[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    result[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    return result;
  }
  
multiplyArrayOfMatrices = function (matrices) {
  
    var inputMatrix = matrices[0];
    
    for(var i=1; i < matrices.length; i++) {
      inputMatrix = multiplyMatrices(inputMatrix, matrices[i]);
    }
    
    return inputMatrix;
  }

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate(x, y, z) {
    if (Array.isArray(x) && x.length == 3) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][3] = x;
    result[1][3] = y;
    result[2][3] = z;

    return result;
}

//----------------------------------------------------------------------------

function rotate(angle, axis) {
    if (!Array.isArray(axis)) {
        axis = [arguments[1], arguments[2], arguments[3]];
    }

    var v = normalize(axis);

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos(radians(angle));
    var omc = 1.0 - c;
    var s = Math.sin(radians(angle));

    var result = mat4(
        vec4(x * x * omc + c, x * y * omc - z * s, x * z * omc + y * s, 0.0),
        vec4(x * y * omc + z * s, y * y * omc + c, y * z * omc - x * s, 0.0),
        vec4(x * z * omc - y * s, y * z * omc + x * s, z * z * omc + c, 0.0),
        vec4()
    );

    return result;
}

function rotateX(theta) {
    var c = Math.cos(radians(theta));
    var s = Math.sin(radians(theta));
    var rx = mat4(1.0, 0.0, 0.0, 0.0,
        0.0, c, -s, 0.0,
        0.0, s, c, 0.0,
        0.0, 0.0, 0.0, 1.0);
    return rx;
}
function rotateY(theta) {
    var c = Math.cos(radians(theta));
    var s = Math.sin(radians(theta));
    var ry = mat4(c, 0.0, s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0);
    return ry;
}
function rotateZ(theta) {
    var c = Math.cos(radians(theta));
    var s = Math.sin(radians(theta));
    var rz = mat4(c, -s, 0.0, 0.0,
        s, c, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);
    return rz;
}


//----------------------------------------------------------------------------

function scalem(x, y, z) {
    if (Array.isArray(x) && x.length == 3) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt(eye, at, up) {
    if (!Array.isArray(eye) || eye.length != 3) {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if (!Array.isArray(at) || at.length != 3) {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if (!Array.isArray(up) || up.length != 3) {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if (equal(eye, at)) {
        return mat4();
    }

    var v = normalize(subtract(at, eye));  // view direction vector
    var n = normalize(cross(v, up));       // perpendicular vector
    var u = normalize(cross(n, v));        // "new" up vector

    v = negate(v);

    var result = mat4(
        vec4(n, -dot(n, eye)),
        vec4(u, -dot(u, eye)),
        vec4(v, -dot(v, eye)),
        vec4()
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho(left, right, bottom, top, near, far) {
    if (left == right) { throw "ortho(): left and right are equal"; }
    if (bottom == top) { throw "ortho(): bottom and top are equal"; }
    if (near == far) { throw "ortho(): near and far are equal"; }

    const w = right - left;
    const h = top - bottom;
    const d = far - near;

    const result = mat4();
    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;
    result[0][3] = -(left + right) / w;
    result[1][3] = -(top + bottom) / h;
    result[2][3] = -(near + far) / d;

    return result;
}

//----------------------------------------------------------------------------

function frustum(left, right, bottom, top, near, far) {
    if (left == right) { throw "frustum(): left and right are equal"; }
    if (bottom == top) { throw "frustum(): bottom and top are equal"; }
    if (near == far) { throw "frustum(): near and far are equal"; }
    
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const nf = 1 / (far - near);

    const result = mat4();
    result[0][0] = 2 * near * rl;
    result[1][1] = 2 * near * tb;
    result[0][2] = (right + left) * rl;
    result[1][2] = (top + bottom) * tb;
    result[2][2] = -(far + near) * nf;
    result[3][2] = -1;
    result[2][3] = -2 * far * near * nf;
    result[3][3] = 0.0;

    return result;
  }

//----------------------------------------------------------------------------
//
//  Perspective Function
//
function perspective(fovy, aspect, near, far) {
    if (near == far) { throw "perspective(): near and far are equal"; }    
    if (aspect == 0) { throw "perspective(): aspect == 0"; }

    const f = 1.0 / Math.tan(radians(fovy) / 2);
    const d = far - near;

    const result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}


//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose(m) {
    if (!m.matrix) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for (var i = 0; i < m.length; ++i) {
        result.push([]);
        for (var j = 0; j < m[i].length; ++j) {
            result[i].push(m[j][i]);
        }
    }

    result.matrix = true;

    return result;
}

//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot(u, v) {
    if (u.length != v.length) {
        throw "dot(): vectors are not the same dimension";
    }

    var sum = 0.0;
    for (var i = 0; i < u.length; ++i) {
        sum += u[i] * v[i];
    }

    return sum;
}

//----------------------------------------------------------------------------

function negate(u) {
    var result = [];
    for (var i = 0; i < u.length; ++i) {
        result.push(-u[i]);
    }

    return result;
}

//----------------------------------------------------------------------------

function cross(u, v) {
    if (!Array.isArray(u) || u.length < 3) {
        throw "cross(): first argument is not a vector of at least 3";
    }

    if (!Array.isArray(v) || v.length < 3) {
        throw "cross(): second argument is not a vector of at least 3";
    }

    var result = [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0]
    ];

    return result;
}

//----------------------------------------------------------------------------

function length(u) {
    return Math.sqrt(dot(u, u));
}

//----------------------------------------------------------------------------

function normalize(u, excludeLastComponent) {
    if (excludeLastComponent) {
        var last = u.pop();
    }

    var len = length(u);

    if (!isFinite(len)) {
        throw "normalize: vector " + u + " has zero length";
    }

    for (var i = 0; i < u.length; ++i) {
        u[i] /= len;
    }

    if (excludeLastComponent) {
        u.push(last);
    }

    return u;
}

//----------------------------------------------------------------------------

function mix(u, v, s) {
    if (typeof s !== "number") {
        throw "mix: the last paramter " + s + " must be a number";
    }

    if (u.length != v.length) {
        throw "vector dimension mismatch";
    }

    var result = [];
    for (var i = 0; i < u.length; ++i) {
        result.push((1.0 - s) * u[i] + s * v[i]);
    }

    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

function scale(s, u) {
    if (!Array.isArray(u)) {
        throw "scale: second parameter " + u + " is not a vector";
    }

    var result = [];
    for (var i = 0; i < u.length; ++i) {
        result.push(s * u[i]);
    }

    return result;
}

//----------------------------------------------------------------------------
//
//
//

function flatten(v) {
    if (v.matrix === true) {
        v = transpose(v);
    }

    var n = v.length;
    var elemsAreArrays = false;

    if (Array.isArray(v[0])) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array(n);

    if (elemsAreArrays) {
        var idx = 0;
        for (var i = 0; i < v.length; ++i) {
            for (var j = 0; j < v[i].length; ++j) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for (var i = 0; i < v.length; ++i) {
            floats[i] = v[i];
        }
    }

    return floats;
}


// ----------------------------------------------------------------------------
function flattenArrays(v, c) {

    if (v.length != c.length) {
        throw "flattenArras: array lengths do not match!";
    }
    // flatten array
    var vertexArray = [];
    for (var i = 0; i < v.length; i++) {
        for (var j = 0; j < v[i].length; j++) {
            vertexArray.push(v[i][j]);
        }
        for (var j = 0; j < c[i].length; j++) {
            vertexArray.push(c[i][j]);
        }
    }
    return vertexArray;
}



//----------------------------------------------------------------------------

var sizeof = {
    'vec2': new Float32Array(flatten(vec2())).byteLength,
    'vec3': new Float32Array(flatten(vec3())).byteLength,
    'vec4': new Float32Array(flatten(vec4())).byteLength,
    'mat2': new Float32Array(flatten(mat2())).byteLength,
    'mat3': new Float32Array(flatten(mat3())).byteLength,
    'mat4': new Float32Array(flatten(mat4())).byteLength
};

// new functions 5/2/2015

// printing

function printm(m) {
    if (m.length == 2)
        for (var i = 0; i < m.length; i++)
            console.log(m[i][0], m[i][1]);
    else if (m.length == 3)
        for (var i = 0; i < m.length; i++)
            console.log(m[i][0], m[i][1], m[i][2]);
    else if (m.length == 4)
        for (var i = 0; i < m.length; i++)
            console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
}
// determinants

function det2(m) {

    return m[0][0] * m[1][1] - m[0][1] * m[1][0];

}

function det3(m) {
    var d = m[0][0] * m[1][1] * m[2][2]
        + m[0][1] * m[1][2] * m[2][0]
        + m[0][2] * m[2][1] * m[1][0]
        - m[2][0] * m[1][1] * m[0][2]
        - m[1][0] * m[0][1] * m[2][2]
        - m[0][0] * m[1][2] * m[2][1]
        ;
    return d;
}

function det4(m) {
    var m0 = [
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var m1 = [
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var m2 = [
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var m3 = [
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    return m[0][0] * det3(m0) - m[0][1] * det3(m1)
        + m[0][2] * det3(m2) - m[0][3] * det3(m3);

}

function det(m) {
    if (m.matrix != true) console.log("not a matrix");
    if (m.length == 2) return det2(m);
    if (m.length == 3) return det3(m);
    if (m.length == 4) return det4(m);
}

//---------------------------------------------------------

// inverses

function inverse2(m) {
    var a = mat2();
    var d = det2(m);
    a[0][0] = m[1][1] / d;
    a[0][1] = -m[0][1] / d;
    a[1][0] = -m[1][0] / d;
    a[1][1] = m[0][0] / d;
    a.matrix = true;
    return a;
}

function inverse3(m) {
    var a = mat3();
    var d = det3(m);

    var a00 = [
        vec2(m[1][1], m[1][2]),
        vec2(m[2][1], m[2][2])
    ];
    var a01 = [
        vec2(m[1][0], m[1][2]),
        vec2(m[2][0], m[2][2])
    ];
    var a02 = [
        vec2(m[1][0], m[1][1]),
        vec2(m[2][0], m[2][1])
    ];
    var a10 = [
        vec2(m[0][1], m[0][2]),
        vec2(m[2][1], m[2][2])
    ];
    var a11 = [
        vec2(m[0][0], m[0][2]),
        vec2(m[2][0], m[2][2])
    ];
    var a12 = [
        vec2(m[0][0], m[0][1]),
        vec2(m[2][0], m[2][1])
    ];
    var a20 = [
        vec2(m[0][1], m[0][2]),
        vec2(m[1][1], m[1][2])
    ];
    var a21 = [
        vec2(m[0][0], m[0][2]),
        vec2(m[1][0], m[1][2])
    ];
    var a22 = [
        vec2(m[0][0], m[0][1]),
        vec2(m[1][0], m[1][1])
    ];

    a[0][0] = det2(a00) / d;
    a[0][1] = -det2(a10) / d;
    a[0][2] = det2(a20) / d;
    a[1][0] = -det2(a01) / d;
    a[1][1] = det2(a11) / d;
    a[1][2] = -det2(a21) / d;
    a[2][0] = det2(a02) / d;
    a[2][1] = -det2(a12) / d;
    a[2][2] = det2(a22) / d;

    return a;

}

function inverse4(m) {
    var a = mat4();
    var d = det4(m);

    var a00 = [
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a01 = [
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a02 = [
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a03 = [
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a10 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a11 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a12 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a13 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a20 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a21 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a22 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a23 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[3][0], m[3][1], m[3][2])
    ];

    var a30 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3])
    ];
    var a31 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3])
    ];
    var a32 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3])
    ];
    var a33 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2])
    ];



    a[0][0] = det3(a00) / d;
    a[0][1] = -det3(a10) / d;
    a[0][2] = det3(a20) / d;
    a[0][3] = -det3(a30) / d;
    a[1][0] = -det3(a01) / d;
    a[1][1] = det3(a11) / d;
    a[1][2] = -det3(a21) / d;
    a[1][3] = det3(a31) / d;
    a[2][0] = det3(a02) / d;
    a[2][1] = -det3(a12) / d;
    a[2][2] = det3(a22) / d;
    a[2][3] = -det3(a32) / d;
    a[3][0] = -det3(a03) / d;
    a[3][1] = det3(a13) / d;
    a[3][2] = -det3(a23) / d;
    a[3][3] = det3(a33) / d;

    return a;
}
function inverse(m) {
    if (m.matrix != true) console.log("not a matrix");
    if (m.length == 2) return inverse2(m);
    if (m.length == 3) return inverse3(m);
    if (m.length == 4) return inverse4(m);
}

function normalMatrix(m, flag) {
    var a = mat4();
    a = inverse(transpose(m));
    if (flag != true) return a;
    else {
        var b = mat3();
        for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) b[i][j] = a[i][j];
        return b;
    }

}
