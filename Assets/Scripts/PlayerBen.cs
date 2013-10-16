using UnityEngine;
using System.Collections;

public class PlayerBen : MonoBehaviour {
	
	public Vector3 moveDestination;
	
	void Awake() {
		moveDestination = transform.position;
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public virtual void TurnUpdate() {
		
	}
}
