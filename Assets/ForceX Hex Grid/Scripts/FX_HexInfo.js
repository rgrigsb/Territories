private var ThisHex : GameObject;
var GridPosition : Vector3;
var IsSelected : boolean;
function Start(){
ThisHex = gameObject;
}

function OnMouseEnter(){
ThisHex.renderer.material.color = Color.red;
}

function OnMouseExit(){
	if(!IsSelected){
		ThisHex.renderer.material.color = Color.white;
	}else{
		ThisHex.renderer.material.color = Color.blue;
	}
}