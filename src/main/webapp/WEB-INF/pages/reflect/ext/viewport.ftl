Ext.define("${appSignName}.view.Viewport", {
    extend: "Ext.container.Viewport",
    layout: "border",
    items: [{
        xtype:"reflectDemoSearch"
    },{
        xtype:"reflectDemoGrid"
    }],
    getSearchForm : function(){
        return this.items.get(0);
    },
    getTableGrid : function(){
        return this.items.get(1);
    }
});