/**
 * Created by yifan on 17-7-4.
 */
Ext.define('reflectDemo.controller.main', {
    extend: 'Ext.app.Controller',
    stores: ['main'],
    models: ['main'],
    views: [
        'Viewport',
        'main.Search',
        'main.List'
    ],
    init: function () {
        this.control({
            'reflectDemoSearch button[action = query]': {
                click: this.mainQuery
            },
            'reflectDemoGrid button[action = dto]':{
                click: this.dto
            }
        });
    },
    mainQuery:function (btn) {

        //主查询表单
        var queryForm = btn.up('form');

        //主查询结果
        var mainGrid = queryForm.up().down('grid');
        mainGrid.getStore().setQueryForm(queryForm);
        mainGrid.getPagingToolbar().moveFirst();
    },
    getSelected:function(btn){
        var mainGrid = btn.up('grid');
        var selections = mainGrid.getSelectionModel().getSelection();
        return selections;
    },
    dto:function(btn){
        var me = this;

        var queryForm = btn.up('grid').up().down('form');
        var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());
        var dtoClassName = formData.get('dtoClassName');
        var packageName = formData.get('packageName');


        /*
        if(Ext.isEmpty(packageName)){
            me.showErrorMsg('请填写包名');
            return;
        }
        */


        if(Ext.isEmpty(dtoClassName)){
           me.showErrorMsg('请填写 Dto 类名');
           return;
        }

        var selections = this.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请选择字段后再操作！');
            return;
        }

        var metaInfoObjArr = [];
        selections.forEach(function(curObj) {
            var curData = curObj.data;
            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);
            curRemark = Ext.util.Format.trim(curRemark);

            var curTypeName = me.parseDbTypeToJava(curData);

            metaInfoObjArr.push({
                columnName : curColumnName,
                upperColumnName : me.firstUpper(curColumnName),
                typeName : curTypeName,
                remark : curRemark,
                oldRemark : curData['remark']
            });
        });


        var url = '../ext/dto';
        var params = {
            'columnMetaInfoDtoList':metaInfoObjArr,
            'dtoClassName':dtoClassName,
            'packageName':packageName
        };
        var context = btn.up('grid');
        me.requestAjax(url,params,context,function(result){
            me.showScriptStr('Dto',result);
        },btn);

    },
    showErrorMsg:function(msg){
        Ext.Msg.show({
            title:'提示',
            msg:msg
        });
    },
    requestAjax:function(url,params,context,callback,btn){
        var me = this;

        Ext.Ajax.request({
            url:url,
            method:'POST',
            jsonData:params,
            timeout:5000,
            success: function(response,options){
                if(!Ext.isEmpty(callback)){
                    callback.apply(context,[response.responseText]);
                }

            },
            failure: function(response,options){
                var result = response.responseText;
                Ext.Msg.hide();
                if(!Ext.isEmpty(btn)){
                    btn.setDisabled(false);
                }

                if (Ext.isEmpty(result)) {
                    me.showErrorMsg('请求超时');
                } else {
                    var message = response.message;
                    me.showErrorMsg(message);
                }
            }
        });

    },
    dealRemark:function(curRemark){
        var realRemark = curRemark.indexOf('\n') == -1 ? curRemark : curRemark.substring(0,curRemark.indexOf('\n'));
        return Ext.util.Format.trim(realRemark);
    },
    firstLower:function(curColumnName){
        var str = curColumnName.substring(0,1).toLocaleLowerCase() + curColumnName.substring(1,curColumnName.length);
        return str;
    },
    firstUpper:function(curColumnName){
        var str = curColumnName.substring(0,1).toLocaleUpperCase() + curColumnName.substring(1,curColumnName.length);
        return str;
    },
    parseDbTypeToJava:function(curData){
        var javaType = null;
        switch (curData['typeName']){
            case 'VARCHAR' :
                javaType = 'String';
                break;
            case 'CHAR':
                javaType = 'String';
                break;
            case 'TEXT':
                javaType = 'String';
                break;
            case 'DATETIME':
                javaType = 'Date';
                break;
            case 'FLOAT':
                javaType = 'float';
                break;
            case 'DECIMAL':
                javaType = 'BigDecimal';
                break;
            case 'BIGINT':
                javaType = 'BigInteger';
                break;
            case 'INT':
                javaType = 'int';
                break;
        }
        return javaType;

    },
    showScriptStr:function(title,cnt){
        //组装完后 展示到窗口里
        var win = Ext.create('reflectDemo.view.common.window',{
            title:title
        });

        //向界面填充值
        var sqlCntObj = win.down('form').getForm().findField('sqlCnt');
        sqlCntObj.setValue(cnt);

        win.show();
    }
});