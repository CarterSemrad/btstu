function Pillar(){
    this.posUniName = "pillarpos";
    this.pos = [0,0,0];

    this.deIdentifier = "pillarde";

    this.initUnis = () => {
        renderer.addUniform(this.posUniName, "vec3", this.pos);
    }

    this.graphicsDE = `float pillarde(vec3 p){
        if(length(p.xz) > 7.){
            return length(p.xz)-5.;
        }

        vec3 objectu_sizez11z = vec3(0.4,3.,0.4);
        float objectstatement0 = length((mod(twist(p,0.06000000000000005), vec3(0., 2., 0.)) - vec3(0., 2., 0.)/2.) - vec3(0., 0., 0.)) - -3.3;
float objectstatement1 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 2., 0.)) - vec3(0., 2., 0.)/2.)-vec3(-2., -0.02, 0.), vec3(0.5, 1.1800000000000006, 0.5));
float objectstatement2 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 2., 0.)) - vec3(0., 2., 0.)/2.)-vec3(2., 0., 0.), vec3(0.35999999999999993, 1.3000000000000007, 0.5));
float objectstatement3 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 2., 0.)) - vec3(0., 2., 0.)/2.)-vec3(0., 0., 2.), vec3(0.41999999999999993, 1.1800000000000006, 0.5));
float objectstatement4 = sdBox((mod(twist(p,0.06000000000000005), vec3(0., 2., 0.)) - vec3(0., 2., 0.)/2.)-vec3(0., 0., -2.), objectu_sizez11z);
float objectunion0 = max(smin(smin(smin(smin(objectstatement0, objectstatement1, 0.2), objectstatement2, 0.2), objectstatement3, 0.2), objectstatement4, 0.2), -9999.0);
        return objectunion0;
    }`;
}