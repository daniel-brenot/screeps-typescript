import { BaseCreep } from "base.creep";
import { BuilderCreep } from "builder.creep";
import { HarvesterCreep } from "harvester.creep";
import { UpgraderCreep } from "upgrader.creep";
import * as _ from 'lodash';

const SPAWN_POOL = {
    builder: 1,
    harvester: 1,
    upgrader: 1
};

// Main game loop
export const loop = () => {
    for(let [name, num] of Object.entries(SPAWN_POOL)){
        let numSpawned = _.filter(Game.creeps, (creep: BaseCreep) => creep.memory.role == 'harvester').length;
        if(numSpawned < num){
            console.log(`Spawning new ${name}`);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], `${name}${numSpawned}`, {memory: {role: 'harvester'}});
        }
    }
    // Loop through all screeps and call code on them.
    // TODO Load balance cpu for later game
    for(let name in Game.creeps) {
        let creep: BaseCreep = Game.creeps[name] as BaseCreep;
        switch(creep.memory.role){
            case 'builder':
                BuilderCreep.run(creep as BuilderCreep);
                break;
            case 'harvester':
                HarvesterCreep.run(creep as HarvesterCreep);
                break;
            case 'upgrader':
                UpgraderCreep.run(creep as UpgraderCreep);
                break;
            default:
                BaseCreep.run(creep);
                break;
        }
    }
    // Cleanup loop to remove old screeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
