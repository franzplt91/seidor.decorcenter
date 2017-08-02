sap.ui.define([
    'jquery.sap.global'
], function(jQuery) {
    "use strict";
    return {
        obtenerObservaciones: function (self, observaciones) {
            for (var indice in observaciones) {
                self.getView().getModel().setProperty("/observaciones/" + observaciones[indice].CodTexto, observaciones[indice]);
            }
        },
        obtenerInterlocutores: function (self, interlocutores, data) {
            for (var indice in interlocutores) {
                self.getView().getModel().setProperty("/interlocutores/" + interlocutores[indice].Funcion, interlocutores[indice]);
            }
            var interAGCliente = self.getView().getModel().getProperty("/interlocutores/AG/Cliente");
            if(interAGCliente.Mail == null || interAGCliente.Mail == "" ) {interAGCliente.Mail = data.objPedido.Mail;}
            self.getView().getModel().setProperty("/interlocutores/AG/Cliente",interAGCliente);
            
            //Profesional 1 == Z2
            self.getView().getModel().setProperty("/profesionales/CodProfesional", data.CodProfesional);
            self.getView().getModel().setProperty("/profesionales/NomProfesional", data.NomProfesional);
            //Profesional 2 == Z5
            self.getView().getModel().setProperty("/profesionales/CodProfesional2", data.CodProfesional2);
            self.getView().getModel().setProperty("/profesionales/NomProfesional2", data.NomProfesional2);              
        },
        obtenerPreguntas: function (self, clienDatosAdic) {
            for (var indice in clienDatosAdic) {
                self.getView().getModel().setProperty("/preguntas/" + clienDatosAdic[indice].CODP, clienDatosAdic[indice]);
            }
        },
        obtenerClienteEventual: function (self, cliente) {
            var clienteEventual = self.getView().getModel().getProperty("/clienteEventual");
            clienteEventual.codigoCliente = cliente.Codigo;
            clienteEventual.nombreCliente = cliente.Descripcion; 
            clienteEventual.esEventual = cliente.Eventual;  
            self.getView().getModel().setProperty("/clienteEventual", clienteEventual);
        },
        obtenerMateriales: function (self, CodTipoDoc, materiales) {
            var listaMateriales = new Array();
            for (var indice in materiales) {
                var material = materiales[indice];
                var fechCantidad = moment(material.FechaCantConf).format('DD/MM/YYYY');
                material.FechaCantConf = fechCantidad; 

                if(material.CodGrupoMat != null) {
                    //material
                    if(material.CodGrupoMat == "") {material.CodGrupoMat = " ";}
                    else {
                        var ambientes = dataIni.lstPreguntas[5].listaResp;
                        /*
                        var grupMaterial = ambientes.forEach((item, i) => {
                            if (item.Codigo == material.CodGrupoMat) { return item;}
                        });*/
                        var grupMaterial = jQuery.grep(ambientes, function(item, i){ // just use arr
                          return (item.Codigo == material.CodGrupoMat) ;
                        });
                        material.DesGrupoMat = grupMaterial.Descripcion;
                    }
                    if (CodTipoDoc == "Z025") { material.PrecioUnitario = material.PrecioSinIGV; }
                    material.Diferencia.Denominacion = " Mat.Diferencia";
                    material.PreZP08.Denominacion = " Pr.Srv.Transp.Manual";
                    //descuentos
                    var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                        {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
                    var descPrincipal = this.obtenerDescuento(material, listaPrincipal);
                    var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}];
                    var descOtros = this.obtenerDescuento(material, listaOtros);
                    material.DescuentoPrincipal = descPrincipal;
                    material.DescuentoOtros = descOtros;
                    //valor descuento         
                    material.Vdscto = this.obtenerValorDescuento(material);
                    //repartos                   
                    for(var indice in material.Repartos) {
                        var reparto = material.Repartos[indice];
                        var fechaEntrega =  moment(reparto.FechaEntrega).format('DD/MM/YYYY');
                        reparto.FechaEntrega = fechaEntrega;
                        reparto.matPosicion = material.PosicionCorto;
                    }
                    listaMateriales.push(material);
                }
                self.getView().getModel().setProperty("/listaMaterial", listaMateriales);
            }
        },
        obtenerDescuento: function (material, descuentos) {
            var listaDescuento = [];
            for (var indice in descuentos) {
                material[descuentos[indice].codigoSer].matPosicion = material.PosicionCorto;
                if(descuentos[indice].codigoSer == "ZP02") {
                    if(material.Precio.Condicion == "ZP02" && material.Precio.Valor != 0){}
                    else{ listaDescuento.push(material[descuentos[indice].codigoSer]); }
                } else {
                    listaDescuento.push(material[descuentos[indice].codigoSer]);
                }
            }
            return listaDescuento;
        },
        obtenerValorDescuento: function (material) {
            var acumulado = 0;
            var listaDescuento = material.DescuentoPrincipal.concat(material.DescuentoOtros);
          //  listaDescuento.concat(material.DescuentoOtros);
            for(var indice in listaDescuento) {
                var descuento = listaDescuento[indice];
                var tipo = descuento.Condicion; 
                var condicion = tipo.substring(0, 2);
                if (descuento.Importe != 0 && condicion == "ZD" && tipo != "ZD03"){
                    var importe = descuento.Importe;
                    if (importe < 0) { importe = importe * -1; }
                    acumulado = acumulado + importe; 
                }
            }
            return acumulado;
        }        
    };
});