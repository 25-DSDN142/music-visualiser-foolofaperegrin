
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
 
 
   // Draw animated wallpaper background first
  //draw_animated_wallpaper(vocal, drum, bass, other, counter);
  background(0, 0, 0);
 if (mouseIsPressed){
  spawnSand(10);
 }
 let seconds = counter/60;
 console.log(seconds);
  // Draw sand simulation
 //if(songIsPlaying) {
    fallingSand(drum, counter, seconds);
    if(seconds < bridgeTime){spawnMusicSand(vocal, drum, bass, other, counter, seconds);}
    drawSand(drum, bass);
    if(seconds > verseTime && seconds < doubletimeTime){spawnMusicWater(vocal, drum, bass, other, counter, seconds);}
    //removeBassSand(drum, counter, seconds);
    //spawnMusicWater(vocal, drum, bass, other, counter, seconds);
 //}
  

 

   //Variable Setups
   let mid_y = height/2;
   let mid_x = width / 2;
    

}





//Falling Sand Setup~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let cellSize = 8; 
let gridWidth = 540/cellSize;   
let gridHeight = 960/cellSize; 


let sandGrid = [];
let plantColorGrid = []; // Track each plant's color



let sandcolor = 'rgb(233, 221, 172)';   // Color 1
let sandcolor2 = 'rgb(244, 197, 150)';  // Color 2
let sandcolor3 = 'rgb(212, 178, 143)';   // Color 3
let sandcolor4 = 'rgb(255, 224, 208)';    // Color 4
let sandcolor5 = 'rgb(244, 199, 85)';    // Color 5
let sandcolor6 = 'rgb(255, 236, 183)';    // Color 6
let sandcolor7 = 'rgb(171, 226, 213)';    // Color 7
let sandcolor8 = 'rgb(255, 230, 0)';    // Color 8
let sandcolor9 = 'rgb(7, 76, 85)';    // solid structure
let sandcolor10 = 'rgb(101, 150, 255)';    // water
let sandcolor11 = 'rgb(48, 185, 53)';    // 
let blockColor = 'rgb(245, 245, 245)';  
let blockColor2 = 'rgba(86, 24, 63, 0.69)';    // block

// Plant colors
let plantColors = [
  'rgb(232, 140, 12)',   //wood, array no. 3
  'rgb(180, 111, 156)',   
  'rgb(253, 222, 49)',   
  'rgba(236, 191, 87, 0.39)',  
  'rgba(237, 167, 114, 0.42)',    
  'rgba(243, 207, 118, 0.26)',
  'rgb(191, 0, 194)',
  'rgb(225, 255, 0)'

];

/*
43 seconds = verse
120 seconds = Bridge
188 seconds = doubletime
265 seconds = Reprise
*/

let verseTime = 43;
let bridgeTime = 1;
let doubletimeTime = 188;
let repriseTime = 265;



//Falling Sand Function
function setupSandGrid() {

  //sets up grid coordinate system using two arrays created for x and y based on pixel dimensions
//0 = empty, 1-8= sand, 10= water, 9= solid, 11-15= different plant colors

  for (let y = 0; y < gridHeight; y++) {
    sandGrid[y] = [];
    plantColorGrid[y] = [];
    for (let x = 0; x < gridWidth; x++) {
      sandGrid[y][x] = 0; //each cell empty
      plantColorGrid[y][x] = 0; 
    }
    }

  // Add solid ground at the bottom
  for (let x = 0; x < gridWidth; x++) {
    sandGrid[gridHeight-1][x] = 9;
    }
  
  
  }


function fallingSand(drum, counter, seconds){
  //This function runs from bottom to top along the sandGrid. 
  for (let y = gridHeight - 2; y >= 0; y--) {
    for (let x = 0; x < gridWidth; x++) {

      //Sand into Buildings
      if (sandGrid[y][x] == 18){
        if (sandGrid[y-1][x] == 10){
          sandGrid[y][x] = 10;
          
        }
        else if (sandGrid[y+1][x] == 10){
          sandGrid[y][x] = 10;
          
        }
        else if (sandGrid[y][x-1] == 10){
          sandGrid[y][x] = 10;
          
        } 
        else if (sandGrid[y][x+1] == 10){
          sandGrid[y][x] = 10;
          
        }
      } 

      if (sandGrid[y][x] > 0 && sandGrid[y][x] < 9 && y > gridHeight - 10) {
        if (sandGrid[y-10][x] > 0 && sandGrid[y-9][x] > 0 && sandGrid[y-8][x] > 0 && sandGrid[y-7][x] > 0 && sandGrid[y-6][x] > 0 && sandGrid[y-5][x] > 0 && sandGrid[y-4][x] > 0 && sandGrid[y-3][x] > 0 && sandGrid[y-2][x] > 0 && sandGrid[y-1][x] > 0 && sandGrid[y-1][x] != 18 && sandGrid[y-1][x] != 10) {
          // Add this condition to exclude checking 9s
          if (sandGrid[y-10][x] != 9 && sandGrid[y-9][x] != 9 && sandGrid[y-8][x] != 9 && sandGrid[y-7][x] != 9 && sandGrid[y-6][x] != 9 && sandGrid[y-5][x] != 9 && sandGrid[y-4][x] != 9 && sandGrid[y-3][x] != 9 && sandGrid[y-2][x] != 9 && sandGrid[y-1][x] != 9) {
            sandGrid[y][x] = 18;
          }
        }
      }
      if (sandGrid[y][x] == 18 && sandGrid[y-5][x] > 0 && y > 5 && sandGrid[y-1][x] != 0) {
        sandGrid[y][x] = 18;
        //sandGrid[y-2][x] = 1;
        sandGrid[y-1][x] = 18;

      if (sandGrid[y][x] == 18 && sandGrid[y-1][x] == 0 && y > 0 && x > 0 && x < gridWidth - 1 && y < gridHeight - 1) {
        sandGrid[y-1][x] = 9;
      }
      


      }
      
      // Sand wind
      let windIntensity = map(drum, 0, 100, 0.01, 3);
      if (sandGrid[y][x] >= 1 && sandGrid[y][x] < 11 && sandGrid[y][x] !== 9 && sandGrid[y][x] !== 10 ) {
        let driftThreshold = map(drum, 0, 100, 0.1, 0.2);
        if (random() < driftThreshold && sandGrid[y+1][x] < 1) {
          // Add random horizontal drift
          let drift = (Math.floor(random(1, 2))) * Math.floor(windIntensity);
          let newX = x + drift;
          let newX2 = x - drift;
          let verticalTumble = Math.floor(random(1, 3));
          
          
          // Check if can fall with drift
          let randomDirection = random(0, 1);
          if (randomDirection < 0.5) {
            if (newX >= 0 && newX < gridWidth && sandGrid[y+1][newX] === 0) {
              sandGrid[y+verticalTumble][newX] = sandGrid[y][x];
              sandGrid[y][x] = 0;
            }
          } else {
            if (newX2 >= 0 && newX2 < gridWidth && sandGrid[y+1][newX2] === 0) {
              sandGrid[y+verticalTumble][newX2] = sandGrid[y][x];
              sandGrid[y][x] = 0;}
          }
        }
        
        //  sand falling 
        if (sandGrid[y+1][x] == 0) {
          sandGrid[y+1][x] = sandGrid[y][x];
          sandGrid[y][x] = 0;
        }
        let randomDirection = random(0, 1);
        if (randomDirection < 0.5) {
        //If there is sand below it, check if it can move diagonally.
         if (x > 0 && sandGrid[y + 1][x - 1] === 0) {
            sandGrid[y + 1][x - 1] = sandGrid[y][x]; // Keep the same color
            sandGrid[y][x] = 0;
          }//LEFT ^
        } else if (randomDirection >= 0.5) {
          if (x < gridWidth - 1 && sandGrid[y + 1][x + 1] === 0) {
            sandGrid[y + 1][x + 1] = sandGrid[y][x]; // Keep the same color
          sandGrid[y][x] = 0;
          }//RIGHT ^
        }
          if (sandGrid[y+1][x] === 10) {
            sandGrid[y+1][x] = sandGrid[y][x]; // Keep the same color
            sandGrid[y][x] = 10;
          }//Sink in water ^
          else if (x > 0 && sandGrid[y + 1][x - 1] === 10) {
            sandGrid[y + 1][x - 1] = sandGrid[y][x]; // Keep the same color
            sandGrid[y][x] = 0;
          }//LEFT ^ 0 = replace water
          else if (x < gridWidth - 1 && sandGrid[y + 1][x + 1] === 10) {
            sandGrid[y + 1][x + 1] = sandGrid[y][x]; // Keep the same color
          sandGrid[y][x] = 0;
          }//RIGHT ^ 0 = replace water
          else if (sandGrid[y+1][x] == 18) {
            sandGrid[y+1][x] = 18; 
            sandGrid[y][x] = 9;
            
          }
          else if (sandGrid[y+1][x] > 10 && sandGrid[y+1][x] != 18) {
            // Sand hits a plant - find first available cell from bottom
            for (let searchY = gridHeight - 1; searchY >= 0; searchY--) {
              if (sandGrid[searchY][x] === 0 || (sandGrid[searchY][x] >= 11 && sandGrid[searchY][x] <= 16)) {
                sandGrid[searchY][x] = sandGrid[y][x];
                sandGrid[y][x] = 0;
                break;
              }
            }
          }
        }

        
          
        
    
        

        

        
      

    //WATER LOGIC
    if (sandGrid[y][x] == 10) {
      //fall down
      if (sandGrid[y+1][x] === 0) {
        sandGrid[y+1][x] = 10;
        sandGrid[y][x] = 0;
      }
      //If can't fall down, try diagonal
      else if (x > 0 && sandGrid[y + 1][x - 1] === 0) {
        sandGrid[y + 1][x - 1] = 10;
        sandGrid[y][x] = 0;
      }
      else if (x < gridWidth - 1 && sandGrid[y + 1][x + 1] === 0) {
        sandGrid[y + 1][x + 1] = 10;
        sandGrid[y][x] = 0;
      } 
      // Water destroys blocks
      else if (sandGrid[y+1][x] === 18) {
        sandGrid[y+1][x] = 10; // Replace block with water
        sandGrid[y][x] = 0;
      }
      else if (x > 0 && sandGrid[y + 1][x - 1] === 18) {
        sandGrid[y + 1][x - 1] = 10; // Replace block with water
        sandGrid[y][x] = 0;
      }
      else if (x < gridWidth - 1 && sandGrid[y + 1][x + 1] === 18) {
        sandGrid[y + 1][x + 1] = 10; // Replace block with water
        sandGrid[y][x] = 0;
      }
      // Water occasionally breaks through plants
      else if (sandGrid[y+1][x] > 10 && sandGrid[y+1][x] < 18) {
        let breakChance = random(0, 1);
        if (breakChance < 0.05) { // 5% chance to break through
          sandGrid[y+1][x] = 10; // Replace plant with water
          sandGrid[y][x] = 0;
        }
      }
      else if (x > 0 && sandGrid[y + 1][x - 1] > 10 && sandGrid[y + 1][x - 1] < 18) {
        let breakChance = random(0, 1);
        if (breakChance < 0.05) { // 5% chance to break through
          sandGrid[y + 1][x - 1] = 10; // Replace plant with water
          sandGrid[y][x] = 0;
        }
      }
      else if (x < gridWidth - 1 && sandGrid[y + 1][x + 1] > 10 && sandGrid[y + 1][x + 1] < 18) {
        let breakChance = random(0, 1);
        if (breakChance < 0.05) { // 5% chance to break through
          sandGrid[y + 1][x + 1] = 10; // Replace plant with water
          sandGrid[y][x] = 0;
        }
      }
      // If can't fall, try horizontal flow
      else {
        //choose random water flow direction
        let direction = (random() < 0.5) ? -1 : 1;
        let newX = x + direction;
        
        // Check boundaries and empty space or blocks
        if (newX >= 0 && newX < gridWidth && (sandGrid[y][newX] == 0 || sandGrid[y][newX] == 18)) {
          sandGrid[y][newX] = 10;
          sandGrid[y][x] = 0;
        }
        // Water occasionally breaks through plants horizontally too
        else if (newX >= 0 && newX < gridWidth && sandGrid[y][newX] > 10 && sandGrid[y][newX] < 18) {
          let breakChance = random(0, 1);
          if (breakChance < 0.03) { // 3% chance for horizontal break through
            sandGrid[y][newX] = 10;
            sandGrid[y][x] = 0;
          }
        }
      }
    }

    

    
    
    //Plant logic 
    if(counter % 2 == 0){
//random plant spawns on sand
if (sandGrid[y][x] < 9 && sandGrid[y][x] > 0) {
        
  let growChance = random(1, 10000);
  if (growChance < 9) {
  if (y > 0) {
      sandGrid[y-1][x] = 11;
      sandGrid[y][x] = 11;
    }
  }
  } 

      if (sandGrid[y][x] > 10 && sandGrid[y][x] < 16) {
        //grow 
        let growChance = map(drum, 0, 100, 0, 1);
        growChance = growChance * random(0, 1);
        if (growChance > 0.55) {
          let growdirection = random(0, 7);
          
          // Pick a plant color
          let randomPlantType = Math.floor(random(12, 16)); 
          



          if (sandGrid[y][x] == 11 && y > 780 && x > 4 && x < gridWidth - 4) {
            sandGrid[y-1][x] = 12;
            //sandGrid[y-2][x] = 12;
            //sandGrid[y-3][x] = 12;
            //sandGrid[y][x-1] = 14;
            //sandGrid[y][x+1] = 13;
           // sandGrid[y-1][x+2] = 11;
            //sandGrid[y-1][x-2] = 11;
          }

          if (sandGrid[y][x] == 12 && y > 780 &&  y < (gridHeight - 10) && x > 4 && x < gridWidth - 4) {
            //sandGrid[y-1][x] = 11;
            //sandGrid[y-2][x] = 11;
            //sandGrid[y-3][x] = 11;  
            
            
          }
          if (sandGrid[y][x] > 12 && sandGrid[y][x] < 16) { 
            let endBranch = random();
            if (endBranch < 0.9) {
              sandGrid[y][x] = 2;
            } else {
              sandGrid[y][x] = 17;
            }
          }
          if (growdirection < 1 && y > 1 && sandGrid[y-1][x+1] == 0) {
            sandGrid[y-1][x+1] = 13; 
            sandGrid[y][x] = 12;
          } else if (growdirection < 5 && growdirection > 1 && x > 0 && y > 1 && sandGrid[y-1][x-1] == 0) {
            sandGrid[y-1][x-1] = 15; 
            sandGrid[y][x] = 12;
          } else if (growdirection < 12 && growdirection > 2 && x < gridWidth - 1 && y > 1 &&sandGrid[y-1][x] == 0) {
            sandGrid[y-1][x] = 15; 
            let RandomGreen = Math.floor(random(0, 1));
            {if(RandomGreen == 0){sandGrid[y][x] = 16;} else {sandGrid[y][x] = 11;}}
            //sandGrid[y][x] = 16;
          }
        }
      }
      
      
      }
    }
  }
}




function drawSand(drum, bass) {

let sC = color(sandcolor);
let sC2 = color(sandcolor2);
let sC3 = color(sandcolor3);
let sC4 = color(sandcolor4);
let sC5 = color(sandcolor5);
let sC6 = color(sandcolor6);
let sC7 = color(sandcolor7);
let sC8 = color(sandcolor8);
let sC9 = color(sandcolor9);
let sC10 = color(sandcolor10);
let sC11 = color(sandcolor11);


let colorDriver = map(drum, 0, 100, 0, 1);


  noStroke();
  let MusicParticleSize = map(drum, 0, 100, 0.9, 3);

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      let screenX = x * cellSize;
      let screenY = y * cellSize;
      
      if (sandGrid[y][x] === 1) {
        let sandcolorLerp = lerpColor(sC, sC2, colorDriver);
        fill(sandcolorLerp);  
        rect(screenX, screenY, cellSize, cellSize);
        fill (sandcolor);
        rect(screenX, screenY, 0.1*cellSize, 0.1*cellSize);
      } else if (sandGrid[y][x] === 2) {
        let sandcolorLerp2 = lerpColor(sC2, sC3, colorDriver);
        fill(sandcolorLerp2); 
        rect(screenX, screenY, cellSize, cellSize);
        fill (sandcolor2);
        rect(screenX, screenY, 0.5*cellSize, 0.5*cellSize);
      } else if (sandGrid[y][x] === 3) {
        let sandcolorLerp3 = lerpColor(sC3, sC4, colorDriver);
        fill(sandcolorLerp3); 
        rect(screenX, screenY, MusicParticleSize*cellSize, MusicParticleSize*cellSize);
        fill (sandcolor3);
        rect(screenX, screenY, 0.5*cellSize, 0.5*cellSize);
      } else if (sandGrid[y][x] === 4) {
        let sandcolorLerp4 = lerpColor(sC4, sC5, colorDriver);
        fill(sandcolorLerp4); 
        rect(screenX, screenY, MusicParticleSize*cellSize, MusicParticleSize*cellSize);
        fill (sandcolor4);
        rect(screenX, screenY, 0.5*cellSize, 0.5*cellSize);
      } else if (sandGrid[y][x] === 5) {
        let sandcolorLerp5 = lerpColor(sC5, sC6, colorDriver);
        fill(sandcolorLerp5); 
        rect(screenX, screenY, cellSize, cellSize);
        fill (sandcolor5);
        rect(screenX, screenY, 0.5*cellSize, 0.5*cellSize);
      } else if (sandGrid[y][x] === 6) {
        let sandcolorLerp6 = lerpColor(sC6, sC7, colorDriver);
        fill(sandcolorLerp6); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 7) {
        let sandcolorLerp7 = lerpColor(sC7, sC8, colorDriver);
        fill(sandcolorLerp7); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 8) {
        let sandcolorLerp8 = lerpColor(sC8, sC9, colorDriver);
        fill(sandcolorLerp8); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 9) {
        fill(255, 255, 255); // Ground!
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 10) {
        fill(sandcolor10); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 11) {
        fill(plantColors[0]); // wood
        rect(screenX, screenY, cellSize, 3*cellSize);
      } else if (sandGrid[y][x] == 12) {
        fill(plantColors[1]);
        rect(screenX, screenY, cellSize, 2*cellSize);
        fill(plantColors[0]);
        rect(screenX, screenY, 0.5*cellSize, 2*cellSize);
      } else if (sandGrid[y][x] === 13) {
        fill(plantColors[2]);
        ellipse(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 14) {
        fill(plantColors[3]);
        ellipse(screenX, screenY, cellSize, 2*cellSize);
      } else if (sandGrid[y][x] === 15) {
        fill(plantColors[4]);
        ellipse(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 16) {
        fill(plantColors[5]);
        ellipse(screenX, screenY, MusicParticleSize*cellSize, 4*cellSize);
      }
      else if (sandGrid[y][x] === 17) {
        
            

        fill(plantColors[6]);
        ellipse(screenX, screenY, 0.5*cellSize, 2*cellSize);
        ellipse(screenX, screenY, 2*cellSize, 0.5*cellSize);
        fill(plantColors[7]);
        ellipse(screenX, screenY, 0.5*cellSize, 0.5*cellSize);
      
      }
      else if (sandGrid[y][x] === 18) {
        fill(blockColor);
        rect(screenX, screenY, 2*cellSize, 3*cellSize);
        fill(2*blockColor);
        rect(screenX, screenY, 1*cellSize, 3*cellSize);
        fill(blockColor2);
        rect(screenX, screenY, 0.5*cellSize, 0.5*cellSize);
        let randomTwinkle = random(0, 1);
        if (randomTwinkle < 0.1) {
          fill(blockColor2);
          ellipse(screenX, screenY, 0.4*cellSize, 0.4*cellSize);
        }
      }
    }
  }
}

function spawnSand(type) {
  console.log("spawnSand");
  // mouse pos to grid
  let gridX = Math.floor(mouseX / cellSize);
  let gridY = Math.floor(mouseY / cellSize);
  
  let brushRadius = 0;
  
  // Spawn sand in radius
  for (let y = gridY - brushRadius; y <= gridY + brushRadius; y++) {
    for (let x = gridX - brushRadius; x <= gridX + brushRadius; x++) {
      // Check if this position is within the brush radius
      let distance = Math.sqrt((x - gridX) * (x - gridX) + (y - gridY) * (y - gridY));
      
      if (distance <= brushRadius && 
          x >= 0 && x < gridWidth && 
          y >= 0 && y < gridHeight)
          if(sandGrid[y][x] === 0) { // Only if cell is empty
          sandGrid[y][x] = type; if(sandGrid[y][x] === 1){sandGrid[y][x] = 1;} }
          
      

  }

  
}

}

function spawnMusicSand(drum, bass, other, counter, seconds ) {
  // Mappings
  let spawnRate = map(other, 0, 100, 0, 0.5);       
  let spawnRadius = map(bass, 0, 100, 0.01, 3);       // Bigger spawn areas
  let spawnIntensity = map(other, 0, 100, 0, 0.5); // Always some spawning
  let musicSandColor = map(drum, 0, 100, 0, 9);

  // Only spawn if intensity is high enough
  if (random() < spawnIntensity) {
    
    // Spawn multiple particles based on spawn rate
    for (let i = 0; i < spawnRate; i++) {
      
      // position in upper  of screen
      let spawnX = random(1, (width));
      let spawnY = random(0, 2);  // upper 
      
      // Convert to grid coordinates
      let gridX = Math.floor(spawnX / cellSize);
      let gridY = Math.floor(spawnY / cellSize);
      
      // Create sand in a small area around the spawn point
      for (let y = gridY - spawnRadius; y <= gridY + spawnRadius; y++) {
        for (let x = gridX - spawnRadius; x <= gridX + spawnRadius; x++) {
          let distance = Math.sqrt((x - gridX) * (x - gridX) + (y - gridY) * (y - gridY));
          
          if (distance <= spawnRadius && 
              x >= 0 && x < gridWidth && 
              y >= 0 && y < gridHeight &&
              sandGrid[Math.floor(y)][Math.floor(x)] === 0) { // Only if cell is empty
            
            // Random color
            //let randomSandColor = Math.floor(random(1, 5));
            sandGrid[Math.floor(y)][Math.floor(x)] = Math.floor(musicSandColor);
          }
        }
      }
    }
  }
}

function spawnMusicWater(vocal, drum, bass, other, counter, seconds ) {
  // Mappings
  let spawnRate = map(other, 0, 100, 0, 0.9);       
  let spawnRadius = 2;      
  let spawnIntensity = map(other, 0, 100, 0, 0.5); // Always some spawning
  //let musicSandColor = map(drum, 0, 100, 0, 9);

  // Only spawn if intensity is high enough
  if (random() < spawnIntensity) {
    
    // Spawn multiple particles based on spawn rate
    for (let i = 0; i < spawnRate; i++) {
      
      // position in upper  of screen
      let spawnX = random(width-1, (0));
      let spawnY = random(0, 2);  // upper 
      
      // Convert to grid coordinates
      let gridX = Math.floor(spawnX / cellSize);
      let gridY = Math.floor(spawnY / cellSize);
      
      // Create sand in a small area around the spawn point
      for (let y = gridY; y <= gridY + spawnRadius; y++) {
        for (let x = gridX; x <= gridX + spawnRadius; x++) {
          let distance = Math.sqrt((x - gridX) * (x - gridX) + (y - gridY) * (y - gridY));
          
          if (distance <= spawnRadius && 
              x >= 0 && x < gridWidth && 
              y >= 0 && y < gridHeight &&
              sandGrid[Math.floor(y)][Math.floor(x)] === 0) { // Only if cell is empty
            
            
            sandGrid[Math.floor(y)][Math.floor(x)] = Math.floor(10);
          }
        }
      }
    }
  }
}

  function removeBassSand(drum, counter, seconds) {
  // Declare removalIntensity outside the if blocks
  let removalIntensity;
  
  removalIntensity = map(drum, 0, 100, 0, 0.25);
  
  
  
  // Map bass to removal radius (how many particles to remove per frame)
  let removalRadius = map(drum, 0, 100, 1, 25);
  
if (seconds < 43) {
    removalRadius = map(drum, 0, 100, 0, 25);
  }
  if (seconds >= 43) {
    removalRadius = map(drum, 0, 100, 0, 50);
  }


  // Only remove if bass is strong enough
  if (random() < removalIntensity) {
    
    // Remove multiple particles based on bass intensity
    for (let i = 0; i < removalRadius; i++) {
      
      // Random position in bottom half of screen
      let removeX = random(0, width);
      let removeY = random(height / 2, height); // Only bottom half
      
      // Convert to grid coordinates
      let gridX = Math.floor(removeX / cellSize);
      let gridY = Math.floor(removeY / cellSize);
      
      // Remove sand in a small area around the removal point
      for (let y = gridY - 2; y <= gridY + 2; y++) {
        for (let x = gridX - 2; x <= gridX + 2; x++) {
          let distance = Math.sqrt((x - gridX) * (x - gridX) + (y - gridY) * (y - gridY));
          
          if (distance <= 2 && 
              x >= 0 && x < gridWidth && 
              y >= 0 && y < gridHeight &&
              sandGrid[y][x] >= 1 && sandGrid[y][x] < 9) { // Only remove sand
            
            sandGrid[y][x] = 0; 
          }
        }
      }
    }
  }
}






