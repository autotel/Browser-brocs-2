
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
				if(typeof(this.dragging.onRelease)=="function"){
					this.dragging.onRelease(who);
					who.setdragging(false);
				}
		}


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

	//over, dragging, selected
	//     ods
	//     000
	//    +421
	this.selectflag=0;
	this.ind=false;
	this.main=this;
	this.rad=connectorSize;
	if(!this.pos)
		this.pos={x:0,y:0};
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
		this.onMove();//pendant: this works as a sort of event handler for objects prototyped from this. not very elegant
	}

	// this.imhere=function(pos){
	// 	if(Math.abs(this.pos.x-pos.x)<this.rad&&Math.abs(this.pos.y-pos.y)<this.rad){
	// 	return true;}else{
	// 		return false;
	// 	}
	// }
	this.onMove=function(){}

	this.paint=function(){
		console.log("paint"+this.selectflag)
		if(this.selectflag & 1<<0){//over
			this.sprite.fill="rgba(127,127,255,0.7)";
		}else if(this.selectflag & 1<<1){//dragging
			this.sprite.fill="rgba(127,127,255,0.7)";
			this.sprite.stroke="rgb(0,0,0)";
		}else if(this.selectflag & 1<<2){//selected
			this.sprite.fill="rgba(127,127,255,0.7)";
			this.sprite.stroke="rgb(0,0,0)";
		}else{
			this.sprite.fill="rgba(0,0,0,0.1)";
			this.sprite.stroke="transparent";
		}
	}
	this.sethover=function(val){
		this.selectflag &= 0xfe;
		this.selectflag |= (val<<0);
		this.paint();
	}
	this.ishover=function(){
		//console.log({'ishover':(true<<0 & this.selectflag) >  0})
		this.paint();
		return (true<<0 & this.selectflag) >  0;
	};
	this.setdragging=function(val){
		this.selectflag &= 0xfd;
		this.selectflag |= (val<<1);
		if(val){
			pointer.dragging=this;
			this.onMouseDown();
		}else{
			this.sethover(false);
		}
		this.paint();
	}
	this.setselected=function(val){
		this.selectflag &= 0xfb;
		this.selectflag |= (val<<2);
		this.paint();
	};
	this.isselected=function(){
		this.paint();
		return (true<<2 & this.selectflag) >  0;
	};
	this.onMouseDown=function(){
		//this.setdragging(true);
		this.paint();
	};
	this.onMouseUp=function(){}
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
			this.main.sethover(true);
		}).on("mouseleave",function(){
			this.main.sethover(false);
			//avoid pieces stuck to mouse. should this be?
			/*this.main.dragging=false;
			this.main.release();
			pointer.dragging=false;*/
		}).on("mousedown",function(){
			this.main.onMouseDown();
			this.main.setselected(true);
			this.main.setdragging(this.main.ishover());
			console.log(this.main.selectflag)
			//this.main.dragging=;
		}).on("mouseup",function(){
			this.main.setdragging(false);
			this.main.onMouseUp();
		});
	}
};
