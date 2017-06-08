sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/UtilModel"
], function(ODataModel, UtilModel) {
    "use strict";

    return {

        // Listar documentos
        list: function(callback) {

            var URLService = "ZPE_FIORI_LIST_DTY_TYPE_SRV/InputSet?$filter=IBsart eq '' and IBstyp eq 'B'&$expand=NavT161";

            var contexto = {};
            contexto.servicio = "documentosServices.List()";
            contexto.url = URLService;
            contexto.objeto = "NavT161";

            var objSelect = {
                Bsart: '',
                Batxt: 'SELECCIONE DOCUMENTO'
            }

            UtilModel.requestODataGet(contexto, function(respuesta){

                return callback(respuesta);

            },objSelect);

        }
    };
});