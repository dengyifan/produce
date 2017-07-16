Ext.define("${appSignName}.view.Viewport", {
    extend: "Ext.container.Viewport",
    layout: "border",
    items: [{
        xtype:"${searchSignName}"
    },{
        xtype:"${gridAlignName}"
    }],
    getMainSearch : function(){
        return this.items.get(0);
    },
    getMainList : function(){
        return this.items.get(1);
    }
});