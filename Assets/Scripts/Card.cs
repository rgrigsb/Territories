using UnityEngine;
using System.Collections;


public abstract class Card : MonoBehaviour {
	public CardData cardInfo;
	
	// Use this for initialization
	void Start () {
		cardInfo = new CardData();
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public void Discard()
	{
		
	}
	
	public abstract void Play();
}
