export interface BaseMemory extends CreepMemory {
    /** The chosen tole for the provided screep */
    role: string;
}

export class BaseCreep extends Creep {

    memory: BaseMemory;

    /** Gets the type of the screep */
    static getRole(creep: BaseCreep) { return creep.memory.role; }

    /** This function is called on each itteration of the game loop */
    static run(creep: Creep): void { creep.say('Unassigned creep'); }
}
