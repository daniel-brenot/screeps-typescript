import { BaseCreep, BaseMemory } from "base.creep";

interface UpgraderMemory extends BaseMemory {
  /** If the creep is upgrading */
  upgrading: boolean;
}

export class SimpleUpgraderCreep extends BaseCreep {

  memory: UpgraderMemory;

  static run(creep: SimpleUpgraderCreep): void {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }

  static getNumRequired(room: Room): number { room; return 1; }

  static getParts(room: Room): BodyPartConstant[] {
    let energy = room.energyAvailable;
    let partList = [MOVE, WORK, CARRY];
    let outList = [];
    while (outList.length < 50) {
      for (let i = 0; i < partList.length && outList.length < 50; i++) {
        let cost = BODYPART_COST[partList[i]]
        console.log(cost);
        if (cost <= energy) {
          outList.push(partList[i]);
          energy -= cost;
        } else { return outList; }
      }
    }
    return outList;
  }
}
