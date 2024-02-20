let player = new Player();
let bridge = new Bridge();
let pillar = new Pillar();
let pillar2 = new Pillar2();

let entities = [player, bridge, pillar, pillar2];

let renderer;

function assembleGraphics(){
    let initDEs = "";
    let deSum = "";
    let entityUnis = "";
    for(let i of entities){
        initDEs += `\n${i.graphicsDE}\n`;
        deSum += `d = min(d, ${i.deIdentifier}(p - ${i.posUniName}));\n`;
        entityUnis += `uniform vec3 ${i.posUniName};`;
    }

    renderer = new Renderer(
        `
            ${initDEs}

            float de(vec3 p){
                float d = 9999.;
                d = min(d, bridgede(p));
                vec3 q = p - vec3(0., -8., 15.);
                q = rotZ(q, 3.14159265/2.);
                d = min(d, pillar2de(q));
                vec3 pillarq = mod(p - vec3(0.,0.,-40.), vec3(70., 0., 0.)) - vec3(35., 0., 0.);
                float pillars = pillarde(pillarq);
                d = min(d, max(max(pillars, p.y - 25.), -100000.-p.y));
                vec3 playerP = p - vec3(camPos.x + 15., 1.9 + 0.2*sin(2.*t), playerZ);
                playerP = rotY(playerP, 3.1415926535 / 2.);
                d = min(d, playerde(playerP));
                return d;
            }

            float bloomDE(vec3 p){
                vec3 q = p - vec3(0., -8., 15.);
                q = rotZ(q, 3.14159265/2.);
                float objectstatement4 = sdBox((mod(twist(q,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(0., 0., -2.), vec3(0.45999999999999996, 2.1600000000000015, 0.43999999999999995));
                return objectstatement4;
            }
        `,
        `

        vec3 norm = grad(p);

        vec3 col = abs(norm);

        vec3 lightPos = vec3(-.7,1.4,.9);

        vec3 pillarP = p - vec3(0., -8., 15.);
        pillarP = rotZ(pillarP, 3.14159265/2.);

        vec3 pillarq = mod(p - vec3(0.,0.,-40.), vec3(70., 0., 0.)) - vec3(35., 0., 0.);

        float bridgeDist = bridgede(p);

        vec3 playerP = p - vec3(camPos.x + 15., 1.9 + 0.2*sin(2.*t), playerZ);
        playerP = rotY(playerP, 3.1415926535 / 2.);

        if(playerde(playerP) < 0.002){
            if(length(playerP) >= 0.9){
                col = vec3(.877, 0.74, 0.72);

                vec3 reflectVec = normalize(reflect(lightPos, norm));
                vec3 viewPos = normalize(p - camPos);

                float spec = dot(reflectVec, viewPos);

                spec = clamp(spec, 0., 1.);

                col += 0.3*spec;
            } else {
                col = vec3(0.) + 0.1*dot(norm, lightPos);
                if(abs(playerP.y - playerP.x) < 0.05){
                    col = vec3(1.);
                }
                col += mix(vec3(0., 1., 1.), vec3(0.),clamp(3.*abs(playerP.y - playerP.x), 0., 1.));
            }
        }

        if(bridgeDist < 0.002 || pillar2de(pillarP) < 0.002){
            col = vec3(0.55, 0.5, 0.5);
            float tex = bridgeRock(p);

            float eps = 0.001/2.;


            vec3 texNorm = normalize(vec3(
                (bridgeRock(p - vec3(eps,0.,0.)) - bridgeRock(p + vec3(eps,0.,0.)))/(2.*eps),
                1.,
                (bridgeRock(p - vec3(0.,0.,eps)) - bridgeRock(p + vec3(0.,0.,eps)))/(2.*eps)
            ));

            vec3 bridgeNorm = (norm+0.3*texNorm);

            col += vec3(tex*0.4);
            col += 0.3*dot(normalize(lightPos), bridgeNorm);

            vec3 reflectVec = reflect(lightPos, bridgeNorm);
            vec3 viewPos = normalize(camPos - p);

            float spec = dot(reflectVec, viewPos);

            spec = clamp(spec, 0., 1.);

            if(pillar2de(pillarP) > 0.002){
                col += mix(-.2, 0., (p.z + 5.)/10.);
            }

            col += spec*0.15;

            if(p.y > 0.6 && p.z > -4.){
                col += vec3(-0.07,-0.1,-0.07);
            }

            if(abs(p.y + 0.03) <= 0.05){
                col = vec3(1.);
            }

            col += 0.4*mix(vec3(1.,.5,.5), vec3(0.),clamp(abs(p.y + 0.03)*4., 0., 1.));


            if(bridgeDist < 0.002){
                vec3 obsCol = vec3(1., 0.4, 0.4);
                if(mod(p.x/5., 1.) > 0.7){
                    if(obstacles(p.x/5.) == 0.){
                        if(p.z > 1.5 && p.z < 4.3){
                            vec3 reflectVec = reflect(lightPos, norm);
                            vec3 viewPos = normalize(camPos - p);

                            float spec = dot(reflectVec, viewPos);
                            col = vec3(1.,0.49,0.33) + clamp(spec*0.7 + 0.2*bridgeRock(p), 0., 1.) - 0.5;
                        }
                    }
                    if(obstacles(p.x/5.) == 1.){
                        if(p.z < 1.5 && p.z > -1.4){
                            vec3 reflectVec = reflect(lightPos, norm);
                            vec3 viewPos = normalize(camPos - p);

                            float spec = dot(reflectVec, viewPos);
                            col = vec3(1.,0.49,0.33) + clamp(spec*0.7 + 0.2*bridgeRock(p), 0., 1.) - 0.5;
                        }
                    }
                    if(obstacles(p.x/5.) == 2.){
                        if(p.z < -1.4){
                            vec3 reflectVec = reflect(lightPos, norm);
                            vec3 viewPos = normalize(camPos - p);

                            float spec = dot(reflectVec, viewPos);
                            col = vec3(1.,0.49,0.33) + clamp(spec*0.7 + 0.2*bridgeRock(p), 0., 1.) - 0.5;
                        }
                    }
                }

                if(length(p.xz - vec2(camPos.x + 15., playerZ)) < .9){
                    col -= 0.3;
                }
            }
        }

        if(pillar2de(pillarP) < 0.002){
            vec3 objectu_sizez5z = vec3(3., 0.4, .4);
            float objectstatement0 = length((mod(twist(pillarP,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.) - vec3(0., 0., 0.)) - -3.3;
            float objectstatement1 = sdBox((mod(twist(pillarP,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(-2., -0.02, 0.), objectu_sizez5z);
            float objectstatement2 = sdBox((mod(twist(pillarP,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(2., 0., 0.), vec3(0.35999999999999993, 1.3000000000000007, 0.5));
            float objectstatement3 = sdBox((mod(twist(pillarP,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(0., 0., 2.), vec3(0.41999999999999993, 1.740000000000001, 0.3999999999999999));
            float objectstatement4 = sdBox((mod(twist(pillarP,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(0., 0., -2.), vec3(0.45999999999999996, 2.1600000000000015, 0.43999999999999995));

            if(objectstatement1 <= 0.002){
                col -= 0.2;
            }

            if(objectstatement4 <= 0.002){
                col = vec3(1.);
            }

            if(objectstatement2 <= 0.002){
                vec3 reflectVec = reflect(lightPos, norm);
                vec3 viewPos = normalize(camPos - p);

                float spec = dot(reflectVec, viewPos);
                col = vec3(1.,0.49,0.33) + spec*0.7 + 0.2*bridgeRock(p);
            }

            col += 0.3*clamp(mix(vec3(0., 1., 1.), vec3(0.), objectstatement4/3.), 0., 1.);

        }

        if(pillarde(pillarq) < 0.002 || p.z < -4.23){
            col = vec3(.877, 0.74, 0.72);

            vec3 reflectVec = reflect(lightPos, norm);
            vec3 viewPos = normalize(camPos - p);

            float spec = dot(reflectVec, viewPos);

            spec = clamp(spec, 0., 1.);

            col += spec;
        }

        vec3 sphereP = normalize(p-camPos);

        vec3 skyCol = mix(vec3(0.52, 0.80, 0.92), vec3(0.52, 0.80, 0.92),length(pos)) + vec3(0.2,0.,0.);

        skyCol = mix(vec3(0.5, 0.8, 0.9), vec3(1., .9, 0.45), clamp(sphereP.y + 0.6, 0., 1.));
        float clouds = clamp(bridgeRock(2.5*normalize(p-camPos)+t/300.), 0., 1.);

        skyCol += mix(vec3(clouds), vec3(0.15, 0., 0.1), clamp(sphereP.y + .6, 0., 1.));

        if(dist > MIN_DIST){
            col = skyCol;
        } else {
            col += 0.15*vec3(0.7, 0.8, 0.9);
            col = mix(col, skyCol, clamp(length(p-camPos)/1000., 0., 1.));
        }


        col += vec3(mix(vec3(0.,1.,1.),vec3(0.),clamp(bloomDist*1., 0.,1.)));
        if(deadTime == 0.){
            color = vec4((tone(col, 1.) + col*0.3), 1.);
        } else {
            color = mix(vec4((tone(col, 1.) + col*0.3), 1.), vec4(1.-(tone(col, 1.) + col*0.3), 1.),clamp(5.*deadTime, 0., 1.));
        }
        
        `,
        `
        float obstacles(float x){
            float rand = floor(1.4*sin((2.*floor(x)-100.)*(2.*floor(x)-100.))+1.44);

            return mod(rand + 1., 3.);
        }

        float bridgeRock(vec3 p){
            p /= 1.5;
            return noise(10.*p)*0.1 + 0.2*noise(5.*p) + 0.05*noise(20.*p) + 0.025*noise(40.*p);
        }
        //ty shadertoy user @nimitz!!
        vec3 tone(vec3 color, float gamma)
        {
            float white = 2.;
            float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
            float toneMappedLuma = luma * (1. + luma / (white*white)) / (1. + luma);
            color *= toneMappedLuma / luma;
            color = pow(color, vec3(1. / gamma));
            return color;
        }
        `,
        `${entityUnis}
        uniform float playerZ;
        uniform float deadTime;`
    );

    for(let i of entities){
        i.initUnis();
    }
}

assembleGraphics();

let camPos = [0,7,10];

let t = performance.now() / 1000;
let startT = t;

let dt = 1/60;

let speed = 10;

renderer.addUniform("playerZ", "float", 0);
renderer.addUniform("deadTime", "float", 0);

let deadTime = 0;

function update(){
    let now = performance.now() / 1000;
    dt = now - t;
    t = now;
    renderer.setUni("t", t);
    speed += dt * 0.5;
    if(speed > 30){
        speed = 30;
    }
    if(!player.dead){
        camPos[0] += speed*dt;
        player.update();
    } else {
        deadTime += dt;
        renderer.setUni("deadTime", deadTime);
    }
    renderer.setUni("playerZ", player.z);
    renderer.setUni("camPos", camPos);
    renderer.draw();

    keyPressed = [];
    requestAnimationFrame(update);
}

update();

