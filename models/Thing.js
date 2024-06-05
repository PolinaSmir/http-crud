const DataBaseError = require("../errors/DataBaseError");

class Thing {
  static _tableName = "things";
  static _client;
  static name = "Thing";

  static _attributes = {
    body: "string",
  };

  static async create(insertValues) {
    const insertAttr = Object.entries(this._attributes)
      .filter(([attr, domain]) => attr in insertValues)
      .map(([attr]) => attr);

    const insertSchema = insertAttr.map((currentAttr) => `"${currentAttr}"`).join(",");

    const insertValueStr = insertAttr
      .map((currentAttr) => {
        const value = insertValues[currentAttr];

        return typeof value === "string" ? `'${value}'` : value;
      })
      .join(",");

    const queryStr = `
    INSERT INTO ${this._tableName} (${insertSchema})
    VALUES (${insertValueStr})
    RETURNING *;
    `;

    const { rows } = await this._client.query(queryStr);

    return rows;
  }

  static async findByPk(pk) {
    const { rows } = await this._client.query(`
    SELECT * FROM ${this._tableName}
    WHERE id = ${pk};
    `);

    return rows;
  }

  static async findAll() {
    const { rows } = await this._client.query(`
    SELECT * FROM ${this._tableName};
    `);

    return rows;
  }

  static async updateByPk({ id, updateValues }) {
    console.log("1");
    const insertAttr = Object.entries(this._attributes)
      .filter(([attr, domain]) => attr in updateValues)
      .map(([attr]) => attr);
    console.log("2");

    const insertValueStr = insertAttr
      .map((attr) => {
        const value = updateValues[attr];

        return `${attr} = ${typeof value === "string" ? `'${value}'` : value}`;
      })
      .join(",");

    const { rows } = await this._client.query(`
    UPDATE ${this._tableName}
    SET ${insertValueStr}
    WHERE id = ${id}
    RETURNING *;
    `);

    return rows;
  }

  static async deleteByPk(pk) {
    const { rows } = await this._client.query(`
    DELETE FROM ${this._tableName}
    WHERE id = ${pk}
    RETURNING *;
    `);

    return rows;
  }
}

module.exports = Thing;
