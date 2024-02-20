function Bridge(){
    this.posUniName = "bridgepos";
    this.pos = [0,0,0];

    this.deIdentifier = "bridgede";

    this.initUnis = () => {
        renderer.addUniform(this.posUniName, "vec3", this.pos);
    }

    this.graphicsDE = `float bridgede(vec3 p){
        if(length(p.yz) > 15.){
            return length(p.yz) - 10.;
        }

        vec3 objectu_positionz18z = vec3(0.,.7,-4.4);

        float objectstatement0 = length((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.) - vec3(0., 0., 0.)) - -3.280000000000003;
float objectstatement1 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-vec3(0., 0., 0.), vec3(5.399999999999992, 0.5, 4.400000000000001));
float objectstatement2 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-vec3(-0.7101762348101999, 0.16033200924318505, -3.1072626569818413), vec3(1.0400000000000005, 0.5, 0.6600000000000001));
float objectstatement3 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-vec3(-0.9099252306409606, 0.16053760227478173, -0.7118880851909671), vec3(0.5, 0.5, 1.0800000000000007));
float objectstatement4 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-vec3(-1.1424903583910957, 0.2004187827721106, 2.6000568155890202), vec3(0.6000000000000001, 0.5, 0.5399999999999996));
float objectstatement5 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-vec3(1.2545616717106394, 0.20003153738629234, 1.467790545261569), vec3(0.8000000000000003, 0.5, 0.6600000000000001));
float objectstatement6 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-vec3(9.224466890536453, 15.487403615205599, -0.3487322537442599), vec3(0.5, 0.5, 0.5));
float objectstatement7 = sdBox((mod(p, vec3(4.620000000000022, 0., 0.)) - vec3(4.620000000000022, 0., 0.)/2.)-objectu_positionz18z, vec3(1.8200000000000007, 0.7400000000000002, 0.09999999999999984));
float objectunion0 = max(smin(smin(smin(smin(smin(smin(smin(objectstatement0, objectstatement1, 0.2), objectstatement2, 0.2), objectstatement3, 0.2), objectstatement4, 0.2), objectstatement5, 0.2), objectstatement6, 0.2), objectstatement7, 0.2), -9999.0);
        return objectunion0;
    }`;
}