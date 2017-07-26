sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
    ], function(ODataModel, utilService) {
        "use strict";
        return {
        // Listar centros
        buscarCliente: function(ruc,nombre) {
            var contexto = {};
            contexto.servicio = "clienteServices.buscarCliente()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { rucdni : ruc , nombreCliente: nombre };
            return utilService.exec(contexto);
        },
        buscarClienteCodigo: function(codigo) {
            var contexto = {};
            contexto.servicio = "clienteServices.buscarClienteCodigo()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { codigoClienteA: codigo};
            return utilService.exec(contexto);
        },        
        buscarSolicitante: function(solicitanteDto) {
            var contexto = {};
            contexto.servicio = "clienteServices.buscarSolicitante()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { esRuc: solicitanteDto.esRuc, Ruc: solicitanteDto.ruc , dni: solicitanteDto.dni , 
                Descripcion: solicitanteDto.descripcion, Direccion: solicitanteDto.direccion, 
                CodigoPostal: solicitanteDto.distrito, Telefono: solicitanteDto.telefono, Mail: solicitanteDto.mail};
            return utilService.exec(contexto);
        },
        buscarSolicitanteNombre:function(BusNombres,NombresBuscado){
            var contexto = {};
            contexto.servicio = "clienteServices.buscarSolicitanteNombre()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = {BusNombres: BusNombres,NombresBuscado: NombresBuscado};
            return utilService.exec(contexto);
        },
        buscarProfesionalNombre:function(tipoDocumento,nombreBuscado,tipo){
            var contexto = {};
            contexto.servicio = "clienteServices.buscarProfesionalNombre()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = {rucdni: tipoDocumento,nombreCliente: nombreBuscado, Profesional: tipo};
            return utilService.exec(contexto);
        }        
        };
    });