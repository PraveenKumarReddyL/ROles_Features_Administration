//******************************************************************************
//********************* Declaration Section     ********************************
//******************************************************************************
var dialog, table;
var api_token = $('#api_token').val();
var ipramana_service = $('#internal_server').val();
//******************************************************************************
//********************* Initialization Section     *****************************
//******************************************************************************
//*******    Initializing datatable for eligibility tests details          ************
var dtEligibilityTestsData = $('#eligibilitytestList').DataTable({
    "dom": '<f>t<ip>',
    "scrollCollapse": true,
    "lengthMenu": [[5], [5]],
    "columns":
        [
            {
                "targets": [0],
                "width": "15px",
                
            },
            {
                "targets": [1],
                
            },
            {
                "targets": [2]
                
            },
            {
                "targets": [2],
                "visible":false
            },
            
        ],
    columnDefs: [{

        orderable: false,
        targets: 0
    },
    {
        'render': function (data, type, full, met3a) {
            return '<input type="checkbox" class="eligibilitytestmanage" value="'+ data +'"/>';
        },
        targets: [0]
    },
    ],
    "language":
    {
        "emptyTable": "No data found to display",
        "processing": "Loading data... please wait",
        "loadingRecords": "Loading data... please wait"
    },
    "infoEmpty": "",
    "loadingRecords": true,
    "processing": true,
    "serverSide": false
});
//Add Features Model Window
var roleDialog = $("#dialog_form").dialog({
    autoOpen: false,
    height: 330,
    resizable: false,
    width: 680,
    modal: true,
    close: function () {
        var controlToLoad = $("#feature_dropdown");
        controlToLoad.empty().append($('')            
            .html('')            
            
        );
        roleDialog.dialog("close");        
    }
});
//******************************************************************************
//***************************Event Handlers                              *******
//******************************************************************************
readEligibilityTestData();
 var checked_item=[],value1;//array and variable declaration
$('#eligibilitytestList tbody').on('click', '.eligibilitytestmanage', function () {  
    value1 = $(this).val();  // current selected check box value
    var blnChecked = $(this).prop('checked');//check box is selected or not
    $(this).prop('checked', blnChecked);
    if(blnChecked){
        $("#add").prop("disabled", true);//disable add
        checked_item.push(value1);
        console.log('checked');
    }
    else{
        value1 = $(this).val();  
        console.log("unchecked");
        checked_item.splice( $.inArray(value1,checked_item) ,1 );  //remove the unchecked element from array  
    }
    console.log(checked_item);//display array
    //if array is empty 
    if(checked_item.length == 0){
        // alert("empty array")
        $("#delete").prop("disabled", true);
        $("#add").prop("disabled", false);//activate add button
    }
    //findout the all Role_IDs are same or not in array
    Array.prototype.allValuesSame = function() {

        for(var i = 1; i < this.length; i++)
        {
            if(this[i] !== this[0])
                return false;
        }
    
        return true;
    }
    var b = checked_item.allValuesSame(); 
    console.log(b)
    if(b==false){
        $("#delete").prop("disabled", true);//if you checked different Role_Ids , deactivate delete button
    }else{
        $("#delete").prop("disabled", false);//if you checked same Role_Ids , activate delete button
    }
     var blnChecked = $(this).prop('checked');
     $(this).prop('checked', blnChecked);
    var currentRow = $(this).parents('tr');
    if (blnChecked) {
        // $("#delete").prop("disabled", false);//when any row is checked , delete button is active
        // $("#add").prop("disabled", true);//add button is inactive when any row is checked.
        currentRow.addClass('selected'); //set the current row
        testListId = dtEligibilityTestsData.row('.selected').data()[6];
    } else {
        // $("#add").prop("disabled", false);//add button is active when no rows is checked .
        // $("#delete").prop("disabled", true);//delete button is inactive when no row is checked
        currentRow.removeClass('selected'); //unset the current row
        
    }
});
$('#approveregrequest-select-all').on('click', function (event) {
    // Check/uncheck all checkboxes in the table

    var rows = dtApproveRegistrationRequest.rows({ 'search': 'applied' }).nodes();
    $('input[type="checkbox"]', rows).prop('checked', this.checked);
    if (this.checked) {

        $('#approveregrequest tbody tr').addClass('selected');
    } else {
        $('#approveregrequest tbody tr').removeClass('selected');
    }
    event.stopPropagation();
});
//********     Row Highlighting Approve Reg Request table                       **********
$('#approveregrequest tbody')
    .on('mouseenter', 'td', function () {
        $(this).parent('tr').addClass('highlight');
    })
    .on('mouseleave', 'td', function () {
        $(this).parent('tr').removeClass('highlight');
    });
//********     Approve Reg Request selection (row click event)                  **********
$("#approveregrequest tbody").on('click', 'tr', function (event) {
    $(this).find('input[type="checkbox"]').trigger('click');
    event.stopPropagation();
})
//********     Approve Reg Request selection (checkbox click event)             **********
$('#approveregrequest tbody').on('click', '.approve_request_checkbox', function (event) {
    var checkboxes = $('.approve_request_checkbox');
    var checkedCount = $('.approve_request_checkbox:checked').length;
    $('#approveregrequest-select-all').prop("checked", checkedCount > 0);
    $('#approveregrequest-select-all').prop("indeterminate", checkedCount > 0 && checkedCount < checkboxes.length);
    if (!this.checked) {
        $(this).parents('tr').removeClass('selected');
    } else {
        $(this).closest('tr').addClass('selected');
    }
    event.stopPropagation();
});

$('#eligibilitytestList-select-all').on('click', function () {   
    // Check/uncheck all checkboxes in the table
    
    var rows = dtEligibilityTestsData.rows({ 'search': 'applied' }).nodes();
    
    $('input[type="checkbox"]', rows).prop('checked', this.checked);
    if (this.checked) {
        $('#eligibilitytestList tbody tr').addClass('selected');
        $("#delete").prop("disabled", true);//activate the delete button when one row is checked or all rows are checked
        $("#add").prop("disabled", true);//add button activate when all checked or one checked box
    } else {
        $("#add").prop("disabled", false);//add button is disabled when all or none is unchecked
        $("#delete").prop("disabled", true);//activate delete button when all rows are unchecked
        $('#eligibilitytestList tbody tr').removeClass('selected');
    }

});
//click on add button
$('#add').on('click', function () {
    var ajaxCall2 = $.ajax({
        type: 'GET',
        url: ipramana_service + 'Rolesdata',
        format: "json"
    });
    
    $.when(ajaxCall2)
        .then(loadRolesData);

     roleDialog.dialog("open");
   
});
//clear the selected feature dropdown when click on * button of model window.
$('button').on('click', function () {  
    $('#feature_dropdown').val('');   
});
//clear the selected  feature dropdown when click on cancel button of model window 
$('#cancel').on('click', function () {  
    var controlToLoad = $("#feature_dropdown");
    controlToLoad.empty().append($('')            
        .html('')            
    );
    roleDialog.dialog("close");
});

$('#delete').on('click', function () {
    		WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";  
                var check = confirm(WRN_PROFILE_DELETE); 
                if(check == true){        
                            deleteEligibilityTestData();
                }
})
//getting  un-assigned features for the selected Role in features dropdown list.
$("#Roles").on("change", function(){ 
 var value=$(this).val(); //selected role data(String format)
 var ajaxCall3 = $.ajax({
    type: 'GET',
    url: ipramana_service + "Role/"+value+"/Feature",
    format: "json"
});
$.when(ajaxCall3)
        .then(loadfeatures, showAJAXError);
})
$("#reset").on("click", function () {
    if (confirm('Are you sure you want to reset the data?')) {
        resetData();
    }
});
// save assign features to roles into feature_roles table
$('#save').on('click', function () {
    saveEligibilityTestData();
});

//get Role Id value 
function getIdValue(tableData, roleName){
    var getid;
    $.each(tableData, function (i, data) {//roles are looping
        if(roleName === data.name){
             getid = data.id;
        }
    });
    return getid;
}

// // getFeatureIdValue
function getFeatureIdValue(tableData, roleName){
    var getfeatureid;
    $.each(tableData, function (i, data) {//roles are looping
        $.each(data.features, function(i, val){//features are looping
            if(roleName === val.name){
                getfeatureid = val.id;
           }
        });
        
    });
    return getfeatureid;
}
//delete feature roles 
function deleteEligibilityTestData() {
    // console.log("tableData",tableData);  
    //Get the id the selected row to be deleted
    var strtype,objRequestData,feature_ids_array=[],strtype = 'POST';        
        objRequestData = {
        "api_token": api_token,
        "data": [{
            "feature_id":[]          
          }]
        }
    $('#eligibilitytestList').find("tr.selected").each(function () {
        if ($(this).find('td').length > 0) {                            
            feature_ids_array.push(getFeatureIdValue(tableData,$(this).find('td:nth-child(3)').html()))
            objRequestData.role_id = getIdValue(tableData, $(this).find('td:nth-child(2)').html());               
        }        
    });
    objRequestData['data'][0].feature_id=feature_ids_array;
    console.log(objRequestData);
    $.ajax({
        type: strtype,
        url: ipramana_service + 'Roles/Features/Delete',        
        data: objRequestData,
        success: function (objResponseData) {                        
            dtEligibilityTestsData.clear();
            // console.log(objRequestData)
            dtEligibilityTestsData.draw(false);                        
            readEligibilityTestData();
        },
        error: showAJAXError
    });
}
//we get the data from database after loading the page
var tableData;
function loadEligibilityTestData(objResponseData) {  
    checked_item=[];
    tableData = objResponseData.data;
    dtEligibilityTestsData.clear().draw();
    $("#delete").prop("disabled", true);//after page loading loading the delete button is in inactive state.
    $("#add").prop("disabled", false);//after page loading loading the add button is in active state.    
    $.each(objResponseData.data, function (i, data) {//roles are looping                
        $.each(data.features, function(i, val){//features are looping
            dtEligibilityTestsData.row.add([                
                 data.id,                         
                 data.name,//display roles                            
                 val.name, //display features
                 ""
             ]).draw(false);
        });        
    }); 
    // console.log("objResponseData.data",objResponseData.data);
}
//roles dropdown list 
function loadRolesData(objResponseData1){    
    if (objResponseData1.errors) {
        showErrors(objResponseData1.errors);
    } else {
        var controlToLoad = $("#Roles");
        controlToLoad.empty().append($('<option></option>')            
            .html('Select from list')            
        );
        $.each(objResponseData1.data, function (i, data) {            
            controlToLoad.append($('<option value='+data.id+'></option>')                
                .html(data.name)        
         );        
        });        
    }    
}

//function for load the data from database
function readEligibilityTestData() {
    var strtype, objRequestData;
    strtype = 'GET';
    // objRequestData = {
    //     'api_token': api_token
    // };
    $.ajax({
        type: strtype,
        data: objRequestData,
        url: ipramana_service + 'Roles/Features',
        success: function (objResponseData) {            
            loadEligibilityTestData(objResponseData);
        },
        error: showAJAXError
    });
}
//************ set Roles&Features as empty    *************
function resetData() {
     var controlToLoad = $("#feature_dropdown");
        controlToLoad.empty().append($('')            
            .html('') 
        )
        var controlToLoad = $("#Roles");
        controlToLoad.empty().append($('')            
            .html('') 
        )
            var ajaxCall2 = $.ajax({
                type: 'GET',
                url: ipramana_service + 'Rolesdata',
                format: "json"
            });
            
            $.when(ajaxCall2)
                .then(loadRolesData);
        
             roleDialog.dialog("open");
           
        
        

}
//*********** insert features assign to roles stored  into the database                 ***************
function saveEligibilityTestData() {    
    var strtype, objRequestData;
    strtype = 'POST';
    objRequestData = {
        'api_token': api_token,
        "data": [
            {
                "role_id": $("#Roles").val(),
                "feature_id": $("#feature_dropdown").val(),

            }]
    };    
    $.ajax({            
        type: strtype,        
        url: ipramana_service + 'Roles/Features',
        data: objRequestData,                
        success: function (objResponseData) {     
            alert("Your Selected items Sucessfully Submited");                                            
            roleDialog.dialog("close");            
            readEligibilityTestData();
        },
        error: showAJAXError
    });
}
//features dropdown  of model window.
function loadfeatures(objResponseData1){
    if (objResponseData1.errors) {
        showErrors(objResponseData1.errors);
    } else {        
        var controlToLoad = $("#feature_dropdown");
        controlToLoad.empty().append($('<option></option>'));
        $.each(objResponseData1.data, function (i, data) {
            if(data.parent==null){

            controlToLoad.append($('<option value='+data.id+'></option>'))                
                .html(data.name)                                 
            }
            else{
                controlToLoad.append($('<option value='+data.id+'></option>')                
                .html(data.parent.name+" --> "+data.name));
        }
        });
        
    }

}
