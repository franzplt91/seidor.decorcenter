sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function(ODataModel, utilService) {
    "use strict";

    return {

        // Listar centros
        buscarmaterial: function(codigo,codAntiguo,desMaterial,categoria,linea,marca) {

            var contexto = {};
            contexto.servicio = "materialServices.buscarmaterial()";
            contexto.url = "material.aspx";
            contexto.parametros = { codigo: codigo, codigoAntiguo:codAntiguo, descripcionMaterial:desMaterial, categoria:categoria, linea:linea, marca:marca };

            return utilService.exec(contexto);

            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca

        },

    };
});