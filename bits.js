
/*building bits of the building pieces of brocs online
*/
//get the jquery dom addressing string from two id.
domElem=function(me){
	return "#"+me.id;
}
//creation of a graphic friendly mouse object
var pointer={
	//pendant: include scroll desphase
	pos:{x:0,y:0},
	dragging:false
}
//array of anchors for ngon creation 
function ngon(px,py,sides,rad){
	var ngon=[];
	for(a=0;a<sides; a++){
		tx=Math.cos((a/sides)*(Math.PI*2))*rad+px;
		ty=Math.sin((a/sides)*(Math.PI*2))*rad+py;
		ngon[a]=new Two.Anchor(tx,ty);
	}
	return ngon;
}
//draggable object
var Handle=function(x,y,sprite){
	//this.parent=this;
	this.pos={x:x,y:y};
	this.dragging=false;
	this.hover=false;
	if(!sprite)
		this.sprite=two.makeCircle(0,0,10);
	else
		this.sprite=sprite;
	
	this.move=function(x,y){
		this.sprite.translation.x=x;
		this.sprite.translation.y=y;
	}
	this.move(x,y);
	two.update();
	this.elem=$(domElem(this.sprite));
	//attach a this to the dom element to make back-scope
	this.elem[0].super=this;
	//append jquery functions to this object's dom sprite
	this.elem.on("mouseenter",function(){
		this.super.sprite.fill="#CCC";
		this.super.hover=true;
	}).on("mouseleave",function(){
		this.super.sprite.fill="rgba(255,255,255,0.2)";
		this.super.hover=false;
		return false;
	}).on("mousedown",function(){
		this.super.dragging=this.super.hover;
		pointer.dragging=this.super;
		return false;
	}).on("mouseup",function(){
		this.super.dragging=false;
		pointer.dragging=false;
		return false;
	});
}




