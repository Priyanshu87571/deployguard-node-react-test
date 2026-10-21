import test from "node:test";
import assert from "node:assert/strict";
import { app } from "../server/app.js";
import { createServer } from "node:http";

async function withServer(run) {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise((resolve, reject) => server.close((err) => err ? reject(err) : resolve())); }
}

test("health endpoint returns ok", async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  });
});

test("items endpoint validates valid input", async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/api/items`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "keyboard", quantity: 2 })
    });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { name: "keyboard", quantity: 2 });
  });
});

test("optional failure marker is visible to CI", async () => {
  if (process.env.FORCE_CI_FAILURE === "true") {
    assert.fail("FORCED_CI_FAILURE: DeployGuard test marker (Node/React project)");
  }
});
