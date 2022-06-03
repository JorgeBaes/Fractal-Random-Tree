const canvas = document.querySelector('#draw_canvas') 
canvas.width = 500   
canvas.height= 500 
const c  = canvas.getContext('2d')        
const cH = canvas.height
const cW = canvas.width

const image_canvas = document.querySelector("#image_canvas")
const c_i  = image_canvas.getContext('2d')  
let image_width = 1080
let image_height = 1080
image_canvas.width = image_width     
image_canvas.height= image_height 

const r_alfa = document.getElementById("r_alfa")
const r_width = document.getElementById("r_width")
const r_width_dim = document.getElementById("r_width_dim")
const r_wind = document.getElementById("r_wind")
const r_iteration = document.getElementById("r_iteration")
const r_line_width = document.getElementById("r_line_width")
const r_leave_radius = document.getElementById("leave_radius")
const r_leave_range = document.getElementById("leave_range")
const r_leave_probability = document.getElementById("leave_probability")
const r_leave_mode = document.getElementById("r_leave_mode")

const s_alfa = document.getElementById("s_alfa")
const s_width = document.getElementById("s_width")
const s_width_dim = document.getElementById("s_width_dim")
const s_iteration = document.getElementById("s_iteration")
const s_wind = document.getElementById("s_wind")
const s_line_width = document.getElementById("s_line_width")
const s_leave_radius = document.getElementById("leave_radius_value")
const s_leave_range = document.getElementById("s_leave_range")
const s_leave_probability = document.getElementById("s_leave_probability")
const s_leave_mode = document.getElementById("s_leave_mode")

const background_color = document.getElementById("background_color")

const gradient_color_1 = document.getElementById("gradient_color_1")
const gradient_color_2 = document.getElementById("gradient_color_2")
const gradient_checkbox = document.getElementById("gradient_checkbox")

const file_name = document.getElementById("file_name")

const linear_gradient = {
    initial_vector: {r:50,g:60,b:160},
    final_vector: {r:250,g:160,b:10},
}
function get_gradient_color(linear_gradient,t){
    let r = (linear_gradient.final_vector.r - linear_gradient.initial_vector.r)*t + linear_gradient.initial_vector.r
    let g = (linear_gradient.final_vector.g - linear_gradient.initial_vector.g)*t + linear_gradient.initial_vector.g
    let b = (linear_gradient.final_vector.b - linear_gradient.initial_vector.b)*t + linear_gradient.initial_vector.b

    return `rgb(${r},${g},${b})`
}
let gradient_active = true

const pi = Math.PI

let a = 0
let b = 0
let fracParts = []
const fractalPart = function(x,y,len,ang,wid = 3,color = 'black',iteration_number = 1,id,id_reference,type){
    this.x           = x
    this.y           = y
    this.len         = len
    this.ang         = ang
    this.drawnLeft   = false
    this.drawnRigth  = false
    this.wid = wid
    this.inc = 1
    this.color = color
    this.id = id
    this.id_reference = id_reference
    this.iteration_number = iteration_number
    this.type = type

    this.leaveMode = 4
    this.leaveColor = "#f0a000"
    this.leaveRadius = 2
    this.leaveRange = 3
    this.leaveRotation = this.ang - pi/2 + pi/3*(0.5-Math.random())
    this.leaveProbability = 0.9>Math.random()
    this.leaveRot = 0

    this.draw = function(){
        c.beginPath()
        c.moveTo(this.x,this.y)
        nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
        nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
        // c.lineTo(nX,nY)
        if(this.type == "right"){
            let x1 = this.x + (this.len/2-a*this.len)*Math.cos(this.ang)-b*this.len*Math.sin(this.ang)
            let y1 = this.y + (this.len/2-a*this.len)*Math.sin(this.ang)+b*this.len*Math.cos(this.ang)
            let x2 = this.x + (this.len/2+a*this.len)*Math.cos(this.ang)+b*this.len*Math.sin(this.ang)
            let y2 = this.y + (this.len/2+a*this.len)*Math.sin(this.ang)-b*this.len*Math.cos(this.ang)
            c.bezierCurveTo(x1,y1,x2,y2,nX,nY)
        }else{
            let x1 = this.x + (this.len/2-a*this.len)*Math.cos(this.ang)+b*this.len*Math.sin(this.ang)
            let y1 = this.y + (this.len/2-a*this.len)*Math.sin(this.ang)-b*this.len*Math.cos(this.ang)
            let x2 = this.x + (this.len/2+a*this.len)*Math.cos(this.ang)-b*this.len*Math.sin(this.ang)
            let y2 = this.y + (this.len/2+a*this.len)*Math.sin(this.ang)+b*this.len*Math.cos(this.ang)
            c.bezierCurveTo(x1,y1,x2,y2,nX,nY)
        }        
        c.lineWidth = this.wid
        c.strokeStyle = this.color
        c.stroke()
    }
    this.draw_download = function (mx,my){
        c_i.beginPath()
        c_i.moveTo(this.x*mx,this.y*my)
        nX = (this.x + Math.cos(this.ang)*(this.len + this.inc))
        nY = (this.y + Math.sin(this.ang)*(this.len + this.inc))
        if(this.type == "right"){
            let x1 = this.x + (this.len/2-a*this.len)*Math.cos(this.ang)-b*this.len*Math.sin(this.ang)
            let y1 = this.y + (this.len/2-a*this.len)*Math.sin(this.ang)+b*this.len*Math.cos(this.ang)
            let x2 = this.x + (this.len/2+a*this.len)*Math.cos(this.ang)+b*this.len*Math.sin(this.ang)
            let y2 = this.y + (this.len/2+a*this.len)*Math.sin(this.ang)-b*this.len*Math.cos(this.ang)
            c_i.bezierCurveTo(x1*mx,y1*my,x2*mx,y2*my,nX*mx,nY*my)
        }else{
            let x1 = this.x + (this.len/2-a*this.len)*Math.cos(this.ang)+b*this.len*Math.sin(this.ang)
            let y1 = this.y + (this.len/2-a*this.len)*Math.sin(this.ang)-b*this.len*Math.cos(this.ang)
            let x2 = this.x + (this.len/2+a*this.len)*Math.cos(this.ang)-b*this.len*Math.sin(this.ang)
            let y2 = this.y + (this.len/2+a*this.len)*Math.sin(this.ang)+b*this.len*Math.cos(this.ang)
            c_i.bezierCurveTo(x1*mx,y1*my,x2*mx,y2*my,nX*mx,nY*my)
        }        
        c_i.lineWidth = this.wid*mx
        c_i.strokeStyle = this.color
        c_i.stroke()
    }
    this.drawLeave_download = function(mx,my){
        if(this.leaveProbability){
            if(this.leaveMode == 1){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()                    
                    if(nX - this.x >0){
                        let final_angle_1_r = +(pi/2+this.ang+this.leaveRot + pi/8 )+pi/4+pi
                        c_i.arc((nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_1_r-pi/2,final_angle_1_r)
                    }else{                        
                        let final_angle_1 = +(pi/2+this.ang+this.leaveRot + pi/8 )
                        c_i.arc((nX-Math.cos(final_angle_1)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_1-pi/2,final_angle_1)
                    }
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 2){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    if(nX - this.x >0){
                        let final_angle_1_r = +(pi/2+this.ang+this.leaveRot + pi/8 )+pi/4+pi
                        let final_angle_2_r = +(pi/2+this.ang+this.leaveRot + pi/8 + pi/8 +pi)
                        c_i.arc((nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_1_r-pi/2,final_angle_1_r)
                        c_i.arc((nX-Math.cos(final_angle_2_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_2_r-pi/2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_2_r-pi/2,final_angle_2_r)
                    }else{                        
                        let final_angle_1 = +(pi/2+this.ang+this.leaveRot + pi/8 )
                        let final_angle_2 = +(pi/2+this.ang+this.leaveRot + pi/8 + pi/8 )
                        c_i.arc((nX-Math.cos(final_angle_1)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_1-pi/2,final_angle_1)
                        c_i.arc((nX-Math.cos(final_angle_2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_2-pi/2,final_angle_2)
                    }
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 3){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    if(nX - this.x >0){
                        let final_angle_1_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8
                        let final_angle_2_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8
                        let final_angle_3_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8+pi/8
                        c_i.arc((nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_1_r-pi/2,final_angle_1_r)
                        c_i.arc((nX-Math.cos(final_angle_2_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_2_r-pi/2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_2_r-pi/2,final_angle_2_r)
                        c_i.arc((nX-Math.cos(final_angle_3_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_3_r-pi/2)*this.leaveRadius*2)*my,this.leaveRadius*2*mx,final_angle_3_r-pi/2,final_angle_3_r)
                    }else{                        
                        let final_angle_1 = pi/2+this.ang+this.leaveRot+pi/8
                        let final_angle_2 = pi/2+this.ang+this.leaveRot+pi/8+pi/8                       
                        let final_angle_3 = pi/2+this.ang+this.leaveRot+pi/8+pi/8+pi/8
                        c_i.arc((nX-Math.cos(final_angle_1)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_1-pi/2,final_angle_1)
                        c_i.arc((nX-Math.cos(final_angle_2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_2)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_2-pi/2,final_angle_2)
                        c_i.arc((nX-Math.cos(final_angle_3)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_3)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_3-pi/2,final_angle_3)
                    
                    }
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 4){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    if(nX - this.x >0){
                        let final_angle_1_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8
                        let final_angle_2_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8
                        let final_angle_3_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8+pi/8
                        let final_angle_4_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8+pi/8+pi/8
                        c_i.arc((nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_1_r-pi/2,final_angle_1_r)
                        c_i.arc((nX-Math.cos(final_angle_2_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_2_r-pi/2)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_2_r-pi/2,final_angle_2_r)
                        c_i.arc((nX-Math.cos(final_angle_3_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_3_r-pi/2)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_3_r-pi/2,final_angle_3_r)
                        c_i.arc((nX-Math.cos(final_angle_4_r-pi/2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_4_r-pi/2)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_4_r-pi/2,final_angle_4_r)
                    }else{                        
                        let final_angle_1 = pi/2+this.ang+this.leaveRot+pi/8
                        let final_angle_2 = pi/2+this.ang+this.leaveRot+pi/8+pi/8                       
                        let final_angle_3 = pi/2+this.ang+this.leaveRot+pi/8+pi/8+pi/8
                        let final_angle_4 = pi/2+this.ang+this.leaveRot+pi/8+pi/8+pi/8+pi/8
                        c_i.arc((nX-Math.cos(final_angle_1)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_1)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_1-pi/2,final_angle_1)
                        c_i.arc((nX-Math.cos(final_angle_2)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_2)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_2-pi/2,final_angle_2)
                        c_i.arc((nX-Math.cos(final_angle_3)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_3)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_3-pi/2,final_angle_3)
                        c_i.arc((nX-Math.cos(final_angle_4)*this.leaveRadius*2)*mx,(nY-Math.sin(final_angle_4)*this.leaveRadius*2)*my,(this.leaveRadius*2)*mx,final_angle_4-pi/2,final_angle_4)
                    }
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 5){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation+pi/4,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation-pi/4,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation+pi/2,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation-pi/2,0,Math.PI)
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 6){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation-pi/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation+pi/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation-pi*2/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation+pi*2/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation-pi,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.3*mx,4*this.leaveRadius*mx,this.leaveRotation+0,0,Math.PI)
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 7){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.5*mx,5*this.leaveRadius*mx,this.leaveRotation+pi*4/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.5*mx,3*this.leaveRadius*mx,this.leaveRotation+pi/3+pi*4/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.5*mx,5*this.leaveRadius*mx,this.leaveRotation+pi*2/3+pi*4/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.5*mx,3*this.leaveRadius*mx,this.leaveRotation+pi+pi*4/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.5*mx,5*this.leaveRadius*mx,this.leaveRotation+pi*4/3+pi*4/3,0,Math.PI)
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*0.5*mx,3*this.leaveRadius*mx,this.leaveRotation+pi*5/3+pi*4/3,0,Math.PI)
                    c_i.fill()
                    c_i.closePath()
                }
            }else if(this.leaveMode == 8){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c_i.fillStyle = this.leaveColor
                    c_i.beginPath()
                    c_i.ellipse(nX*mx,nY*my,this.leaveRadius*3*mx,this.leaveRadius*3*mx,this.leaveRotation,0,Math.PI*2)
                    c_i.fill()
                    c_i.closePath()
                }
            }
        }
    }

    this.drawLeave = function(){        
        if(this.leaveProbability){
            if(this.leaveMode == 1){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()                    
                    if(nX - this.x >0){
                        let final_angle_1_r = +(pi/2+this.ang+this.leaveRot + pi/8 )+pi/4+pi
                        c.arc(nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1_r-pi/2,final_angle_1_r)
                    }else{                        
                        let final_angle_1 = +(pi/2+this.ang+this.leaveRot + pi/8 )
                        c.arc(nX-Math.cos(final_angle_1)*this.leaveRadius*2,nY-Math.sin(final_angle_1)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1-pi/2,final_angle_1)
                    }
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 2){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    if(nX - this.x >0){
                        let final_angle_1_r = +(pi/2+this.ang+this.leaveRot + pi/8 )+pi/4+pi
                        let final_angle_2_r = +(pi/2+this.ang+this.leaveRot + pi/8 + pi/8 +pi)
                        c.arc(nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1_r-pi/2,final_angle_1_r)
                        c.arc(nX-Math.cos(final_angle_2_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_2_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_2_r-pi/2,final_angle_2_r)
                    }else{                        
                        let final_angle_1 = +(pi/2+this.ang+this.leaveRot + pi/8 )
                        let final_angle_2 = +(pi/2+this.ang+this.leaveRot + pi/8 + pi/8 )
                        c.arc(nX-Math.cos(final_angle_1)*this.leaveRadius*2,nY-Math.sin(final_angle_1)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1-pi/2,final_angle_1)
                        c.arc(nX-Math.cos(final_angle_2)*this.leaveRadius*2,nY-Math.sin(final_angle_2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_2-pi/2,final_angle_2)
                    }
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 3){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    if(nX - this.x >0){
                        let final_angle_1_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8
                        let final_angle_2_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8
                        let final_angle_3_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8+pi/8
                        c.arc(nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1_r-pi/2,final_angle_1_r)
                        c.arc(nX-Math.cos(final_angle_2_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_2_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_2_r-pi/2,final_angle_2_r)
                        c.arc(nX-Math.cos(final_angle_3_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_3_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_3_r-pi/2,final_angle_3_r)
                    }else{                        
                        let final_angle_1 = pi/2+this.ang+this.leaveRot+pi/8
                        let final_angle_2 = pi/2+this.ang+this.leaveRot+pi/8+pi/8                       
                        let final_angle_3 = pi/2+this.ang+this.leaveRot+pi/8+pi/8+pi/8
                        c.arc(nX-Math.cos(final_angle_1)*this.leaveRadius*2,nY-Math.sin(final_angle_1)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1-pi/2,final_angle_1)
                        c.arc(nX-Math.cos(final_angle_2)*this.leaveRadius*2,nY-Math.sin(final_angle_2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_2-pi/2,final_angle_2)
                        c.arc(nX-Math.cos(final_angle_3)*this.leaveRadius*2,nY-Math.sin(final_angle_3)*this.leaveRadius*2,this.leaveRadius*2,final_angle_3-pi/2,final_angle_3)
                    
                    }
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 4){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    if(nX - this.x >0){
                        let final_angle_1_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8
                        let final_angle_2_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8
                        let final_angle_3_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8+pi/8
                        let final_angle_4_r = pi/2+this.ang+this.leaveRot+pi+pi/8+pi/8+pi/8+pi/8+pi/8
                        c.arc(nX-Math.cos(final_angle_1_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_1_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1_r-pi/2,final_angle_1_r)
                        c.arc(nX-Math.cos(final_angle_2_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_2_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_2_r-pi/2,final_angle_2_r)
                        c.arc(nX-Math.cos(final_angle_3_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_3_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_3_r-pi/2,final_angle_3_r)
                        c.arc(nX-Math.cos(final_angle_4_r-pi/2)*this.leaveRadius*2,nY-Math.sin(final_angle_4_r-pi/2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_4_r-pi/2,final_angle_4_r)
                    }else{                        
                        let final_angle_1 = pi/2+this.ang+this.leaveRot+pi/8
                        let final_angle_2 = pi/2+this.ang+this.leaveRot+pi/8+pi/8                       
                        let final_angle_3 = pi/2+this.ang+this.leaveRot+pi/8+pi/8+pi/8
                        let final_angle_4 = pi/2+this.ang+this.leaveRot+pi/8+pi/8+pi/8+pi/8
                        c.arc(nX-Math.cos(final_angle_1)*this.leaveRadius*2,nY-Math.sin(final_angle_1)*this.leaveRadius*2,this.leaveRadius*2,final_angle_1-pi/2,final_angle_1)
                        c.arc(nX-Math.cos(final_angle_2)*this.leaveRadius*2,nY-Math.sin(final_angle_2)*this.leaveRadius*2,this.leaveRadius*2,final_angle_2-pi/2,final_angle_2)
                        c.arc(nX-Math.cos(final_angle_3)*this.leaveRadius*2,nY-Math.sin(final_angle_3)*this.leaveRadius*2,this.leaveRadius*2,final_angle_3-pi/2,final_angle_3)
                        c.arc(nX-Math.cos(final_angle_4)*this.leaveRadius*2,nY-Math.sin(final_angle_4)*this.leaveRadius*2,this.leaveRadius*2,final_angle_4-pi/2,final_angle_4)
                    }
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 5){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation+pi/4+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation-pi/4+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation+pi/2+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation-pi/2+this.leaveRot,0,Math.PI)
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 6){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation-pi/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation+pi/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation-pi*2/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation+pi*2/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation-pi+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.3,4*this.leaveRadius,this.leaveRotation+0+this.leaveRot,0,Math.PI)
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 7){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    c.ellipse(nX,nY,this.leaveRadius*0.5,5*this.leaveRadius,this.leaveRotation+pi*4/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.5,3*this.leaveRadius,this.leaveRotation+pi/3+pi*4/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.5,5*this.leaveRadius,this.leaveRotation+pi*2/3+pi*4/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.5,3*this.leaveRadius,this.leaveRotation+pi+pi*4/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.5,5*this.leaveRadius,this.leaveRotation+pi*4/3+pi*4/3+this.leaveRot,0,Math.PI)
                    c.ellipse(nX,nY,this.leaveRadius*0.5,3*this.leaveRadius,this.leaveRotation+pi*5/3+pi*4/3+this.leaveRot,0,Math.PI)
                    c.fill()
                    c.closePath()
                }
            }else if(this.leaveMode == 8){
                if(this.iteration_number < this.leaveRange){
                    nX = this.x + Math.cos(this.ang)*(this.len + this.inc)
                    nY = this.y + Math.sin(this.ang)*(this.len + this.inc)
                    c.fillStyle = this.leaveColor
                    c.beginPath()
                    c.ellipse(nX,nY,this.leaveRadius*3,this.leaveRadius*3,this.leaveRotation,0,Math.PI*2)
                    c.fill()
                    c.closePath()
                }
            }
        }
    }

    this.getXend = function(){
        return this.x + Math.cos(this.ang)*this.len
    }
    this.getYend = function(){
        return this.y + Math.sin(this.ang)*this.len
    }

}

let three_obj = []
const threePart = function(x1,y1,x2,y2,line_width = 3,color = 'black',iteration_number = 1){
    this.x1           = x1
    this.y1           = y1
    this.x2           = x2
    this.y2           = y2
    this.line_width = line_width
    this.color = color
    this.iteration_number = iteration_number

    this.draw = function(){
        c_i.beginPath()
        c_i.moveTo(this.x1*image_width,this.y1*image_height)
        c_i.lineTo(this.x2*image_width,this.y2*image_height)
        c_i.lineWidth = this.line_width*image_width
        c_i.strokeStyle = this.color
        c_i.stroke()
    }
}

function iteration(it,alfa,currentX,currentY,tam,shortenIndex,alfaRandInterval,lenRandInterval = 10,shortenRandInterval = 0.1,dir = null,color){    
    if(it>0){            
        let alfaIndex   = Math.PI/18 + Math.PI/(Math.random()*alfaRandInterval+6) 
        let len         = lenRandInterval/2-Math.random()*lenRandInterval    
        let shortenRand = Math.random()*shortenRandInterval
        if(gradient_active){
            fracParts.push(new fractalPart(currentX,currentY,tam+len+dir,alfa+alfaIndex,it*line_width,get_gradient_color(linear_gradient,it/iteration_number),it,alfa,null,"left"))
        }else{
            fracParts.push(new fractalPart(currentX,currentY,tam+len+dir,alfa+alfaIndex,it*line_width,color,it,alfa,null,"left"))
        }
        let xis = fracParts[fracParts.length-1].getXend()
        let yis = fracParts[fracParts.length-1].getYend()        
        iteration(it-1,alfa+alfaIndex,xis,yis,tam*(shortenIndex-shortenRand),shortenIndex,alfaRandInterval,lenRandInterval,shortenRandInterval,dir,color)
        
        if(gradient_active){
            fracParts.push(new fractalPart(currentX,currentY,tam+len-dir,alfa-alfaIndex,it*line_width,get_gradient_color(linear_gradient,it/iteration_number),it,alfa,null,"right"))
        }else{
            fracParts.push(new fractalPart(currentX,currentY,tam+len-dir,alfa-alfaIndex,it*line_width,color,it,alfa,null,"right"))
        }
        xis = fracParts[fracParts.length-1].getXend()
        yis = fracParts[fracParts.length-1].getYend()        
        iteration(it-1,alfa-alfaIndex,xis,yis,tam*(shortenIndex-shortenRand),shortenIndex,alfaRandInterval,lenRandInterval,shortenRandInterval,dir,color)        
    }else{
        return null
    }
}


const tam_inicial  = cH*0.057
let tam    = cH*0.057
let tamDim = 0.9
let xInic = cW/2
let yInic = cH*0.7
let alfaInic = Math.PI*3/2

let alfaRand        = 0         // entre 0 e 100  ++ 10
let lenInterval     = 0      // entre 0 e tam   ++ tam/10
let shortenInterval = 0      // entre 0.5 e 0    ++ 0.1
let DirEsq          = 0      // entre -15 e 15    ++ 3
let it              = 8     // entre   0 e 10     ++ 1
let line_width = 0.8
let color = `#ff3050`
let color2 = `#001450`
let background_color_value = "#000000"
let file = "randomthree"
let counter = 1

let iteration_number = it


function update_background_color(){
    canvas.style.backgroundColor = background_color.value
}
function update_gradient(){
    linear_gradient.initial_vector.r = parseInt(gradient_color_1.value.substr(1,2), 16)
    linear_gradient.initial_vector.g = parseInt(gradient_color_1.value.substr(3,2), 16)
    linear_gradient.initial_vector.b = parseInt(gradient_color_1.value.substr(5,2), 16)

    linear_gradient.final_vector.r = parseInt(gradient_color_2.value.substr(1,2), 16)
    linear_gradient.final_vector.g = parseInt(gradient_color_2.value.substr(3,2), 16)
    linear_gradient.final_vector.b = parseInt(gradient_color_2.value.substr(5,2), 16)
    
    color = gradient_color_1.value
    gradient_active = gradient_checkbox.checked
    
    line_width = parseFloat(r_line_width.value)    
    s_line_width.innerText = `Line: ${line_width}`

    fracParts.forEach( el =>{
        if(gradient_active){
            el.color = get_gradient_color(linear_gradient,el.iteration_number/iteration_number)
        }else{
            el.color = color
        }
        el.wid = el.iteration_number*line_width
    })
    three_obj.forEach( el =>{
        if(gradient_active){
            el.color = get_gradient_color(linear_gradient,el.iteration_number/iteration_number)
        }else{
            el.color = color
        }
        el.line_width = el.iteration_number*line_width/cW
    })

    c.clearRect(0,0,canvas.width,canvas.height)
    leaveRadius = document.getElementById("leave_radius").value
    leaveRange = document.getElementById("leave_range").value
    leaveProbability = document.getElementById("leave_probability").value
    leaveMode = document.getElementById("r_leave_mode").value
    leave_color_1 = document.getElementById("leave_color_1").value
    leave_color_2 = document.getElementById("leave_color_2").value
    listaDeCor =  generateColor(leave_color_1, leave_color_2, 20).map(el => "#"+el)
    leaveColorCaos = document.getElementById("leave_gradient_checkbox").checked

    document.getElementById("leave_range").max = iteration_number+2
    draw_three() 
}
function atribute_values(){
    alfaRand        = parseFloat(r_alfa.value)         // entre 0 e 100  ++ 10
    lenInterval     = parseFloat(r_width.value)        // entre 0 e tam   ++ tam/10
    shortenInterval = parseFloat(r_width_dim.value)      // entre 0.5 e 0    ++ 0.1
    DirEsq          = parseFloat(r_wind.value)       // entre -15 e 15    ++ 3
    it              = parseFloat(r_iteration.value)     // entre   0 e 10     ++ 1
    line_width = parseFloat(r_line_width.value)
    iteration_number = it

    let inc = parseFloat(document.getElementById("increment").value)
    tam = tam_inicial+inc

    s_alfa.innerText = `Alfa | ${alfaRand}`
    s_width.innerText = `Widt |: ${lenInterval}`
    s_width_dim.innerText = `Short | ${(parseFloat(shortenInterval)).toFixed(2)}`
    s_iteration.innerText = `Iteration | ${iteration_number}`
    s_wind.innerText = `Wind | ${DirEsq}`
    s_line_width.innerText = `Line | ${parseFloat(line_width).toFixed(1)}`
    s_leave_radius.innerText = `Leave Width | ${parseFloat(leaveRadius).toFixed(1)}`
    s_leave_range.innerText = `Leave Range | ${parseFloat(leaveRange-1).toFixed(0)}`
    s_leave_probability.innerText = `Leave Probabiliby | ${parseFloat(leaveProbability).toFixed(2)}`
    s_leave_mode.innerText = `Leave Mode | ${leaveMode}`
    document.getElementById("s_a_param").innerText = `Curve Parameter | ${parseFloat(a).toFixed(2)}`
    document.getElementById("s_b_param").innerText = `Curve Parameter | ${parseFloat(b).toFixed(2)}`
    document.getElementById("s_leave_rotation").innerText = `Leave Rotation | ${(leaveRotation*180/pi).toFixed(0)}`
   

    linear_gradient.initial_vector.r = parseInt(gradient_color_1.value.substr(1,2), 16)
    linear_gradient.initial_vector.g = parseInt(gradient_color_1.value.substr(3,2), 16)
    linear_gradient.initial_vector.b = parseInt(gradient_color_1.value.substr(5,2), 16)

    linear_gradient.final_vector.r = parseInt(gradient_color_2.value.substr(1,2), 16)
    linear_gradient.final_vector.g = parseInt(gradient_color_2.value.substr(3,2), 16)
    linear_gradient.final_vector.b = parseInt(gradient_color_2.value.substr(5,2), 16)
}
function atribute_values_to_range(){
    r_alfa.value = alfaRand                 // entre 0 e 100  ++ 10
    r_width.value = lenInterval             // entre 0 e tam   ++ tam/10
    r_width_dim.value = shortenInterval       // entre 0.5 e 0    ++ 0.1
    r_wind.value = DirEsq                 // entre -15 e 15    ++ 3
    r_iteration.value = it                   // entre   0 e 10     ++ 1
    r_line_width.value = line_width 
    r_leave_radius.value = leaveRadius
    r_leave_probability.value = leaveProbability
    r_leave_range.value = leaveRange
    document.getElementById("leave_range").max = iteration_number+2
    r_leave_mode.value = leaveMode
    document.getElementById("leave_color_1").value = leave_color_1
    document.getElementById("leave_color_2").value = leave_color_2
    document.getElementById("leave_gradient_checkbox").checked = leaveColorCaos
    document.getElementById("a_param").value = a
    document.getElementById("b_param").value = b
    document.getElementById("leave_behind").checked = leave_behind
    document.getElementById("leave_alpha").value = leaveAlpha

    document.getElementById("r_leave_rotation").value = leaveRotation*180/pi

    gradient_color_1.value = color
    gradient_color_2.value = color2
    canvas.style.backgroundColor = background_color.value
    gradient_checkbox.checked = gradient_active

    
}
function generate_fractal_three(){    
    fracParts = []
    id_counter = 0
    iteration(it,alfaInic,xInic,yInic,tam,tamDim,alfaRand,lenInterval,shortenInterval,DirEsq,color)
    
    three_obj = fracParts.map( el =>{
        let x1 = el.x/cW
        let y1 = el.y/cH
        let x2 = (el.x + Math.cos(el.ang)*el.len)/cW
        let y2 = (el.y + Math.sin(el.ang)*el.len)/cH
        let wid = el.wid/cW
        return new threePart(x1,y1,x2,y2,wid,el.color,el.iteration_number)
    })
}
function random_color(){
    function c() {
        let hex = Math.floor(Math.random()*256).toString(16)
        return ("0"+String(hex)).substr(-2)
    }
    return "#"+c()+c()+c()
}
function randomize_tree(){
    it = (3+Math.floor(Math.random()*7))
    DirEsq = (15-Math.floor(Math.random()*30))
    alfaRand = (Math.floor(Math.random()*100))
    lenInterval = (Math.floor(Math.random()*tam))
    shortenInterval = (0.05+Math.floor(Math.random()*0.05))
    gradient_checkbox.checked = Math.random()>0.5
    gradient_active = gradient_checkbox.checked
    line_width = (0.3+Math.random()*0.9)
    

    gradient_color_1.value = random_color()
    gradient_color_2.value = random_color()
    linear_gradient.initial_vector.r = parseInt(gradient_color_1.value.substr(1,2), 16)
    linear_gradient.initial_vector.g = parseInt(gradient_color_1.value.substr(3,2), 16)
    linear_gradient.initial_vector.b = parseInt(gradient_color_1.value.substr(5,2), 16)
    linear_gradient.final_vector.r = parseInt(gradient_color_2.value.substr(1,2), 16)
    linear_gradient.final_vector.g = parseInt(gradient_color_2.value.substr(3,2), 16)
    linear_gradient.final_vector.b = parseInt(gradient_color_2.value.substr(5,2), 16)
    color = gradient_color_1.value


    a = Math.random()*0.5
    b = Math.random()*0.5


    atribute_values_to_range()
    render()
}
function randomize_leaves(){
    leaveRadius = ~~(Math.random()*9)+1
    leaveRange = ~~(Math.random()*it)+1
    leaveProbability = Math.random()
    leaveMode = ~~(Math.random()*9)+1
    leave_color_1 = random_color()
    leave_color_2 = random_color()
    listaDeCor =  generateColor(leave_color_1, leave_color_2, 20).map(el => "#"+el)
    leaveColorCaos = Math.random()>0.5

    leaveAlpha = Math.random()
    leave_behind = Math.random()>0.5
    leaveRotation = pi-2*pi*Math.random()

    atribute_values_to_range()
    render()
}
function randomize_color(){
    gradient_color_1.value = random_color()
    gradient_color_2.value = random_color()
    // background_color.value = random_color()

    linear_gradient.initial_vector.r = parseInt(gradient_color_1.value.substr(1,2), 16)
    linear_gradient.initial_vector.g = parseInt(gradient_color_1.value.substr(3,2), 16)
    linear_gradient.initial_vector.b = parseInt(gradient_color_1.value.substr(5,2), 16)
    linear_gradient.final_vector.r = parseInt(gradient_color_2.value.substr(1,2), 16)
    linear_gradient.final_vector.g = parseInt(gradient_color_2.value.substr(3,2), 16)
    linear_gradient.final_vector.b = parseInt(gradient_color_2.value.substr(5,2), 16)
    color = gradient_color_1.value
    gradient_checkbox.checked = Math.random()>0.5
    gradient_active = gradient_checkbox.checked
    leaveAlpha = document.getElementById("leave_alpha").value

    let hex_component = hex(leaveAlpha*255)

    leaveAlpha = Math.random()
    leave_color_1 = random_color()
    leave_color_2 = random_color()
    listaDeCor =  generateColor(leave_color_1, leave_color_2, 20).map(el => "#"+el)
    leaveColorCaos = Math.random()>0.5

    for(let i in fracParts){
        fracParts[i].leaveMode = leaveMode
        fracParts[i].leaveRadius = leaveRadius
        fracParts[i].leaveProbability = leaveProbability>Math.random()
        if(leaveColorCaos){
            fracParts[i].leaveColor = corAleatoria() + hex_component
        }else{
            fracParts[i].leaveColor = leave_color_1 + hex_component
        }
        fracParts[i].drawLeave()
    } 
    atribute_values_to_range()
    update_gradient()
}
document.getElementById("leave_color_1").value = "#ffffff"
document.getElementById("leave_color_2").value = "#ffffff"

let leaveMode = 2
let leaveRadius = 2
let leaveRange = 3
let leaveAlpha = 1
let leave_behind = true
let leaveProbability = 0.6
let leaveRotation = 0
let leaveColor = "#f0a000"
let leaveColorCaos = document.getElementById("leave_gradient_checkbox").checked
let leave_color_1 = document.getElementById("leave_color_1").value
let leave_color_2 = document.getElementById("leave_color_2").value
let listaDeCor = []
listaDeCor =  generateColor(leave_color_1, leave_color_2, 20).map(el => "#"+el)

function draw_three(){
    if(!leave_behind){
        c.clearRect(0,0,canvas.width,canvas.height)
        for(let i in fracParts){
            fracParts[i].draw()
        } 
        for(let i in fracParts){
            fracParts[i].drawLeave()
        } 
    }else{
        c.clearRect(0,0,canvas.width,canvas.height)
        for(let i in fracParts){
            fracParts[i].drawLeave()
        } 
        for(let i in fracParts){
            fracParts[i].draw()
        } 
    }
}

function change_leave_radius(){
    leaveRadius = document.getElementById("leave_radius").value
    for(let i in fracParts){
        fracParts[i].leaveRadius = leaveRadius
    }  
    draw_three() 
    atribute_values()
}
function change_leave_range(){
    document.getElementById("leave_range").max = iteration_number+2
    leaveRange = document.getElementById("leave_range").value
    for(let i in fracParts){
        fracParts[i].leaveRange = leaveRange
    }  
    draw_three() 
    atribute_values()
}
function change_leave_probability(){
    leaveProbability = document.getElementById("leave_probability").value
    for(let i in fracParts){
        fracParts[i].leaveProbability = leaveProbability>Math.random()
    }  
    draw_three()
    atribute_values()
}
function change_leaves_mode(){
    leaveMode = document.getElementById("r_leave_mode").value
    for(let i in fracParts){
        fracParts[i].leaveMode = leaveMode
    }  
    draw_three()
    atribute_values()
}
function update_leave_color(){
    leave_color_1 = document.getElementById("leave_color_1").value
    leave_color_2 = document.getElementById("leave_color_2").value
    listaDeCor =  generateColor(leave_color_1, leave_color_2, 20).map(el => "#"+el)
    leaveColorCaos = document.getElementById("leave_gradient_checkbox").checked
    leaveAlpha = document.getElementById("leave_alpha").value

    let hex_component = hex(leaveAlpha*255)

    for(let i in fracParts){
        if(leaveColorCaos){
            fracParts[i].leaveColor = corAleatoria()+hex_component
        }else{
            fracParts[i].leaveColor = leave_color_1+hex_component
        }
    }  
    draw_three()
    atribute_values()
}
function change_leaves_rotation(){
    leaveRotation = parseFloat(document.getElementById("r_leave_rotation").value)*pi/180
    for(let i in fracParts){
        fracParts[i].leaveRot = leaveRotation
    }  
    draw_three()
    atribute_values()
}
function change_leave_behind(){
    leave_behind = document.getElementById("leave_behind").checked
    draw_three()
}



function change_a_b_param(){
    a = document.getElementById("a_param").value
    b = document.getElementById("b_param").value

    draw_three()
    atribute_values()
}


function update_file_name(){
    let alfabeto = "abcdefghijklmnopqrstuvwxyz_1234567890- "
    if(file_name.value.toLowerCase().split("").every(el => alfabeto.indexOf(el)!= -1) && !file_name.value==""){
        file = file_name.value
    }else{
        file = "randomthree"
    }
    file_name.value = file
}
function update_box_size(){
    image_width = parseInt(document.querySelector("#box_size").value)
    image_height = image_width
    image_canvas.width = image_width     
    image_canvas.height= image_height 


}
function download_image(){  
    c_i.clearRect(0,0,image_width,image_height)   
    c_i.fillStyle = background_color.value
    c_i.fillRect(0,0,image_width,image_height)
    if(!leave_behind){
        for(let i in fracParts){
            fracParts[i].draw_download(image_width/cW,image_height/cH)
        } 
        for(let i in fracParts){
            fracParts[i].drawLeave_download(image_width/cW,image_height/cH)
        } 
    }else{
        for(let i in fracParts){
            fracParts[i].drawLeave_download(image_width/cW,image_height/cH)
        } 
        for(let i in fracParts){
            fracParts[i].draw_download(image_width/cW,image_height/cH)
        } 
    }

    let canvasDataURL = image_canvas.toDataURL()
    let download = document.createElement('a')
    download.href = canvasDataURL
    download.download = `${file}${file=="randomthree"?counter:""}`
    counter+=1
    download.click()
}



function render(){    
    c.clearRect(0,0,canvas.width,canvas.height)

    atribute_values()
    generate_fractal_three()
    
    leaveRadius = document.getElementById("leave_radius").value
    leaveRange = document.getElementById("leave_range").value
    leaveProbability = document.getElementById("leave_probability").value
    leaveMode = document.getElementById("r_leave_mode").value
    leave_color_1 = document.getElementById("leave_color_1").value
    leave_color_2 = document.getElementById("leave_color_2").value
    listaDeCor =  generateColor(leave_color_1, leave_color_2, 20).map(el => "#"+el)
    leaveColorCaos = document.getElementById("leave_gradient_checkbox").checked
    leaveAlpha = document.getElementById("leave_alpha").value
    let hex_component = hex(leaveAlpha*255)

    document.getElementById("leave_range").max = iteration_number+2  
    for(let i in fracParts){
        fracParts[i].leaveMode = leaveMode
        fracParts[i].leaveRadius = leaveRadius
        fracParts[i].leaveProbability = leaveProbability>Math.random()
        if(leaveColorCaos){
            fracParts[i].leaveColor = corAleatoria()+hex_component
        }else{
            fracParts[i].leaveColor = leave_color_1+hex_component
        }
    } 
    draw_three()
} 

document.getElementById("increment").value = tam
file_name.value = file
document.querySelector("#box_size").value = image_width
atribute_values_to_range()
atribute_values()
randomize_tree()
randomize_leaves()
render()


document.addEventListener("mousemove", (event)=>{
    if(event.clientX < 350){
        document.getElementById("btn-tutorial").style.opacity = "1"
        document.getElementById("btn-tutorial").style.transition = "1s"
    }else{
        document.getElementById("btn-tutorial").style.opacity = "0"
        document.getElementById("btn-tutorial").style.transition = "10s"
    }
})


function hex(c) {
    var s = "0123456789abcdef";
    var i = parseInt(c);
    if (i == 0 || isNaN(c))
        return "00";
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}
/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}
/* Remove '#' in color hex string */
function trim(s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }
/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
    var color = [];
    color[0] = parseInt((trim(hex)).substring(0, 2), 16);
    color[1] = parseInt((trim(hex)).substring(2, 4), 16);
    color[2] = parseInt((trim(hex)).substring(4, 6), 16);
    return color;
}
function generateColor(colorStart, colorEnd, colorCount) {
    // The beginning of your gradient
    var start = convertToRGB(colorStart);
    // The end of your gradient
    var end = convertToRGB(colorEnd);
    // The number of colors to compute
    var len = colorCount;
    //Alpha blending amount
    var alpha = 0.0;
    var saida = [];
    for (i = 0; i < len; i++) {
        var c = [];
        alpha += (1.0 / len);
        c[0] = start[0] * alpha + (1 - alpha) * end[0];
        c[1] = start[1] * alpha + (1 - alpha) * end[1];
        c[2] = start[2] * alpha + (1 - alpha) * end[2];
        saida.push(convertToHex(c));
    }
    return saida;
} 
const cores =[{c1:'#FE5252',c2:'#FFD904'},{c1: '#B552FE', c2:'#52B2FE'}, { c1: '#00FFC1', c2: '#00BDFF' }, { c1: '#FF0000', c2: '#FF00C9' }, { c1: '#FF0000', c2: '#004DFF' }, { c1: '#0004FF', c2: '#AE00FF' }]

function corAleatoria() {           
    return listaDeCor[~~(Math.random() * listaDeCor.length)]
}

function random_color(){
    const list = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    const rand = () => list[~~(Math.random()*list.length)]
    return `#${rand()}${rand()}${rand()}${rand()}${rand()}${rand()}`
}
     