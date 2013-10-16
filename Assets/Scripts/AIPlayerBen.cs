using UnityEngine;
using System.Collections;

public class AIPlayerBen : PlayerBen {
	
	public float moveSpeed = 10.0f;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public override void TurnUpdate ()
	{
		if (Vector3.Distance (moveDestination, transform.position) > 0.1f) {
			transform.position += (moveDestination - transform.position).normalized * moveSpeed * Time.deltaTime;
			
			if (Vector3.Distance (moveDestination, transform.position) <= 0.1f) {
				transform.position = moveDestination;
				GameManager.instance.nextTurn ();
			}
		} else {
			moveDestination = new Vector3(0 - Mathf.Floor (GameManager.instance.mapSize/2),1,-0 + Mathf.Floor (GameManager.instance.mapSize/2));
		}
		
		base.TurnUpdate ();
	}
}
