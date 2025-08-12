
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // Draw animated wallpaper background first
  draw_animated_wallpaper(vocal, drum, bass, other, counter);
  
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  
   let bar_spacing = height / 10;
   let bar_height = width / 12;
   let mid_y = height/2;
   let mid_x = width / 2;
   let hourglassScale = 0.2;
 
// Hourglass

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
}

// Wallpaper integration functions
function draw_animated_wallpaper(vocal, drum, bass, other, counter) {
  // Animate wallpaper parameters based on music
  animate_wallpaper_params(vocal, drum, bass, other, counter);
  
  // Draw the wallpaper pattern
  draw_wallpaper_pattern();
}

function animate_wallpaper_params(vocal, drum, bass, other, counter) {
  // Animate cell size based on bass
  cell_size = map(bass, 0, 100, 80, 160);
  
  // Animate pattern density based on drum
  n = map(drum, 0, 100, 2, 5);
  
  // Animate rotation based on counter and vocal
  rotateMod = map(vocal, 0, 100, 180, 360) + counter * 0.5;
  
  // Animate triangle size based on other
  triangleSize = map(other, 0, 100, 15, 25);
  
  // Animate stroke modifier based on overall volume
  let avgVolume = (vocal + drum + bass + other) / 4;
  strokeModifier = map(avgVolume, 0, 100, 1000, 5000);
  
  // Animate colors based on music
  let colorIntensity = map(avgVolume, 0, 100, 0.1, 0.8);
  bgcolor = `rgba(83, 75, 111, ${0.3 + colorIntensity * 0.5})`;
  color1 = `rgba(149, 226, 200, ${0.1 + colorIntensity * 0.2})`;
  color2 = `rgba(0, 0, 0, ${0.2 + colorIntensity * 0.3})`;
  
  // Update derived values
  d = (cell_size/n)*(n+1);
  elementWidth = 2*d;
  elementHeight = 2*d;
}

function draw_wallpaper_pattern() {
  // Draw background
  background(bgcolor);
  
  // Draw the wallpaper pattern manually since we're not using the library's draw system
  push();
  
  // Scale to fit the canvas
  let scale_factor = min(width / 1000, height / 2000);
  scale(scale_factor);
  
  // Center the pattern
  translate(width / (2 * scale_factor) - 500, height / (2 * scale_factor) - 1000);
  
  // Draw the pattern
  for (let i = 0; i < n+1; i++) {
    let r = i * d;
    
    for (let k = 0; k < n+1; k++) {
      let lineSize;
      if(strokeModifier > 100) {
        lineSize = strokeModifier/10000;
      } else {
        lineSize = strokeModifier/1000;
      }
      
      // Rect
      strokeWeight(0.08*strokeModifier);
      stroke(strokeColor1);
      fill(color2);
      rect(((cell_size*0.25)-m/r)*k, elementWidth*(e*m), elementHeight*(e*1/m));
      
      // Ellipse 1
      let x = random(0, 1);
      
      strokeWeight(0.07*strokeModifier);
      stroke(strokeColor2);
      fill(color3);
      if (x < 0.5) { //draw an ellipse
        if (x < 0.1) {noFill();} //prevent fill on very large ellipses
        ellipse((k*r),((k*r)/n), (elementWidth*((e*0.4)*e2))*i*(0.09/x), (elementHeight*(e*0.4)*e2)*i*(0.09/x));
      } else { //draw a line instead of an ellipse
        push();
        translate((k*r)+(d*k),((k*r)/n)+(d*k));
        rotate(k * rotateMod);
        
        stroke(strokeColor4);
        strokeWeight(x*lineSize*strokeModifier);
        fill(strokeColor4);
        rect((k*r)+(d*k),((k*r)/n)+(d*k), ((elementWidth*((e*0.01)*e2))*i), ((elementHeight*(e*2.4)*e2)*i*(1/x)));
        
        pop();
      }
      
      // Ellipse 2
      strokeWeight(0.04*strokeModifier);
      stroke(strokeColor3);
      fill(color4);
      ellipse(cell_size*0.5*k, cell_size*0.5*k, (1*elementWidth*(e))*k, (1*elementHeight*(e))*k);
      
      // Triangle
      push();
      let t = k * triangleSize;
      strokeWeight(0.1*strokeModifier);
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
  
  pop();
}

// Wallpaper variables (moved from my_wallpaper.js)
let cell_size = 120; //Pattern Block (values < 200 create interesting offsets)
let n = 3; //Pattern Density
let d = (cell_size/n)*(n+1);
let offset = 100;
let dev = false; //show developer glyph when true
let glide = false; //glide wallpaper

//COLOURS
let bgcolor = 'rgba(83, 75, 111, 0.81)'; //background color
let color1 = 'rgba(149, 226, 200, 0.18)'; //tri color
let color2 = 'rgba(0, 0, 0, 0.37)'; //rect color
let color3 = 'rgba(233, 218, 194, 0.02)'; //ellipse 2 color
let color4 = 'rgb(255, 234, 0)'; //ellipse 1 color

//STROKES
let strokeColor1 = 'rgba(35, 22, 36, 0.05)'; //rect and custom shape stroke color
let strokeColor2 = 'rgba(210, 1, 158, 0.01)'; //circles stroke color
let strokeColor3 = 'rgba(255, 115, 0, 0.21)'; //ellipse 1 stroke color
let strokeColor4 = 'rgba(255, 255, 255, 0)'; //conditional rectangle color
let strokeModifier = 3000; //stroke modifier

//MODIFIERS
let elementWidth = 2*d;
let elementHeight = 2*d;
let e = 0.02; //shape element scale modifier
let e2 = 104.975; //2nd ellipse sizemodifier
let m = .099; //rect modifier
let triangleSize = e*1900.3; //controls vertex location of triangle
let rotateMod = 270; //rotation of triangle per loop
let lineSize = 51.0; // modifier for conditional rectangle stroke

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