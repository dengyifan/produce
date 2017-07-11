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
        'main.List',
        'dto.view',
        'model.view',
        'common.window',
        'search.form',
        'search.param',
        'search.view'
    ],
    init: function () {
        this.control({
            'reflectDemoSearch button[action = query]': {
                click: this.mainQuery
            },
            'reflectDemoGrid button[action = dto]':{
                click: this.dto
            },
            'reflectDemoGrid button[action = search]':{
                click: this.search
            },
            'reflectDemoGrid button[action = model]':{
                click: this.model
            },
            'reflectDemoDtoView button[action = executeDto]':{
                click: this.executeDto
            },
            'reflectDemoModelView button[action = executeModel]':{
                click: this.executeModel
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
    search:function(btn){
        var me = this;
        var selections = this.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请勾选字段后，再操作');
            return;
        }

        var columnNameRemarkMap = {};

        var itemArr = [];
        var curSubItemArr = [];
        selections.forEach(function(curObj,idx){
            var curData = curObj.data;
            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);

            //对于没有加字段注释的 默认不实现
            if(!Ext.isEmpty(curRemark)){

                //将列名 与 注释名 保存起来
                columnNameRemarkMap[curColumnName] = curRemark;


                curSubItemArr.push({
                    xtype:'combo',
                    fieldLabel: curRemark,
                    name: curColumnName,
                    store:[
                        ['textfield','textfield'],
                        ['combo','combo'],
                        ['numberfield','numberfield'],
                        ['datefield','datefield']
                    ],
                    value:'textfield',
                    editable:false
                });


                if((idx + 1) % 6 == 0){
                    itemArr.push({
                        layout:'column',
                        defaults : {
                            labelAlign : "right",
                            margin:'5',
                            labelWidth:100,
                            width:200
                        },
                        items:curSubItemArr
                    });

                    curSubItemArr = [];
                }
            }

        });

        //补充剩下的字段
        if(curSubItemArr.length > 0){
            itemArr.push({
                layout:'column',
                defaults : {
                    labelAlign : "right",
                    margin:'5',
                    labelWidth:100,
                    width:200
                },
                items:curSubItemArr
            });
            curSubItemArr = [];
        }

        var win = Ext.create('reflectDemo.view.search.view',{
            items:[
                {
                    xtype : 'reflectDemoViewSearchForm',
                    title : '类型选择',
                    items:itemArr
                }

            ],
            columnNameRemarkMap:columnNameRemarkMap
        });
        win.show();
    },
    dto:function(btn){
        var me = this;

        var selections = this.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请选择字段后再操作！');
            return;
        }

        var metaInfoObjArr = [];

        //是否存在日期类型
        var containsDate = false;

        selections.forEach(function(curObj) {
            var curData = curObj.data;
            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);
            curRemark = Ext.util.Format.trim(curRemark);

            var curTypeName = me.parseDbTypeToJava(curData);
            if(curTypeName == 'Date'){
                containsDate = true;
            }

            metaInfoObjArr.push({
                columnName : curColumnName,
                upperColumnName : me.firstUpper(curColumnName),
                typeName : curTypeName,
                remark : curRemark,
                oldRemark : curData['remark']
            });
        });

        var win = Ext.create('reflectDemo.view.dto.view',{
            metaInfoObjArr:metaInfoObjArr,
            containsDate:containsDate
        });
        win.show();
    },
    executeDto:function(btn){
        var me = this;

        var win = btn.up('window');
        var queryForm = btn.up('window').down('form');
        var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());
        var dtoClassName = formData.get('dtoClassName');
        var packageName = formData.get('packageName');

        if(Ext.isEmpty(dtoClassName)){
           me.showErrorMsg('请填写 Dto 类名');
           return;
        }

        var url = '../ext/dto';
        var params = {
            'columnMetaInfoDtoList':win.metaInfoObjArr,
            'dtoClassName':dtoClassName,
            'packageName':packageName,
            'containsDate':win.containsDate
        };
        var context = btn.up('window');
        me.requestAjax(url,params,context,function(result){
            if(!Ext.isEmpty(result)){
                win.close();
            }
            me.showScriptStr('Dto',result);
        },btn);

    },
    model:function(btn){
        var me = this;

        var selections = me.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请选择字段后再操作！');
            return;
        }

        var metaInfoObjArr = [];

        //组装 fields 字段内容
        selections.forEach(function(curObj,idx){
            var curData = curObj.data;

            //字段名
            var curColumnName = curData['columnName'];

            //首字母小写
            curColumnName = me.firstLower(curColumnName);

            //字段注释
            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);

            //类型
            var curTypeName = me.parseDbTypeToExt(curData);

            metaInfoObjArr.push({
                columnName : curColumnName,
                typeName : curTypeName,
                remark : curRemark
            });
        });

        var win = Ext.create('reflectDemo.view.model.view',{
            metaInfoObjArr:metaInfoObjArr
        });
        win.show();
    },
    executeModel:function(btn){
        var me = this;

        var win = btn.up('window');
        var queryForm = btn.up('window').down('form');
        var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());
        var modelSignName = formData.get('modelSignName');

        if(Ext.isEmpty(modelSignName)){
            me.showErrorMsg('Model签名不能为空！');
            return;
        }

        var url = '../ext/model';
        var params = {
            'columnMetaInfoDtoList':win.metaInfoObjArr,
            'modelSignName':modelSignName
        };
        var context = btn.up('window');
        me.requestAjax(url,params,context,function(result){
            me.showScriptStr('Dto',result);
        },btn);
    },
    getSelected:function(btn){
        var mainGrid = btn.up('grid');
        var selections = mainGrid.getSelectionModel().getSelection();
        return selections;
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
    parseDbTypeToExt:function(curData){

        //字段类型
        var curTypeName = curData['typeName'];

        var extTypeName = '';

        switch(curTypeName){
            case 'DATETIME':
                extTypeName = 'date';
                break;
            case 'FLOAT':
                extTypeName = 'float';
                break;
            default:
                extTypeName = 'string';
        }

        return extTypeName;
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