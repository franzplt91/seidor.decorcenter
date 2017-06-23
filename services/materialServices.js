sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function(ODataModel, utilService) {
    "use strict";

    return {

        // Listar centros
        buscarmaterial: function(codigo,codAntiguo,desMaterial,categoria,linea,marca,orgVentas,canalDist,ofVentas) {

            var contexto = {};
            contexto.servicio = "materialServices.buscarmaterial()";
            contexto.url = "material.aspx";
            contexto.parametros = { codigo: codigo, codigoAntiguo:codAntiguo, descripcionMaterial:desMaterial, categoria:categoria, linea:linea, marca:marca, OrgVentas:orgVentas, CanalDist:canalDist, OfVentas:ofVentas};

            return utilService.exec(contexto);

            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca
            
        },


        anadirMaterialMaster: function(codigo,
                                        cantidad,
                                        CodAmbiente,
                                        Opcion,
                                        UserId,
                                        PwdId,
                                        Id,
                                        GrpVend,
                                        Descripcion,
                                        CodigoVendedor,
                                        OrgVentas,
                                        CanalDist,
                                        OfVentas,
                                        añadirForm,
                                        posNuevo,
                                        objPedido,
                                        cantidadtmp,
                                        ambiente,
                                        desamb,
                                        opcamb,
                                        auart){

            var contexto = {};
            contexto.servicio = "materialServices.anadirMaterialMaster()";
            contexto.url = "material.aspx";
            contexto.parametros = { codigo: codigo,
                                        cantidad: cantidad,
                                        CodAmbiente: CodAmbiente,
                                        Opcion: Opcion,
                                        UserId: UserId,
                                        PwdId: PwdId,
                                        Id: Id,
                                        GrpVend: GrpVend,
                                        Descripcion: Descripcion,
                                        CodigoVendedor: CodigoVendedor,
                                        OrgVentas: OrgVentas,
                                        CanalDist: CanalDist,
                                        OfVentas: OfVentas,
                                        añadirForm: añadirForm,
                                        posNuevo: posNuevo,
                                        objPedido: objPedido,
                                        cantidadtmp: cantidadtmp,
                                        ambiente: ambiente,
                                        desamb: desamb,
                                        opcamb: opcamb,
                                        auart: auart};

            return utilService.exec(contexto);

        },



        anadirMaterialBuscar:function(objetoDetalle,objetoMaterial,objetoPedido,anadirMat){

            var contexto = {};
            contexto.servicio = "materialServices.buscarmaterial()";
            contexto.url = "material.aspx";
            contexto.parametros = { objDetalle: objetoDetalle, objMaterial:objetoMaterial, objPedido:objetoPedido, añadirMat:anadirMat};

            return utilService.exec(contexto);

            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca

        },


        recalcular: function(UserId,
                                PwdId,
                                Id,
                                GrpVend,
                                Descripcion,
                                CodigoVendedor,
                                OrgVentas,
                                CanalDist,
                                OfVentas,
                                dsctoLotes,
                                listaInterJson,
                                listaDsctoJson,
                                listaRepartosJson,
                                listaMatJson,
                                listaPedJson
                                ){

            var contexto = {};
            contexto.servicio = "materialServices.recalcular()";
            contexto.url = "material.aspx";
            contexto.parametros = { UserId: UserId,
                                    PwdId: PwdId,
                                    Id: Id,
                                    GrpVend: GrpVend,
                                    Descripcion: Descripcion,
                                    CodigoVendedor: CodigoVendedor,
                                    OrgVentas: OrgVentas,
                                    CanalDist: CanalDist,
                                    OfVentas: OfVentas,
                                    dsctoLotes: dsctoLotes,
                                    listaInterJson: listaInterJson,
                                    listaDsctoJson: listaDsctoJson,
                                    listaRepartosJson: listaRepartosJson,
                                    listaMatJson: listaMatJson,
                                    listaPedJson: listaPedJson};

            return utilService.exec(contexto);


        }

    };
});