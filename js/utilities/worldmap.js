// WORLD MAP (LARGE)
// unlike the minimap, the large region map is
// currently just a static image with placeholder art
// but will eventually have game-specific towns and markers

var worldMapCurrentlyVisible = false;

function drawWorldMap() {
    
    canvasContext.drawImage(worldMapPic,100,70);

    // todo: add blips such as a you-are-here arrow
}