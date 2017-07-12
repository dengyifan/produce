/**
 * Created by yifan on 17-7-12.
 */
Ext.define("reflectDemo.view.search.name", {
    extend:'Ext.form.Panel',
    alias: 'widget.reflectDemoViewSearchName',
    title: '请输入',
    collapsible:false,
    region:'north',
    layout : 'column',
    defaultType : 'textfield',
    defaults:{
        labelWidth:70,
        labelAlign:'right'
    },
    width : '100%',
    height:'20%',
    autoScroll:true,
    items:[
        {
            fieldLabel:'签名',
            name:'searchSignName'
        },
        {
            fieldLabel:'别名',
            name:'searchAlignName'
        }
    ]
});