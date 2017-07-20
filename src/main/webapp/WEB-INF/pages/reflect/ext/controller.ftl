Ext.define('${appSignName}.controller.${defaultControllerName}', {
    extend: 'Ext.app.Controller',
    stores: ['${defaultStoreName}'],
    models: ['${modelSignName}'],
    views: [
        'Viewport',
        'main.${searchAlignName}',
        'main.${gridAlignName}',
        'main.${appSignName}AddModify'
    ],
    init: function () {
        this.control({
            '${searchAlignName} button[action = mainQuery]': {
                click: this.mainQuery
            },
            '${searchAlignName} button[action = reset]': {
                click: this.mainReset
            },
            '${gridAlignName} button[action = add]': {
                click: this.add${appSignName?cap_first}
            },
            '${gridAlignName} button[action = modify]': {
                click: this.modify${appSignName?cap_first}
            },
            '${gridAlignName} button[action = remove]': {
                click: this.remove${appSignName?cap_first}
            },
            '${gridAlignName} button[action = export]': {
                click: this.export${appSignName?cap_first}
            },
            '${appSignName}AddModify button[action = reset]':{
                click:this.addModifyWinReset
            },
            '${appSignName}AddModify button[action = submit]':{
                click:this.addModifyWinSubmit
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
    mainReset:function(btn){ //重置
        btn.up('form').getForm().reset();
    },
    add${appSignName?cap_first}:function(btn){
        console.log('add...');

        var win = Ext.create('${appSignName}.view.main.${appSignName}AddModify');
        win.show();
    },
    modify${appSignName?cap_first}:function(btn){
        console.log('modify...');
        var me = this;
    },
    remove${appSignName?cap_first}:function(btn){
        console.log('remove...');
        var me = this;
    },
    export${appSignName?cap_first}:function(btn){
       console.log('export...');
       var me = this;
    },
    addModifyWinReset:function(btn){
        console.log('addModifyWinReset');
        var me = this;
    },
    addModifyWinSubmit:function(btn){
        console.log('addModifyWinSubmit');
        var me = this;

        var form = btn.up('window').down('form');

        //获取表单参数
        var formData = Ext.create('Ext.data.Model',form.getForm().getValues());

        if (form.isValid()) {

            var params = {
                'todoDtoAtt': {
                    <#list columnMetaInfoDtoList as meta>
                    '${meta.columnName}': formData.get('${meta.columnName}')<#if !meta?is_last>,</#if>//${meta.remark}
                    </#list>
                }
            };

            console.log(params);

            btn.setDisabled(true);

            //todo 加遮罩层 url 定义
            me.requestAjax('../${appModuleName}/addOrUpdate',params,btn.up('window'),function(result){
                btn.setDisabled(false);

                //todo 去遮罩层
                //todo 提示操作成功消息

                btn.up('window').close();

            },btn);

        } else {
           me.showErrorMsg('表单填写不完整');
        }
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
                    var result = Ext.decode(response.responseText);
                    callback.apply(context,[result]);
                }

            },
            failure: function(response,options){

                btn.setDisabled(false);

                //todo 去遮罩层
                //todo 提示操作失败消息


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
    showErrorMsg:function(msg){
        Ext.Msg.show({
            title:'提示',
            msg:msg
        });
    }
});