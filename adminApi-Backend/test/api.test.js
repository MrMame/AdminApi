import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execAsync = promisify(exec);

test('EndpointOk_TargetNotExists_ReturnsErrorMessage', async () => {
  // ARRANGE
  let textAssumed = `'ALIEN' -> Fehler: Netzwerk konnte nicht durchsucht werden`;
  //ACT
  const { stdout } = await execAsync('curl -s http://localhost:3000/wake/status/alien');
  //ASSERT
  assert.equal(stdout.startsWith(textAssumed), true);
});