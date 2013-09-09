using UnityEngine;
using System.Collections;

public class CardData {
	public enum Cost_types { Gold, Wood, Iron, light, dark, water };
	public string title = "";
	public string type = "";
	public string rules = "";
	public string flavor = "";
	public int image = 0;
	public int back = 0;
	public int target = 0;
	public int price = 0;
	public int points = 0;
	public IDictionary cost;
	public Material material = null;
}