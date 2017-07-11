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