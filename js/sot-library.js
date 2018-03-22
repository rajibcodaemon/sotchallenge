  // Calling function from UI action to retrive search data
  function getEmployeeData() {  
    var data = $('#emp_id').val();
    var callurl = 'http://52.87.171.80/sample_crud_rest/api/v1/employee/'+data;
    var method= 'GET';

    if(data){                                      // if blank not input
      apiCallBackAll(data,callurl,method).then(function(data) {    // call promise
        $('#emp_id').empty();
        $('#employeeResponse').empty();
        var response = JSON.parse(data);
        $('#serv_resp').empty().append(response.status);
        $('#serv_msg').empty().append(response.message);
        $('#empResp tbody').remove();
        $("#myProgress").addClass("hidden");
        $("#alert").removeClass("hidden");
        $("#alert").removeClass("alert-danger");
        $("#table").removeClass("hidden");
        $("#alert").addClass("alert-success");
        var trHTML = '';
        $.each(response.data, function (i, item) {
         trHTML +='<tbody><td scope="row">' + item.emp_id + '</td><td>' + item.emp_username  + '</td><td>' + item.emp_first_name  + '</td><td>' + item.emp_last_name  + '</td><td>' + item.emp_gender  + '</td><td>' + item.emp_phone  + '</td><td>' + item.emp_email  + '</td><td>' + item.emp_address  + '</td><td>' + item.emp_designation  + '</td><td>' + item.emp_department  + '</td><td><button onclick="getEmployeeDelete(' + item.emp_id + ')" type="button" class="btn btn-default btn-sm"><i class="fa fa-close"></i></button>&nbsp;<button type="button" class="btn btn-default btn-sm"  onclick="editEmployeeData(' + item.emp_id + ')"><i class="fa fa-edit"></i></button></td></tr></tbody>';
          //$('#empResp').empty();
        });
        $('#empResp').append(trHTML);
      }).catch(function(error) {   // if failed
        $('#employeeResponse').empty();
        var response = JSON.parse(error);
        $('#serv_resp').empty().append(response.status);
        $('#serv_msg').empty().append(response.message);
        $("#myProgress").addClass("hidden");
        $("#alert").removeClass("alert-success");
        $("#alert").addClass("alert-danger");
        $("#table").addClass("hidden");
        $("#alert").removeClass("hidden");
      });
    }
  }

  
  // Calling function from UI action for add employee data
  function addEmployee() {
     var data = {};
     data.emp_username = $('input[name=emp_username_add]').val();
     data.emp_first_name  = $('input[name=emp_first_name_add]').val();
     data.emp_last_name  = $('input[name=emp_last_name_add]').val();
     data.emp_gender  = $('input[name=emp_gender_add]:checked').val();
     data.emp_email  = $('input[name=emp_email_add]').val();
     data.emp_phone  = $('input[name=emp_phone_add]').val();
     data.emp_address  = $('input[name=emp_address_add]').val();
     data.emp_designation  = $('input[name=emp_designation_add]').val();
     //data.emp_department  = $('input[name=emp_department_add]').val();
     data.emp_department  = $(".emp_department_add option:selected").val();
     var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee";
     var datavar = JSON.stringify(data);
     var method = 'POST';
   if(data){
    $("#addEmployeeData").modal('hide');
    apiCallBackAll(datavar,callingurl,method).then(function(data){
      $("#exampleModal").modal('hide');
      $('#employeeResponse').empty();
      var response = JSON.parse(data);
      $('#serv_resp').empty().append(response.status);
      $('#serv_msg').empty().append(response.message);
      $('#empResp tbody').remove();
      $("#myProgress").addClass("hidden");
      $("#alert").removeClass("hidden");
      $("#myProgress").addClass("alert-success");
      $("#table").removeClass("hidden");
      $('#addEmployeeData').trigger("reset");
      setInterval(getAllEmployeeData(), 10000);
  	    }).catch(function(error) {   // if failed
          $("#exampleModal").modal('hide');
          $('#employeeResponse').empty();
          var response = JSON.parse(error);
          $('#serv_resp').empty().append(response.status);
          $('#serv_msg').empty().append(response.message);
          $("#myProgress").addClass("hidden");
          $("#alert").removeClass("hidden");
          $("#alert").removeClass("alert-success");
          $("#alert").addClass("alert-danger");
          $("#table").addClass("hidden");
          setInterval(getAllEmployeeData(), 10000);
        });
  	  }
   }



  // Calling function from UI action for to get all employee data
  function getAllEmployeeData() {
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee";
    var datavar = null;
    var method = 'GET';
      apiCallBackAll(datavar,callingurl,method).then(function(data) {    // call promise
        $('#employeeResponse').empty();
        var response = JSON.parse(data);
        $('#serv_resp').empty().append(response.status);
        $('#serv_msg').empty().append(response.message);
        $("#myProgress").addClass("hidden");
        $('#empResp tbody').remove();
        $("#alert").removeClass("hidden");
        $("#alert").removeClass("alert-danger");
        $("#table").removeClass("hidden");
        $("#alert").addClass("alert-success");
        var trHTML = '';
        $.each(response.data, function (i, item) {
         trHTML +='<tbody><td scope="row">' + item.emp_id + '</td><td>' + item.emp_username  + '</td><td>' + item.emp_first_name  + '</td><td>' + item.emp_last_name  + '</td><td>' + item.emp_gender  + '</td><td>' + item.emp_phone  + '</td><td>' + item.emp_email  + '</td><td>' + item.emp_address  + '</td><td>' + item.emp_designation  + '</td><td>' + item.emp_department  + '</td><td><button onclick="getEmployeeDelete(' + item.emp_id + ')" type="button" class="btn btn-default btn-sm"><i class="fa fa-close"></i></button>&nbsp;<button type="button" class="btn btn-default btn-sm"  onclick="editEmployeeData(' + item.emp_id + ')"><i class="fa fa-edit"></i></button></td></tr></tbody>';
          //$('#empResp').empty();
        });
        $('#empResp').append(trHTML);
      }).catch(function(error) {   // if failed

      });
    }



  // Calling function from UI action for to get an employee data for delete
  function getEmployeeDelete(emp_id){
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee/"+emp_id;
    var datavar = null;
    var method = 'DELETE';
    var cnf = confirm('Are you sure to remove the employee data?');
    if(cnf){
    apiCallBackAll(datavar,callingurl,method).then(function(data) {    // call promise
      var response = JSON.parse(data);
      $('#serv_resp').empty().append(response.status);
      $('#serv_msg').empty().append(response.message);
      setInterval(getAllEmployeeData(), 10000);
      }).catch(function(error) {   // if failed

      });
    }
  }

  

  // Javascript function from UI to call edit an employee data.
  function editEmployeeData(emp_id){
    var data = null;
    var callurl = 'http://52.87.171.80/sample_crud_rest/api/v1/employee/'+emp_id;
    var method= 'GET';
    apiCallBackAll(data,callurl,method).then(function(data) {    // call promise
      var response = JSON.parse(data);
      $("#myProgress").addClass("hidden");
      $("#emp_id").val(response.data['0'].emp_id);
      $("#emp_username").val(response.data['0'].emp_username);
      $("#emp_first_name").val(response.data['0'].emp_first_name);
      $("#emp_last_name").val(response.data['0'].emp_last_name);
      $("#emp_phone").val(response.data['0'].emp_phone);
      $("#emp_email").val(response.data['0'].emp_email);
      $("#emp_address").val(response.data['0'].emp_address);
      $("#emp_department").val(response.data['0'].emp_department);
      $("#emp_designation").val(response.data['0'].emp_designation);
      if(response.data['0'].emp_gender=='male'){
       $("#emp_gender_male").prop('checked', true);
     }else{
      $("#emp_gender_female").prop('checked', true); 
    }
    $("#myModal").modal('show');
        //setInterval(getAllEmployeeData(), 10000);
      }).catch(function(error) {   // if failed
       $("#myProgress").addClass("hidden");
      });
    }

  // Javascript function to call from UI to update an employee data.
  function updateEmployeeData() { 
    var data = {};
    data.emp_id = $('input[name=emp_id]').val();
    data.emp_username = $('input[name=emp_username]').val();
    data.emp_first_name  = $('input[name=emp_first_name]').val();
    data.emp_last_name  = $('input[name=emp_last_name]').val();
    data.emp_gender  = $('input[name=emp_gender]:checked').val();
    data.emp_email  = $('input[name=emp_email]').val();
    data.emp_phone  = $('input[name=emp_phone]').val();
    data.emp_address  = $('input[name=emp_address]').val();
    data.emp_designation  = $('input[name=emp_designation]').val();
    data.emp_department  = $("#emp_department option:selected").val();
    //$('input[name=emp_department]').val();

    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee/"+data.emp_id;
    var datavar = JSON.stringify(data);
    var method = 'PUT';
    if(data){ 
     apiCallBackAll(datavar,callingurl,method).then(function(data){
           //console.log(data);
           $("#myModal").modal('hide');
           $('#employeeResponse').empty();
           var response = JSON.parse(data);
           $("#myProgress").addClass("hidden");
           $('#serv_resp').empty().append(response.status);
           $('#serv_msg').empty().append(response.message);
           setInterval(getAllEmployeeData(), 10000);
           }).catch(function(error) {   // if failed
             $('#employeeResponse').empty();
             var response = JSON.parse(error);
             $("#myProgress").addClass("hidden");
             $('#serv_resp').empty().append(response.status);
             $('#serv_msg').empty().append(response.message);
             setInterval(getAllEmployeeData(), 10000);
           });
         }   
   }


//Function for loader bar
function move() {
  var elem = document.getElementById("myBar");   
  var width = 10;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

// Api for all PUT DELETE POST GET Request
/*function apiCallBackAll(data,callurl,method){
 return new Promise(function(resolve, reject) {
  var request = new XMLHttpRequest();
  request.open(method, callurl,true);
  request.setRequestHeader('Content-Type', 'application/json');
  $("#myProgress").removeClass("hidden");
  setInterval(move(), 100000);
  request.onload = function() {
    if (request.status == 200) {
          resolve(request.response);                 // we get the data here, so resolve the Promise
        } else {
          //alert(request.response);
          reject(request.response);                 // if status is not 200 OK, reject.
        }
      };

      request.onerror = function() {
        $("#myProgress").addClass("hidden");
        reject(request.response);             // error occurred, so reject the Promise
      };
      request.send(data); // send the request
    });
}*/


function apiCallBackAll(data,callurl,method){ 
 //return new Promise(function(resolve, reject) {
      const url = callurl;
      var request = new Request(url, {
            method: method, 
            //body: JSON.stringify(data), 
            mode: 'cors', 
            redirect: 'follow',
            headers: new Headers({
                    'Content-Type': 'application/json'
            })
        });
        //alert(request);
      fetch(request).then(function(response) {
        console.log(request.response);
        //resolve(response.json()); 
      }).catch(function(err) {
        console.log(err);
      });
    //});
}