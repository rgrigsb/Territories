var EnableWrapping : boolean;
var KeepSymmetrical : boolean;
var Cam1 : Camera;
var CameraHeight : float = 3.0;
var CameraAngle : float = 65;
var CameraSpeed : float = 2;
var HexGrid : GameObject;
var MapSize : Vector2;
var CurrentHex : Vector3;
var GoToHex : Vector3;
var Distance : int;
var InputEnabled : boolean = true;

private var MoveVector : Vector3;
private var pos : Vector3;
private var HexExt : Vector2;
private var HexSize : Vector2;
private var HexInfo : Vector3;
private var MouseHex : RaycastHit;
private var CamOffset : Vector2;
private var Cam2 : Camera;
private var Cam1T : Transform;
private var Cam2T : Transform;
private var SelectedHex : GameObject;
private var MousePos : Vector2;
private var Cam1Lead : boolean;
//var MapGrids = new int[0,0,0];

function Awake(){
if(EnableWrapping){
	KeepSymmetrical = false;
}
GetHexProperties();
GenerateMap();
}

function Start(){
SetupCameras();
}

function SetupCameras(){

	if(EnableWrapping){
		Cam2 = new GameObject("Cam2").gameObject.AddComponent(Camera);
		Cam2.gameObject.AddComponent(GUILayer);
		Cam2.fieldOfView = Cam1.fieldOfView;
		Cam2.clearFlags = CameraClearFlags.Depth;
		Cam2.depth = Cam1.depth + 1;
		
		CamOffset = Vector2((MapSize.x * HexSize.x), MapSize.y * HexSize.y);
	}

Cam1T = Cam1.transform;		
Cam1T.localEulerAngles.x = CameraAngle;
Cam1T.position = Vector3(CamOffset.x * .5, CameraHeight, (HexExt.y * MapSize.y) * .5);
	
	if(EnableWrapping){		
		Cam2T = Cam2.transform;
		Cam2T.position = Cam1T.position;
		Cam2T.rotation = Cam1T.rotation;
	}
}

function GetHexProperties(){
Inst = Instantiate (HexGrid, Vector3.zero, Quaternion.identity);
HexExt = Vector2(Inst.gameObject.collider.bounds.extents.x, Inst.gameObject.collider.bounds.extents.z);
HexSize = Vector2(Inst.gameObject.collider.bounds.size.x, Inst.gameObject.collider.bounds.size.z);
Destroy(Inst);
	if(KeepSymmetrical && (MapSize.y % 2) == 0){
		MapSize.y += 1;
	}
}

function GenerateMap(){
//MapGrids = new int[MapSize.y, MapSize.x];
var HexMap : GameObject = new GameObject("HexMap");
HexMap.transform.position = Vector3.zero;
var odd : boolean;	
	for (h = 0; h < MapSize.y; h++){
		odd = (h % 2) == 0;
		if(odd){
			for(w = 0; w < MapSize.x; w++){
				GW = Instantiate (HexGrid, Vector3.zero, Quaternion.identity);
				GW.transform.position = Vector3(w * ((HexExt.x * 2)), 0, (h * HexExt.y) * 1.5);
				if(h > 1){
					GW.GetComponent(FX_HexInfo).GridPosition = Vector3(w - Mathf.Round((h / 2) + .1),h, -(w - Mathf.Round((h / 2) + .1) + h));
				}else{
					GW.GetComponent(FX_HexInfo).GridPosition = Vector3(w,h, -w);
				}
					GW.transform.parent = HexMap.transform;
			}
		}else{
			if(KeepSymmetrical){
				for(w = 0; w < MapSize.x - 1; w++){
					GW = Instantiate (HexGrid, Vector3.zero, Quaternion.identity);
					GW.transform.position = Vector3(w * ((HexExt.x * 2)) + (HexExt.x), 0, (h * HexExt.y) * 1.5);
					if(h > 2){
						GW.GetComponent(FX_HexInfo).GridPosition = Vector3(w - Mathf.Round((h / 2) + .1),h, -(w - Mathf.Round((h / 2) + .1) + h));
					}else{
						GW.GetComponent(FX_HexInfo).GridPosition = Vector3(w,h,-(w + h));
					}
					GW.transform.parent = HexMap.transform;
				}			
			}else{
				for(w = 0; w < MapSize.x; w++){
					GW = Instantiate (HexGrid, Vector3.zero, Quaternion.identity);
					GW.transform.position = Vector3(w * ((HexExt.x * 2)) + (HexExt.x), 0, (h * HexExt.y) * 1.5);
					if(h > 2){
						GW.GetComponent(FX_HexInfo).GridPosition = Vector3(w - Mathf.Round((h / 2) + .1),h, -(w - Mathf.Round((h / 2) + .1) + h));
					}else{
						GW.GetComponent(FX_HexInfo).GridPosition = Vector3(w,h,-(w + h));
					}
					GW.transform.parent = HexMap.transform;
				}
			}
		}
	}
}

function Update () {
MousePos = Input.mousePosition;
MousePosition();
CalculateDistance();
	if(EnableWrapping){
		UpdateCameraW();
	}else{
		UpdateCamera();
	}
}

function UpdateCamera(){

	pos = Cam1.ScreenToViewportPoint(MousePos);
	vert = Input.GetAxis("Vertical");
	horiz = Input.GetAxis("Horizontal");

	if(pos.x >= 1 || horiz > 0){
		pos.x = 1;
		MoveVector.x = 1;
	}else if(pos.x <= 0 || horiz < 0){
		pos.x = 0;
		MoveVector.x = -1;
	}else{
		MoveVector.x = 0;
	}
	
	if(pos.y >= 1 || vert > 0){
		pos.y = 1;
		MoveVector.z = 1;
	}else if(pos.y <= 0 || vert < 0){
		pos.y = 0;
		MoveVector.z = -1;
	}else{
		MoveVector.z = 0;
	}

	// Scroll wheel zoom?
	MoveVector.y = Input.GetAxis("Mouse ScrollWheel") * -1000;
	
Cam1T.Translate (MoveVector * (CameraSpeed * Time.deltaTime), Space.World);
}

function UpdateCameraW(){

	pos = Cam1.ScreenToViewportPoint(MousePos);

	if(pos.x >= 1){
		pos.x = 1;
		MoveVector.x = 1;
		if(Cam1T.position.x > Cam2T.position.x){
			Cam1Lead = true;
		}else{
			Cam1Lead = false;
		}
		if(Cam1T.position.x >= (MapSize.x * HexExt.x) * 2.98){
			Cam1T.position.x = (Cam2T.position.x - CamOffset.x);
			Cam1Lead = false;
		}
		if(Cam2T.position.x >= (MapSize.x * HexExt.x) * 2.98){
			Cam2T.position.x = (Cam1T.position.x - CamOffset.x);
			Cam1Lead = true;
		}
		if(Cam1Lead){
			Cam2T.position.x = (Cam1T.position.x - (CamOffset.x - ((1 - HexSize.x) * .5)));
		}else{
			Cam2T.position.x = (Cam1T.position.x + CamOffset.x);
		}
	}else if(pos.x <= 0){
		pos.x = 0;
		MoveVector.x = -1;
		if(Cam1T.position.x > Cam2T.position.x){
			Cam1Lead = false;
		}else{
			Cam1Lead = true;
		}
			if(Cam1T.position.x <= -((MapSize.x * HexExt.x) * .98)){
				Cam1T.position.x = (Cam2T.position.x + CamOffset.x);
				Cam1Lead = false;
			}
			if(Cam2T.position.x <= -((MapSize.x * HexExt.x) * .98)){
				Cam2T.position.x = (Cam1T.position.x + CamOffset.x);
				Cam1Lead = true;
			}
			if(Cam1Lead){
				Cam2T.position.x = (Cam1T.position.x + (CamOffset.x - ((1 - HexSize.x) * .5)));
			}else{
				Cam2T.position.x = (Cam1T.position.x - CamOffset.x);
			}
	}else{
		MoveVector.x = 0;
	}
	
	if(pos.y >= 1){
		pos.y = 1;
		MoveVector.z = 1;
	}else if(pos.y <= 0){
		pos.y = 0;
		MoveVector.z = -1;
	}else{
		MoveVector.z = 0;
	}

Cam1T.Translate (MoveVector * (CameraSpeed * Time.deltaTime), Space.World);
Cam2T.position.y = Cam1T.position.y;
Cam2T.position.z = Cam1T.position.z;
}

function MousePosition(){
var ray1 = Cam1.ScreenPointToRay (MousePos);
	if (Physics.Raycast (ray1, MouseHex, 100)) {
		GoToHex = MouseHex.collider.GetComponent(FX_HexInfo).GridPosition;
		if(Input.GetMouseButtonDown(0)){
			if(SelectedHex != null){
				SelectedHex.renderer.material.color = Color.white;
				SelectedHex.GetComponent(FX_HexInfo).IsSelected = false;
			}
			SelectedHex = MouseHex.collider.gameObject;
			SelectedHex.renderer.material.color = Color.blue;
			SelectedHex.GetComponent(FX_HexInfo).IsSelected = true;
			CurrentHex = GoToHex;
		}
	}
	if(EnableWrapping){
		var ray2 = Cam2.ScreenPointToRay (MousePos);
		if (Physics.Raycast (ray2, MouseHex, 100)) {
			GoToHex = MouseHex.collider.GetComponent(FX_HexInfo).GridPosition;
			if(Input.GetMouseButtonDown(0)){
				if(SelectedHex != null){
					SelectedHex.renderer.material.color = Color.white;
					SelectedHex.GetComponent(FX_HexInfo).IsSelected = false;
				}
				SelectedHex = MouseHex.collider.gameObject;
				SelectedHex.renderer.material.color = Color.blue;
				SelectedHex.GetComponent(FX_HexInfo).IsSelected = true;
				CurrentHex = GoToHex;
			}
		}
	}
}

function CalculateDistance(){
dx = Mathf.Abs(GoToHex.x - CurrentHex.x);
dy = Mathf.Abs(GoToHex.y - CurrentHex.y);
dz = Mathf.Abs(GoToHex.z - CurrentHex.z);

var DistA : int = Mathf.Max(dx, dy, dz);
var DistB : int = Mathf.Abs(DistA - Mathf.Abs(MapSize.x + dy));	

	if(DistA == DistB){
		Distance = DistA;
	}else{
		Distance = Mathf.Min(DistA, DistB);
	}
}

function OnGUI(){
GUI.Label (Rect(20,0,100,20), GoToHex.ToString());
GUI.Label (Rect(20,30,100,20), Distance.ToString("Distance: #."));
}

//End