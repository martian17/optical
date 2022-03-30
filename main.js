/*
     |
-----------
     |

*/
//[x0 x1 x2 x3]

//vec [x0 y0 dx, dy]

let cpyarr = function(arr){
    let a = [];
    for(let i = 0; i < arr.length; i++){
        a[i] = arr[i];
    }
    return a;
};

let vecslope = function(vec){
    return vec[3]/vec[2];
};

let polyslope = function(poly,x){
    let slope = 0;
    for(let i = 1; i < poly.length; i++){
        let coef = poly[i]*i;
        slope += coef*(x**(i-1));
    }
    return slope;
};

let calcpoly = function(poly,x){
    let val = 0;
    for(let i = 0; i < poly.length; i++){
        val += poly[i]*(x**i);
    }
    return val;
};

let newton = function(poly,x){
    let y = calcpoly(poly,x);
    let cnt = 0;
    while(cnt++ < 100 && y > 0.00000001){
        let s = polyslope(poly,x);
        x = x-y/s;
        y = calcpoly(poly,x);
    }
    //y is the error
    return x;
};

let calcIntersect = function(poly,vec){
    let p1 = cpyarr(poly);
    p1[1] -= vecslope(vec);
    p1[0] -= vec[1];
    return newton(poly,vec[0]);
};

let magn = function(v){
    return Math.sqrt(v[0]*v[0]+v[1]*v[1]);
};

let cosvec = function(v1,v2){
    let dot = v1[0]*v2[0] + v1[1]*v2[1];
    return dot/(magn(v1)*magn(v2));
};

let sinvec = function(v1,v2){
    let cos = cosvec(v1,v2);
    return Math.sqrt(1-cos*cos);
};


let vecToAngle = function([x,y]){
    return Math.atan2(y,x);
};

let invertVec = function(a){
    return a.map(v=>-v);
};


let refractVector = function(v1,v2,index,x0,y0){
    let a1 = vecToAngle(v1);
    let a2 = vecToAngle(invertVec(v2));
    //a1 is the incoming angle, a2 is the opposite of normal vector (perpandicular inward angle)
    let diff = a1-a2;
    let a3 = inside+diff*(1/index);
    let dx = Math.cos(a3);
    let dy = Math.sin(a3);
    return [x0,y0,dx,dy];
};

let refeact = function(poly,vec,index){
    //x value of the intersect
    let x_inter = calcIntersect(poly,vec);
    let y_inter = calcpoly(poly,x_inter);
    let slope = polyslope(poly,intersect1);
    //from the slope, calculate the normal vector
    let normal = [-slope,1];
    return refractVector(vec,normal,index,x_inter,y_inter);
};




let calcRay(poly,vec,index){
    let vec2 = refract(poly,vec,index);
    let poly2 = [0];
    let vec3 = refract(poly2,vec2,1/index);
    return [vec2,vec3];
};

let transformer = function(h1,w,h){
    let r = h/h1;
    let dw = w/2;
    let dh = h/2;
    return {
        to:function(x,y){
            [x*r+dw,transformer
            y*r+dh]
        },
        from:function(x,y){//from canvas coord to virtual coord
            
        },
        toOw:function(oncanvas){
            return oncanvas/r;
        },
        toCw:function(real){
            return real*r;
        }
    };
};

let drawLens = function(poly,ctx,T){
    ctx.beginPath();
    for(let i = 0; i < h; i++){
        let y = h;
        let rx = T.toOw();
    }
    ctxx.stroke();
}


let main = function(){
    let canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    let T = transformer(8,500,500);
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    let lens = [3,0,-1,0,4/10,0,10/300];
    let ray1 = [0,5,1,-3];
    let [ray2,ray3] = calcRay(lens,vec1,1.5);
    //transform
    drawLens(lens,ctx,T);
};


/*
let calculateAbberation = function(poly1,incoming,distance){//the distance between the lens and the screen is always 1
    //center of the lens 0,0
    //the screen is at the y negative side
    //the ray originates in the y positive side
    let intersect1 = 
}*/
