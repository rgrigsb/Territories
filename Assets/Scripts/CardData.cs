using UnityEngine;
using System.Collections;


public enum CardType {
	Mortal,
	Deity,
	Structure,
	Miracle,
	Blessing
}

public enum Rarity {
	Common,
	Uncommon,
	Rare,
	Epic,
	Legendary
}

public class CardData {
	public CardType type;
	public Rarity rarity;
	public IDictionary cost;
	public string title = "";
	public string rules = "";
	public string flavor = "";
	public int image = 0;
	public int back = 0;
	public int target = 0;
	public int points = 0;
	public Material material = null;
}