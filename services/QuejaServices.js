sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function (ODataModel, utilService) {
    "use strict";

    return {

        grabarQueja: function (CodCli, NomCliente, Calles, Ubicacion, Telefono, OfiVenta, TextoQueja)
        {
            var contexto = {};
            contexto.servicio = "QuejaServices.grabarQueja()";
            contexto.url = "queja.aspx";
            contexto.parametros = {
                CodCli: CodCli,
                NomCliente: NomCliente,
                Calles: Calles,
                Ubicacion: Ubicacion,
                Telefono: Telefono,
                OfiVenta: OfiVenta,
                TextoQueja: TextoQueja,
                codigo: CodCli,
                nomcli: "",
                calle: Calles,
                ubica: Ubicacion,
                telef: Telefono,
                texto: TextoQueja,
                oventa: OfiVenta,
                accion: "creaqueja"
            };
            var resultado = utilService.exec(contexto);
            return resultado;
        }
    };
});