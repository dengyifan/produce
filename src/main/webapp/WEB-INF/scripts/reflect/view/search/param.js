/**
 * Created by yifan on 17-7-10.
 */
Ext.define("reflectDemo.view.search.param", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoSearchParam",
    title:'Param',
    items:[{
        xtype:'form',
        margin:0,
        width:600,
        height:500,
        items:[{
            fieldLabel:'属性前缀',
            name:'voColumnName',
            xtype : 'textfield',
            emptyText:'vo.dto.',
            labelAlign:'left'
        },{
            xtype:'textareafield',
            name: 'paramStr',
            width:'100%',
            height:'90%'
        }]
    }]
});