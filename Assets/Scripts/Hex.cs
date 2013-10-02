using UnityEngine;
using System.Collections;

public class Point {
	public int xPos;
	public int yPos;
	public Point(int x, int y)
	{
		this.xPos = xPos; this.yPos=yPos;
	}
}

public class Hex {
	public Resource tileResource;
	public int population;
	public string type="";
	public Material material;
	//public Point position = Point(0,0);
	//public Player owner;
	public Object resident;	//Creature or Card instead of Object?
	public Object[] structures; //Strucutre or Card instead of Object?
	public int turnsToCapture;
		
}
