
// Calling function from UI action to retrive search data
function getEmployeeData() {
    var data = {};
    data.emp_first_name = $('#emp_first_name_ser').val();
    data.emp_last_name = $('#emp_last_name_ser').val();

    var callurl = 'http://52.87.171.80/sample_crud_rest/api/v1/employee?filter=emp_first_name=' + data.emp_first_name + ',emp_last_name=' + data.emp_last_name;
    var method = 'GET';
    var datavar = null;
    var flag = '0'; // Show loader
    showHideMessage();
    if (data) { // if blank not input
     apiCallBackAll(datavar, callurl, method, flag).then(function(data) { // call promise
        var response = data;
        showHideMessageResponseSuccess();
        $('#serv_msg').empty().append(response.message);
        var trHTML = '';
        $.each(response.data, function(i, item) {
            trHTML += '<tbody><td>' + item.emp_username + '</td><td>' + item.emp_first_name +' '+' ' +'' + item.emp_last_name + '</td><td>' + item.emp_phone + '</td><td>' + item.emp_email + '</td><td>' + item.emp_address + '</td><td>' + item.emp_designation + '</td><td>' + item.emp_department + '</td><td><button onclick="deleteEmployee(' + item.emp_id + ')" type="button" class="btn btn-default btn-sm" title="Delete Data"><i class="fa fa-close"></i></button>&nbsp;<button type="button" class="btn btn-default btn-sm"  onclick="showEditEmployeeModal(' + item.emp_id + ')" title="Edit Data"><i class="fa fa-edit"></i></button></td></tr></tbody>';
        });
        $('#empResp').append(trHTML);
        positionPage();
        }).catch(function(error) { // if failed
        var response = error;
        showHideMessageResponseError();
        $('#serv_msg').empty().append(response.message);
        positionPage();
        });
    }
}


// Calling function from UI action for add employee data
function getAddUpdataEmployeeData() {
    var data = {};
    data.emp_username = $('#emp_username').val();
    data.emp_first_name = $('#emp_first_name').val();
    data.emp_last_name = $('#emp_last_name').val();
    data.emp_gender = $('input[name=emp_gender]:checked').val();
    data.emp_email = $('#emp_email').val();
    data.emp_phone = $('#emp_phone').val();
    data.emp_address = $('#emp_address').val();
    data.emp_designation = $('#emp_designation').val();
    data.emp_department = $("#emp_department option:selected").val();

    if ($('#emp_id').val() != '') {
        data.emp_id = $('#emp_id').val();
        var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee/" + data.emp_id;
        var method = 'PUT';
    } else {
        var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee";
        var method = 'POST';
         
    }

    var flag = '0'; // Show loader  
    var datavar = JSON.stringify(data);
    $("#getAddUpdataEmployeeDataModal").modal('hide');
    
    if (data) {
        showHideMessage();
        $('#getAddUpdataEmployeeData')[0].reset();
        apiCallBackAll(datavar, callingurl, method, flag).then(function(data) {
        var response = data;
        $("#getAddUpdataEmployeeDataModal").modal('hide');
        $('#serv_msg').empty().append(response.message);
        $('#getAddUpdataEmployeeData').trigger("reset");
        showHideMessageResponseSuccess();     
        $("#table").addClass("hidden");
        positionPage();
        }).catch(function(error) { // if failed
        var response = error
        $("#getAddUpdataEmployeeDataModal").modal('hide');
        showHideMessageResponseError();
        $('#serv_msg').empty().append(response.message);
        positionPage();
        });
    }
}

// Javascript function from UI to load edit modal on UI.
function showEditEmployeeModal(emp_id) {
    var data = null;
    var callurl = 'http://52.87.171.80/sample_crud_rest/api/v1/employee/' + emp_id;
    var method = 'GET';
    var flag = '1'; // Dot not show loader
    $("#alert").addClass("hidden");
    
     apiCallBackAll(data, callurl, method, flag).then(function(data) { // call promise
        var response = data;
        $("#progressbar").addClass("hidden");
        $("#emp_id").val(response.data['0'].emp_id);
        $("#emp_username").val(response.data['0'].emp_username);
        $("#emp_first_name").val(response.data['0'].emp_first_name);
        $("#emp_last_name").val(response.data['0'].emp_last_name);
        $("#emp_phone").val(response.data['0'].emp_phone);
        $("#emp_email").val(response.data['0'].emp_email);
        $("#emp_address").val(response.data['0'].emp_address);
        $("#emp_department").val(response.data['0'].emp_department);
        $("#emp_designation").val(response.data['0'].emp_designation);
        if (response.data['0'].emp_gender == 'male') {
            $("#emp_gender_male").prop('checked', true);
        } else {
            $("#emp_gender_female").prop('checked', true);
        }
        $("#getAddUpdataEmployeeDataModal").modal('show');
        positionPage();
    }).catch(function(error) { // if failed
        $("#progressbar").addClass("hidden");
        positionPage();
    });
}

// Calling function from UI action for to get all employee data
function getAllEmployeeData() {
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee";
    var datavar = null;
    var method = 'GET';
    showHideMessage();
    var flag = '0'; // Show loader
     apiCallBackAll(datavar, callingurl, method, flag).then(function(data) { // call promise
        var response = data;
        $('#serv_msg').empty().removeClass("hidden").append(response.message);
        $("#progressbar").addClass("hidden");
        showHideMessageResponseSuccess();
        var trHTML = '';
        $.each(response.data, function(i, item) {
            trHTML += '<tbody><td>' + item.emp_username + '</td><td>' + item.emp_first_name +' '+' ' +'' + item.emp_last_name + '</td><td>' + item.emp_phone + '</td><td>' + item.emp_email + '</td><td>' + item.emp_address + '</td><td>' + item.emp_designation + '</td><td>' + item.emp_department + '</td><td><button onclick="deleteEmployee(' + item.emp_id + ')" type="button" class="btn btn-default btn-sm" title="Delete Data"><i class="fa fa-close"></i></button>&nbsp;<button type="button" class="btn btn-default btn-sm"  onclick="showEditEmployeeModal(' + item.emp_id + ')" title="Edit Data"><i class="fa fa-edit"></i></button></td></tr></tbody>';
        });
        $('#empResp').append(trHTML);
        positionPage();
    }).catch(function(error) { // if failed

    });
}


// Calling function from UI action for to get an employee data for delete
function deleteEmployee(emp_id) {
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee/" + emp_id;
    var datavar = null;
    var method = 'DELETE';
    var flag = '0'; // Show loader
    
    var cnf = confirm('Are you sure to remove the employee data?');
    if (cnf) {
     showHideMessage();
     apiCallBackAll(datavar, callingurl, method, flag).then(function(data) { // call promise
        var response = data;
        $('#serv_msg').empty().removeClass("hidden").append(response.message);
        showHideMessageResponseSuccess();
        $("#table").addClass("hidden");
        positionPage();
        }).catch(function(error) { // if failed
     });
   }
}


//Function for loader bar
function showLoadingAnimation() {
    $(function() {
     var progressbar = $("#progressbar"),
     progressLabel = $(".progress-label");
        progressbar.progressbar({
            value: true,
            change: function() {
                if (parseInt(progressbar.progressbar("value")) <= 10) {
                    progressLabel.text("Calling API...");
                } else if (parseInt(progressbar.progressbar("value")) > 10 && parseInt(progressbar.progressbar("value")) < 20) {
                    progressLabel.text("Getting Response...");
                } else {
                    progressLabel.text(progressbar.progressbar("value") + "%");
                }
            },
            complete: function() {
                progressLabel.text("Complete!");
            }
        });

        function progress() {
            var val = progressbar.progressbar("value") || 0;
            progressbar.progressbar("value", val + 2);
            if (val < 30) {
                setTimeout(progress, Math.floor((Math.random() * 600) + 1));
            }else if (val > 30 && val < 60) {
                setTimeout(progress, Math.floor((Math.random() * 300) + 1));
            }else{
                setTimeout(progress, Math.floor((Math.random() * 600) + 1));
            }
        }
        setTimeout(progress, 1000);
    });
}

// Api for all PUT DELETE POST GET Request
function apiCallBackAll(data, callurl, method, flag) { 
    return new Promise(function(resolve, reject) {
        const url = callurl;
        var request = new Request(url, {
            method: method,
            body: data,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
            .then((resp) => resp.json())
            .then(showLoadingAnimation())
            .then(function(data) {
                if (flag == 0) {
                    if (data.status == 'success') {
                        window.setTimeout(function() {
                            $("#progressbar").addClass("hidden")
                            resolve(data)
                        }, 10000);
                    } else {
                        window.setTimeout(function() {
                            $("#progressbar").addClass("hidden")
                            reject(data)
                        }, 10000);
                    }
                } else {
                    if (data.status == 'success') {
                        resolve(data)
                    } else {
                        reject(data)
                    }
                }

            })
            .catch(function(error) {
                if ($flag == 0) {
                    window.setTimeout(function() {
                        $("#progressbar").addClass("hidden")
                        reject(error)
                    }, 10000);
                } else {
                    reject(error)
                }
            });
    });
}

// common message
function showHideMessage(){
  $("#progressbar").removeClass("hidden");
  $("#table").addClass("hidden");
  $('#serv_msg').addClass("hidden");
  $("#alert").addClass("hidden");
  $("#table").addClass("hidden");
  $("#alert").addClass("alert-success");
}

// Massage success response
function showHideMessageResponseSuccess(){
  $('#emp_id').empty();
  $('#progressbar').removeClass("hidden");
  $('#employeeResponse').empty();
  $('#serv_msg').removeClass("hidden");
  $('#empResp tbody').remove();
  $("#progressbar").addClass("hidden");
  $("#alert").removeClass("hidden");
  $("#alert").removeClass("alert-danger");
  $("#table").removeClass("hidden");
  $("#alert").addClass("alert-success");
}

// Massage error response
function showHideMessageResponseError(){
  $('#employeeResponse').empty();
  $('#serv_msg').removeClass("hidden");
  $("#progressbar").addClass("hidden");
  $("#alert").removeClass("alert-success");
  $("#alert").addClass("alert-danger");
  $("#table").addClass("hidden");
  $("#alert").removeClass("hidden");
}

// Clear form data
function clearModalData(){
 $('#getAddUpdataEmployeeData').trigger("reset");
 $("#getAddUpdataEmployeeData")[0].reset();
 $("input[type=hidden]").val('');
}

function positionPage(){
  $('html, body').animate({
        scrollTop: $('#showResponseArea').offset().top
    }, 'slow');
}