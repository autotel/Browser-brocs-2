//draggable object
function Draggable(){
	//over, dragging, selected
	//     sdh
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
		//console.log("paint"+this.selectflag)
		if(this.selectflag & 1<<1){//dragging
			this.sprite.fill="rgba(127,255,255,0.7)";
			this.sprite.stroke="rgb(0,0,0)";
		}else if(this.selectflag & 1<<0){//over
			this.sprite.fill="rgba(127,127,255,0.7)";
		}else if(this.selectflag & 1<<2){//selected
			this.sprite.fill="rgba(127,127,255,0.7)";
			this.sprite.stroke="rgb(0,0,0)";
		}else if(this.selectflag & 1<<4){//selected
			this.sprite.fill="rgba(100,100,100,1)";
			this.sprite.stroke="rgb(0,0,0)";
		}else{
			this.sprite.fill="rgba(0,0,0,0.1)";
			this.sprite.stroke="transparent";
		}
	}
	this.sethover=function(val){
		this.selectflag &= ~(1<<0);//clear
		this.selectflag |= (val<<0);
		this.paint();
	}
	this.ishover=function(){
		//console.log({'ishover':((1<<0)&this.selectflag) >  0})
		this.paint();
		return ((1<<0)&this.selectflag) !=  0;
	};
	this.setdragging=function(val){
		this.selectflag &= ~(1<<1);//clear
		this.selectflag |= (val<<1);
		this.paint();
		if(val){
			pointer.dragging=this;
		}else{
			//console.log("val false")
			//this.sethover(false);

		}
		this.paint();
	}
	this.isdragging=function(){
		//console.log({'isdraggin':((1<<1)&this.selectflag) >  0})
		this.paint();
		return ((1<<1)&this.selectflag) >  0;
	};
	this.setselected=function(val){
		this.selectflag &= ~(1<<2);//clear
		this.selectflag |= (val<<2);
		this.paint();
	};
	this.isselected=function(){
		//console.log({'isselected':((1<<2)&this.selectflag) >  0})
		this.paint();
		return ((1<<2)&this.selectflag) >  0;
	};
	this.onMouseDown=function(){
		//this.setdragging(true);
	};
	this.onMouseUp=function(){}
	this.exitclick=function(){
		//console.log(this.name)
		if(!this.ishover()){
			this.setselected(false);
		}
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
			this.main.sethover(true);
		}).on("mouseleave",function(){
			this.main.sethover(false);
			this.main.setdragging(false);
			//avoid pieces stuck to mouse. should this be?
			/*this.main.dragging=false;
			this.main.release();
			pointer.dragging=false;*/

		}).on("mousedown",function(){

			this.main.onMouseDown();

			this.main.setselected(true);
			this.main.setdragging(true);
			this.main.paint();
			//console.log(this.main.selectflag)
			//this.main.dragging=;
		}).on("mouseup",function(){
			this.main.setdragging(false);
			this.main.onMouseUp();
			pointer.mouseUp(this.main);
		}).on("mousemove",function(){
		//	//console.log("pskdf{aps}")
			pointer.mouseMove();
		});
	}
};
