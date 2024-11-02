"use strict";
import { EntitySchema } from "typeorm";

const SesionSchema = new EntitySchema({
  name: "Sesion",
  tableName: "sesiones",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    fecha: {
      type: "date",
      nullable: false,
    },
    estado: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  relations: {
    taller: {
      type: "many-to-one",
      target: "Taller",
      joinColumn: { name: "taller_id" }, // ID del taller al que pertenece la sesión
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

export default SesionSchema;