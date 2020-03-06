import Redis from 'ioredis';

class Cache {
  redis: Redis.Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      keyPrefix: 'cache:',
    });
  }

  set(key: Redis.KeyType, value: Redis.ValueType) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key: Redis.KeyType) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key: Redis.KeyType) {
    return this.redis.del(key);
  }

  // async invalidatePrefix(prefix: string) {
  //   const keys = await this.redis.keys(`cache:${ prefix }:*`);

  //   const keysWithoutPrefix = keys.map(key => key.replace('cache:', '') as Redis.KeyType);

  //   return this.redis.del(keysWithoutPrefix);
  // }
}

export default new Cache();
