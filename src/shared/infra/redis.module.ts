import { CacheInterface } from "../interfaces/cache.interface";
import Redis from "ioredis";

class RedisModule implements CacheInterface {
  private publisher: Redis;
  private subscriber: Redis;

  constructor() {
    this.publisher = new Redis({
      host: "localhost",
      port: 6379,
    });

    this.subscriber = new Redis({
      host: "localhost",
      port: 6379,
    });
  }

  get = async (key: string): Promise<any | null> => {
    return null;
  };

  set = async (key: string, value: any): Promise<void> => {
    return;
  };

  publishToChannel = async (channel: string, data: any) => {
    await this.publisher.publish(channel, JSON.stringify(data), (err) => {
      throw err;
    });
  };

  subscribeToChannel = async (channel: string) => {
    await this.subscriber.subscribe(channel, (err, count) => {
      throw err;
    });
  };
}

export default RedisModule;
