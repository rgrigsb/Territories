using UnityEngine;
using System.Collections;
using System.Collections.Generic;
namespace Territories
{
	public class Player : MonoBehaviour {
		public PlayDeck deck;
		public List<Card> hand;
		
		public enum TurnPhase {
			Upkeep,
			Draw,
			PlayInitial,
			Attack,
			Defend,
			PlayFinal
			//subject to change
		}
		public TurnPhase currentPhase;
		public void EndPhase()
		{
			if (currentPhase == TurnPhase.PlayFinal)
				currentPhase = TurnPhase.Upkeep;
			else
				currentPhase++;
		}
		
		public List<Card> drawCards(int num)
		{
			List<Card> cards = new List<Card>();
			for (int i = 0; i < num; i++)
			{
				cards.Add(deck.DrawRandom());
			}
			return cards;
		}
		
		// Use this for initialization
		void Start () {
			currentPhase = TurnPhase.Upkeep;
			hand = new List<Card>();
			
		}
		
		// Update is called once per frame
		void Update () {
		
		}
		
		
	}
}