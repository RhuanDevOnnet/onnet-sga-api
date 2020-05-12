"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TicketAnexoSchema extends Schema {
  up() {
    this.create("ticket_anexos", (table) => {
      table.integer("ticket_id").unsigned().index("ticket_id")
      table.integer("anexo_id").unsigned().index('anexo_id')
      table.foreign("ticket_id").references("tickets.id").onDelete("cascade")
      table.foreign("anexo_id").references("anexos.id").onDelete("cascade")
    });
  }

  down() {
    this.drop("ticket_anexos");
  }
}

module.exports = TicketAnexoSchema;
