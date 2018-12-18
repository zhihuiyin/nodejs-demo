function Draw(obj) {
    this.canvasId = obj.canvasId || 'myCanvas'; //canvas的Id
    this.ctx = obj.ctx || null; //canvas对象
    this.canvas_width = obj.canvas_width || 600; //画布宽度
    this.canvas_height = obj.canvas_height || 400; //画布高度
    this.origin_x = obj.origin_x || 300; //中心点横坐标
    this.origin_y = obj.origin_y || 200; //中心点纵坐标
    this.strokeStyle = obj.strokeStyle || 'red'; //画笔颜色
    this.lineWidth = obj.lineWidth || 1; //画笔大小
    this.circle = obj.circle || { //圆的参数
        x: this.origin_x, //圆心横坐标
        y: this.origin_y, //圆心纵坐标
        r: 150 //圆半径
    };
    this.polygon = obj.polygon || { //多角形参数
        n: 5, //图形顶点个数
        type: 0, //图形类型
    };
}

Draw.prototype._init = function () {
    this._createCanvas();
    this._draw({});
};

Draw.prototype._createCanvas = function () { //获取canvas对象，创建绘制2d图像画笔
    this.ctx = document.getElementById(this.canvasId).getContext("2d");
};

Draw.prototype._drawCircle = function (obj_circle) { //画圆函数
    var obj_circle = obj_circle || this.circle;
    this.ctx.beginPath();
    this.ctx.arc(obj_circle.x, obj_circle.y, obj_circle.r, 0, 2 * Math.PI);
};

Draw.prototype._draw = function (obj_polygon) { //绘制多角形或者多边形函数
    var obj_polygon = obj_polygon || this.polygon;
    //设置图形参数
    var start_x = this.circle.x;//圆心x
    var start_y = this.circle.y;//圆心y
    var zoom = this.circle.r;//圆半径
    var ctx = this.ctx;
    var n = obj_polygon.n; //顶点的个数
    var type = obj_polygon.type == 1 ? true : false; //绘制多边形还是多角星形,true 为多边形，false 为多角星形

    var z = this._fibo(n); //求转角个数
    var ratio = type ? 2 / n : z / n * 2; //顶点旋转系数
    ctx.strokeStyle = obj_polygon.strokeStyle || this.strokeStyle; //画笔颜色
    ctx.lineWidth = obj_polygon.lineWidth || this.lineWidth; //画笔宽度

    ctx.clearRect(0, 0, this.canvas_width, this.canvas_height); //先清除画布
    !type && this._drawCircle(this.circle); //根据是不是多角形，判断是否执行画圆操作

    ctx.moveTo(start_x, start_y - zoom); //移动到初始位置
    //绘制图形
    for (let i = 0; i < n + 1; i++) {
        var init_angle; //初始角度
        var move_angle = ratio * Math.PI * i; //移动角度
        init_angle = 1.5 * Math.PI;
        if (n % 4 == 2 && !type) {
            if (i >= n / 2) {
                init_angle = 1.5 * Math.PI + 2 * Math.PI / n;
            }
            if (i == n / 2) {
                ctx.lineTo(start_x, start_y - zoom); //从新回到初始位置
                ctx.moveTo(this._getXY(init_angle, 0,start_x, start_y, zoom).x, this._getXY(init_angle, 0,start_x, start_y, zoom).y); //移动到偏移位置
            }
        }
        var M = this._getXY(init_angle, move_angle, start_x, start_y, zoom); //获得新点坐标
        ctx.lineTo(M.x, M.y); //连接到新点
    }
    ctx.stroke();
    ctx.beginPath(); //绘制完成新开一个路径
};

Draw.prototype._fibo = function (n) { //求转换角个数的递归函数
    if (typeof n != "number" || n < 1) {
        console.log(n)
        return;
    } else if (n === 1 || n === 2) {
        return 0;
    }
    return this._fibo(n - 2) + 1;
};

Draw.prototype._getXY = function (init_angle, move_angle, start_x, start_y, zoom) { //以原点求顶点坐标，zoom 为半径，init_angle 为初始角度，move_angle 为移动角度, start_ 初始点坐标
    return {
        x: zoom * Math.cos(init_angle + move_angle) + start_x,
        y: zoom * Math.sin(init_angle + move_angle) + start_y
    }
}

Draw.prototype._starlike = function(n){//绘制星形
    var ctx = this.ctx;
    var dx = this.origin_x
    var dy = this.origin_y
    var s = 100
    ctx.beginPath();
    var x = Math.sin(0)
    var y = Math.cos(0)
    var dig = Math.PI/15*11
    for (let i = 0; i < n; i++) {
        x = Math.sin(i*dig)
        y = Math.cos(i*dig)
        ctx.lineTo(dx+x*s,dy+y*s)
    }
    ctx.closePath()
    ctx.stroke()
}

window.Draw = Draw;