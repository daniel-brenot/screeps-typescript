import { BaseCreep } from "base.creep";

export class HarvesterCreep extends BaseCreep {

  static run(creep: HarvesterCreep): void {
    if (creep.store.getFreeCapacity() > 0) {
      this.harvestSource(creep);
    }
    else { this.deliverMaterial(creep); }
  }

  static getNumRequired(room: Room): number{ room;return 5; }

  /** Logic for harvesting resource from the desired source */
  static harvestSource(creep: HarvesterCreep) {
    // TODO implement smart logic to coordinate harvesting logic between multiple harvesters
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1]);
    }
  }

  /** Logic for delivering the resource to the desired target*/
  static deliverMaterial(creep: HarvesterCreep) {
    // TODO allow for coordination of where the materials should go
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  }


}
