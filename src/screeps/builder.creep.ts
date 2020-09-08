import { BaseCreep, BaseMemory } from "./base.creep";

interface BuilderMemory extends BaseMemory{
  /** If the creep is building */
  building: boolean;
}

export class BuilderCreep extends BaseCreep {

  memory: BuilderMemory;

  static run(creep: BuilderCreep): void {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }

  /** Gets the number of creeps with this role needed at the moment */
  static getNumRequired(room: Room): number{
    // Based on the number of buildings that need to be built
    return room.find(FIND_CONSTRUCTION_SITES).length;
  }

}
