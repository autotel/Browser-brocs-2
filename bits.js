
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
function Clickable(pos){
	this.pos=pos;
	if(!this.pos)
		this.pos={x:0,y:0};

	this.clickCall=function(){
		console.log("clickCall was not defined for:");
		console.log(this);
	}
	this.hover=false;
	this.sprite=false;

	this.init=function(){
		//fallback sprite is a circle
		if(!this.sprite)
			this.sprite=two.makeCircle(this.pos.x,this.pos.y,10);
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
			this.super.clickCall();
			return false;
		}).on("mouseup",function(){
			return false;
		});
	}
}
//draggable object
function Draggable(){
	if(!this.sprites)
		this.sprites=[];
	if(!this.pos)
		this.pos={x:0,y:0};
	this.dragging=false;
	this.hover=false;
	this.sprite=false;//eliminar esta par reemplazarla por el array sprites
	this.move=function(x,y){
		// for(i in this.sprites){
		// 	this.sprites[i].translation.x=x;
		// 	this.sprites[i].translation.y=y;
		// }
		this.sprite.translation.x=x;
		this.sprite.translation.y=y;
	}
	this.init=function(){
		//fallback sprite is a circle
		if(!this.sprite)
			this.sprite=two.makeCircle(0,0,10);
		this.move(this.pos.x,this.pos.y);
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
};
