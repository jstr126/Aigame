// game.js — main game scene
// Player logic lives in player.js. Edit that file to change how the player feels.

// How far a tile's edge can push the player before snapping — prevents corner snagging
var TILE_BIAS = 32;

var config = {
  type: Phaser.AUTO,
  backgroundColor: "#87ceeb",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 400,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false, // set to true to see hitboxes
    },
  },
  scene: { preload: preload, create: create, update: update },
};

var game = new Phaser.Game(config);

var player;   // the player sprite (set in create)
var cursors;  // arrow key input (set in create)

function preload() {
  // Load the tilemap and its tileset image
  this.load.tilemapTiledJSON("map", "maps/level2.tmj");
  this.load.image("Terrain", "assets/2d/Terrain/Terrain (16x16).png");

  // Load the tiling background
  this.load.image("bg", "assets/2d/Background/Grid.png");

  // Load the player assets (defined in player.js)
  playerPreload(this);
}

function create() {
  // Tiling background — fills the whole map
  this.add.tileSprite(0, 0, 1280, 400, "bg").setOrigin(0, 0).setScrollFactor(0);

  // Build the tilemap
  var map = this.make.tilemap({ key: "map" });
  var tiles = map.addTilesetImage("Terrain", "Terrain");

  // Create the ground layer — collide with all tiles that have collision set in Tiled
  var groundLayer = map.createLayer("ground", tiles, 0, 0);
  groundLayer.setCollisionByProperty({ collides: true });

  // Adjust tile bias to prevent corner snagging at speed
  this.physics.world.TILE_BIAS = TILE_BIAS;

  // Find the spawn point defined in Tiled (object named "player" in layer "spawnpoints")
  var spawnpoints = map.getObjectLayer("spawnpoints").objects;
  var spawn = spawnpoints.find(function (o) { return o.name === "player"; });

  // Create the player at the spawn point (defined in player.js)
  player = playerCreate(this, spawn.x, spawn.y, groundLayer);

  // Set world bounds to match the full map size
  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  player.setCollideWorldBounds(true);

  // Camera follows the player, bounded to the map
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(player, true, 0.1, 0.1);

  // Set up arrow key input
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Run player movement and animation logic (defined in player.js)
  playerUpdate(player, cursors);
}
