<div class="content">

<div class="textdiv">

# New Jersey Institute of Technology: CS 438  
Interactive Computer Graphics

</div>

<div class="textdiv">

## Assignment 3

Due: **Thursday, 11/12/2020, 11.59pm**  

Go to: [Assignment Home](assignment3.html) | [Tasks](task3.html)

Author: Last Name, First Name, Student Number

</div>

<div class="textdiv">

<div class="taskdiv">

### TASKS

There are 3 Tasks. The html-js file pair is named accordingly: (task3.html, task3.js). Additionally, there is a file containing the shaders called "task3.glsl".

**Search for TODO_A3 in the task3.js and task3.glsl** to find the location where to implement the tasks. You will also find the instructions for each task as comments in the code.

### Hints:

*   Note that all angle-values from the GUI-sliders are given in degrees. Low-level functions, like `Math.sin(x)`, however, take **radians** as input. Convert degrees to radiants using

    <div class="codediv">let rad = radians(deg); <span style="font-family: Cambria, serif;">or</span> let rad = deg * Math.PI / 180.0;</div>

*   You can create transformation matrices using the helper-functions in 'math.js'. Recall that to compute a transformation matrix the order matters! Also, note that the functions in 'math.js' take angles in **degrees** as input.
*   In application code, you can multiply a 4x4 matrix with a 3d point/vector by extending the point/vector to a 4d point/vector using the `vec4` structure, e.g.,

    <div class="codediv">let a = vec3(); // defines a 3d structure  
    let b = vec4(a,1); // gives a 4d point with first 3 components taken from a.</div>

*   You can get a 3d point/vector from a 4d structure using the `splice(0,3)` method, e.g.,

    <div class="codediv">let a = vec4(); // defines a 4d structure  
    let b = a.splice(0,3); // obtains first 3 components of a and provides a 3d structure</div>

*   Similarly, in GLSL code, you can extend the objects in the same manner and get their components as

    <div class="codediv">vec4 a = vec4(0,0,0,1);  
    vec3 b = a.xyz;</div>

    [Check out the OpenGL ES 2.0 quick reference card](https://www.khronos.org/opengles/sdk/docs/reference_cards/OpenGL-ES-2_0-Reference-card.pdf) for further overview of the GLSL build-in functionality.
*   Start early! This assignment is more involved.

### Notes:

*   The documentation (below the WebGL canvas) of your soltution also contributes to the grading. If you do not documente your work, points will be deducted.
*   In tasks where your creativity is asked, you are not judged for your artistic skills. Only technical issues influence the grading.
*   If you have questions regarding the assignment, post them on the [CANVAS forum](https://njit.instructure.com/courses/14710/discussion_topics) where they will be answered. **Do not** write emails with individual questions!

</div>

<div class="taskdiv">

### Task 1a: View-Transform (6 points)

Implement the **view-transformation matrix** of the camera. Given the values of `rotx, roty, rotup, dist`, implement a simple control of the location of the camera by computing a transformation matrix for the `eye` location and the `up` vector. To create this transformation, you would need to multiply a number of transforms, and subsequently use it for transform the eye and up. E.g., (be careful, pseudo-code here):

<div class="codediv">M = Ry * Rx * T;  
eye = M * [0,0,0,1].splice(0,3);  
up = M * [0,1,0,0].splice(0,3);</div>

Hint: for better orientation during implementation, turn on the coordinate frame axes (checkbox 'Coord. Frame') and turn off (checkbox in front of the objects) Object 1.

Having the position of the eye and the up vector, you can use the `lookAt` function to determine the view-transform from eye, up, at!

### Task 1b: Perspective Projection (2 points)

Using the given values of `dist, fovy, near, far`, implement the **perspective projection** matrix and replace the standard projection matrix below.

### Task 1c: Orthographic Projection (4 points)

Using the given values, implement the **orthographic projection** matrix and replace the standard projection matrix below. Derive the values for `left, right, top, bottom` from `dist` and `fovy`. Why can't you use the near-value from above? Replace near with appropriate value.

</div>

<div class="taskdiv">

### Task 2a: Transformation to View-Space (4 points)

Hint: Task 2a is to be implemented in the file 'task3.glsl' using GLSL!

Transform the position of the vertex `a_position` to the view space using the model-view matrix. Set the varying `v_pos` with the transformed value. Next, transform the normal-vectors `a_normal` to the view space using the transpose-inverse-view matrix denoted here as `u_normalmat`". Set the varying `v_normal`.

### Task 2b: Phong Reflection Model (6 points)

Hint: Task 2b is to be implemented in the file 'task3.glsl' using GLSL!

Implement the Phong reflection model (Phong lighting). Compute the diffuse, specular, and ambient terms using the input arguments  

<div class="codediv">vec3 V; // normalized vector towards the viewer's eye  
vec3 N; // normalized normal vector of the surface point  
vec3 L; // normalized vector towards the light source  
vec3 r; // distance to the light source  
</div>

and return the shaded color.</div>

<div class="taskdiv">

### Task 3: Material Design (3 points)

Create three new materials and add them to the material manager object. Experiment with the sliders in the GUI and **be creative!** There is no right or wrong material setting for Phong Model, just try to make it look as good as possible.

*   Create a metal-like material, for instance "Polished Copper".
*   Create a glossy material, e.g., "Pearl".
*   Create a matte material, for instance "Pewter".

</div>

</div>

<div class="textdiv">

### Results

Your result should look similar like on the image below:

![](./img/task3.jpg)

</div>

<div class="textdiv">

### WebGL Canvas

<div class="container">

<canvas id="canvas" width="800" height="800">Your browser does not support html5.</canvas>

<div class="uiwrapper">

<div class="uiflex" id="flexleft">

<div class="uiblock"><button onclick="visibility('uicamera');" class="uibox" style="color:white; font-weight: bold; background-color:transparent;">Camera Properties</button>

<div class="uisection" id="uicamera">

<div class="uibox" style="color:white;">Projection:</div>

<div><select class="uibox" id="projectionSelect"><option class="uibox" value="persp">Perspective</option> <option class="uibox" value="ortho">Orthographic</option></select></div>

<div class="uibox" style="color:white;">Eye Rot X:</div>

<div class="uibox" style="color:white;">-90 <input id="rotXSlider" type="range" min="-90" max="90" step="1" value="0"> +90</div>

<div class="uibox" style="color:white;">Eye Rot Y:</div>

<div class="uibox" style="color:white;">-90 <input id="rotYSlider" type="range" min="-90" max="90" step="1" value="0"> +90</div>

<div class="uibox" style="color:white;">Up:</div>

<div class="uibox" style="color:white;">-90 <input id="rotZSlider" type="range" min="-90" max="90" step="1" value="0"> +90</div>

<div class="uibox" style="color:white;">Dist:</div>

<div class="uibox" style="color:white;">0 <input id="distSlider" type="range" min="0" max="10" step="0.1" value="2"> 10</div>

<div class="uibox" style="color:white;">FovY:</div>

<div class="uibox" style="color:white;">1 <input id="fovySlider" type="range" min="1" max="120" step="1" value="90">120</div>

<div class="uibox" style="color:white;">Near:</div>

<div class="uibox" style="color:white;">0.01 <input id="nearSlider" type="range" min="0.01" max="4.99" step="0.01" value="0.1"> 5</div>

<div class="uibox" style="color:white;">Far:</div>

<div class="uibox" style="color:white;">   5<input id="farSlider" type="range" min="5" max="25" step="1" value="10">25</div>

</div>

</div>

<div class="uiblock"><button onclick="visibility('uigeometry');" class="uibox" style="color:white; font-weight: bold; background-color: transparent;">Geometry Properties</button>

<div class="uisection" id="uigeometry">

<div class="uibox" style="color:white;">Geometry:</div>

<div><select class="uibox" id="geometrySelect"><option class="uibox" value="sphere">Sphere</option> <option class="uibox" value="cube">Cube</option> <option class="uibox" value="teapot">Utah Teapot</option> <option class="uibox" value="bunny">Stanford Bunny</option></select></div>

<div class="uibox" style="color:white;">Resolution:</div>

<div class="uibox" style="color:white;">1 <input id="resSlider" type="range" min="1" max="10" step="1" value="1"> 10</div>

</div>

</div>

<div class="uiblock"><button onclick="visibility('uiscene');" class="uibox" style="color:white; font-weight: bold; background-color:transparent;">Scene and Drawing Properties</button>

<div class="uisection" id="uiscene">

<div class="uibox" style="color:white;">Speed:</div>

<div class="uibox" style="color:white;">0 <input id="speedSlider" type="range" min="0" max="100" step="1" value="10"> 100</div>

<div class="uibox" style="color:white;">Object 1</div>

<div class="uibox" style="color:white;"><input type="checkbox" id="drawObj1" checked="" \=""> Material: </div>

<div class="uibox" style="color:white;">Object 2</div>

<div class="uibox" style="color:white;"><input type="checkbox" id="drawObj2" checked="" \=""> Material: </div>

<div class="uibox" style="color:white;">Object 3</div>

<div class="uibox" style="color:white;"><input type="checkbox" id="drawObj3" checked="" \=""> Material: </div>

<div class="uibox" style="color:white;">Coord. Frame:</div>

<div class="uibox" style="color:white;"><input type="checkbox" id="drawFrame" \=""></div>

</div>

</div>

</div>

<div class="uiflex" id="flexright">

<div class="uiblock"><button onclick="visibility('uishading');" class="uibox" style="color:white; font-weight: bold; background-color:transparent;">Shading Properties</button>

<div class="uisection" id="uishading">

<div class="uibox" style="color:white;">Shading:</div>

<select class="uibox" id="shadingSelect"><option class="uibox" value="0">Gouraud</option> <option class="uibox" value="1">Phong</option> <option class="uibox" value="2">Flat</option></select></div>

</div>

<div class="uiblock"><button onclick="visibility('uilight');" class="uibox" style="color:white; font-weight: bold; background-color:transparent;">Light Properties</button>

<div class="uisection" id="uilight">

<div class="uibox" style="color:white;">Draw Bulb:</div>

<div class="uibox" style="color:white;"><input type="checkbox" checked="" id="drawBulb" \=""></div>

<div class="uibox" style="color:white;">Light Color:</div>

<div class="uibox" style="color:white;"><input type="range" id="lightSlider" class="uibox" min="0" max="1" step="0.01" value="1" style="width: 80%"> <input type="color" id="lightColor" class="uibox" value="#ffffff" style="width: 35px"></div>

<div class="uibox" style="color:white;">Light Rot X:</div>

<div class="uibox" style="color:white;">-90 <input id="lightRotXSlider" type="range" min="-90" max="90" step="1" value="0"> +90</div>

<div class="uibox" style="color:white;">Light Rot Z:</div>

<div class="uibox" style="color:white;">-90 <input id="lightRotZSlider" type="range" min="-90" max="90" step="1" value="0"> +90</div>

<div class="uibox" style="color:white;">Light Dist:</div>

<div class="uibox" style="color:white;">0 <input id="lightDistSlider" type="range" min="0" max="10" step="0.1" value="1"> +10</div>

</div>

</div>

<div class="uiblock"><button onclick="visibility('uimaterial');" class="uibox" style="color:white; font-weight: bold; background-color:transparent;">Material Properties</button>

<div class="uisection" id="uimaterial">

<div class="uibox" style="color:white;">Material:</div>

<div class="uibox" style="color:white;">Ambient (ka):</div>

<div class="uibox" style="color:white;">

<div class="uibox" style="width: max-content;">rgb: [ 

<div class="uibox" id="kaR" style="width: 25px;">0.10</div>

, 

<div class="uibox" id="kaG" style="width: 25px;">0.10</div>

, 

<div class="uibox" id="kaB" style="width: 25px;">0.10</div>

 ]</div>

<input class="uibox" type="color" id="kaColor" value="#F6B73C" style="width: 35px;"></div>

<div class="uibox" style="color:white;">Diffuse (kd):</div>

<div class="uibox" style="color:white;">

<div class="uibox" style="width: max-content;">rgb: [ 

<div class="uibox" id="kdR" style="width: 25px;">0.10</div>

, 

<div class="uibox" id="kdG" style="width: 25px;">0.10</div>

, 

<div class="uibox" id="kdB" style="width: 25px;">0.10</div>

 ]</div>

<input class="uibox" type="color" id="kdColor" value="#F6B73C" style="width: 35px;"></div>

<div class="uibox" style="color:white;">Specular (ks):</div>

<div class="uibox" style="color:white;">

<div class="uibox" style="width: max-content;">rgb: [ 

<div class="uibox" id="ksR" style="width: 25px;">0.10</div>

, 

<div class="uibox" id="ksG" style="width: 25px;">0.10</div>

, 

<div class="uibox" id="ksB" style="width: 25px;">0.10</div>

 ]</div>

<input class="uibox" type="color" id="ksColor" value="#F6B73C" style="width: 35px;"></div>

<div class="uibox" style="color:white;">Power (q):</div>

<div class="uibox" style="color:white;">

<div class="uibox" id="qsValue" style="width: 25px;">0.1</div>

<input id="qsSlider" type="range" min="1" max="200" step="0.1" value="10" style="width: 155px;"></div>

</div>

</div>

</div>

</div>

</div>

</div>

<div class="textdiv">

### Documentation

TODO_A3: write a short report here.

It should list what you have implemented, as well as a brief discussion and your conclusions.  
Also add as many comments in your code as possible---it will help us in judging your work.

</div>

<div class="textdiv">

### Good luck!

Instructor: Assoc. Prof. Dr. Przemyslaw Musialski  
Email: przemyslaw.musialski@njit.edu  

</div>

</div>