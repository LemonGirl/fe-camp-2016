/**
 * Created by Yilin on 2017/3/5.
 */

class clock{
	constructor(id){
		// clock元素
		this.container = document.getElementById(id);
		// 分钟刻度线容器
		this.minLinesWrap = this.container.querySelector('.minLines');
		// 小时刻度线容器
		this.hourLinesWrap = this.container.querySelector('.hourLines');
		// 数字容器
		this.numbersWrap = this.container.querySelector('.numbers');
		// 指针容器
		this.pointersWrap = this.container.querySelector('.pointers');
	}

	/**
	 * 绘制时钟刻度线
	 * @param wrap 刻度线的父容器
	 * @param linesNum 刻度线的数量
	 * @param translateX 刻度线在X轴方向上的偏移量
	 */
	drawLines(wrap, linesNum, translateX){
		let gap = 360/linesNum;
    	let strHtml = '';
    	for(let i=0; i<linesNum; i++){
    	    strHtml += `<li style="transform:rotate(${i*gap}deg) translate(${translateX}px,-50%)"></li>`;
    	}
    	wrap.innerHTML = strHtml;
	}

	/**
	 * 绘制时钟数字
	 * @param wrap 数字的父容器
	 */
	drawNumbers(wrap){
		let wrapWidth = wrap.clientWidth;
		let radius = wrapWidth / 2;

    	let strHtml = '';
    	for(let i=1; i<=12; i++){
    		// 3点的位置为0°
    	    let myAngle = (i-3)/6 * Math.PI;
	
			// 确定数字所处的坐标值，圆的参数方程
    	    let myX = radius + radius*Math.cos(myAngle), // x=r+rcos(θ)
    	        myY = radius + radius*Math.sin(myAngle); // y=r+rsin(θ)
	
    	    strHtml += `<li style="left:${myX}px; top:${myY}px">${i}</li>`;
    	}
    	wrap.innerHTML = strHtml;
	}

	move(){
		// 定义时针、分针和秒针
		let hourPointer = this.pointersWrap.querySelector('.hour'),
        minPointer = this.pointersWrap.querySelector('.min'),
        secPointer = this.pointersWrap.querySelector('.sec');

        // 1秒钟刷新一次指针位置
    	setInterval(function(){
    	    let now = new Date(),
    	        hour = now.getHours(),
    	        min = now.getMinutes(),
    	        sec = now.getSeconds();
	
			// 计算时针、分针、秒针与0°的夹角
    	    let secAngle = sec*6 - 90,  // s*6-90
    	        minAngle = min*6 + sec*0.1 - 90,  // m*6+s*0.1-90
    	        hourAngle = hour*30 + min*0.5 - 90;  // h*30+m*0.5 - 90
	
    	    secPointer.style.transform = 'rotate(' + secAngle + 'deg)';
    	    minPointer.style.transform = 'rotate(' + minAngle + 'deg)';
    	    hourPointer.style.transform = 'rotate(' + hourAngle + 'deg)';
	
    	    document.title = hour + ':' + min + ':' + sec;
	
    	},1000);
	}

	init(){
		this.drawLines(this.minLinesWrap, 60, 88);
		this.drawLines(this.hourLinesWrap, 12, 82);
		this.drawNumbers(this.numbersWrap);
		this.move();
	}
}

const myclock = new clock('myClock');
myclock.init();