using UnityEngine;
using System.Collections;

public class GuiButton : MonoBehaviour {
	//private FX_Map_Manager gameManager;
	//private Player player;
	
	
	string confirmationMsg = null;
	delegate void confirmAction();
	confirmAction onConfirm = null;
	// Use this for initialization
	void OnGUI () {
		// Container coords
		int bottom = Screen.height-100;
		int right = Screen.width - 110;
		
		// Make a background box
		GUI.Box(new Rect(right, bottom, 100, 85), "Player Actions");
		
		
		// Make the first button.
		if(GUI.Button(new Rect(right+10, bottom+30, 80, 20), "Pass")){
			confirmationMsg = "This will end the current phase, are you sure?";
			onConfirm = new confirmAction(confirmPassPhase);
		}
		
		if(GUI.Button(new Rect(right+10, bottom+55, 80, 20), "End Turn")){
			confirmationMsg = "This will end your entire turn, are you sure?";
			onConfirm = new confirmAction(confirmEndTurn);
		}
		
		if(false == string.IsNullOrEmpty(confirmationMsg))
		{
			GUI.ModalWindow(0, new Rect((Screen.width-200)/2, (Screen.height-100)/2, 200, 100), confirmBox, "Confirm Action");
		}
	}
	
	void confirmBox(int id){
		//(FX_Map_Manager)FindObjectOfType(typeof(FX_Map_Manager)).InputEnabled = false;
		//gameManager.InputEnabled = false;
		//GUI.Box(new Rect(centerW, centerH, 200, 100), "Are you sure?");
		GUI.Label(new Rect(10, 20, 180, 50), this.confirmationMsg);
		if(GUI.Button(new Rect(10, 70, 80, 20), "OK"))
		{
			this.onConfirm();	
			this.confirmationMsg = null;
		}
		if(GUI.Button(new Rect(110, 70, 80, 20), "Cancel"))
		{
			this.confirmationMsg = null;
			this.onConfirm = null;
		}
	}
	
	void confirmPassPhase()
	{
		// Progress to next phase
		Debug.Log("On confirm end phase");
	}
	
	void confirmEndTurn()
	{
		// Progress to next player's turn
		Debug.Log("On confirm end turn");
	}
}