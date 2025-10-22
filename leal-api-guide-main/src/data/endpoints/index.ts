import { loginEndpoint } from './login';
import { meEndpoint } from './me';
import { refreshEndpoint } from './refresh';
import { sucursalesEndpoint } from './sucursales';
import { cargarFacturaEndpoint } from './cargar-factura';
import { buscarUsuarioEndpoint } from './buscar-usuario';
import { generarOtpEndpoint } from './generar-otp';
import { premiosHomologadosEndpoint } from './premios-homologados';
import { redimirPuntosEndpoint } from './redimir-puntos';
import { redimirPromocionesEndpoint } from './redimir-promociones';
import { anulacionEndpoint } from './anulacion';
import { historicoEndpoint } from './historico';
import { usuarioUidEndpoint } from './usuario-uid';
import { registroUsuariosEndpoint } from './registro-usuarios';
import { configPaisesEndpoint } from './config-paises';
import { configCiudadesEndpoint } from './config-ciudades';
import { configDocumentosEndpoint } from './config-documentos';
import { consultarPromocionesEndpoint } from './consultar-promociones';

export const endpointConfigs = {
  login: loginEndpoint,
  me: meEndpoint,
  refresh: refreshEndpoint,
  sucursales: sucursalesEndpoint,
  "cargar-factura": cargarFacturaEndpoint,
  "buscar-usuario": buscarUsuarioEndpoint,
  "generar-otp": generarOtpEndpoint,
  "premios-homologados": premiosHomologadosEndpoint,
  "redimir-puntos": redimirPuntosEndpoint,
  "redimir-promociones": redimirPromocionesEndpoint,
  anulacion: anulacionEndpoint,
  historico: historicoEndpoint,
  "usuario-uid": usuarioUidEndpoint,
  "registro-usuarios": registroUsuariosEndpoint,
  "config-paises": configPaisesEndpoint,
  "config-ciudades": configCiudadesEndpoint,
  "config-documentos": configDocumentosEndpoint,
  "consultar-promociones": consultarPromocionesEndpoint
};

export const getEndpointDetails = (endpointId: string) => {
  return endpointConfigs[endpointId as keyof typeof endpointConfigs] || endpointConfigs.login;
};