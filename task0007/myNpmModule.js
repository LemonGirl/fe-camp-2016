/** 
 * Created by YiLin Huang
 * 2017 02 28
 */

/**
 * 改变元素样式
 * isAdd = 0 时为删除样式，isAdd != 0 时为增加样式
 * el为目标元素
 * className为待操作样式名称
 */
function changeStyle(isAdd, el, className){

    let classArr = el.className.split(' ');
    let thisIndex = classArr.indexOf(className);

    // 增加样式
    if(isAdd){
    	// 原本没有样式
        if(el.className == ''){
            el.className = className;
        }
        // 原本有样式但不包含新加的样式
        else if(thisIndex < 0){
            el.className = el.className + ' ' + className;
        }
    }
    // 删除样式
    else{
    	// 原本没有要删除的样式时弹出提示框
        if(thisIndex < 0){
            alert (`There does not have class ${className}!`);
        }
        // 原本只有要删除的这一个样式
        else if(el.className === className){
            el.className = '';
        }
        else{
            classArr.splice(thisIndex, 1);
            el.className = classArr.join(' ');
        }
    }
}


/**
 * 计算某年某月的每一个星期几距离今天的天数
 * year为目标年份
 * month为目标月份
 * day为目标周几
 * 结果返回每个目标日的日期和距离今日的天数，是一个对象数组
 */
function timeArr(year, month, day){
    // 结果存在数组timeList中
    let timeList = [];
    // daysOfMonth表示目标月份的天数
    let daysOfMonth = new Date(year,month,0).getDate();
    // 数组dateOfMonth存放目标月份的日期
    let dateOfMonth = [];
    // 数组dayOfDate存放目标月份每个日期对应周几
    let dayOfDate = [];

    for(let i = 1; i<=daysOfMonth; i++){
        dateOfMonth.push(year + "/" + month + "/" + i);
        dayOfDate.push(new Date(dateOfMonth[i-1]).getDay());
    }

    for(let i = 0; i<daysOfMonth; i++){
        if(dayOfDate[i]===day){

            let timeNow = new Date();
            let timeThen = new Date(dateOfMonth[i]);

            // 计算天数
            let daysApart = Math.floor((timeNow - timeThen.getTime())/(1000*60*60*24));

            timeList.push({date:dateOfMonth[i],daysBefore:daysApart});
        }
    }
    
    return timeList;
}