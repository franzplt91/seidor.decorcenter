sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function(ODataModel, utilService) {
    "use strict";

    return {

        // Listar centros
        buscarReclamos: function(v_pNumeroReclamo,v_pNumeroPedido,v_pCodigoCliente,v_pNombreCliente,v_pMaterial,
            v_pFechaCreacionI,v_pFechaCreacionF,v_pEstado,v_pUsuario) {

            var contexto = {};
            contexto.servicio = "reclamoServices.buscarReclamos()";
            contexto.url = "BuscarReclamos.aspx";
            contexto.parametros = { pNumeroReclamo : v_pNumeroReclamo , pNumeroPedido: v_pNumeroPedido,
                                    pCodigoCliente : v_pCodigoCliente, pNombreCliente : v_pNombreCliente, 
                                    pMaterial : v_pMaterial, pFechaCreacionI : v_pFechaCreacionI, 
                                    pFechaCreacionF : v_pFechaCreacionF, pEstado : v_pEstado, 
                                    pUsuario: v_pUsuario};

            return utilService.exec(contexto);

        },

        verReclamos: function(v_pNumeroReclamo) {

            var contexto = {};
            contexto.servicio = "reclamoServices.verReclamos()";
            contexto.url = "editarReclamo.aspx";
            contexto.parametros = { pNumeroReclamo : v_pNumeroReclamo };

            return utilService.exec(contexto);

        }
    };
});