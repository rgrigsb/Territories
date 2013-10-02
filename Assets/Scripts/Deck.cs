using UnityEngine;
using System.Threading;
using System.Collections;
using System.Collections.Generic;

public class Deck : MonoBehaviour {
	public string deckName;
	public List<Card> cards;
	protected int MAX_CARDS = 60;
	protected int MIN_CARDS = 33;
	
	public List<Card> AddCard(Card toAdd)
	{
		if(cards.Count < MAX_CARDS)
			cards.Add(toAdd);
		
		return cards;
	}
	
	public List<Card> RemoveCard(Card toRemove)
	{
		cards.Remove(toRemove);
		return cards;
	}
	
	protected GameObject CreateCard(Card toCreate)
	{
		return new GameObject(toCreate.ToString());
	}
	
	
	public List<GameObject> Search()
	{
		List<GameObject> objs = new List<GameObject>();
		for (int i = 0; i < cards.Count; i++)
		{
			objs.Add(this.CreateCard(cards[i]));
		}
		return objs;
		
	}
	
}

public class DiscardPile : Deck {
	
	
	public Card Draw(string Name){
		//this is certainly, absolutely not right
		return cards.Find(t => t.ToString() == Name);
	}
	
}

public class PlayDeck : Deck {
	

	public bool IsValid()
	{
		return cards.Count <= MAX_CARDS && cards.Count >= MIN_CARDS;
	}
	
	public List<Card> Shuffle()
	{
		cards.Shuffle();
		return cards;
	}
	
	public Card DrawRandom() 
	{
		return cards[Random.Range(0, cards.Count)];
	}
	
			
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}

static class Extensions
{
	public static void Shuffle<T>(this IList<T> list)
	{
	  int n = list.Count;
	  while (n > 1)
	  {
	    int k = Random.Range(0, n);
	    n--;
	    T value = list[k];
	    list[k] = list[n];
	    list[n] = value;
	  }
	}
}