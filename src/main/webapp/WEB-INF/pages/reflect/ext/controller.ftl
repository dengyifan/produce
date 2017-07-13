Ext.define('${appSignName}.controller.tableController', {
    extend: 'Ext.app.Controller',
    stores: ['main'],
    models: ['main'],
    views: [
        'Viewport',
        'main.search',
        'main.list'
    ],
    init: function () {
        this.control({
            'mainSearch button[action = query]': {
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