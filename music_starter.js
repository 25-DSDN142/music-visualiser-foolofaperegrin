
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
 
 
   // Draw animated wallpaper background first
  draw_animated_wallpaper(vocal, drum, bass, other, counter);
  
  //textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  
  
   let mid_y = height/2;
   let mid_x = width / 2;
   let hourglassScale = 0.2;
 
//fade wallpaper pattern with overlay
let overlayColor = 'rgba(80, 56, 73, 0.64)';
fill(overlayColor);
rect(0, 0, (mid_x*4), (mid_y*4));

// Hourglasses

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
   
 
  /*// display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3); */

   

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