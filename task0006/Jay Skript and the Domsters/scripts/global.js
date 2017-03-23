/**
 * Created by Yilin on 2016/5/10.
 */

//添加onload事件
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }
    else {
        oldonload();
        func();
    }
}

//在目标元素后面添加元素
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(targetElement==parent.lastChild){
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

//给元素添加类
function addClass(element,value){
    if(!element.className){
        element.className=value;
    }
    else {
        element.className=element.className+" "+value;
    }
}

//给当前页面添加id和header的背景
function highlightPage(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var headers=document.getElementsByTagName("header");
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i= 0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1){
            //addClass(this,"here");
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
            var guitaristi="url(images/guitarist"+i+".png)";
            document.getElementById(linktext).getElementsByTagName("header")[0].style["backgroundImage"]=guitaristi;
        }
    }
}
addLoadEvent(highlightPage);

//移动元素/动画
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById)return false;
    if(!document.getElementById(elementID))return false;
    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if((xpos==final_x)&&(ypos==final_y)){
        return true;
    }
    if(xpos<final_x){
        var dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if(xpos>final_x){
        var dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if(ypos<final_y){
        var dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if(ypos>final_y){
        var dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

//准备滑动动画
function prepareSlideshow(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("intro"))return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.png");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links=document.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination=this.getAttribute("href");
            if(destination=="index.html"){
                moveElement("preview",0,0,5);
            }
            if(destination=="about.html"){
                moveElement("preview",-150,0,5);
            }
            if(destination=="photos.html"){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
    var frame=document.createElement("img");
    frame.setAttribute("src","images/frame.png");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.insertBefore(frame,preview);
}
addLoadEvent(prepareSlideshow);

//章节选择
function showSection(id){
    var sections=document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id")==id){
            sections[i].style.display="block";
        }
        else {
            sections[i].style.display="none";
        }
    }
}
function prepareInternalnav(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0)return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;     //将sectionId赋给links[i]作为一个属性就可以被传值到showSection函数，否则局部变量无法赋值到函数外部
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

//创建图片占位符
function preparePlaceholder(){
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("imagegallery"))return false;
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.png");
    placeholder.setAttribute("alt","my image gallery");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var desctext=document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery=document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

//选择图片
function showPic(whichpic){
    if(!document.getElementById("placeholder"))return true;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(!document.getElementById("description"))return false;
    if(whichpic.getAttribute("title")){
        var text=whichpic.getAttribute("title");
    }
    else {
        text="";
    }
    var description=document.getElementById("description");
    if(description.firstChild.nodeType==3){
        description.firstChild.nodeValue=text;
    }
    return false;
}
function prepareGallery(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("imagegallery"))return false;
    var links=document.getElementById("imagegallery").getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return showPic(this);
        }
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//表格隔行变色
function stripeTables(){
    if(!document.getElementsByTagName)return false;
    var tables=document.getElementsByTagName("table");
    for(var i=0;i<tables.length;i++){
        var odd=false;
        var rows=tables[i].getElementsByTagName("tr");
        for(var j=0;j<rows.length;j++){
            if(odd==true){
                addClass(rows[j],"odd");
                odd=false;
            }
            else {
                odd=true;
            }
        }
    }
}

//鼠标扫过表格某行时变色提示
function highlightRows(){
    if(!document.getElementsByTagName)return false;
    var rows=document.getElementsByTagName("tr");
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function(){
            addClass(this,"highlight");//为什么这里把this换成row[i]会报错:事件触发时for循环已经结束，此时i==rows.length,用row[i]自然会报错
        }
        rows[i].onmouseout=function(){
            this.className=this.oldClassName;
        }
    }
}

//解释表格中缩写信息
function displayAbbreviations(){
    if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)return false;
    var abbreviations=document.getElementsByTagName("abbr")
    if(abbreviations.length<1)return false;
    var defs=new Array();
    for(var i=0;i<abbreviations.length;i++){
        var current_abbr=abbreviations[i];
        if(current_abbr.childNodes.length<1)continue;
        var definition=current_abbr.getAttribute("title");
        var key=current_abbr.lastChild.nodeValue;
        defs[key]=definition;
    }
    var dlist=document.createElement("dl");
    for(key in defs){
        var definition=defs[key];
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length<1)return false;
    var header=document.createElement("h3");
    var header_text=document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles=document.getElementsByTagName("article");
    if(articles.length<1)return false;
    var container=articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

//聚焦
function focusLabels(){
    if(!document.getElementsByTagName)return false;
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for"))continue;
        labels[i].onclick=function(){
            var id=this.getAttribute("for");
            if(!document.getElementById(id))return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}
addLoadEvent(focusLabels);

//为不支持placeholder属性的浏览器编写该属性
function resetFields(whichform){
    if(Modernizr.input.placeholder)return;
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit")continue;
        var chek=element.placeholder||element.getAttribute("placeholder");
        if(!check)continue;
        element.onfocus=function(){
            var text=this.placeholder||this.getAttribute("placeholder");
            if(this.value==text){
                this.className="";
                this.value="";
            }
        }
        element.onblur=function(){
            if(this.value==""){
                this.className="placeholder";
                this.value=this.placeholder||this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
}
function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetFields(thisform);
    }
}
addLoadEvent(prepareForms);