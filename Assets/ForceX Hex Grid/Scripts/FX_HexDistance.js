var Cam1 : Camera;
var Cam2 : Camera;
var CurPos : Vector3;
var GoTo : Vector3;
var Distance : int;
var HexSize : float = 0.866;
private var MouseGrid : RaycastHit;
private var HexInfo : Vector3;
private var SelectedHex : GameObject;
private var MapWidth : int;

function Start(){
//MapWidth = GetComponent(FX_HexMapGen).MapWidth;
Cam2.transform.position.x = Cam1.transform.position.x - (MapWidth * HexSize);
}

function Update () {
Cam2.transform.position.x = Cam1.transform.position.x - (MapWidth * HexSize);
MousePosition1();
MousePosition2();
HexDistance();
}

function MousePosition1(){
var ray = Cam1.ScreenPointToRay (Input.mousePosition);
	if (Physics.Raycast (ray, MouseGrid, 100)) {
		GoTo = MouseGrid.collider.GetComponent(FX_HexInfo).GridPosition;
		if(Input.GetMouseButtonDown(0)){
			if(SelectedHex != null){
				SelectedHex.renderer.material.color = Color.white;
				SelectedHex.GetComponent(FX_HexInfo).IsSelected = false;
			}
			SelectedHex = MouseGrid.collider.gameObject;
			SelectedHex.renderer.material.color = Color.blue;
			SelectedHex.GetComponent(FX_HexInfo).IsSelected = true;
			CurPos = GoTo;
		}
	}
}

function MousePosition2(){
var ray = Cam2.ScreenPointToRay (Input.mousePosition);
	if (Physics.Raycast (ray, MouseGrid, 100)) {
		GoTo = MouseGrid.collider.GetComponent(FX_HexInfo).GridPosition;
		if(Input.GetMouseButtonDown(0)){
			if(SelectedHex != null){
				SelectedHex.renderer.material.color = Color.white;
				SelectedHex.GetComponent(FX_HexInfo).IsSelected = false;
			}
			SelectedHex = MouseGrid.collider.gameObject;
			SelectedHex.renderer.material.color = Color.blue;
			SelectedHex.GetComponent(FX_HexInfo).IsSelected = true;
			CurPos = GoTo;
		}
	}
}

function HexDistance(){
//The distance from our CurPos to our GoTo
dx = Mathf.Abs(GoTo.x - CurPos.x);
dy = Mathf.Abs(GoTo.y - CurPos.y);
dz = Mathf.Abs(GoTo.z - CurPos.z);

var DistA : int = Mathf.Max(dx, dy, dz);
var DistB : int = Mathf.Abs(DistA - Mathf.Abs(MapWidth + dy));	

	if(DistA == DistB){
		Distance = DistA;
	}else{
		Distance = Mathf.Min(DistA, DistB);
	}
}

function OnGUI(){
	if(MouseGrid.collider != null){

		GUI.Label (Rect(20,0,100,20), GoTo.ToString());
		GUI.Label (Rect(20,30,100,20), Distance.ToString("Distance: #."));
}
}
//End