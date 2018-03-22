// Calling function from UI action to retrive search data
function getEmployeeData() {
    var data = {};
    data.emp_first_name = $('#emp_first_name_ser').val();
    data.emp_last_name = $('#emp_last_name_ser').val();

    var callurl = 'http://52.87.171.80/sample_crud_rest/api/v1/employee?filter=emp_first_name=' + data.emp_first_name + ',emp_last_name=' + data.emp_last_name;
    var method = 'GET';
    var datavar = null;
    var flag = '0'; // Show loader
    $("#table").addClass("hidden");
    $('#serv_msg').addClass("hidden");
    $("#alert").addClass("hidden");
    $("#table").addClass("hidden");
    $("#alert").addClass("alert-success");
    if (data) { // if blank not input
        apiCallBackAll(datavar, callurl, method, flag).then(function(data) { // call promise
            $('#emp_id').empty();
            $('#employeeResponse').empty();
            var response = data;
            $('#serv_msg').removeClass("hidden");
            $('#serv_msg').empty().append(response.message);
            $('#empResp tbody').remove();
            $("#progressbar").addClass("hidden");
            $("#alert").removeClass("hidden");
            $("#alert").removeClass("alert-danger");
            $("#table").removeClass("hidden");
            $("#alert").addClass("alert-success");
            var trHTML = '';
            $.each(response.data, function(i, item) {
                trHTML += '<tbody><td scope="row">' + item.emp_id + '</td><td>' + item.emp_username + '</td><td>' + item.emp_first_name + '</td><td>' + item.emp_last_name + '</td><td>' + item.emp_gender + '</td><td>' + item.emp_phone + '</td><td>' + item.emp_email + '</td><td>' + item.emp_address + '</td><td>' + item.emp_designation + '</td><td>' + item.emp_department + '</td><td><button onclick="deleteEmployee(' + item.emp_id + ')" type="button" class="btn btn-default btn-sm"><i class="fa fa-close"></i></button>&nbsp;<button type="button" class="btn btn-default btn-sm"  onclick="showEditEmployeeModal(' + item.emp_id + ')"><i class="fa fa-edit"></i></button></td></tr></tbody>';
            });
            $('#empResp').append(trHTML);
        }).catch(function(error) { // if failed
            $('#employeeResponse').empty();
            var response = error;
            $('#serv_msg').removeClass("hidden");
            $('#serv_msg').empty().append(response.message);
            $("#progressbar").addClass("hidden");
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
    data.emp_username = $('#emp_username_add').val();
    data.emp_first_name = $('#emp_first_name_add').val();
    data.emp_last_name = $('#emp_last_name_add').val();
    data.emp_gender = $('#emp_gender_add:checked').val();
    data.emp_email = $('#emp_email_add').val();
    data.emp_phone = $('#emp_phone_add').val();
    data.emp_address = $('#emp_address_add').val();
    data.emp_designation = $('#emp_designation_add').val();
    data.emp_department = $("#emp_department_add option:selected").val();
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee";
    var datavar = JSON.stringify(data);
    var method = 'POST';
    var flag = '0'; // Dot not show loader
    $("#addEmployeeModal").modal('hide');
    $("#table").addClass("hidden");
    $('#serv_msg').addClass("hidden");
    $("#alert").addClass("hidden");
    $("#table").addClass("hidden");
    $("#alert").addClass("alert-success");
    if (data) {
        $('#addEmployeeData')[0].reset();

        apiCallBackAll(datavar, callingurl, method, flag).then(function(data) {
            $("#addEmployeeModal").modal('hide');
            $('#employeeResponse').empty();
            var response = data;
            $('#serv_msg').removeClass("hidden");
            $('#serv_msg').empty().append(response.message);
            $('#empResp tbody').remove();
            $("#progressbar").addClass("hidden");
            $("#alert").removeClass("hidden");
            $("#alert").removeClass("alert-danger");
            $('#addEmployeeData').trigger("reset");
        }).catch(function(error) { // if failed
            $("#addEmployeeModal").modal('hide');
            $('#employeeResponse').empty();
            var response = error
            $('#serv_msg').removeClass("hidden");
            $('#serv_msg').empty().append(response.message);
            $("#progressbar").addClass("hidden");
            $("#alert").removeClass("hidden");
            $("#alert").removeClass("alert-success");
            $("#alert").addClass("alert-danger");
            $("#table").addClass("hidden");
        });
    }
}



// Calling function from UI action for to get all employee data
function getAllEmployeeData() {
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee";
    var datavar = null;
    var method = 'GET';
    $("#table").addClass("hidden");
    $('#serv_msg').addClass("hidden");
    $("#alert").addClass("hidden");
    $("#table").addClass("hidden");
    $("#alert").addClass("alert-success");
    var flag = '0'; // Show loader
    apiCallBackAll(datavar, callingurl, method, flag).then(function(data) { // call promise
        $('#employeeResponse')
        var response = data;
        $('#serv_msg').empty().removeClass("hidden").append(response.message);
        $("#progressbar").addClass("hidden");
        $('#empResp tbody').remove();
        $("#alert").removeClass("hidden");
        $("#alert").removeClass("alert-danger");
        $("#table").removeClass("hidden");
        $("#alert").addClass("alert-success");
        var trHTML = '';
        $.each(response.data, function(i, item) {
            trHTML += '<tbody><td scope="row">' + item.emp_id + '</td><td>' + item.emp_username + '</td><td>' + item.emp_first_name + '</td><td>' + item.emp_last_name + '</td><td>' + item.emp_gender + '</td><td>' + item.emp_phone + '</td><td>' + item.emp_email + '</td><td>' + item.emp_address + '</td><td>' + item.emp_designation + '</td><td>' + item.emp_department + '</td><td><button onclick="deleteEmployee(' + item.emp_id + ')" type="button" class="btn btn-default btn-sm"><i class="fa fa-close"></i></button>&nbsp;<button type="button" class="btn btn-default btn-sm"  onclick="showEditEmployeeModal(' + item.emp_id + ')"><i class="fa fa-edit"></i></button></td></tr></tbody>';
        });
        $('#empResp').append(trHTML);
    }).catch(function(error) { // if failed

    });
}



// Calling function from UI action for to get an employee data for delete
function deleteEmployee(emp_id) {
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee/" + emp_id;
    var datavar = null;
    var method = 'DELETE';
    var flag = '0'; // Dot not show loader
    $("#table").addClass("hidden");
    $('#serv_msg').addClass("hidden");
    $("#alert").addClass("hidden");
    $("#table").addClass("hidden");
    $("#alert").addClass("alert-success");
    var cnf = confirm('Are you sure to remove the employee data?');
    if (cnf) {
        apiCallBackAll(datavar, callingurl, method, flag).then(function(data) { // call promise
            var response = data;
            $('#serv_msg').empty().removeClass("hidden").append(response.message);
            $("#progressbar").addClass("hidden");
            $('#empResp tbody').remove();
            $("#alert").removeClass("hidden");
            $("#alert").removeClass("alert-danger");
            $("#table").addClass("hidden");
            $("#alert").addClass("alert-success");
        }).catch(function(error) { // if failed

        });
    }
}



// Javascript function from UI to call edit an employee data.
function showEditEmployeeModal(emp_id) {
    var data = null;
    var callurl = 'http://52.87.171.80/sample_crud_rest/api/v1/employee/' + emp_id;
    var method = 'GET';
    var flag = '1'; // Dot not show loader
    $("#table").addClass("hidden");
    $('#serv_msg').addClass("hidden");
    $("#alert").addClass("hidden");
    $("#table").addClass("hidden");
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
        $("#updateEmployeeModal").modal('show');
    }).catch(function(error) { // if failed
        $("#progressbar").addClass("hidden");
    });
}

// Javascript function to call from UI to update an employee data.
function updateEmployeeData() {
    var data = {};
    data.emp_id = $('#emp_id').val();
    data.emp_username = $('#emp_username').val();
    data.emp_first_name = $('#emp_first_name').val();
    data.emp_last_name = $('#emp_last_name').val();
    data.emp_gender = $('input[name=emp_gender]:checked').val(); 
    data.emp_email = $('#emp_email').val();
    data.emp_phone = $('#emp_phone').val();
    data.emp_address = $('#emp_address').val();
    data.emp_designation = $('#emp_designation').val();
    data.emp_department = $("#emp_department option:selected").val();
    $("#updateEmployeeModal").modal('hide');
    var callingurl = "http://52.87.171.80/sample_crud_rest/api/v1/employee/" + data.emp_id;
    var datavar = JSON.stringify(data);
    var method = 'PUT';
    var flag = '1'; // Dot not show loader

    $("#table").addClass("hidden");
    $('#serv_msg').addClass("hidden");
    $("#alert").addClass("hidden");
    $("#table").addClass("hidden");

    if (data) {
        apiCallBackAll(datavar, callingurl, method, flag).then(function(data) {
            $('#employeeResponse').empty();
            var response = data;
            $('#serv_msg').empty().removeClass("hidden").append(response.message);
            $("#progressbar").addClass("hidden");
            $('#empResp tbody').remove();
            $("#alert").removeClass("hidden");
            $("#alert").removeClass("alert-danger");
            $("#table").addClass("hidden");
            $("#alert").addClass("alert-success");
        }).catch(function(error) { // if failed
            $('#employeeResponse').empty();
            var response = error;
            $('#serv_msg').empty().removeClass("hidden").append(response.message);
            $("#progressbar").addClass("hidden");
            $('#empResp tbody').remove();
            $("#alert").removeClass("hidden");
            $("#alert").removeClass("alert-success");
            $("#alert").addClass("alert-danger");
            $("#table").addClass("hidden");
        });
    }
}


//Function for loader bar
function showLoadingAnimation() {
    $("#progressbar").removeClass("hidden");
    $(function() {
        var progressbar = $("#progressbar"),
        progressLabel = $(".progress-label");

        progressbar.progressbar({
            value: true,
            change: function() {
                if (parseInt(progressbar.progressbar("value")) <= 30) {
                    progressLabel.text("Calling API...");
                } else if (parseInt(progressbar.progressbar("value")) > 30 && parseInt(progressbar.progressbar("value")) < 70) {
                    progressLabel.text("Fetching Data...");
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

            if (val < 99) {
                setTimeout(progress, 80);
            }
        }

        setTimeout(progress, 2000);
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
                        }, 6000);
                    } else {
                        window.setTimeout(function() {
                            $("#progressbar").addClass("hidden")
                            reject(data)
                        }, 6000);
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
                    }, 6000);
                } else {
                    reject(error)
                }
            });
    });
}
