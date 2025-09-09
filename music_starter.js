
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
 
 
   // Draw animated wallpaper background first
  //draw_animated_wallpaper(vocal, drum, bass, other, counter);
  background(0, 0, 0);
 if (mouseIsPressed){
  spawnSand();
 }
  
  // Draw sand simulation
 if(songIsPlaying) {
    fallingSand(drum);
    spawnMusicSand(vocal, drum, bass, other);
    drawSand(drum);
    removeBassSand(drum);
  
  }

  let seconds = counter/60;
  console.log(seconds);
  

   //Variable Setups
   let mid_y = height/2;
   let mid_x = width / 2;
   let hourglassScale = 0.2;

 
//fade wallpaper pattern with overlay


/*let overlayColor = 'rgba(0, 0, 0, 0.64)';
fill(overlayColor);
rect(0, 0, (mid_x*4), (mid_y*4));*/



// Hourglasses
/*
push();
translate(mid_x, mid_y);
scale(hourglassScale, hourglassScale, hourglassScale);

// Hourglass 1 
push();
translate(0, -200);
rotate(counter*(0.01*(0.1*counter)));
Hourglass(0, 0, drum, width);
pop();

// Hourglass 2   
push();
translate(500, 700);
rotate(counter*(0.01*(0.1*counter)));
Hourglass(0, 0, drum, width);
pop();

// Hourglass 3 
push();
translate(-500, 700);
rotate(counter*(0.01*(0.1*counter)));
Hourglass(0, 0, drum, width);
pop();

pop();
   
 
  // display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3); 
*/

   

}



// Wallpaper variables - only what we actually use
let cell_size = 100; //Pattern Block size
let n = 0.5; //Pattern Density
let offset = 150; //Row offset for wallpaper effect

//COLOURS
let color1 = 'rgba(0, 251, 13, 0.95)'; //tri color
let color3 = 'rgba(166, 236, 223, 0.54)'; //ellipse 2 color
let color4 = 'rgba(200, 214, 182, 0.12)'; //ellipse 1 color

//STROKES
let strokeColor1 = 'rgba(219, 213, 184, 0.21)'; //triangle stroke color, tint
let strokeColor2 = 'rgba(209, 208, 136, 0.11)'; //flashing lights color
let strokeColor3 = 'rgba(0, 0, 0, 0.55)'; //ellipse 1 stroke color
let strokeModifier = 2800; //stroke modifier

//MODIFIERS
let elementWidth = 2.2 * (cell_size/n)*(n+1);
let elementHeight = 2.2 * (cell_size/n)*(n+1);
let e = 0.078; //shape element scale modifier
let e2 = 0.175; //2nd ellipse sizemodifier
let triangleSize = e*700.3; //triangle vertex size
let rotateMod = 90; //rotation of triangle

//Falling Sand Setup
let cellSize = 4; 
let gridWidth = 540/cellSize;   
let gridHeight = 960/cellSize; 


let sandGrid = [];



let sandcolor = 'rgb(0, 255, 157)';   // Color 1
let sandcolor2 = 'rgb(255, 128, 0)';  // Color 2
let sandcolor3 = 'rgb(212, 178, 143)';   // Color 3
let sandcolor4 = 'rgb(255, 224, 208)';    // Color 4
let sandcolor5 = 'rgb(255, 177, 129)';    // Color 5
let sandcolor6 = 'rgb(255, 236, 183)';    // Color 6
let sandcolor7 = 'rgb(212, 252, 142)';    // Color 7
let sandcolor8 = 'rgb(255, 194, 108)';    // Color 8
let sandcolor9 = 'rgb(255, 255, 255)';    // Color 9






//Falling Sand Function
function setupSandGrid() {

  //sets up grid coordinate system using two arrays created for x and y based on pixel dimensions
//0 = empty, 1-7= sand 8= solid

  for (let y = 0; y < gridHeight; y++) {
    sandGrid[y] = [];
    for (let x = 0; x < gridWidth; x++) {
      sandGrid[y][x] = 0; //empty each cell
    }
    }

  // Add solid ground at the bottom
  for (let x = 0; x < gridWidth; x++) {
    sandGrid[gridHeight-1][x] = 9;
    }
  
  
  }


function fallingSand(drum){
//This function runs from bottom to top along the sandGrid. 
  for (let y = gridHeight - 2; y >= 0; y--) {
    for (let x = 0; x < gridWidth; x++) {
    //Check if there is sand in each cell.
      if (sandGrid[y][x] >= 1 && sandGrid[y][x] <= 9) {
        let driftThreshold = map(drum, 0, 100, 0.01, 0.05);
       if (random() < driftThreshold) {
        // Add random horizontal drift
       let drift = Math.floor(random(-1, 2)); // -1, 0, or 1
       let newX = x + drift;
       
       // Check if can fall with drift
       if (newX >= 0 && newX < gridWidth && sandGrid[y+1][newX] === 0) {
         sandGrid[y+1][newX] = sandGrid[y][x];
         sandGrid[y][x] = 0;
       }
      }

      //If there is, check if there is sand below it, it falls if there is not.
      if (sandGrid[y+1][x] === 0) {
          sandGrid[y+1][x] = sandGrid[y][x]; // Keep the same color
        sandGrid[y][x] = 0;
      }
      //If there is sand below it, check if it can move diagonally.
      else if (x > 0 && sandGrid[y + 1][x - 1] === 0) {
          sandGrid[y + 1][x - 1] = sandGrid[y][x]; // Keep the same color
          sandGrid[y][x] = 0;
        }//LEFT
        else if (x < gridWidth - 1 && sandGrid[y + 1][x + 1] === 0) {
          sandGrid[y + 1][x + 1] = sandGrid[y][x]; // Keep the same color
        sandGrid[y][x] = 0;
        }//RIGHT
              
      }
    }
  }
}

function drawSand(b) {

let sC = color(sandcolor);
let sC2 = color(sandcolor2);

let colorDriver = map(b, 0, 100, 0, 1);


  noStroke();

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      let screenX = x * cellSize;
      let screenY = y * cellSize;
      
      if (sandGrid[y][x] === 1) {
        let sandcolorLerp = lerpColor(sC, sC2, colorDriver);
        fill(sandcolorLerp);  
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 2) {
        fill(sandcolor2); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 3) {
        fill(sandcolor3); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 4) {
        fill(sandcolor4); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 5) {
        fill(sandcolor5); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 6) {
        fill(sandcolor6); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 7) {
        fill(sandcolor7); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 8) {
        fill(sandcolor8); 
        rect(screenX, screenY, cellSize, cellSize);
      } else if (sandGrid[y][x] === 9) {
        fill(255, 255, 255); // Ground!
        rect(screenX, screenY, cellSize, cellSize);
      }
    }
  }
}

function spawnSand() {
  console.log("spawnSand");
  // mouse pos to grid
  let gridX = Math.floor(mouseX / cellSize);
  let gridY = Math.floor(mouseY / cellSize);
  
  let brushRadius = 2;
  
  // Spawn sand in radius
  for (let y = gridY - brushRadius; y <= gridY + brushRadius; y++) {
    for (let x = gridX - brushRadius; x <= gridX + brushRadius; x++) {
      // Check if this position is within the brush radius
      let distance = Math.sqrt((x - gridX) * (x - gridX) + (y - gridY) * (y - gridY));
      
      if (distance <= brushRadius && 
          x >= 0 && x < gridWidth && 
          y >= 0 && y < gridHeight)
          if(sandGrid[y][x] === 0) { // Only if cell is empty
          sandGrid[y][x] = 1; if(sandGrid[y][x] === 1){sandGrid[y][x] = 1;} }
          
      

  }

  
}

}

function spawnMusicSand(vocal, drum, bass, other) {
  // Mappings
  let spawnRate = map(other, 0, 100, 0, 1);       
  let spawnRadius = map(bass, 0, 100, 0.01, 2);       // Bigger spawn areas
  let spawnIntensity = map(other, 0, 100, 0, 0.5); // Always some spawning
  let musicSandColor = map(drum, 0, 100, 0, 9);

  // Only spawn if intensity is high enough
  if (random() < spawnIntensity) {
    
    // Spawn multiple particles based on spawn rate
    for (let i = 0; i < spawnRate; i++) {
      
      // centre position in upper  of screen
      let spawnX = random(width/4, (width/4)*2);
      let spawnY = random(0, height / 6);  // upper 
      
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

function removeBassSand(drum) {
  // Map bass to removal intensity (0-100% chance)
  let removalIntensity = map(drum, 0, 100, 0, 0.45); // Max 80% chance to remove
  
  // Map bass to removal radius (how many particles to remove per frame)
  let removalRadius = map(drum, 0, 100, 1, 25); // Remove 1-5 particles per frame
  
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
              sandGrid[y][x] >= 1 && sandGrid[y][x] <= 4) { // Only remove sand (not ground)
            
            sandGrid[y][x] = 0; // Remove the sand particle
          }
        }
      }
    }
  }
}


// Wallpaper integration functions
function draw_animated_wallpaper(vocal, drum, bass, other, counter) {
  // Calculate music-responsive values
  let avgVolume = (vocal + drum + bass + other) / 4;
  let colorIntensity = map(avgVolume, 0, 100, 0.1, 0.8);
  
  // Draw background
  background(`rgba(0, 0, 0, ${0.3 + colorIntensity * 0.5})`);
  
  // Draw the wallpaper pattern
  draw_wallpaper_pattern(vocal, drum, bass, other, avgVolume, counter);
}

function draw_wallpaper_pattern(vocal, drum, bass, other, avgVolume, counter) {
  // Calculate music-responsive values
  let animated_e2 = e2 + map(other, 0, 100, -e2*0.5, e2*3.9);
  
  // Sine wave animations driven by counter
  let sineWave = sin(counter * 2.2);
  let animated_elementWidth = elementWidth + (sineWave * elementWidth * 0.3);
  let animated_elementHeight = elementHeight + (sineWave * elementHeight * 0.3);
  let animated_e = e + map(drum, 0, 100, -e*0.8, e*3.2) + (sineWave * e * 2);
  let animated_triangleSize = triangleSize + (sineWave * triangleSize * 0.5);
  
  // Draw the wallpaper pattern in a grid to fill the entire canvas
  push();
  
  // Calculate grid dimensions to cover the entire canvas
  let cols = Math.ceil(width / cell_size) + 2; // +2 for overlap
  let rows = Math.ceil(height / cell_size) + 2; // +2 for overlap
  
  // Start position to ensure we cover the entire canvas
  let start_x = -cell_size;
  let start_y = -cell_size;
  
  // Draw the repeating pattern
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let x = start_x + col * cell_size;
      let y = start_y + row * cell_size;
      
      // Apply row offset for alternating rows (creates the wallpaper effect)
      if (row % 2 === 1) {
        x += offset+(counter*1);
      }
      
      push();
      translate(x, y);
      
      // Draw the symbol for this cell
      draw_wallpaper_symbol(strokeModifier, animated_elementWidth, animated_elementHeight, animated_e, animated_e2, animated_triangleSize, counter);
      
      pop();
    }
  }
  
  pop();
}

function draw_wallpaper_symbol(strokeMod, elemWidth, elemHeight, scaleE, scaleE2, triSize, counter) {
  // Draw the pattern elements for a single cell
  let d = (cell_size/n)*(n+1);
  let osc1 = 2;

  for (let i = 0; i < n+1; i++) {
    let r = i * d;
    
    for (let k = 0; k < n+1; k++) {
           
      // Ellipse 2
      strokeWeight(0.03*strokeMod);
      stroke(strokeColor3);
      fill(color4);
      ellipse(sin(counter*osc1)*cell_size*0.5*k, cell_size*0.5*k, (1*elemWidth*(scaleE))*k, (1*elemHeight*(scaleE))*k);
      
      // Triangle
      push();
      let t = sin(counter*osc1)*k * triSize;
      strokeWeight(0.1*strokeMod);
      stroke(strokeColor1);
      fill(color1);
      
      translate(d*k, d*k);
      rotate(k * rotateMod);
      
      beginShape();
      vertex(0, -t); // Top 
      vertex(-t, t); // Bottom left
      vertex(t, t); // Bottom right 
      endShape(CLOSE);
      pop();
    }
  }
}





function Hourglass (x, y, drum, width){
   
   let hourglassSize = (width/3)*drum;
   let glassOffset = (width/3)*0.35

   hourglassSize = map(drum, 0, 100, (width/3)*0.75, (width/3)*1.3);
   
   let glasscolor1 = 'rgba(199, 224, 246, 0.29)';
   let glasscolor2 = 'rgba(169, 227, 242, 0.13)';
   let glasscolor3 = 'rgba(239, 250, 253, 0.12)';

   //let glassColorphase = lerpColor(glasscolor1, glasscolor2, drum/100);

   let woodColor = 'rgb(98, 75, 43)';

   // triangle 1
   strokeWeight(1);
   stroke(255, 255, 255);
   fill(glasscolor1);
   beginShape();
   vertex(x, y);
   vertex((x + (hourglassSize)), (y + hourglassSize));
   vertex((x - (hourglassSize)), (y + hourglassSize));
   endShape(CLOSE);

    // triangle 2
    fill(glasscolor1);
   beginShape();
   vertex(x, y);
   vertex((x + (hourglassSize)), (y - hourglassSize));
   vertex((x - (hourglassSize)), (y - hourglassSize));
   endShape(CLOSE);



//GLASS SHADING
   for (let i = 1; i < 9; i++) {
      strokeWeight(0);
     // triangle 3
     fill(glasscolor2);
     beginShape();
     vertex(x, y);
     vertex((x + (hourglassSize)), (y + hourglassSize));
     vertex((x - (hourglassSize) + glassOffset*(i/2)), (y + hourglassSize));
     endShape(CLOSE);
  
    

         // triangle 5
      fill(glasscolor3);
      beginShape();
      vertex(x, y);
      vertex((x + (hourglassSize)), (y + hourglassSize));
      vertex((x - (hourglassSize) + glassOffset*(i/3)), (y + hourglassSize));
      endShape(CLOSE);

      // triangle 3
     fill(glasscolor2);
     beginShape();
     vertex(x, y);
     vertex((x + (hourglassSize)), (y - hourglassSize));
     vertex((x - (hourglassSize) + glassOffset*(i/2)), (y - hourglassSize));
     endShape(CLOSE);
  
    

         // triangle 5
      fill(glasscolor3);
      beginShape();
      vertex(x, y);
      vertex((x + (hourglassSize)), (y - hourglassSize));
      vertex((x - (hourglassSize) + glassOffset*(i/3)), (y - hourglassSize));
      endShape(CLOSE);
     //Head and foot
fill(woodColor);
rect(x, y-hourglassSize, hourglassSize*2+1, hourglassSize/2);
rect(x, y+hourglassSize, hourglassSize*2+1, hourglassSize/2);


    
   }

 

}

