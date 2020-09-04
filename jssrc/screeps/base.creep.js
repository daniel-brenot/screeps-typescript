"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCreep = void 0;
class BaseCreep extends Creep {
    static getRole(creep) { return creep.memory.role; }
    static run(creep) { creep.say('Unassigned creep'); }
}
exports.BaseCreep = BaseCreep;
//# sourceMappingURL=base.creep.js.map