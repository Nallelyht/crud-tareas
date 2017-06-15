var plantillaTareas = '<tr data-id=__id__>' + 
		'<td>__nombre-tarea__</td>' + 
		'<td>__estado-tarea__</td>' + 
		'<td>' + 
		'<span data-toggle="modal" data-target="#modal-inf" class="glyphicon glyphicon-info-sign"></span>' + 
		'<span class="glyphicon glyphicon-pencil"></span>' + 
		'<span class="glyphicon glyphicon-remove-sign"></span>' + 
		'</td>'+
		'</tr>' 



var api = {
	url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
	cargarTareas();
	$("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
	$.getJSON(api.url, function (tareas) {
		tareas.forEach(crearTarea);
	});
};


var crearTarea = function (tarea) {
	//	var nombre = tarea.name;
	//	var estado = tarea.status[0];
	//	// creamos la fila
	//	var $tr = $("<tr />");
	//	// creamos la celda del nombre
	//	var $nombreTd = $("<td />");
	//	$nombreTd.text(nombre);
	//	// creamos la celda del estado
	//	var $estadoTd = $("<td />");
	//  $estadoTd.text(estado);
	//  var $accionesTd = $("<td />");
	//  var $contenedorBuscar = $("<button />");
	//  var $spanBuscar = $("<span />");
	//  $spanBuscar.addClass("glyphicon glyphicon-info-sign");
	//  $contenedorBuscar.append($spanBuscar);
	//  $accionesTd.append($contenedorBuscar);
	//  var $contenedorEditar = $("<button />");
	//  var $spanEditar = $("<span />");
	//  $spanEditar.addClass("glyphicon glyphicon-pencil");
	//  $contenedorEditar.append($spanEditar);
	//  $accionesTd.append($contenedorEditar);
	//  var $contenedorEliminar = $("<button />");
	//  var $spanEliminar = $("<span />");
	//  $spanEliminar.addClass("glyphicon glyphicon-trash");
	//  $contenedorEliminar.append($spanEliminar);
	//  $accionesTd.append($contenedorEliminar);
	//	// agregamos las celdas a la fila
	//	$tr.append($nombreTd);
	//	$tr.append($estadoTd);
	//	$tr.append($accionesTd);
	//	$tr.append($contenedorBuscar);
	//	$tr.append($contenedorEditar);
	//	$tr.append($contenedorEliminar);
	//	// agregamos filas a la tabla
	//	$tasksList.append($tr);
	var nombre = tarea.name;
	var estado = tarea.status[0];
	var id = tarea._id;
	var date = tarea.create_at;


	var plantillaNueva = plantillaTareas.replace("__nombre-tarea__", nombre).replace("__estado-tarea__",estado).replace("__id__",id);
	$tasksList.append(plantillaNueva);

};

var agregarTarea = function (e) {
	e.preventDefault();
	var nombre = $("#nombre-tarea").val();
	$.post(api.url, {
		name: nombre
	}, function (tarea) {
		crearTarea(tarea);
		$("#myModal").modal("hide");
	});
};
var borrarTarea = function () {
	var id = $(this).parents("tr").data('id');
	console.log(id);
	$.ajax({
		url:api.url+id,
		type:"DELETE",
		success: function(data){
			swal("Se ha borrado tu tarea con exito.", "dale click al boton", "success")
		}
	});
	$(this).parents("tr").remove();
};
var infoTareas = function () {
	var idTarea =  $(this).parents("tr").data('id');
	var urlID = api.url + idTarea;

	$.getJSON(urlID,function(response){
		console.log(response);

		var nombre = response.name;
		var id = response._id;
		var fecha = response.created_at;
		var estado = response.status[0];
		console.log(nombre, id, fecha, estado);
		mostrarInfoTarea(nombre, id, fecha, estado);
	});

};

var mostrarInfoTarea = function (nombre, id, fecha, estado) {
	$("#name").text(nombre);
	$("#id").text(id);
	$("#date").text(fecha);
	$("#status").text(estado);
}

$(document).on("click", ".glyphicon-info-sign", infoTareas);
$(document).on("click", ".glyphicon-remove-sign", borrarTarea);
$(document).ready(cargarPagina);