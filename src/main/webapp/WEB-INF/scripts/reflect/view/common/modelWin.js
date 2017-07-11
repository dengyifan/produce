/**
 * Created by yifan on 17-7-5.
 */
Ext.define('reflectDemo.view.common.modelWin',{
    extend:'Ext.window.Window',
    alias : "widget.reflectDemoModelWin",
    title:'填写Model签名',
    mainGrid:null,//主页面对应的 grid
    items:[
        {
            xtype:'form',
            fieldDefaults:{
                margin : '20'
            },
            items : [{
                fieldLabel : 'Model名',
                xtype:'textfield',
                name : 'modelSignName'
            }],
            buttons : [{
                text : 'Model',
                action : 'executeModel'
            }]
        }
    ],
    width:400,
    height:140
});