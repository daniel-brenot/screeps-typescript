import { encode, decode } from "msgpack-lite";

/**
 * Itility for compacting memory
*/
export class CompactMemory{

  get Memory(): Memory{
    return decode(RawMemory.get());
  }

  set Memory(value){
    RawMemory.set(encode(value));
  }

}
