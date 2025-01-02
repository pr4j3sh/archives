const { createClient } = require("redis");

async function initRedis(uri) {
  try {
    const client = await createClient({
      url: uri,
    }).connect();
    await client.set("key", "value");
    const value = await client.get("key");
    console.log({ value });
    await client.disconnect();
  } catch (error) {
    console.error(error);
  }
}

initRedis(process.env.REDIS_URI);
