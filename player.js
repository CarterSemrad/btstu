function Player(){

    this.posUniName = "playerpos";
    this.pos = [0,0,0];

    this.z = 0;
    this.x = 15;
    this.dead = false;

    let lanes = [-3, 0, 3];
    this.lane = 1;

    this.update = () => {
        if(keyPressed["d"]){
            if(this.lane > 0){
                this.lane--;
            }
        }

        if(keyPressed["a"]){
            if(this.lane < 2){
                this.lane++;
            }
        }

        this.x = camPos[0] + 15;
        //mod(p.x/5., 1.) > 0.7

        //console.log(obstacles(this.x / 5));

        if(2 - this.lane == obstacles(this.x / 5) && mod(this.x / 5, 1) > 0.7){
            this.dead = true;
        }

        this.z = lerp(this.z, lanes[this.lane], 15*dt);
    }

    this.deIdentifier = "playerde";

    this.graphicsDE = `float playerde(vec3 p){
        if(length(p) > 2.){
            return length(p) - 1.5;
        }
        float objectstatement0 = length(p) - 1.;
float objectstatement1 = sdBox(p-vec3(-0.05291528043628058, -0.021903354372863646, 0.6578908715401734), vec3(1.6600000000000008, 0.09999999999999987, 0.9600000000000003));
float objectstatement2 = sdBox(p-vec3(-0.0001862456368470558, 0.10067630377999565, 0.8571044766685708), vec3(0.14000000000000007, 1.540000000000001, 0.9800000000000004));
float objectstatement3 = length(p - vec3(-0.005472885286035935, -0.029167183774926043, 1.2773521536590116)) - 0.6199999999999997;
float objectstatement4 = length(p - vec3(-0.4679996922189376, 0.35672342974691895, -0.808756936225508)) - 0.19999999999999943;
float objectstatement5 = length(p - vec3(0.5025153232879811, 0.35641370152090157, -0.7877529247719554)) - 0.19999999999999943;
float objectstatement6 = sdBox(p-vec3(0.0008072258345014002, -0.3028070309368585, -0.9741866862623801), vec3(0.3599999999999999, 0.08000000000000011, 0.5));
float objectunion0 = max(objectstatement0, -smin(smin(smin(smin(smin(objectstatement1, objectstatement2, 0.2), objectstatement3, 0.2), objectstatement4, 0.2), objectstatement5, 0.2), objectstatement6, 0.2));
        return objectunion0;
    }`;

    this.initUnis = () => {
        renderer.addUniform(this.posUniName, "vec3", this.pos);
    }
}

function obstacles(x){
    let rand = Math.floor(1.4*sin( (2*Math.floor(x)-100) * (2*Math.floor(x)-100)) + 1.44);

    return mod(rand + 1, 3);
}