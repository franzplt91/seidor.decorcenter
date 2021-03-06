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
        },
        validarGuardarDocumento:function(self, guardarDoc){
            var pru = self.getView().getModel().getProperty("/preguntas");

                var prueba2 = self.getView().getModel().getProperty("/preguntas");
                var valor = self.getView().getModel().getProperty("/preguntas/1/CODR"); //tipo de cliente   
                var valor2 = self.getView().getModel().getProperty("/preguntas/10/CODR"); //tipo de contruccion
                var valor3 = self.getView().getModel().getProperty("/preguntas/15/CODR"); //tipo de proyecto -  residencial
                var valor4 = self.getView().getModel().getProperty("/preguntas/20/CODR"); //tipo de proyecto - institucional

                //ini - JLM - validacion de ambientes
                var temp25 = self.getView().getModel().getProperty("/preguntas/25/CODR");
                var temp30 = "";
                var temp35 = self.getView().getModel().getProperty("/preguntas/35/CODR");
                var temp40 = "1";
                var temp45 = "1";
                var temp50 = "1";
                var temp55 = "1";

                //fin - JLM - validacion de ambientes

                

                var codDoc = self.getView().getModel().getProperty("/pedido/CodTipoDoc");
                var canaldist = self.getView().getModel().getProperty("/pedido/CanalDist");

                //FST 30/09/2013 TelMovilDestMercancia INICIO
                //              var atencion = objPedidoStore.last().data.textoAtencion;
                //              var referenciaDireccion = objPedidoStore.last().data.textoRefDireccion;
                //              if (atencion == "" && this.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01') {
                //                  MessageToast.show('Aviso', 'No se ha ingresado el texto de atención.', function(res) {
                //                  }, this);
                //                  return;
                //              }

                //              if (referenciaDireccion == "" && this.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01') {
                //                  MessageToast.show('Aviso', 'No se ha ingresado el texto de referencia de dirección.', function(res) {
                //                  }, this);
                //                  return;
                //              }
                //              for (var i = 0; i < interlocutoresStore.data.items.length; i++) {
                //                  if (interlocutoresStore.data.items[i].data.Funcion == "WE") {
                //                      if (interlocutoresStore.data.items[i].data.TelefonoMovil == "" && this.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01') {
                //                          MessageToast.show('Aviso', 'No se ha ingresado el teléfono móvil del destinatario de mercancía.', function(res) {
                //                         }, this);
                //                        return;
                //                      }
                //                      else {
                //                          continue;
                //                      }
                //                  }
                //              }
                //FST 30/09/2013 TelMovilDestMercancia FIN

                //FST 31/12/2013 DatosObligatoriosPedidos INICIO
                //La mejora original (TelMovilDestMercancia) requería que los datos sean de ingreso obligatorio en caso de cotizaciones.
                //El cambio requerido últimamente fue que sea obligatorio en caso de pedidos.
                var atencion = self.getView().getModel().getProperty("/observaciones/ZP01/Descripcion");
                var referenciaDireccion = self.getView().getModel().getProperty("/observaciones/ZP07/Descripcion");
                if (atencion == "" && (
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                //  objPedidoStore.last().data.CodTipoDoc == 'Z035' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'
                    )) {
                    MessageToast.show('No se ha ingresado el texto de atención en observaciones.');
                    return;
                }

                if (referenciaDireccion == "" && (
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                //  self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z035' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'
                    )) {
                    MessageToast.show('No se ha ingresado el texto de referencia de dirección en interlocutores: observaciones.');
                    return;
                }

                /////////////////////////////////////////////////////////////////////
                for (var i = 0; i < self.getView().getModel().getProperty("/interlocutores").length; i++) {
                    if (self.getView().getModel().getProperty("/interlocutores").Funcion == "WE") {
                        if (self.getView().getModel().getProperty("/interlocutores/WE/TelefonoMovil") == "" && (
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                        //  self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z035' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'
                            )) {
                            MessageToast.show('No se ha ingresado el teléfono móvil en Interlocutores: Dest. Mcia.');
                            return;
                        }
                        else {
                            continue;
                        }
                    }
                }
                //FST 31/12/2013 DatosObligatoriosPedidos FIN
                
                //BEGIN OF EDC 25/02/2015: Validación texto referencia factura
                if ( self.getView().getModel().getProperty("/pedido/CodTipoDoc") == "Z001" ||
                     self.getView().getModel().getProperty("/pedido/CodTipoDoc") == "Z003"  )
                {
//                    if ( self.getView().getModel().getProperty("/pedido/CodTipoDoc") != "Z004" )
//                    {
                        if ( self.getView().getModel().getProperty("/pedido/CanalDist") == "10" && 
                             self.getView().getModel().getProperty("/pedido/CodOficina") != "1080")
                        {
                            if ( self.getView().getModel().getProperty("/observaciones/ZP06/Descripcion") == "" )
                            {
                                 MessageToast.show('No se ha ingresado Referencia de factura en Observaciones.');
                                return;
                            }
                        }
//                    } 
                }       
                //END OF EDC 25/02/2015
                
                //BEGIN OF EDC 21/07/2015: Componentes
                for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++)
                {
                    var matCombo = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto").substring(0, 1);
                    
                    if (matCombo == '4' && self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosSup") == '000000')
                    {
                        var centroRaiz = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodCentro");
                        var matCombo2 = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto");
                    }
                    else
                    {
                        if (matCombo != '4' && self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosSup") == '000000')
                        {
                           centroRaiz = "";
                           matCombo2 = "";
                        }
                    }
                    
                    if ( centroRaiz != "" )
                    {
                        if ( centroRaiz != self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodCentro") )
                        {
                             MessageToast.show(' Centros diferentes en componentes de Material Combo:' + matCombo2 + '.');
                                return;
                        }                     
                    }
                }
                
                //END OF EDC 21/07/2015
                
                //6000000771 INCIO EDC 24.06.2016
                for(var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++)
                {
                    var codMat = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto");
                    var codPosCor = self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosicionCorto");
                    var Mstae = self.getView().getModel().getProperty("/listaMaterial/"+i+"/MSTAE");
                        if (Mstae == '01' )
                        {
                            MessageToast.show(' Material ' + codMat + ' Pos.' + codPosCor + '<br>Tiene Status: Inactivo.'+'<br>Borrarlo para Continuar.');
                                        return;
                        }
                }
                //FIN

                if (canaldist == '10') 
                {
                    if (codDoc == "ZO01" || codDoc == "ZO02" || codDoc == "Z001" ||
                    codDoc == "Z002" || codDoc == "Z003" || codDoc == "Z004" || codDoc == "Z034") 
                    {
                        //FST 07.01.2013 OmisionObligatoriedadDatosClienteCodificado INICIO
                        //Omite el ingreso de los datos de fidelización de clientes cuando se trate de un cliente codificado
                        //if (interlocutoresStore.data.items[0].data.Ruc.length <= 8) {
                        if (self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length <= 8 && 
                            self.getView().getModel().getProperty("/clienteEventual/esEventual") == "true") //Roy: Falta colocar un valor verdadero
                        {
                            //FST 07.01.2013 OmisionObligatoriedadDatosClienteCodificado FIN
                            if (valor == "") {
                                MessageToast.show('Debe completar el tipo de cliente en Interlocutores: Datos Cliente');
                                return;
                            }

                            if (valor2 == "") {
                                MessageToast.show('Debe ingresar el tipo de Construcción en Interlocutores: Datos Cliente');
                                return;

                            }

                            if (valor4 == "" && valor3 == "") {
                                MessageToast.show('Debe ingresar un tipo de Proyecto en Interlocutores: Datos Cliente');
                                return;

                            } else {

                                if (valor4 != "" && valor3 != "") {
                                    MessageToast.show('Debe ingresar solo un tipo de proyecto: Institucional o Residencial');
                                    return;
                                }

                            }
                            //MDEC072 : DELETE BEGIN OF EDC 25.11.2015 : Ambientes
                            //JLM - Validacion ambientes (ini)
////                            if (temp30 == "") {
////                                MessageToast.show('Aviso', 'Debe ingresar Ambiente 1 en -> Interlocutores -> Datos de cliente.', function(res) {
////                                }, self);
////                                return;
////                            }

                            if (temp35 == "") {
                                MessageToast.show('Aviso', 'Debe ingresar Estilo 1  en -> Interlocutores -> Datos de cliente.', function(res) {
                                }, self);
                                return;
                            }

////                            if (temp40 != "1") {
////                                if (temp45 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Estilo 2  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }

////                            if (temp45 != "1") {
////                                if (temp40 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Ambiente 2  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }

////                            if (temp50 != "1") {
////                                if (temp55 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Estilo 3  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }

////                            if (temp55 != "1") {
////                                if (temp50 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Ambiente 3  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }
////                            
////                           
////                            //INSERT BEGIN OF EDC 24.08.2015
////                                                                                                
////                            var amb1 = temp30;
////                            
////                            if (temp45 != "1") 
////                            {
////                                if (temp40 != "1") 
////                                {
////                                    var amb2 = temp40;        
////                                }
////                            }
////                            
////                            if (temp55 != "1") {
////                                if (temp50 != "1") {
////                                    var amb3 = temp50;        
////                                }
////                            }
////                                                    
////                             for (var i = 0; i < preguntasStore.data.items[5].data.listaResp.length; i++)
////                             {
////                                if (amb1 == preguntasStore.data.items[5].data.listaResp[i].Codigo)
////                                {
////                                    var descAmb1 = preguntasStore.data.items[5].data.listaResp[i].Descripcion;
////                                    break;
////                                }               
////                             }
////                             
////                             if (descAmb1 == "" || descAmb1 == undefined )
////                             {
////                                descAmb1 = "";
////                             }
////                             
////                            
////                            for (var i = 0; i < preguntasStore.data.items[7].data.listaResp.length; i++)
////                             {
////                                if (amb2 == preguntasStore.data.items[7].data.listaResp[i].Codigo)
////                                {
////                                    var descAmb2 = preguntasStore.data.items[7].data.listaResp[i].Descripcion;
////                                    break;
////                                }               
////                             }
////                             
////                             if (descAmb2 == "" || descAmb2 == undefined )
////                             {
////                                descAmb2 = "";
////                             }
////                             
////                             for (var i = 0; i < preguntasStore.data.items[9].data.listaResp.length; i++)
////                             {
////                                if (amb3 == preguntasStore.data.items[9].data.listaResp[i].Codigo)
////                                {
////                                    var descAmb3 = preguntasStore.data.items[9].data.listaResp[i].Descripcion;
////                                    break;
////                                }               
////                             }
////                             
////                             if (descAmb3 == "" || descAmb3 == undefined )
////                             {
////                                descAmb3 = "";
////                             }
////                             
////                             
////                             if ( descAmb1 == descAmb2 && descAmb1 == descAmb3 && descAmb2 == descAmb3 &&
////                                  descAmb1 != "" && descAmb2 != "" && descAmb3 != "" ) 
////                             {
////                                MessageToast.show("Validación", "Datos Cliente: Ambiente1,Ambiente2 y Ambiente 3 no deben ser iguales", function() { });
////                                return false;
////                             }
////                             else{
////                                if ( descAmb1 == "" && descAmb2 == "" && descAmb3 == "" )
////                                {
////                                    MessageToast.show("Validación", "Ingresar minimo un Ambiente", function() { });
////                                    return false;
////                                }
////                                if (descAmb1 == descAmb2 && descAmb1 != "" && descAmb2 != "")
////                                {
////                                    MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente2 no deben ser iguales", function() { });
////                                    return false;
////                                }
////                                if (descAmb1 == descAmb3 && descAmb1 != "" && descAmb3 != "")
////                                {
////                                    MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente3 no deben ser iguales", function() { });
////                                    return false;
////                                }
////                                if (descAmb2 == descAmb3 && descAmb2 != "" && descAmb3 != "")
////                                {
////                                    MessageToast.show("Validación", "Datos Cliente: Ambiente2 y Ambiente3 no deben ser iguales", function() { });
////                                    return false;
////                                }
////                             
////                             }
////                                     
////                            //INSERT END OF EDC 24.08.2015
                                                
                            //JLM - validacion ambientes (fin)
                            
                            //MDEC072 : DELETE END OF EDC 25.11.2015 : Ambientes

                        }
                        
                         //SDEC093 OBLIGATORIEDAD CLIENTES CODIFICADOS Y RUCS
                         else if (self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length == 11 && 
                                  (self.getView().getModel().getProperty("/clienteEventual/esEventual") == "true" ||
                                   self.getView().getModel().getProperty("/clienteEventual/esEventual") == "false")) //Roy: falta colocar valor verdadero
                         {
                             var fechaZ_cod = window.dataIni.lstFeclicod[0].Descripcion; //Roy: Falta Comprobar Despues--------ParametroStore.data.items[32].data.Model[0].Descripcion
                             var fecha_doc = moment(self.getView().getModel().getProperty("/pedido/FechaPedido")).format('Y-m-d'); //Ext.util.Format.date(objPedidoStore.data.items[0].data.FechaPedido, 'Y-m-d'); 
                                
                            if (fechaZ_cod <= fecha_doc)
                            {                        
                                if (valor == "") {
                                    MessageToast.show('Debe completar el tipo de cliente en Interlocutores: Datos Cliente');
                                }

                                if (valor2 == "") {
                                    MessageToast.show('Debe ingresar el tipo de Construcción en Interlocutores: Datos Cliente');

                                }

                                if (valor4 == "" && valor3 == "") {
                                    MessageToast.show('Debe ingresar un tipo de Proyecto en Interlocutores: Datos Cliente');
                                } else {

                                    if (valor4 != "" && valor3 != "") {
                                        MessageToast.show('Debe ingresar solo un tipo de proyecto: Institucional o Residencial');
                                    }
                                }
                            }
                         }
                    }   
                }
                                
                //FORECAST INSERT BEGIN OF EDC 12.11.2015
                var grupoFor = "";
                var tipoFor = "";
                
                grupoFor = self.getView().getModel().getProperty("/pedido/GrupoForecast");
                tipoFor = self.getView().getModel().getProperty("/pedido/TipoForecast");
                canaldist = self.getView().getModel().getProperty("/pedido/CanalDist");
                var fechaz = window.dataIni.lstValfore[0].Descripcion; //ParametroStore.data.items[30].data.Model[0].Descripcion;
            //  var fechap = formDoc.getValues().FechaPedido
                
                var fechap = moment(self.getView().getModel().getProperty("/pedido/FechaPedido")).format('Y-m-d'); //Ext.util.Format.date(formDoc.getValues().FechaPedido, 'Y-m-d');
                
                if ( self.getView().getModel().getProperty("/pedido/CodTipoDoc") != "Z015" )//6000001895 INSERT EDC 30.12.2016
                {
                    if ( grupoFor == " " )
                    {
                        if ( fechaz <= fechap )
                        {
                            MessageToast.show('Grupo Forecast esta vacío');
                        }
                        else
                        {
                            MessageToast.show("Grupo Forecast esta vacío");
                        }
                    }
                    else if ( grupoFor == "01" || grupoFor == "03" || grupoFor == "04" || grupoFor == "05" )
                    {
                       
                        if ( tipoFor != " " )
                        {
                             if ( fechaz <= fechap )
                            {
                               MessageToast.show('Tipo Forecast debe estar vacío');
                            }
                            else{
                                MessageToast.show("Tipo Forecast debe estar vacío");
                            }
                        }
                    }
                    else if ( grupoFor == "02" || 
                              grupoFor == "07" ) 
                    {
                        if ( tipoFor == " " )
                        {
                           if ( fechaz <= fechap )
                           {
                                MessageToast.show('Falta ingresar el Tipo para Grupo Forecast');
                            }
                            else{
                                MessageToast.show("Falta ingresar el Tipo para Grupo Forecast");
                            }
                        }
                        //6000001232 INSERT BEGIN OF EDC 28.09.2016
                        if ( grupoFor == "02" ) 
                        {
                           if ( tipoFor == "11" || tipoFor == "00" )
                           {
                               if ( fechaz <= fechap )
                               {
                                    MessageToast.show('Cambiar Tipo Forecast');
                                }
                                else{
                                    MessageToast.show("Cambiar Tipo Forecast");
                                }
                            }
                        }       
                        //6000001232 INSERT END OF EDC 28.09.2016
                        if ( grupoFor == "07" ) 
                        {
                            if ( tipoFor != " " && ( canaldist == "30" || canaldist == "40" ) )
                            {
                                if ( tipoFor  == "00" )
                                {
                                    if ( fechaz <= fechap )
                                    {
                                        MessageToast.show('Para el Tipo Forecast debe grabarse con opción distinta a Multifamiliar');
                                    }
                                    else{
                                        MessageToast.show("Para el Tipo Forecast debe grabarse con opción distinta a Multifamiliar");
                                    }
                                }
                                else if ( tipoFor  == "11" && canaldist == "30" )
                                {
                                    if ( fechaz <= fechap )
                                    {
                                        MessageToast.show('Para el Tipo Forecast debe grabarse con opción distinta a Arquitecto');
                                    }
                                    else{
                                        MessageToast.show("Para el Tipo Forecast debe grabarse con opción distinta a Arquitecto");
                                    }
                                }
                            }
                        }                                 
                    }  
                    else if( grupoFor == "06"  )
                    {
                        if ( tipoFor == " " )
                        {
                           if ( fechaz <= fechap )
                           {
                           MessageToast.show('Falta ingresar el Tipo para Grupo Forecast');
                           }
                           else{
                            MessageToast.show("Falta ingresar el Tipo para Grupo Forecast");
                           }
                        }
                        if ( tipoFor != " " && ( canaldist == "30" || canaldist == "40" ) )
                        {
                            if ( tipoFor  != "00" )
                            {
                                if ( fechaz <= fechap )
                                {
                                 MessageToast.show('Para el Tipo Forecast debe grabarse con opción Multifamiliar');
                                }
                                else{
                                 MessageToast.show("Para el Tipo Forecast debe grabarse con opción Multifamiliar");
                                }
                            }
                        }                  
                    }
                    else if( grupoFor == "08"  )
                    {
                        if ( tipoFor == " " )
                        {
                           if ( fechaz <= fechap )
                           {
                           MessageToast.show('Falta ingresar el Tipo para Grupo Forecast');
                           }
                           else{
                            MessageToast.show("Falta ingresar el Tipo para Grupo Forecast");
                           }
                        }
                        if ( tipoFor != " " && ( canaldist == "30" ) )
                        {
                            if ( tipoFor  != "11" )
                            {
                                if ( fechaz <= fechap )
                                {
                                 MessageToast.show('Para el Tipo Forecast debe grabarse con opción Arquitecto');
                                }
                                else{
                                 MessageToast.show("Para el Tipo Forecast debe grabarse con opción Arquitecto");
                                }
                            }
                        }            
                    }
                }
                //FORECAST INSERT END OF EDC 12.11.2015  
                //MDEC072 INSERT BEGIN OF EDC 07.01.2016 Ambientes
                var fechazA = ""; 
                var fechapA = "";
                var CodGrupoMat = "";
                var Opcion = "";
                var Pos = "";
                fechazA = window.dataIni.lstValambi[0].Descripcion ; //ParametroStore.data.items[31].data.Model[0].Descripcion;
                fechapA = moment(self.getView().getModel().getProperty("/pedido/FechaPedido")).format('Y-m-d'); //Ext.util.Format.date(objPedidoStore.data.items[0].data.FechaPedido, 'Y-m-d');
                 if (fechazA <= fechapA)
                 {
                    if ((self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01' || 
                          self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001') && (self.getView().getModel().getProperty("/pedido/CanalDist") == '10'))
                    {
                        for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++)
                        {
                            CodGrupoMat = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodGrupoMat");
                            Opcion = self.getView().getModel().getProperty("/listaMaterial/"+i+"/Opcion");
                            Pos = self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosicionCorto");
                            
                            if ((CodGrupoMat == "" || CodGrupoMat == " ") && (Opcion == "" || Opcion == " "))
                            {
                                 MessageToast.show('Colocar Datos de Ambiente y Opción en Pos.' + Pos);
                            }
                            else if(CodGrupoMat == "" || CodGrupoMat == " ")
                            {
                                MessageToast.show('Colocar Ambiente en Pos.' + Pos);
                                
                            }
                            else if(Opcion == "" || Opcion == " ") 
                            {
                                MessageToast.show('Colocar Opción en Pos:' + Pos);
                            }                                                    
                        }
                    }
                 }
                //MDEC072 INSERT END OF EDC 07.01.2016 Ambientes
                var recordDoc = self.getView().getModel().getProperty("/documentoNuevo");
                if (recordDoc.Flag3 == "") {
                    var cal = 0;
                    var mat = self.getView().getModel().getProperty("/listaMaterial"); //detalleMaterialStore.data.items;
                    for (var k = 0; k < self.getView().byId("listaMasterMateriales").getItems().length; k++) {//detalleMaterialStore.getCount()
                        var currentMat = mat[k];
                        if (currentMat.CodCentro == "") {
                            cal = 1;
                        }
                    }
                    if (cal != 0) {
                        MessageToast.show('No está definido el Centro/Almance/Lote en el detalle del Pedido');
                    }
                    else {
                        console.log("Grabar");
                        self.guardarDoc;
                    }
                }
                else {
                    self.guardarDoc;
                }
        }        
    };
});