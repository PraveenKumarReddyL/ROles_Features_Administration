@extends('layouts.master')
@section('content')
<!-- <h2 class="demoHeaders" id="lbl_manage_eligibility_tests">@lang('labels.manageeligibilitytests.lbl_manage_eligibility_tests')</h2> -->
<input type="hidden" id="scriptfile" value="feature_roles"/>
<div id="accordion" class="frame_out_new  new_marg_top left w-100">
<h2 id="lbl_feature_role">@lang('labels.feature_roles.lbl_feature_role')</h2> 
    <!--List of Assessment-->
    <div id="eligibilitytestList_div">
        <!--<input type="hidden" id="colg_id" value=""/>-->
        <input type="hidden" id="assessment_id" value="{{(isset($request['assessment_id']))?$request['assessment_id']:''}}">
        <input type="hidden" id="organization_id" placeholder="org_id" value="">
        <table id="eligibilitytestList">
            <thead>
                <tr class="table_head">
                    <th><input type="checkbox" name="select_all" value="" id="eligibilitytestList-select-all"/></th>
                    <!-- <th>ID</th> -->
                    <th>Role Names</th>
                    <th>Features</th>                    
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <table>
            <tr>
                <td>
                    <input type="button" id="add" class="addn" value="Add"/>
                    <input type="button" class="deleten" id='delete' value="Delete" disabled/>

                </td>
            </tr>
        </table>
    </div> 

    <!--Modal dialog box for Assign/Modify Evaluator-->
    <div id="dialog_form" title="Add Features">
        <div class="test-assign-div">
            <table id="test-assign">
                <tr>
                    <td>
                        <div class="my-input-group" id="college_name_grp">
                            <select id="Roles"  required>
                            </select>
                            <label id="lbl_name1">@lang('labels.features_roles.lbl_name1')</label><i class="fa"> </i>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <div class="my-input-group  features" multipleid="department_grp">                            
                            <select id="feature_dropdown"  style="height:150px  !important;width: 200%;" multiple required>                            
                            </select>         
                            <label  id="lbl_name2">@lang('labels.features_roles.lbl_name2')</label><i class="fa"> </i>
                        </div>
                    </td>                    
                </tr>                
            </table>
                    <div style="margin: 17px 68px 23px 131px;">
                        <input  type="button" id="reset" class="resetn" value="Reset"/>
                        <input type="button" id="save" class="saven" value="Save"/>
                        <input type="button" id="cancel" class="closen" value="Cancel"/>            
                    </div>
        </div>
    </div>
    
</div>  
@endsection