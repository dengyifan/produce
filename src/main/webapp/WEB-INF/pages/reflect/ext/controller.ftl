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
    },
    modify${appSignName?cap_first}:function(btn){
        console.log('modify...');
    },
    remove${appSignName?cap_first}:function(btn){
        console.log('remove...');
    },
    export${appSignName?cap_first}:function(btn){
       console.log('export...');
    },
    addModifyWinReset:function(btn){
        console.log('addModifyWinReset');
    },
    addModifyWinSubmit:function(btn){
        console.log('addModifyWinSubmit');
    }
});