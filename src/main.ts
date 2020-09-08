import { BaseCreep } from "base.creep";
import { BuilderCreep } from "builder.creep";
import { HarvesterCreep } from "harvester.creep";
import { UpgraderCreep } from "upgrader.creep";
import { ring } from "builder.util";
import { CREEP_ROLE } from "data";
import { SimpleHarvesterCreep } from "harvester-simple.creep";
import { SimpleUpgraderCreep } from "upgrader-simple.creep";

//import { ring } from "builder.util";

// const ROOM_WIDTH = 50;
// const ROOM_HEIGHT = 50;

const ROLE_MAP: Record<string, typeof BaseCreep> = {
    [CREEP_ROLE.SIMPLEHARVESTER]: SimpleHarvesterCreep,
    [CREEP_ROLE.SIMPLEUPGRADER]: SimpleUpgraderCreep,
    [CREEP_ROLE.HARVESTER]: HarvesterCreep,
    [CREEP_ROLE.BUILDER]: BuilderCreep,
    [CREEP_ROLE.UPGRADER]: UpgraderCreep,
};



// Main game loop
export const loop = () => {

    // Just horde pixels, might as well :P
    if (Game.cpu.bucket > 6000)
    try{Game.cpu.generatePixel();}catch(e){}


    Object.values(Game.rooms).forEach(room => {
        //TODO put these on an interval
        planBuildings(room);
        refreshSpawnPool(room);
    });
    // Loop through all screeps and call code on them.
    // TODO Load balance cpu for later game
    Object.values(Game.creeps as Record<string, BaseCreep>).forEach(creep => {
        // Extract functional flags from creep name
        ROLE_MAP[creep.memory.role].run(creep);
    });
    // Cleanup loop to remove old screeps
    //TODO
    Object.keys(Memory.creeps).forEach(name => {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    });
}

/** Spawns the needed creeps based on current number spawned */
function refreshSpawnPool(room: Room) {
    // TODO Delegate between 2 spawn pools
    let count = Object.values(Game.creeps).reduce((previous, current: BaseCreep) => {
        (previous[current.memory.role] = (previous[current.memory.role] || 0) + 1); return previous;
    }, {});
    console.log(JSON.stringify(count))
    for (let [role, creepType] of Object.entries(ROLE_MAP)){
        console.log('count for role: ' + count[String(role)]);
        console.log('generating for ' + role + ' ' + creepType.getNumRequired(room));
        if((count[String(role)] || 0) < creepType.getNumRequired(room)){
            console.log('generating 1 for ' + role);
            let parts = creepType.getParts(room);
            console.log('gened parts');
            let result = Game.spawns['Spawn1'].spawnCreep(parts, `${role}-${(Math.random().toString(36).substring(7))}`, { memory: { role } });
            if(result !== OK){
                console.log('failed to spawn with code ' + result);
            }
            return;
        }
    }
}

/** Attempts to populate buildings on the map based on current controller level*/
function planBuildings(room: Room) {
    let controllerLevel = room.controller?.level;
    // No controller in room, plan to build one
    if (typeof controllerLevel === 'undefined') {
        // 1 controller
    } else if (controllerLevel === 1) {
        // Make some quick bootstrap buildings to get the game started
        // 5 containers?, 1 spawn
        //createExtensions(room, 5);
    } else if (controllerLevel === 2) {
        // 5 extensions
        createExtensions(room, 5);
    } else if (controllerLevel === 3) {
        // 10 extensions, 1 tower
        createExtensions(room, 10);
    } else if (controllerLevel === 4) {
        // 10 extensions, 1 tower
        createExtensions(room, 15);
    }
}

/**
 * Creates extensions around the spawn area.
 * Also creates roads in the gaps
 * TODO refine this to avoid issues with unwalkable area around spawn
 */
function createExtensions(room: Room, num: number) {
    let extensions = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_EXTENSION }).length;
    num -= extensions;
    let spawn = room.find(FIND_MY_SPAWNS)[0];
    ring(spawn.pos.x, spawn.pos.y, num, (x, y) => {
        if((x + y) % 2 === 1){
            return room.createConstructionSite(x, y, STRUCTURE_EXTENSION) == OK;
        } else { room.createConstructionSite(x, y, STRUCTURE_ROAD); return false;}
    });
}
