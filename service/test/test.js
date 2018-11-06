const degradeDbHierarchy = require("../db/dbListeners");
const assert = require("chai").assert;

let dbs = ["db1", "db2"];

describe("reorganize database hierarchy's", () => {
  degradeDbHierarchy("db1", dbs);
  it("should return an array", () => {
    assert.typeOf(dbs, "array");
  });

  it("db array should have a length of 1", () => {
    assert.equal(dbs.length, 1);
  });

  it("db should contain only db2", () => {
    assert.equal(dbs[0], "db2");
  });

  degradeDbHierarchy("db2", dbs);
  it("should return an array", () => {
    assert.typeOf(dbs, "array");
  });

  it("db array should have a length of 0", () => {
    assert.equal(dbs.length, 0);
  });
});
