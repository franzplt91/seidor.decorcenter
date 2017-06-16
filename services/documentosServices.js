sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function (ODataModel, utilService) {
    "use strict";

    return {

        //INICIO EDELACRUZ: 
        //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
        //Combo campo: "tipo de busqueda"
        // Listar busqueda de documentos
        buscarDocumento: function (tipoBusq, datoBusq, nMat, claseD, fecIni, fecfin, asesor)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.buscarDocumento()";
            contexto.url = "buscarDocumento.aspx";
            contexto.parametros = {tipoBusqueda: tipoBusq,
                datoBusqueda: datoBusq,
                nMaterial: nMat,
                claseDoc: claseD,
                fecInicio1: fecIni,
                fecFin1: fecfin,
                asesor: asesor
            };
            var resultado = utilService.exec(contexto);
            return resultado;
        }
        //FIN EDELACRUZ
    };
});