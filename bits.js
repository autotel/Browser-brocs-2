var connectorSize=8;
var brocSize=30;
/*building bits of the building pieces of brocs online
*/
//get the jquery dom addressing string from two id.
var hexPos=Array(6);
for(a=0; a<hexPos.length; a++){
		hexPos[a]={x:Math.cos(((a+0.5)/6)*(Math.PI*2))*brocSize*0.866025,y:Math.sin(((a+0.5)/6)*(Math.PI*2))*brocSize*0.866025}
}

// brocHere=function(){
// 	ret=false;
// 	for (var b = 0; b < brocs.length; b++) {
// 		if(brocs[b].imhere(pointer.pos))
// 			ret=brocs[b]
// 	};
// 	return ret;
// }

domElem=function(me){
	return "#"+me.id;
}

sumPos=function(a,b){
//	console.log(b);
	return {x:a.x+b.x,y:a.y+b.y};
}

//creation of a graphic friendly mouse object
var pointer={
	//pendant: include scroll desphase
	pos:{x:0,y:0},
	dragging:false,
	// onMouseUps:[function(){
	// 	pointer.dragging=false;
	// }],
	// onMouseUp:function(f){
	// 	this.onMouseUps.push(f);
	// },
	mouseUp:function(who){
		// console.log("mouseup:");
		// console.log(who);
		for(drg in this.dragging){
		//	if(isdef(this.dragging.onRelease))
				if(typeof(this.dragging.onRelease)=="function")
					this.dragging.onRelease(who);
			this.dragging=false;
		}
		// for(f=0; f<this.onMouseUps.length;f++){
		// 	console.log("ff");
		// 	//if(typeof(f)=="function")
		// 	this.onMouseUps[f]();
		// }
	}
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
// function Clickable(pos){
// }

//draggable object
function Draggable(){
	// if(!this.sprites)
	// 	this.sprites=[];
	this.ind=false;
	this.main=this;
	this.rad=connectorSize;
	if(!this.pos)
		this.pos={x:0,y:0};
	this.dragging=false;
	this.hover=false;
	this.sprite=false;//eliminar esta par reemplazarla por el array sprites
	this.move=function(pos){
		// for(i in this.sprites){
		// 	this.sprites[i].translation.x=x;
		// 	this.sprites[i].translation.y=y;
		// }
		//console.log(pos);
		this.sprite.translation.x=pos.x;
		this.sprite.translation.y=pos.y;
		this.pos=pos;
		this.moving();//pendant: this works as a sort of event handler for objects prototyped from this. not very elegant
	}
	this.onMouseDown=function(){};
	this.imhere=function(pos){
		if(Math.abs(this.pos.x-pos.x)<this.rad&&Math.abs(this.pos.y-pos.y)<this.rad){
		return true;}else{
			return false;
		}
	}
	this.moving=function(){}
	this.release=function(){
		pointer.mouseUp(this);
	}
	this.init=function(){
		//fallback sprite is a circle
		if(!this.sprite)
			this.sprite=two.makeCircle(0,0,this.rad);
		this.move(this.pos);
		two.update();
		this.elem=$(domElem(this.sprite));
		//attach a this to the dom element to make back-scope
		this.elem[0].main=this;
		//append jquery functions to this object's dom sprite
		//pendiente: this may need to go in the pointer object, isn't it?
		this.elem.on("mouseenter",function(){
			this.main.sprite.fill="rgba(127,127,255,0.7)";
			this.main.hover=true;
		}).on("mouseleave",function(){
			this.main.sprite.fill="rgba(127,127,255,0.3)";
			this.main.hover=false;
			//avoid pieces stuck to mouse. should this be?
			/*this.main.dragging=false;
			this.main.release();
			pointer.dragging=false;*/
		}).on("mousedown",function(){
			this.main.dragging=this.main.hover;
			pointer.dragging=this.main;
			this.main.onMouseDown();
		}).on("mouseup",function(){

			this.main.dragging=false;
			this.main.release();
			pointer.mouseUp(this);
		});
	}
};
