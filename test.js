const {deepStrictEqual} = require('assert');
const {parse, visit} = require('.');

// minimal because most functionality is from deps
describe('tokenizer/tree integration', function () {
  it('looks good', function () {
    const tree = parse('SUM(1, 2)');
    const v = visitor();

    visit(tree, v);

    deepStrictEqual(v.calls, [
      'function: SUM',
      'number: 1',
      'number: 2',
      'end: SUM',
    ]);
  });
});

function visitor() {
  const calls = [];

  return {
    calls,
    enterFunction(node) {
      calls.push(`function: ${node.name}`);
    },
    exitFunction(node) {
      calls.push(`end: ${node.name}`);
    },
    enterNumber(node) {
      calls.push(`number: ${node.value}`);
    }
  };
}
