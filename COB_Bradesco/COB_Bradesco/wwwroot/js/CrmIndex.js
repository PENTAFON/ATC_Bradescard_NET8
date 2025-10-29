

$(document).ready(function () {

    //----------------------------------------------------------------------------------------------------------------
    // BLOQUE: Validación de Número de Tarjeta (últimos 4 dígitos en pegado)
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    // MÁSCARA NÚMERO DE TARJETA: muestra real al escribir, enmascara al salir si hay 16
    //----------------------------------------------------------------------------------------------------------------
    const $numTarjeta = $("#NumeroTarjeta");


    //const socioValor = $("#Socio").val(); 

    //if (socioValor && socioValor.trim() !== "") {
    //    $("#SocioDd").val(socioValor.trim());
    //}

    // al cargar, normaliza el valor si viene con algo
    (function initNumeroTarjeta() {
        const raw = ($numTarjeta.val() || "").replace(/\D/g, "").slice(0, 16);
        if (raw) $numTarjeta.data("real", raw);
    })();

    // Solo números, máx 16; mientras escribes ves los dígitos reales
    $numTarjeta.on("input", function () {
        const limpio = $(this).val().replace(/\D/g, "").slice(0, 16);
        $(this).data("real", limpio);
        $(this).val(limpio); // no enmascarar mientras está escribiendo
    });

    // Pegar: tomar solo números, máx 16; mostrar reales
    $numTarjeta.on("paste", function (e) {
        e.preventDefault();
        let pasted = (e.originalEvent || e).clipboardData.getData("text") || "";
        pasted = pasted.replace(/\D/g, "").slice(0, 16);
        $(this).data("real", pasted);
        $(this).val(pasted); // mostrar reales; se enmascara al blur
    });

    // Al salir: si hay 16 => enmascarar (solo últimos 4 visibles)
    $numTarjeta.on("blur", function () {
        const real = $(this).data("real") || "";
        if (real.length === 16) {
            $(this).val("************" + real.slice(-4));
        } else {
            // si no son 16, deja lo que haya sin enmascarar
            $(this).val(real);
        }
    });

    // Al entrar: siempre mostrar los reales
    $numTarjeta.on("focus", function () {
        const real = $(this).data("real") || "";
        $(this).val(real);
    });



    //----------------------------------------------------------------------------------------------------------------
    // MotivoLlamada → Autenticacion
    //----------------------------------------------------------------------------------------------------------------
    $("#MotivoLlamada").change(function () {
        const AutenticacionUrl = $("#crm-data").data("autenticacion-url");

        // Limpiar combos
        $("#Autenticacion, #ProtocoloUtilizado, #Resultado, #Subclasificacion, #Subclasificacion2").empty();
        // Ocultar divs
        $("#dvSub1, #dvSub2, #dvSub3, #dvSub4, #dvSub5").addClass("d-none").hide();

        $.ajax({
            type: 'POST',
            url: AutenticacionUrl,
            dataType: 'json',
            data: { id: $("#MotivoLlamada").val() },
            success: function (result) {
                $('<option>', { value: "", text: "SELECCIONE" }).appendTo("#Autenticacion");

                $.each(result, function (i, group) {
                    $('<option>', { value: group.id, text: group.autenticacion }).appendTo("#Autenticacion");
                });

                if (Array.isArray(result) && result.length > 0)
                    $("#dvSub1").removeClass("d-none").show();
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // Autenticacion → ProtocoloUtilizado
    //----------------------------------------------------------------------------------------------------------------
    $("#Autenticacion").change(function () {
        const ProtocoloUrl = $("#crm-data").data("protocolo-url");

        $("#ProtocoloUtilizado, #Resultado, #Subclasificacion, #Subclasificacion2").empty();
        $("#dvSub2, #dvSub3, #dvSub4, #dvSub5").addClass("d-none").hide();

        $.ajax({
            type: 'POST',
            url: ProtocoloUrl,
            dataType: 'json',
            data: { id: $("#Autenticacion").val() },
            success: function (result) {
                $('<option>', { value: "", text: "SELECCIONE" }).appendTo("#ProtocoloUtilizado");
                $.each(result, function (i, group) {
                    $('<option>', { value: group.id, text: group.protocoloUtilizado }).appendTo("#ProtocoloUtilizado");
                });

                if (Array.isArray(result) && result.length > 0)
                    $("#dvSub2").removeClass("d-none").show();
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // ProtocoloUtilizado → Resultado
    //----------------------------------------------------------------------------------------------------------------
    $("#ProtocoloUtilizado").change(function () {
        const ResultadoUrl = $("#crm-data").data("resultado-url");

        $("#Resultado, #Subclasificacion, #Subclasificacion2").empty();
        $("#dvSub3, #dvSub4, #dvSub5").addClass("d-none").hide();

        $.ajax({
            type: 'POST',
            url: ResultadoUrl,
            dataType: 'json',
            data: { id: $("#ProtocoloUtilizado").val() },
            success: function (result) {
                $('<option>', { value: "", text: "SELECCIONE" }).appendTo("#Resultado");

                $.each(result, function (i, group) {
                    $('<option>', { value: group.id, text: group.resultado }).appendTo("#Resultado");
                });

                if (Array.isArray(result) && result.length > 0)
                    $("#dvSub3").removeClass("d-none").show();
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // Resultado → Subclasificacion
    //----------------------------------------------------------------------------------------------------------------
    $("#Resultado").change(function () {
        const SubclaUrl = $("#crm-data").data("subcla-url");

        $("#Subclasificacion, #Subclasificacion2").empty();
        $("#dvSub4, #dvSub5").addClass("d-none").hide();

        $.ajax({
            type: 'POST',
            url: SubclaUrl,
            dataType: 'json',
            data: { id: $("#Resultado").val() },
            success: function (result) {
                $('<option>', { value: "", text: "SELECCIONE" }).appendTo("#Subclasificacion");

                $.each(result, function (i, group) {
                    $('<option>', { value: group.id, text: group.subclasificacion }).appendTo("#Subclasificacion");
                });

                if (Array.isArray(result) && result.length > 0)
                    $("#dvSub4").removeClass("d-none").show();
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // Subclasificacion → Subclasificacion2
    //----------------------------------------------------------------------------------------------------------------
    $("#Subclasificacion").change(function () {
        const Subcla2Url = $("#crm-data").data("subcla2-url");

        $("#Subclasificacion2").empty();
        $("#dvSub5").addClass("d-none").hide();

        $.ajax({
            type: 'POST',
            url: Subcla2Url,
            dataType: 'json',
            data: { id: $("#Subclasificacion").val() },
            success: function (result) {
                $('<option>', { value: "", text: "SELECCIONE" }).appendTo("#Subclasificacion2");

                $.each(result, function (i, group) {
                    $('<option>', { value: group.id, text: group.subClasificacion2 }).appendTo("#Subclasificacion2");
                });

                if (Array.isArray(result) && result.length > 0)
                    $("#dvSub5").removeClass("d-none").show();
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // Búsqueda de Cliente
    //----------------------------------------------------------------------------------------------------------------
    $("#BusquedaCliente").click(function () {
        const BusquedaCtes = $("#crm-data").data("busqueda-url");
        let dtoBusq = $("#DtoBusqueda").val();
        let idBusq = $("#TipoBusqueda").val();

        $('#tblConsulta > tbody > *').remove();
        $("#busquedaParam").hide();
        $('#loading-image').show();

        setTimeout(() => $("#busquedaParam").show(), 10000);

        $.ajax({
            type: 'POST',
            url: BusquedaCtes,
            dataType: 'json',
            data: { DatoBuscar: dtoBusq, IdBuscador: idBusq },
            success: function (result) {
                $('#loading-image').hide();

                if (result.length > 0) {
                    $.each(result, function (a, b) {
                        const fila = `
                            <tr class="fila" style="font-size:12px;padding:0px;">
                                <td colspan="5">
                                    <table style="width:100%;text-align:left;">
                                        <tr>
                                            <td><label>Número de Cliente:</label> ${b.numeroCliente}</td>
                                            <td><label>Terminación:</label> ${b.numeroTarjeta}</td>
                                            <td>
                                                <button type="button" class="btn btn-primary" onclick="Select('${b.chainId}');">
                                                    Seleccionar
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>`;
                        $('#tblConsulta > tbody:last-child').append(fila);
                    });
                } else {
                    $('#tblConsulta > tbody:last-child').append('<tr><td colspan="5">No se encontró ningún cliente</td></tr>');
                }

                $("#SearchDiv").show();
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // Guardar CRM
    //----------------------------------------------------------------------------------------------------------------
    $("#btnguardacrm").click(function () {
        let arrayTipi = ["MotivoLlamada"];

        for (let i = 0; i < arrayTipi.length; i++) {
            if ($("#" + arrayTipi[i]).val().length === 0) {
                $("#" + arrayTipi[i]).css("border-color", "red").focus();
                alert("¡Es obligatorio tipificar la interacción!");
                return;
            } else {
                $("#" + arrayTipi[i]).css("border-color", "#ccc");
            }
        }

        const realTarjeta = $("#NumeroTarjeta").data("real") || "";
        $("#NumeroTarjeta").val(realTarjeta.slice(-4));

        $("#formCliente").submit();
    });

    //----------------------------------------------------------------------------------------------------------------
    $("#btnConsultaDatos").on("click", function () {
        const numeroTarjeta = $("#NumeroTarjeta").data("real") || "";

        if (numeroTarjeta.length !== 16) {
            alert("Debe ingresar un número de tarjeta completo (16 dígitos).");
            $("#NumeroTarjeta").focus();
            return;
        }

        $("#ApiResultDatosContainer").show();
        $("#ApiResultDatosContainer").html(`<div class="text-center py-3">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Consultando datos...</p>
    </div>`);

        $.ajax({
            url: api.consultaDatos,
            type: "GET",
            dataType: "text",
            data: { numeroTarjeta },
            success: function (response) {
                if (!response || response.includes("Error")) {
                    $("#ApiResultDatosContainer").html("<div class='alert alert-warning'>No se encontraron datos</div>");
                } else {
                    RenderDatosCuenta(response, numeroTarjeta);
                }
            },
            error: function () {
                $("#ApiResultDatosContainer").html("<div class='alert alert-danger'>Error al consultar datos</div>");
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // MOVIMIENTOS ANTES DEL CORTE
    //----------------------------------------------------------------------------------------------------------------
    $("#btnMovAntes").on("click", function () {
        const numeroTarjeta = $("#NumeroTarjeta").data("real") || "";

        if (numeroTarjeta.length !== 16) {
            alert("Debe ingresar un número de tarjeta completo (16 dígitos).");
            $("#NumeroTarjeta").focus();
            return;
        }

        $("#ApiResultContainer").show();
        $("#ApiResultContent").html(`<div class="text-center py-3">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Consultando movimientos antes del corte...</p>
    </div>`);

        $.ajax({
            url: api.movAntes,
            type: "GET",
            dataType: "text",
            data: { numeroTarjeta },
            success: function (response) {
                RenderMovimientosAntes(response, numeroTarjeta);
            },
            error: function () {
                $("#ApiResultContent").html("<div class='alert alert-danger'>Error al consultar movimientos</div>");
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // MOVIMIENTOS DESPUÉS DEL CORTE
    //----------------------------------------------------------------------------------------------------------------
    $("#btnMovDespues").on("click", function () {
        const numeroTarjeta = $("#NumeroTarjeta").data("real") || "";

        if (numeroTarjeta.length !== 16) {
            alert("Debe ingresar un número de tarjeta completo (16 dígitos).");
            $("#NumeroTarjeta").focus();
            return;
        }

        $("#ApiResultContainer").show();
        $("#ApiResultContent").html(`<div class="text-center py-3">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Consultando movimientos después del corte...</p>
    </div>`);

        $.ajax({
            url: api.movDespues,
            type: "GET",
            dataType: "text",
            data: { numeroTarjeta },
            success: function (response) {
                RenderMovimientosDespues(response, numeroTarjeta);
            },
            error: function () {
                $("#ApiResultContent").html("<div class='alert alert-danger'>Error al consultar movimientos</div>");
            }
        });
    });

    //----------------------------------------------------------------------------------------------------------------
    // MOVIMIENTOS POR PERIODO
    //----------------------------------------------------------------------------------------------------------------
    $("#btnMovPeriodo").on("click", function () {
        const numeroTarjeta = $("#NumeroTarjeta").data("real") || "";

        const periodo = prompt("Ingrese el periodo en formato MM/AA:", "");
        if (numeroTarjeta.length !== 16 || !/^\d{2}\/\d{2}$/.test(periodo)) {
            alert("Debe ingresar la tarjeta completa (16 dígitos) y un periodo válido (MM/AA).");
            return;
        }

        $("#ApiResultContainer").show();
        $("#ApiResultContent").html(`<div class="text-center py-3">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Consultando movimientos del periodo ${periodo}...</p>
    </div>`);

        $.ajax({
            url: api.movPeriodo,
            type: "GET",
            dataType: "text",
            data: { numeroTarjeta, periodo },
            success: function (response) {
                RenderMovimientosPeriodo(response, numeroTarjeta, periodo);
            },
            error: function () {
                $("#ApiResultContent").html("<div class='alert alert-danger'>Error al consultar movimientos</div>");
            }
        });
    });

    // ======================================================
    // CONSULTA NIP CUESTIONARIO
    // ======================================================

    $("#btnConsultaNip").on("click", function () {
        const numeroTarjeta = $("#NumeroTarjeta").data("real") || "";

        if (numeroTarjeta.length !== 16) {
            alert("Debe ingresar un número de tarjeta completo (16 dígitos).");
            $("#NumeroTarjeta").focus();
            return;
        }

        $("#ApiResultNipContainer").show();
        $("#ApiResultNipContainer").html(`<div class="text-center py-3">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Consultando datos...</p>
    </div>`);

        $.ajax({
            url: api.nipCuestionario,
            type: "GET",
            dataType: "text",
            data: { numeroTarjeta },
            success: function (response) {
                if (!response || response.includes("Error")) {
                    $("#ApiResultNipContainer").html("<div class='alert alert-warning'>No se encontraron datos</div>");
                } else {
                    RenderNipResultado(response, numeroTarjeta);
                }
            },
            error: function () {
                $("#ApiResultNipContainer").html("<div class='alert alert-danger'>Error al consultar datos</div>");
            }
        });
    });



}); // END document.ready

//----------------------------------------------------------------------------------------------------------------
// FUNCIONES GLOBALES
//----------------------------------------------------------------------------------------------------------------

// SOLO NÚMEROS
var nav4 = window.Event ? true : false;
function acceptNum(evt) {
    var key = nav4 ? evt.which : evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57) || key === 46);
}

// SOLO LETRAS
function acceptLetters(evt) {
    var key = nav4 ? evt.which : evt.keyCode;
    return (
        key === 8 || key === 32 ||
        (key >= 65 && key <= 90) ||
        (key >= 97 && key <= 122)
    );
}

// SELECCIÓN DE CLIENTE
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

    // Datos de Interacción
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
        + '&INTERACTIONID=' + inter
        + '&COMPANYID=' + com
        + '&PROJECTID=' + pro
        + '&WORKGROUPID=' + wor
        + '&AGENTID=' + age
        + '&USERNAME=' + use
        + '&DNIS=' + dni
        + '&CHAIN_ID=' + id;
}



//----------------------------------------------------------------------------------------------------------------
// RENDER DATOS CUENTA
//----------------------------------------------------------------------------------------------------------------
function RenderDatosCuenta(data, numeroTarjeta) {

    const get = (obj, ...keys) => keys.reduce((v, k) => v ?? obj[k], undefined);

    if (typeof data === "string") {
        const valores = data.split(",");
        data = {
            DiaCorte: valores[0] || "-",
            NumeroCuenta: valores[1] || "-",
            SaldoPeriodoActual: valores[2] || "0",
            SaldoPeriodo: valores[3] || "0",
            PagoMinimo: valores[4] || "0",
            FechaLimitePago: valores[5] || "-"
        };
    }

    const numeroCuenta = data.NumeroCuenta?.trim() ?? "-";
    const saldoPeriodoActual = parseFloat(data.SaldoPeriodoActual || 0).toFixed(2);
    const saldoPeriodo = parseFloat(data.SaldoPeriodo || 0).toFixed(2);
    const pagoMinimo = parseFloat(data.PagoMinimo || 0).toFixed(2);

    let diaCorte = data.DiaCorte?.replace(/['"]/g, "").trim() || "-";
    let fechaLimitePago = data.FechaLimitePago?.replace(/['"]/g, "").trim() || "-";

    const parseFecha = f => {
        if (!f || f === "-" || f === "00000000") return "-";
        if (/^\d{8}$/.test(f)) {
            const dd = f.substring(0, 2);
            const mm = f.substring(2, 4);
            const yyyy = f.substring(4);
            const fecha = `${dd}/${mm}/${yyyy}`;
            const d = new Date(`${yyyy}-${mm}-${dd}`);
            return isNaN(d.getTime()) ? "-" : fecha;
        }
        return f;
    };

    diaCorte = parseFecha(diaCorte);
    fechaLimitePago = parseFecha(fechaLimitePago);

    const masked = "********" + String(numeroTarjeta).slice(-4);
    const fechaConsulta = new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        hour12: false
    });

    const html = `
        <div class="card shadow-sm border-0" style="border-radius:10px;overflow:hidden;">
            <div class="card-header text-white py-1 px-3" style="background-color:#820711;font-size:13px;">
                <div class="d-flex justify-content-between align-items-center">
                    <span style="font-weight:600;">Resultado de Consulta</span>
                    <small>${fechaConsulta}</small>
                </div>
            </div>
            <div class="card-body bg-light py-2 px-3">
                <div class="text-center mb-2">
                    <small class="text-muted d-block mb-1">Tarjeta Consultada</small>
                    <span style="font-weight:600;letter-spacing:1px;">${masked}</span>
                </div>
                <div class="row text-center" style="font-size:13px;">
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Día de Corte</div>
                            <div>${diaCorte}</div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Número de Cuenta</div>
                            <div>${numeroCuenta}</div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Saldo Periodo Actual</div>
                            <div class="fw-bold" style="color:#1b5e20;">$${saldoPeriodoActual}</div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Saldo del Periodo</div>
                            <div class="fw-bold" style="color:#2e7d32;">$${saldoPeriodo}</div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Pago Mínimo</div>
                            <div class="fw-bold" style="color:#b71c1c;">$${pagoMinimo}</div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Fecha Límite de Pago</div>
                            <div>${fechaLimitePago}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    $("#ApiResultDatosContainer").html(html);
}

//----------------------------------------------------------------------------------------------------------------
// RENDER MOVIMIENTOS ANTES DEL CORTE
//----------------------------------------------------------------------------------------------------------------
function RenderMovimientosAntes(data, numeroTarjeta) {

    const lineas = data.split("|#&|")
        .map(x => x.trim())
        .filter(x => x.length > 0 && !x.includes("Sin movimientos"));

    if (lineas.length === 0) {
        $("#ApiResultContent").html(`
            <div class="alert alert-warning text-center">
                <strong>Sin movimientos</strong><br>No se encontraron registros antes del corte.
            </div>`);
        return;
    }

    const movimientos = lineas.map(l => {
        const p = l.split(",").map(x => x.trim());
        let estatus = (p[0] || "-").replace(/['"]/g, "");
        const monto = parseFloat(p[1] || 0);
        const fechaRaw = p[2] || "";
        const codigo = p[3] || "-";
        const descripcion = (p[4] || "-").replace(/['"]/g, "").trim();

        let fechaFormateada = "-";
        if (/^\d{8}$/.test(fechaRaw)) {
            const dd = fechaRaw.substring(0, 2);
            const mm = fechaRaw.substring(2, 4);
            const yyyy = fechaRaw.substring(4);
            fechaFormateada = `${dd}/${mm}/${yyyy}`;
        }

        return {
            Estatus: estatus,
            Monto: monto.toFixed(2),
            Fecha: fechaFormateada,
            Codigo: codigo,
            Descripcion: descripcion
        };
    });

    const totalMovimientos = movimientos.length;
    const masked = "********" + String(numeroTarjeta).slice(-4);
    const fechaConsulta = new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        hour12: false
    });

    const rows = movimientos.map(m => `
        <tr>
            <td class="text-center">${m.Estatus}</td>
            <td>${m.Fecha}</td>
            <td class="text-center">${m.Codigo}</td>
            <td>${m.Descripcion}</td>
            <td class="text-end" style="color:${m.Estatus === 'C' ? '#2e7d32' : '#b71c1c'};">$${m.Monto}</td>
        </tr>`).join("");

    const html = `
        <div class="card shadow-sm border-0" style="border-radius:10px;overflow:hidden;">
            <div class="card-header text-white py-1 px-3" style="background-color:#820711;font-size:13px;">
                <div class="d-flex justify-content-between align-items-center">
                    <span style="font-weight:600;">Movimientos Antes del Corte</span>
                    <small>${fechaConsulta}</small>
                </div>
            </div>
            <div class="card-body bg-light py-2 px-3">
                <div class="text-center mb-2">
                    <small class="text-muted d-block mb-1">Tarjeta Consultada</small>
                    <span style="font-weight:600;letter-spacing:1px;">${masked}</span>
                </div>
                <div class="table-responsive" style="overflow-x:hidden;">
                    <table class="table table-sm table-bordered bg-white mb-0 align-middle text-center" style="font-size:13px;">
                        <thead class="table-light">
                            <tr>
                                <th style="width:8%;">Stat</th>
                                <th style="width:15%;">Fecha</th>
                                <th style="width:10%;">Código</th>
                                <th style="min-width:40%;">Descripción</th>
                                <th style="width:15%;" class="text-end">Monto</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                        <tfoot>
                            <tr class="table-secondary fw-bold">
                                <td colspan="5" class="text-end">Total de Movimientos: ${totalMovimientos}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>`;

    $("#ApiResultContent").html(html);
}

//----------------------------------------------------------------------------------------------------------------
// RENDER MOVIMIENTOS DESPUÉS DEL CORTE
//----------------------------------------------------------------------------------------------------------------
function RenderMovimientosDespues(data, numeroTarjeta) {

    const lineas = data.split("|#&|")
        .map(x => x.trim())
        .filter(x => x.length > 0 && !x.includes("Sin movimientos"));

    if (lineas.length === 0) {
        $("#ApiResultContent").html(`
            <div class="alert alert-warning text-center">
                <strong>Sin movimientos</strong><br>No se encontraron registros después del corte.
            </div>`);
        return;
    }

    const movimientos = lineas.map(l => {
        const p = l.split(",").map(x => x.trim());
        let estatus = (p[0] || "-").replace(/['"]/g, "");
        const monto = parseFloat(p[1] || 0);
        const fechaRaw = p[2] || "";
        const codigo = p[3] || "-";
        const descripcion = (p[4] || "-").replace(/['"]/g, "").trim();

        let fechaFormateada = "-";
        if (/^\d{8}$/.test(fechaRaw)) {
            const dd = fechaRaw.substring(0, 2);
            const mm = fechaRaw.substring(2, 4);
            const yyyy = fechaRaw.substring(4);
            fechaFormateada = `${dd}/${mm}/${yyyy}`;
        }

        return {
            Estatus: estatus,
            Monto: monto.toFixed(2),
            Fecha: fechaFormateada,
            Codigo: codigo,
            Descripcion: descripcion
        };
    });

    const totalMovimientos = movimientos.length;
    const masked = "********" + String(numeroTarjeta).slice(-4);
    const fechaConsulta = new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        hour12: false
    });

    const rows = movimientos.map(m => `
        <tr>
            <td class="text-center">${m.Estatus}</td>
            <td>${m.Fecha}</td>
            <td class="text-center">${m.Codigo}</td>
            <td>${m.Descripcion}</td>
            <td class="text-end" style="color:${m.Estatus === 'C' ? '#2e7d32' : '#b71c1c'};">$${m.Monto}</td>
        </tr>`).join("");

    const html = `
        <div class="card shadow-sm border-0" style="border-radius:10px;overflow:hidden;">
            <div class="card-header text-white py-1 px-3" style="background-color:#820711;font-size:13px;">
                <div class="d-flex justify-content-between align-items-center">
                    <span style="font-weight:600;">Movimientos Después del Corte</span>
                    <small>${fechaConsulta}</small>
                </div>
            </div>
            <div class="card-body bg-light py-2 px-3">
                <div class="text-center mb-2">
                    <small class="text-muted d-block mb-1">Tarjeta Consultada</small>
                    <span style="font-weight:600;letter-spacing:1px;">${masked}</span>
                </div>
                <div class="table-responsive" style="overflow-x:hidden;">
                    <table class="table table-sm table-bordered bg-white mb-0 align-middle text-center" style="font-size:13px;">
                        <thead class="table-light">
                            <tr>
                                <th style="width:8%;">Stat</th>
                                <th style="width:15%;">Fecha</th>
                                <th style="width:10%;">Código</th>
                                <th style="min-width:40%;">Descripción</th>
                                <th style="width:15%;" class="text-end">Monto</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                        <tfoot>
                            <tr class="table-secondary fw-bold">
                                <td colspan="5" class="text-end">Total de Movimientos: ${totalMovimientos}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>`;

    $("#ApiResultContent").html(html);
}

//----------------------------------------------------------------------------------------------------------------
// RENDER MOVIMIENTOS POR PERIODO
//----------------------------------------------------------------------------------------------------------------
function RenderMovimientosPeriodo(data, numeroTarjeta, periodo) {

    const lineas = data.split("|#&|")
        .map(x => x.trim())
        .filter(x => x.length > 0 && !x.includes("Sin movimientos"));

    if (lineas.length === 0) {
        $("#ApiResultContent").html(`
            <div class="alert alert-warning text-center">
                <strong>Sin movimientos</strong><br>No se encontraron registros en el periodo indicado.
            </div>`);
        return;
    }

    const movimientos = lineas.map(l => {
        const p = l.split(",").map(x => x.trim());
        let estatus = (p[0] || "-").replace(/['"]/g, "");
        const monto = parseFloat(p[1] || 0);
        const fechaRaw = p[2] || "";
        const codigo = p[3] || "-";
        const descripcion = (p[4] || "-").replace(/['"]/g, "").trim();

        let fechaFormateada = "-";
        if (/^\d{8}$/.test(fechaRaw)) {
            const dd = fechaRaw.substring(0, 2);
            const mm = fechaRaw.substring(2, 4);
            const yyyy = fechaRaw.substring(4);
            fechaFormateada = `${dd}/${mm}/${yyyy}`;
        }

        return {
            Estatus: estatus,
            Monto: monto.toFixed(2),
            Fecha: fechaFormateada,
            Codigo: codigo,
            Descripcion: descripcion
        };
    });

    const totalMovimientos = movimientos.length;
    const masked = "********" + String(numeroTarjeta).slice(-4);
    const fechaConsulta = new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        hour12: false
    });

    const rows = movimientos.map(m => `
        <tr>
            <td class="text-center">${m.Estatus}</td>
            <td>${m.Fecha}</td>
            <td class="text-center">${m.Codigo}</td>
            <td>${m.Descripcion}</td>
            <td class="text-end" style="color:${m.Estatus === 'C' ? '#2e7d32' : '#b71c1c'};">$${m.Monto}</td>
        </tr>`).join("");

    const html = `
        <div class="card shadow-sm border-0" style="border-radius:10px;overflow:hidden;">
            <div class="card-header text-white py-1 px-3" style="background-color:#820711;font-size:13px;">
                <div class="d-flex justify-content-between align-items-center">
                    <span style="font-weight:600;">Movimientos Periodo ${periodo}</span>
                    <small>${fechaConsulta}</small>
                </div>
            </div>
            <div class="card-body bg-light py-2 px-3">
                <div class="text-center mb-2">
                    <small class="text-muted d-block mb-1">Tarjeta Consultada</small>
                    <span style="font-weight:600;letter-spacing:1px;">${masked}</span>
                </div>
                <div class="table-responsive" style="overflow-x:hidden;">
                    <table class="table table-sm table-bordered bg-white mb-0 align-middle text-center" style="font-size:13px;">
                        <thead class="table-light">
                            <tr>
                                <th style="width:8%;">Stat</th>
                                <th style="width:15%;">Fecha</th>
                                <th style="width:10%;">Código</th>
                                <th style="min-width:40%;">Descripción</th>
                                <th style="width:15%;" class="text-end">Monto</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                        <tfoot>
                            <tr class="table-secondary fw-bold">
                                <td colspan="5" class="text-end">Total de Movimientos: ${totalMovimientos}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>`;

    $("#ApiResultContent").html(html);
}


// RENDER CONSULTA NIP
//----------------------------------------------------------------------------------------------------------------

function RenderNipResultado(data, numeroTarjeta) {

    // 🔹 Normalizador si viene como texto plano
    if (typeof data === "string") {
        const valores = data.split(";").map(v => v.trim());
        data = {
            nodos: valores[0] || "-",
            cvv2: parseInt(valores[1] || 0),
            fechaNac: valores[2] || "-",
            limiteCredito: parseFloat(valores[3] || 0),
            fechaLimitePago: valores[6] || "-",
            edad: parseInt(valores[7] || 0)
        };
    }

    // 🔹 Limpieza de valores
    const nodos = (data.nodos ?? "-").toString().replace(/['"]/g, "").trim(); // ✅ elimina comillas
    const cvv2 = data.cvv2 ?? 0;
    const fechaNac = data.fechaNac || "-";
    const limiteCredito = parseFloat(data.limiteCredito || 0).toFixed(2);
    const fechaLimitePago = data.fechaLimitePago || "-";
    const edad = data.edad ?? "-";

    const fechaConsulta = new Date().toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
        hour12: false
    });

    const html = `
        <div class="card shadow-sm border-0" style="border-radius:10px;overflow:hidden;">
            <div class="card-header text-white py-1 px-3" style="background-color:#6A0000;font-size:13px;">
                <div class="d-flex justify-content-between align-items-center">
                    <span style="font-weight:600;">Resultado de Consulta NIP</span>
                    <small>${fechaConsulta}</small>
                </div>
            </div>

            <div class="card-body bg-light py-2 px-3">
                <div class="row text-center" style="font-size:13px;">
                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Nodo</div>
                            <div>${nodos}</div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">CVV2</div>
                            <div>${cvv2}</div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Fecha de Nacimiento</div>
                            <div>${fechaNac}</div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Límite de Crédito</div>
                            <div class="fw-bold" style="color:#1b5e20;">$${limiteCredito}</div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Fecha Límite de Pago</div>
                            <div>${fechaLimitePago}</div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-2">
                        <div class="p-1 bg-white rounded shadow-sm">
                            <div class="text-muted small mb-1">Edad</div>
                            <div>${edad}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    $("#ApiResultNipContainer").html(html);
}



