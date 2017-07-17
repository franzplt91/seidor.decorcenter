sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function(ODataModel, utilService) {
    "use strict";

    return {


        buscarReclamos: function(buscarReclamos) {

            var contexto = {};
            contexto.servicio = "reclamoServices.buscarReclamos()";
            contexto.url = "buscarReclamos.aspx";
            contexto.parametros = {   pNumeroReclamo: buscarReclamos.pNumeroReclamo ,
                                      pNumeroPedido: buscarReclamos.pNumeroPedido ,
                                      pCodigoCliente: buscarReclamos.pCodigoCliente ,
                                      pNombreCliente: buscarReclamos.pNombreCliente ,
                                      pMaterial: buscarReclamos.pMaterial ,
                                      pFechaCreacionI: buscarReclamos.pFechaCreacionI ,
                                      pFechaCreacionF: buscarReclamos.pFechaCreacionF ,
                                      pEstado: buscarReclamos.pEstado ,
                                      pUsuario: buscarReclamos.pUsuario ,
                                      
                                      accion: "R001" ,
                                      fecini: buscarReclamos.fecini ,
                                      fecfin: buscarReclamos.fecfin};

            return utilService.exec(contexto);

        },

        verReclamos: function(v_pNumeroReclamo) {

            var contexto = {};
            contexto.servicio = "reclamoServices.verReclamos()";
            contexto.url = "editarReclamo.aspx";
            contexto.parametros = { pNumeroReclamo : v_pNumeroReclamo };

            return utilService.exec(contexto);

        },



        //////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////



        crearReclamo: function(crearReclamo){
            var contexto = {};
            contexto.servicio = "reclamoServices.crearReclamo()";
            contexto.url = "crearReclamo.aspx";
            contexto.parametros = {pNumPedido : crearReclamo.pNumPedido, accion : crearReclamo.accion, modo : crearReclamo.modo}

            return utilService.exec(contexto);
        },


        documentoVentas: function(documentoVentas){
            var contexto = {};
            contexto.servicio = "reclamoServices.documentoVentas()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {pNumPedido : documentoVentas.pNumPedido, accion : documentoVentas.accion, modo : documentoVentas.modo}

            return utilService.exec(contexto);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////


        guardarReclamo: function(guardarReclamo, listaReclamoLleno, listaIntJsonLleno){
            var contexto= {};
            contexto.servicio = "reclamoServices.guardarReclamo()";
            contexto.url = "guardarReclamo.aspx";
            contexto.parametros = {
                                    material11: guardarReclamo.material11 ,
                                    material12: guardarReclamo.material12 ,
                                    material21: guardarReclamo.material21 ,
                                    material22: guardarReclamo.material22 ,
                                    cantRecla1: guardarReclamo.cantRecla1 ,
                                    cantRecla2: guardarReclamo.cantRecla2 ,
                                    reclamoRef: guardarReclamo.reclamoRef ,
                                    numeroPedido: guardarReclamo.numeroPedido ,
                                    EmpresaDet: guardarReclamo.EmpresaDet , 
                                    NomCliente: guardarReclamo.NomCliente ,
                                    codigoEmpResp: guardarReclamo.codigoEmpResp ,
                                    Motivo: guardarReclamo.Motivo , 
                                    Status: guardarReclamo.Status , 
                                    Resultado: guardarReclamo.Resultado , 
                                    JustificResul: guardarReclamo.JustificResul , 
                                    OrgVenta: guardarReclamo.OrgVenta , 
                                    Canal: guardarReclamo.Canal , 
                                    Sector: guardarReclamo.Sector ,
                                    OfiVenta: guardarReclamo.OfiVenta ,
                                    comentario: guardarReclamo.comentario ,
                                    pNumeroReclamo: guardarReclamo.pNumeroReclamo ,
                                    listaReclamo: listaReclamoLleno ,
                                    pIndiceResultado: 5 ,
                                    listaIntJson: listaIntJsonLleno
                                 }

            return utilService.exec(contexto);
        },



/*
        documentoVentas: function(v_pNumPedido, v_accion, v_modo){
            var contexto = {};
            contexto.servicio = "reclamoServices.documentoVentas()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {pNumPedido : v_pNumPedido, accion : v_accion, modo : v_modo}

            return utilService.exec(contexto);
        },
        
        crearReclamo: function(v_pNumPedido, v_accion, v_modo){
            var contexto = {};
            contexto.servicio = "reclamoServices.crearReclamo()";
            contexto.url = "crearReclamo.aspx";
            contexto.parametros = {pNumPedido : v_pNumPedido, accion : v_accion, modo : v_modo}

            return utilService.exec(contexto);
        },

        guardarReclamo: function(reclamo,reclamo1,reclamo2){
            var contexto= {};
            contexto.servicio = "reclamoServices.guardarReclamo()";
            contexto.url = "guardarReclamo.aspx";
            contexto.parametros = {
                                   material11 : reclamo.material1, 
                                   material12 : reclamo.material2,
                                   cantRecla1 : reclamo.cantidad_material1, 
                                   cantRecla2 : reclamo.cantidad_material2, 
                                   reclamoRef : reclamo.reclamo_referencia, 
                                   numeroPedido : reclamo.numero_pedido,
                                   EmpresaDet : reclamo.codigo_cliente, 
                                   NomCliente : reclamo.nombre_cliente, 
                                   codigoEmpResp : reclamo.asesor, 
                                   Motivo : reclamo.motivo,
                                   Status : reclamo.status, 
                                   Resultado : reclamo.resultado, 
                                   JustificResul : reclamo.justificacion_resultado, 
                                   OrgVenta : reclamo.organizacion_venta,
                                   Canal : reclamo.canal, 
                                   Sector : reclamo.sector, 
                                   OfiVenta : reclamo.oficina_ventas, 
                                   comentario : reclamo.comentario, 
                                   listaReclamo : reclamo1,
                                   pIndiceResultado : 4, 
                                   listaIntJson : reclamo2
                                 }

            return utilService.exec(contexto);
        },
        EditarReclamo: function(material11,
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
                                 pNumeroReclamo, 
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
                                   pNumeroReclamo : pNumeroReclamo, 
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
        },

        */
    };
});