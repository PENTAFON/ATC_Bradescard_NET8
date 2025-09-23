
$(document).ready(function () {

    //----------------------------------------------------------------------------------------------------------------
    $("#NumeroTarjeta").on("paste", function (e) {
        e.preventDefault(); // Evita el pegado directo

        let pastedData = (e.originalEvent || e).clipboardData.getData('text');

        // Extraer solo dígitos
        pastedData = pastedData.replace(/\D/g, '');

        // Tomar los últimos 4 dígitos
        let ultimos4 = pastedData.slice(-4);

        // Mostrar solo esos 4 en el campo
        $(this).val(ultimos4);
    });

    //----------------------------------------------------------------------------------------------------------------    
    //MotivoLlamada - Autenticacion
    $("#MotivoLlamada").change(function () {

        const AutenticacionUrl = $("#crm-data").data("autenticacion-url");

        //limpia
        $("#Autenticacion").empty();
        $("#ProtocoloUtilizado").empty();
        $("#Resultado").empty();
        $("#Subclasificacion").empty();
        $("#Subclasificacion2").empty();
        //oculta divs
        $("#dvSub1").addClass("d-none").hide();
        $("#dvSub2").addClass("d-none").hide();
        $("#dvSub3").addClass("d-none").hide();
        $("#dvSub4").addClass("d-none").hide();
        $("#dvSub5").addClass("d-none").hide();


        $.ajax({
            type: 'POST',
            url: AutenticacionUrl,
            dataType: 'json',
            data: {
                id: $("#MotivoLlamada").val()
            },
            success: function (result) {
                $('<option>', {
                    value: "",
                    text: "SELECCIONE"
                }).appendTo("#Autenticacion");


                $.each(result, function (i, group) {
                    $('<option>', {
                        value: group.id,
                        text: group.autenticacion
                    }).appendTo("#Autenticacion");
                });


                if (Array.isArray(result) && result.length > 0) {
                    $("#dvSub1").removeClass("d-none").show();
                }

            }

        });

    });
    //----------------------------------------------------------------------------------------------------------------
    //Autenticacion - ProtocoloUtilizado
    $("#Autenticacion").change(function () {

        const ProtocoloUrl = $("#crm-data").data("protocolo-url");

        //limpia
        $("#ProtocoloUtilizado").empty();
        $("#Resultado").empty();
        $("#Subclasificacion").empty();
        $("#Subclasificacion2").empty();
        //oculta divs       
        $("#dvSub2").addClass("d-none").hide();
        $("#dvSub3").addClass("d-none").hide();
        $("#dvSub4").addClass("d-none").hide();
        $("#dvSub5").addClass("d-none").hide();


        $.ajax({
            type: 'POST',
            url: ProtocoloUrl,
            dataType: 'json',
            data: {
                id: $("#Autenticacion").val()
            },

            success: function (result) {
                $('<option>', {
                    value: "",
                    text: "SELECCIONE"
                }).appendTo("#ProtocoloUtilizado");


                $.each(result, function (i, group) {
                    $('<option>', {
                        value: group.id,
                        text: group.protocoloUtilizado
                    }).appendTo("#ProtocoloUtilizado");
                });


                if (Array.isArray(result) && result.length > 0) {
                    $("#dvSub2").removeClass("d-none").show();
                }

            }

        });

    });
    //----------------------------------------------------------------------------------------------------------------
    //ProtocoloUtilizado - Resultado
    $("#ProtocoloUtilizado").change(function () {

        const ResultadoUrl = $("#crm-data").data("resultado-url");

        //limpia
        $("#Resultado").empty();
        $("#Subclasificacion").empty();
        $("#Subclasificacion2").empty();
        //oculta divs 
        $("#dvSub3").addClass("d-none").hide();
        $("#dvSub4").addClass("d-none").hide();
        $("#dvSub5").addClass("d-none").hide();


        $.ajax({
            type: 'POST',
            url: ResultadoUrl,
            dataType: 'json',
            data: {
                id: $("#ProtocoloUtilizado").val()
            },
            success: function (result) {
                $('<option>', {
                    value: "",
                    text: "SELECCIONE"
                }).appendTo("#Resultado");

                $.each(result, function (i, group) {
                    $('<option>', {
                        value: group.id,
                        text: group.resultado
                    }).appendTo("#Resultado");
                });

                if (Array.isArray(result) && result.length > 0) {
                    $("#dvSub3").removeClass("d-none").show();
                }
            }


        });
    });
    //----------------------------------------------------------------------------------------------------------------
    //Resultado - Subclasificacion
    $("#Resultado").change(function () {

        const SubclaUrl = $("#crm-data").data("subcla-url");

        //limpia
        $("#Subclasificacion").empty();
        $("#Subclasificacion2").empty();
        //oculta divs 
        $("#dvSub4").addClass("d-none").hide();
        $("#dvSub5").addClass("d-none").hide();


        $.ajax({
            type: 'POST',
            url: SubclaUrl,
            dataType: 'json',
            data: {
                id: $("#Resultado").val()
            },
            success: function (result) {
                $('<option>', {
                    value: "",
                    text: "SELECCIONE"
                }).appendTo("#Subclasificacion");

                $.each(result, function (i, group) {

                    $('<option>', {
                        value: group.id,
                        text: group.subclasificacion
                    }).appendTo("#Subclasificacion");

                });

                if (Array.isArray(result) && result.length > 0) {
                    $("#dvSub4").removeClass("d-none").show();
                }
            }

        });
    });
    //----------------------------------------------------------------------------------------------------------------
    //Subclasificacion - Subclasificacion2
    $("#Subclasificacion").change(function () {

        const Subcla2Url = $("#crm-data").data("subcla2-url");

        //limpia
        $("#Subclasificacion2").empty();
        //oculta divs 
        $("#dvSub5").addClass("d-none").hide();


        $.ajax({
            type: 'POST',
            url: Subcla2Url,
            dataType: 'json',
            data: {
                id: $("#Subclasificacion").val()
            },
            success: function (result) {
                $('<option>', {
                    value: "",
                    text: "SELECCIONE"
                }).appendTo("#Subclasificacion2");

                $.each(result, function (i, group) {
                    $('<option>', {
                        value: group.id,
                        text: group.subClasificacion2
                    }).appendTo("#Subclasificacion2");
                });


                if (Array.isArray(result) && result.length > 0) {
                    $("#dvSub5").removeClass("d-none").show();
                }
            }


        });
    });
    //----------------------------------------------------------------------------------------------------------------
    $("#BusquedaCliente").click(function () {

        const BusquedaCtes = $("#crm-data").data("busqueda-url");
        let dtoBusq = $("#DtoBusqueda").val();
        let idBusq = $("#TipoBusqueda").val();

        $('#tblConsulta > tbody > *').remove();

        $("#busquedaParam").css('display', 'none');

        $('#loading-image').show();

        setTimeout(function () {

            $("#busquedaParam").css('display', 'block');

        }, 10000);


        $.ajax({
            type: 'POST',
            url: BusquedaCtes,
            dataType: 'json',
            data: {
                DatoBuscar: dtoBusq,
                IdBuscador: idBusq
            },
            success: function (result) 
            {
                if (result.length > 0) {

                    $('#loading-image').hide();

                    $.each(result,
                        function (a, b) {


                            var fila = "";
                            fila = '<tr class="fila" style="font-size:12px;padding:0px;">' +
                                '<td colspan="5"><table style="width:100%;text-align:left;">' +
                                '<tr>' +
                                '<td> <label>Número de Cliente:  </label> ' + b.numeroCliente + '</td>' +
                                '<td> <label>Terminación:  </label> ' + b.numeroTarjeta + '</td>' +
                                '<td><button type="button" class="btn btn-primary" ' +
                                'onclick="Select(\'' + b.chainId + '\');">Seleccionar</button>' +
                                '</td>' +
                                '</tr>' +
                                '</table></td>' +
                                '</tr>';

                            $('#tblConsulta > tbody:last-child').append(fila);
                        });

                } else {
                    var fila = '<tr class="fila">' +
                        '<td></td>' +
                        '<td> No se encontro ningun cliente</td>' +
                        '<td></td>' +
                        '<td></td>' +
                        '</tr>';
                    $('#tblConsulta > tbody:last-child').append(fila);
                }
                $("#SearchDiv").css("display", "block");

                $("#busquedaParam").css('display', 'block');
            },
            error: function (ex) {

            }

        });

    });
    //----------------------------------------------------------------------------------------------------------------
    $("#btnguardacrm").click(function () {
               
       
        let arrayTipi = ["MotivoLlamada"];
        for (let i = 0; i < arrayTipi.length; i++) {
            if ($("#" + arrayTipi[i]).val().length === 0) {
                $("#" + arrayTipi[i]).css("border-color", "red");
                $("#" + arrayTipi[i]).focus();
                alert("¡Es obligatorio tipificar la interacción!");
                return;
            } else {
                $("#" + arrayTipi[i]).css("border-color", "#ccc");
            }
        }

        // Valida los campos dependientes de divs visibles
        let ddAuten = $("#Autenticacion").val();
        let ddProto = $("#ProtocoloUtilizado").val();
        let ddResul = $("#Resultado").val();
        let ddSub = $("#Subclasificacion").val();
        let ddSub2 = $("#Subclasificacion2").val();
                
        const campos = [
            { div: "#dvSub1", valor: ddAuten, campo: "#Autenticacion", msg: "Es obligatorio seleccionar una Autenticación." },
            { div: "#dvSub2", valor: ddProto, campo: "#ProtocoloUtilizado", msg: "Es obligatorio seleccionar un Protocolo." },
            { div: "#dvSub3", valor: ddResul, campo: "#Resultado", msg: "Es obligatorio seleccionar un Resultado." },
            { div: "#dvSub4", valor: ddSub, campo: "#Subclasificacion", msg: "Es obligatorio seleccionar una Subclasificación." },
            { div: "#dvSub5", valor: ddSub2, campo: "#Subclasificacion2", msg: "Es obligatorio seleccionar una Subclasificación2." }
        ];

        for (const item of campos) {
            if ($(item.div).is(':visible')) {
                if (item.valor !== "") {
                    $(item.campo).css("border-color", "#ccc");
                } else {
                    alert(item.msg);
                    $(item.campo).css("border-color", "red").focus();
                    return;
                }
            }
        }
                
        let ddAuten2 = parseInt($("#Autenticacion").val(), 10) || 0;
                        
        // when not in 11( NO ES CLIENTE BRADESCARD)
        if (ddAuten2 !== 11)
        {
            
            // --- Validación de OrgTxt ---
            let orgTxt = $("#OrgTxt");
            if (orgTxt.length > 0) { // solo valida si existe en el DOM
                let valorOrg = orgTxt.val()?.trim();
                if (!valorOrg) {
                    orgTxt.css("border-color", "red").focus();
                    alert("¡El campo ORG es obligatorio!");
                    return false;
                } else {
                    orgTxt.css("border-color", "#ccc");
                }
            }

            // --- Validación de SocioDd ---
            let socioDd = $("#SocioDd");
            if (socioDd.length > 0) { // solo valida si existe en el DOM
                let valorSocio = socioDd.val();
                if (!valorSocio || valorSocio === "0") {
                    socioDd.css("border-color", "red").focus();
                    alert("¡Debe seleccionar un socio!");
                    return false;
                } else {
                    socioDd.css("border-color", "#ccc");
                }
            }


          
            // --- Validación de NombreCliente ---
            let nombreCliente = $("#NombreCliente").val().trim();
            if (nombreCliente.length === 0) {
                $("#NombreCliente").css("border-color", "red").focus();
                alert("¡El campo Nombre Cliente es obligatorio!");
                return false;
            } else {
                $("#NombreCliente").css("border-color", "#ccc");
            }

            // --- Validación de Número de Tarjeta (exactamente 4 dígitos) ---
            let numeroTarjeta = $("#NumeroTarjeta").val().trim();
            if (!/^\d{4}$/.test(numeroTarjeta)) {
                $("#NumeroTarjeta").css("border-color", "red").focus();
                alert("¡Favor de colocar los últimos 4 digitos de la tarjeta!");
                return false;
            } else {
                $("#NumeroTarjeta").css("border-color", "#ccc");
            }

            // --- Validación de Número de Cuenta (exactamente 10 dígitos) ---
            let numeroCuenta = $("#NumeroCuenta").val().trim();
            if (!/^\d{10}$/.test(numeroCuenta)) {
                $("#NumeroCuenta").css("border-color", "red").focus();
                alert("¡El Número de Cliente debe tener exactamente 10 dígitos!");
                return false;
            } else {
                $("#NumeroCuenta").css("border-color", "#ccc");
            }


        }


        //alert("Guarda");
        $("#formCliente").submit();

    });
    //----------------------------------------------------------------------------------------------------------------
   


});//End document ready
//----------------------------------------------------------------------------------------------------------------
//FUNCIONES
// JUST NUMBERS
var nav4 = window.Event ? true : false;
function acceptNum(evt) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57, '.' = 46
    var key = nav4 ? evt.which : evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57) || key === 46);
}
//----------------------------------------------------------------------------------------------------------------
//Solo letras
function acceptLetters(evt) {
    var key = nav4 ? evt.which : evt.keyCode;

    // A-Z (65-90), a-z (97-122), backspace (8), espacio (32)
    return (
        key === 8 || key === 32 || // backspace, espacio
        (key >= 65 && key <= 90) || // letras mayúsculas
        (key >= 97 && key <= 122)   // letras minúsculas
    );
}
//----------------------------------------------------------------------------------------------------------------
function Select(id) {


    const bin = $("#Bin").val();
    const bin8 = $("#Bin8").val();
    const org = $("#Org").val();
    const prod = $("#Producto").val();
    const soc = $("#Socio").val();
    const nomCom = $("#NombreComercial").val();
    const opcion = $("#OpcionMenu").val();
    const nomCola = $("#NombreCola").val();
    const ani = $("#Telefono").val();
    //Datos de Interaccion
    const inter = $("#hdn_interactionid").val();
    const com = $("#hdn_companyid").val();
    const pro = $("#hdn_projectid").val();
    const wor = $("#hdn_workgroup").val();
    const use = $("#hdn_username").val();
    const dni = $("#hdn_dnis").val();
    const age = $("#hdn_agentid").val();


    window.location = '../Crm/Index?BIN=' + bin
        + '&BIN8=' + bin8
        + '&ORG=' + org
        + '&PRODUCTO=' + prod
        + '&SOCIO=' + soc
        + '&NOMBRECOMERCIAL=' + nomCom
        + '&OPCIONMENU=' + opcion
        + '&NOMBRECOLA=' + nomCola
        + '&ANI=' + ani 
        +'&INTERACTIONID=' + inter
        + '&COMPANYID=' + com
        + '&PROJECTID=' + pro
        + '&WORKGROUPID=' + wor
        + '&AGENTID=' + age
        + '&USERNAME=' + use
        + '&DNIS=' + dni
        + '&CHAIN_ID='+id;

}
//----------------------------------------------------------------------------------------------------------------



