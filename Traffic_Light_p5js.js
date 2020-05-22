class LED {
    constructor(x_cor, y_cor, radius, colour_of_led, state_of_led) {
        this.x = x_cor;
        this.y = y_cor;
        this.r = radius;
        this.col = colour_of_led;
        this.state = state_of_led;
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        
        if (this.state == false) {
            this.red = 182;
            this.green = 173;
            this.blue = 173;
        }
        else {
            if (this.col == 'g') {
                this.red = 0;
                this.green = 255;
                this.blue = 0;
            }
            else if (this.col == 'r') {
                this.red = 255;
                this.green = 0;
                this.blue = 0;
            }
            else if (this.col == 'y') {
                this.red = 255;
                this.green = 215;
                this.blue = 0;
            }
        }
    }
    
    updateColor(state_now)
    {
        if (state_now == false) {
            this.red = 182;
            this.green = 173;
            this.blue = 173;
        }
        else {
            if (this.col == 'g') {
                this.red = 0;
                this.green = 255;
                this.blue = 0;
            }
            else if (this.col == 'r') {
                this.red = 255;
                this.green = 0;
                this.blue = 0;
            }
            else if (this.col == 'y') {
                this.red = 255;
                this.green = 215;
                this.blue = 0;
            }
        }
    }  
    
    presentState() {
        return this.state;
    }
    
    newState(a) {
        this.state = a;
    }
    
    x_coordinate() {
        return this.x;
    }
    
    y_coordinate() {
        return this.y;
    }
    
    place() {
        noStroke();
        this.updateColor(this.state);
        fill(this.red, this.green, this.blue);
        ellipse(this.x, this.y, this.r, this.r);
    }
    
    click(x1, y1) {
        if (dist(float(x1), float(y1), float(this.x), float(this.y)) < float(this.r)/2) {
            if (this.state == true) {
                this.state = false;
                this.red = 182;
                this.green = 173;
                this.blue = 173;
            }
            else if (this.state == false) {
                this.state = true;
                if (this.col == 'g') {
                  this.red = 0;
                  this.green = 255;
                  this.blue = 0;
                }
                else if (this.col == 'r') {
                  this.red = 255;
                  this.green = 0;
                  this.blue = 0;
                }
                else if (this.col == 'y') {
                  this.red = 255;
                  this.green = 215;
                  this.blue = 0;
                }
            }
        }
    }
}

class Button {
    constructor(tx, ty, tw, th, tlabel) {
      this.xpos = tx;
      this.ypos = ty;
      this.wid = tw;
      this.hei = th;
      this.label = tlabel;
      this.over = false; 
      this.down = false;
      this.clicked = false;
    }
  
    update() {
        if(this.down && this.over && !mouseIsPressed) {
            this.clicked = true;
        }
        else {
            this.clicked = false;
        }
        
        if(mouseX>this.xpos && mouseY>this.ypos && mouseX<(this.xpos+this.wid) && mouseY<(this.ypos+this.hei)) {    
            this.over = true; 
            if(mouseIsPressed) {
                this.down = true;
            }
            else {
                this.down = false;
            }
        }
        else { 
            this.over = false; 
        } 
        
        if(!this.over) {
            fill(255);
        }
        else {
            if(!this.down) {
                fill(100);
            }
            else {
                fill(0);
            }
        }
        
        stroke(0);
        rect(this.xpos, this.ypos, this.wid, this.hei, 10); //draws the rectangle, the last parameter is the round corners
        if(this.down) {
            fill(255);
        }
        else {    
            fill(0);
        }
        
        textSize(24); 
        text(this.label, this.xpos+this.wid/2 - (textWidth(this.label)/2), this.ypos+this.hei/2 + (textAscent()/2)); 
        //all of this just centers the text in the box
    } 
}

var leds = [];
var port_A = [false,false,false,false,false,false,false,false,];
var port_B = [false,false,false,false,false,false,false,false,];
var port_C = [false,false,false,false,false,false,false,false,];


function setup() {
    createCanvas(1500, 1000);
    background(0);
    
    noStroke();
    fill(100,100,100);
    rect(1000,0,500,1000);
    
    noStroke();
    fill(255,255,255);
    rect(0,400,1000,200);
    rect(400,0,200,1000);
    
    leds.push(new LED(315,630,50,'r',false));  //L1
    leds.push(new LED(315,685,50,'y',false));  //L2
    leds.push(new LED(260,740,50,'g',true));   //L3
    leds.push(new LED(315,740,50,'g',true));   //L4
    leds.push(new LED(370,740,50,'g',false));  //L5
    
    leds.push(new LED(370,875,50,'r',false));  //L6
    leds.push(new LED(370,930,50,'g',true));   //L7
    leds.push(new LED(630,875,50,'r',false));  //L8
    leds.push(new LED(630,930,50,'g',true));   //L9
    
    
    leds.push(new LED(630,685,50,'r',false));  //L10
    leds.push(new LED(685,685,50,'y',true));   //L11
    leds.push(new LED(740,740,50,'g',true));   //L12
    leds.push(new LED(740,685,50,'g',false));  //L13
    leds.push(new LED(740,630,50,'g',true));   //L14
    
    leds.push(new LED(875,630,50,'r',false));  //L15
    leds.push(new LED(930,630,50,'g',true));   //L16
    leds.push(new LED(875,370,50,'r',false));  //L17
    leds.push(new LED(930,370,50,'g',true));   //L18
    
    
    leds.push(new LED(685,370,50,'r',true));   //L19
    leds.push(new LED(685,315,50,'y',true));   //L20
    leds.push(new LED(630,260,50,'g',false));  //L21
    leds.push(new LED(685,260,50,'g',true));   //L22
    leds.push(new LED(740,260,50,'g',false));  //L23
    
    leds.push(new LED(630,125,50,'r',false));  //L24
    leds.push(new LED(630,70,50,'g',true));    //L25
    leds.push(new LED(370,125,50,'r',false));  //L26
    leds.push(new LED(370,70,50,'g',true));    //L27
  
    
    leds.push(new LED(370,315,50,'r',false));  //L28
    leds.push(new LED(315,315,50,'y',true));   //L29
    leds.push(new LED(260,370,50,'g',true));   //L30
    leds.push(new LED(260,315,50,'g',false));  //L31
    leds.push(new LED(260,260,50,'g',true));   //L32
    
    leds.push(new LED(125,370,50,'r',false));  //L33
    leds.push(new LED(70,370,50,'g',true));    //L34
    leds.push(new LED(125,630,50,'r',false));  //L35
    leds.push(new LED(70,630,50,'g',true));    //L36
    
    console.log(leds.length);
    
    b = new Button(1185,800,125,100,"Generate");

}

function draw() {
    for (var i = leds.length - 1; i >= 0; i--) {
      leds[i].place();
    }
    b.update();
    
    if (b.clicked) {
        noStroke();
        fill(100,100,100);
        rect(1000,0,500,1000);
        get_hex();
    }
}

function mouseReleased() {
    for (var i = leds.length - 1; i >= 0; i--) {
        leds[i].click(mouseX, mouseY);
    }
}

function get_hex() {
    update_port();
     
    A_out = bool_to_hex(port_A);
    B_out = bool_to_hex(port_B);
    C_out = bool_to_hex(port_C);
     
    console.log(A_out, B_out, C_out);
     
    A_hex = A_out.toString(16).toUpperCase();
    B_hex = B_out.toString(16).toUpperCase();
    C_hex = C_out.toString(16).toUpperCase();
     
    console.log(A_hex, B_hex, C_hex);
     
    fill(255);
    text("Port A : "+A_hex+"h", 1175, 200);
    text("Port B : "+B_hex+"h", 1175, 400);
    text("Port C : "+C_hex+"h", 1175, 600);
}

function update_port() {
    port_A[0] = leds[1].presentState();
    port_A[1] = leds[2].presentState();
    port_A[2] = leds[3].presentState();
    port_A[3] = leds[4].presentState();
    port_A[4] = leds[10].presentState();
    port_A[5] = leds[11].presentState();
    port_A[6] = leds[12].presentState();
    port_A[7] = leds[13].presentState();
    
    port_B[0] = leds[19].presentState();
    port_B[1] = leds[20].presentState();
    port_B[2] = leds[21].presentState();
    port_B[3] = leds[22].presentState();
    port_B[4] = leds[28].presentState();
    port_B[5] = leds[29].presentState();
    port_B[6] = leds[30].presentState();
    port_B[7] = leds[31].presentState();
    
    port_C[0] = !leds[0].presentState();
    port_C[1] = !leds[18].presentState();
    port_C[2] = leds[9].presentState();
    port_C[3] = leds[27].presentState();
    port_C[4] = !leds[5].presentState();
    port_C[5] = !leds[14].presentState();
    port_C[6] = !leds[23].presentState();
    port_C[7] = !leds[32].presentState();
}

function bool_to_hex(a) {
    var n = 0, l = a.length;
    for (var i = l-1; i >= 0; i--) {
      n = (n << 1) + int(a[i] ? true : false);
    }
    return n;
}
