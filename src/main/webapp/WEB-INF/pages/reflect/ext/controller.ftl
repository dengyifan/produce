Ext.define('${appSignName}.controller.${defaultControllerName}', {
    extend: 'Ext.app.Controller',
    stores: ['${defaultStoreName}'],
    models: ['${modelSignName}'],
    views: [
        'Viewport',
        'main.${searchAlignName}',
        'main.${gridAlignName}'
    ],
    init: function () {
        this.control({
            '${searchAlignName} button[action = mainQuery]': {
                click: this.mainQuery
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
    }
});