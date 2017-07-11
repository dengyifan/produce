Ext.define("reflectDemo.view.Viewport", {
    id : 'metaInfoDemoId',
    extend: "Ext.container.Viewport",
    layout: "border",   //extjs的boder布局
    items: [{
        xtype:"reflectDemoSearch"
    },{
        xtype:"reflectDemoGrid"
    }],
    getSearchForm : function(){
        return this.items.get(0);    //获取当前view面板的 第一个item -> 查询表单
    },
    getTableGrid : function(){
        return this.items.get(1);   //获取当前view面板的 第二个item -> 表格
    }
});