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

        },

        documentoVentas: function(v_pNumPedido, v_accion, v_modo){
            var contexto = {};
            contexto.servicio = "reclamoServices.documentoVentas()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {pNumPedido : v_pNumPedido, accion : v_accion, modo : v_modo}

            return utilService.exec(contexto);
        },
        
        crearReclamo: function(v_pNumPedido){
            var contexto = {};
            contexto.servicio = "reclamoServices.crearReclamo()";
            contexto.url = "crearReclamo.aspx";
            contexto.parametros = {pNumPedido : v_pNumPedido}

            return utilService.exec(contexto);
        },

        guardarReclamo: function(material11,
                                 material12,
                                 material21,
                                 material22,
                                 cantRecla1,
                                 cantRecla2, 
                                 reclamoRef, 
                                 nummeroPedido,
                                 EmpresaDet, 
                                 NomCliente, 
                                 codigoEmpResp, 
                                 Motivo, 
                                 Status, 
                                 Resultado, 
                                 JustificResul, 
                                 OrgVenta,
                                 Canal, 
                                 Sector, 
                                 OfiVenta, 
                                 comentario, 
                                 listaReclamo, 
                                 pIndiceResultado, 
                                 listaIntJson,
                                 UserId,
                                PwdId,
                                Id,
                                GrpVend,
                                Descripcion,
                                CodigoVendedor,
                                OrgVentas,
                                CanalDist,
                                OfVentas ){
            var contexto= {};
            contexto.servicio = "reclamoServices.guardarReclamo()";
            contexto.url = "guardarReclamo.aspx";
            contexto.parametros = {material11 : material11, 
                                    material12 : material12, 
                                    material21 : material21, 
                                    material22 : material22,
                                   cantRecla1 : cantRecla1, 
                                   cantRecla2 : cantRecla2, 
                                   reclamoRef : reclamoRef, 
                                   numeroPedido : nummeroPedido,
                                   EmpresaDet : EmpresaDet, 
                                   NomCliente : NomCliente, 
                                   codigoEmpResp : codigoEmpResp, 
                                   Motivo : Motivo,
                                   Status : Status, 
                                   Resultado : Resultado, 
                                   JustificResul : JustificResul, 
                                   OrgVenta : OrgVenta,
                                   Canal : Canal, 
                                   Sector : Sector, 
                                   OfiVenta : OfiVenta, 
                                   comentario : comentario, 
                                   listaReclamo : listaReclamo,
                                   pIndiceResultado : pIndiceResultado, 
                                   listaIntJson : listaIntJson,
                                UserId: UserId,
                                PwdId: PwdId,
                                Id: Id ,
                                GrpVend: GrpVend,
                                Descripcion: Descripcion,
                                CodigoVendedor: CodigoVendedor,
                                OrgVentas: OrgVentas,
                                CanalDist: CanalDist,
                                OfVentas: OfVentas }

            return utilService.exec(contexto);
        }
    };
});