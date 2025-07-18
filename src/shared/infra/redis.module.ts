import { CacheInterface } from "../interfaces/cache.interface";

class RedisModule implements CacheInterface {
  constructor() {
    //TODO: connect to redis here.
  }

  get: (key: string) => Promise<any | null> = async (key: string) => {
    return null;
  };

  set: (key: string, value: any) => Promise<void> = async (
    key: string,
    value: any
  ) => {
    return;
  };
}

export default RedisModule;
