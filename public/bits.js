pp = function(e){
	if(e){
		console.log(e);
	}else{
		console.log(":)");
	}
}
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
//testing purposes, from http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {

	var keys = Object.keys(obj)
	return obj[keys[ keys.length * Math.random() << 0]];
};
sumPos=function(a,b){
//	//console.log(b);
	return {x:a.x+b.x,y:a.y+b.y};
}

//creation of a graphic friendly mouse object
var pointer={
	//pendant: include scroll desphase
	pos:{x:0,y:0},
	dragging:false,
	selected:false,
	// onMouseUps:[function(){
	// 	pointer.dragging=false;
	// }],
	// onMouseUp:function(f){
	// 	this.onMouseUps.push(f);
	// },
	mouseUp:function(who){
		//who willthe element over which mouse was released
		//this.dragging is obviously the piece being dragged
		//console.log("mouseup:");
		//console.log(who);
		//for(drg in this.dragging){
		//	if(isdef(this.dragging.onRelease))
	//	console.log("rel")
				if(who instanceof (Broc) ){
					//console.log(this.dragging)
					this.dragging.onMouseUp(who);
					who.setdragging(false);
				}
				this.dragging=false;
		//}
	},
	mouseMove:function(){
		if(this.dragging){
			this.dragging.move({x:this.pos.x,y:this.pos.y});
		}
		//console.log(pointer.dragging)
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

function Metro(steps, speed, oninstance, oncomplete)
//source:http://www.sitepoint.com/creating-accurate-timers-in-javascript/
{
    // var steps = (length / 100) * (resolution / 10),
    //     speed = length / steps,
    var count = 0,
        start = new Date().getTime();

    function instance()
    {
        if(count++ == steps)
        {
            oncomplete(steps, count);
        }
        else
        {
            oninstance(steps, count);

            var diff = (new Date().getTime() - start) - (count * speed);
            window.setTimeout(instance, (speed - diff));
        }
    }

    window.setTimeout(instance, speed);
}

// function Clickable(pos){
// }
