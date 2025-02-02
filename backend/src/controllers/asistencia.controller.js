"use strict";
import { obtenerInscritosSesionService, registrarAsistenciaService } from "../services/asistencia.service.js";
import { actualizarEstadoAsistenciaService } from "../services/asistencia.service.js";
import { registrarAsistenciaConTokenService } from "../services/asistencia.service.js";


// Controlador para obtener la lista de estudiantes inscritos en una sesión específica
export async function obtenerInscritosSesion(req, res) {
  const { tallerId, sesionId } = req.params;

  // Asegúrate de que req.user existe y contiene el id del profesor
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autorizado" });
  }

  const idProfesor = req.user.id; // Obtener el ID del profesor desde el token

  try {
    // Llamar al servicio para obtener los estudiantes inscritos con las validaciones necesarias
    const result = await obtenerInscritosSesionService(tallerId, sesionId, idProfesor);

    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al obtener inscritos para la sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}




// Controlador para registrar o actualizar la asistencia en una sesión
export async function registrarAsistencia(req, res) {

  const { tallerId, sesionId } = req.params;
  const { asistencias } = req.body; // Array de { usuarioId, estado, comentarios }
  const idProfesor = req.user.id; // Obteniendo el ID del profesor desde el token

  const result = await registrarAsistenciaService(tallerId, sesionId, asistencias, idProfesor);
  if (result.error) {
    return res.status(result.statusCode).json({ error: result.error });
  }

  res.json(result);
}

// Controlador para actualizar el estado de la asistencia de un estudiante
export async function actualizarEstadoAsistencia(req, res) {
  const { tallerId, sesionId, usuarioId } = req.params;
  const { nuevoEstado, comentarios } = req.body;

  // Asegúrate de que req.user existe
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autorizado" });
  }

  const idProfesor = req.user.id; // Obtener el ID del profesor desde el token JWT

  try {
    const result = await actualizarEstadoAsistenciaService(
      tallerId,
      sesionId,
      usuarioId,
      nuevoEstado,
      comentarios,
      idProfesor
    );

    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error("Error al actualizar el estado de asistencia:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


// Controlador para que los estudiantes registren asistencia usando el token
export async function registrarAsistenciaConToken(req, res) {
  const { tallerId, sesionId } = req.params;
  const { usuarioId, tokenAsistencia } = req.body;

  try {
    const result = await registrarAsistenciaConTokenService(tallerId, sesionId, usuarioId, tokenAsistencia);
    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    console.error("Error al registrar asistencia con token:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}