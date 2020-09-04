"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const base_creep_1 = require("base.creep");
const builder_creep_1 = require("builder.creep");
const harvester_creep_1 = require("harvester.creep");
const upgrader_creep_1 = require("upgrader.creep");
const _ = require("lodash");
const SPAWN_POOL = {
    builder: 1,
    harvester: 1,
    upgrader: 1
};
exports.loop = () => {
    for (let [name, num] of Object.entries(SPAWN_POOL)) {
        let numSpawned = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
        if (numSpawned < num) {
            console.log(`Spawning new ${name}`);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], `${name}${numSpawned}`, { memory: { role: 'harvester' } });
        }
    }
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'builder':
                builder_creep_1.BuilderCreep.run(creep);
                break;
            case 'harvester':
                harvester_creep_1.HarvesterCreep.run(creep);
                break;
            case 'upgrader':
                upgrader_creep_1.UpgraderCreep.run(creep);
                break;
            default:
                base_creep_1.BaseCreep.run(creep);
                break;
        }
    }
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
};
//# sourceMappingURL=main.js.map