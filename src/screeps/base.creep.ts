export interface BaseMemory extends CreepMemory {
    /** The chosen tole for the provided screep */
    role: number;
}

export class BaseCreep extends Creep {

    memory: BaseMemory;

    /** Gets the type of the screep */
    static getRole(creep: BaseCreep) { return creep.memory.role; }

    /** This function is called on each itteration of the game loop */
    static run(creep: BaseCreep) { creep.say('Unassigned creep'); }

    /** Erases the creeps memory and assigns it a new role to run on */
    static changeRole(creep: BaseCreep, role: number){  creep.memory = { role } }

    /** Gets the number of creeps with this role needed at the moment */
    static getNumRequired(room: Room): number{ room;return 0; }

    static getParts(room: Room): BodyPartConstant[] {
        let energy = room.energyCapacityAvailable;
        let partList = [MOVE, WORK, CARRY];
        let outList = [];
        while (outList.length<50){
            for(let i = 0;i<partList.length && outList.length<50;i++){
                let cost = BODYPART_COST[partList[i]]
                console.log(cost);
                if(cost <= energy){
                    outList.push(partList[i]);
                    energy -= cost;
                } else{ return outList;}
            }
        }
        return outList;
    }
}
