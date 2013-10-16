using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GameManager : MonoBehaviour {
	public static GameManager instance;
	
	public GameObject TilePrefab;
	public GameObject UserPlayerPrefab;
	public GameObject AIPlayerPrefab;
	
	public int mapSize = 11;
	
	List <List<Tile>> map = new List<List<Tile>>();
	List <PlayerBen> playerList = new List<PlayerBen>();
	int currentPlayerIndex = 0;
	
	void Awake() {
		instance = this;
	}
	
	// Use this for initialization
	void Start () {
		generateMap();
		generatePlayers();
	}
	
	// Update is called once per frame
	void Update () {
		playerList[currentPlayerIndex].TurnUpdate();
	}
	
	public void nextTurn() {
		currentPlayerIndex = (currentPlayerIndex + 1) % playerList.Count;
		Debug.Log ("Player Index = " + currentPlayerIndex);
	}
	
	public void moveCurrentPlayer(Tile destTile){
		playerList[currentPlayerIndex].moveDestination = destTile.transform.position + 1 * Vector3.up;
	}
	
	void generateMap() {
		map = new List<List<Tile>>();
		
		List<Tile> row;
		Tile tile;
		
		for (int ii = 0; ii < mapSize; ii++) {
			row = new List<Tile>();
			for (int jj = 0; jj < mapSize; jj++) {
				tile = ((GameObject)Instantiate(TilePrefab, new Vector3(ii - Mathf.Floor(mapSize/2),0,-jj + Mathf.Floor(mapSize/2)), Quaternion.Euler(new Vector3()))).GetComponent<Tile>();
				tile.gridPosition = new Vector2(ii, jj);
				row.Add(tile);
			}
			map.Add(row);
		}
	}
	
	void generatePlayers() {
		UserPlayerBen player;
		player = ((GameObject)Instantiate(UserPlayerPrefab, new Vector3(0 - Mathf.Floor(mapSize/2),1,-0 + Mathf.Floor(mapSize/2)), Quaternion.Euler(new Vector3()))).GetComponent<UserPlayerBen>();
		playerList.Add(player);
		
		
		AIPlayerBen ai;
		ai = ((GameObject)Instantiate(AIPlayerPrefab, new Vector3((mapSize-1) - Mathf.Floor(mapSize/2),1,-(mapSize-1) + Mathf.Floor(mapSize/2)), Quaternion.Euler(new Vector3()))).GetComponent<AIPlayerBen>();
		playerList.Add(ai);
	}
}
