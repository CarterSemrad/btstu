function Pillar2(){
    this.posUniName = "pillar2pos";
    this.pos = [0,0,0];

    this.deIdentifier = "pillar2de";

    this.initUnis = () => {
        renderer.addUniform(this.posUniName, "vec3", this.pos);
    }

    this.graphicsDE = `float pillar2de(vec3 p){
        if(length(p.xz) > 7.){
            return length(p.xz) - 5.;
        }
        vec3 objectu_sizez5z = vec3(3., 0.4, .4);
        float objectstatement0 = length((mod(twist(p,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.) - vec3(0., 0., 0.)) - -3.3;
float objectstatement1 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(-2., -0.02, 0.), objectu_sizez5z);
float objectstatement2 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(2., 0., 0.), vec3(0.35999999999999993, 1.3000000000000007, 0.5));
float objectstatement3 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(0., 0., 2.), vec3(0.41999999999999993, 1.740000000000001, 0.3999999999999999));
float objectstatement4 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 3.919999999999997, 0.)) - vec3(0., 3.919999999999997, 0.)/2.)-vec3(0., 0., -2.), vec3(0.45999999999999996, 2.1600000000000015, 0.43999999999999995));
float objectunion0 = max(smin(smin(smin(smin(objectstatement0, objectstatement1, 0.2), objectstatement2, 0.2), objectstatement3, 0.2), objectstatement4, 0.2), -9999.0);
        return objectunion0;
    }`;
}