Ext.define("reflectDemo.view.onestep.first", {
    extend : "Ext.window.Window",
    alias : "widget.reflectDemoOneStepFirst",
    width : 300,
    height : 350,
    title:'第一步:参数设置',
    layout : "fit",
    modal : true,
    items : {
        xtype : "form",
        layout : "column",
        items : [
            {

                layout : 'column',
                defaultType : 'textfield',
                defaults:{
                    margin:5
                },
                items : [
                    {
                        fieldLabel : '模块名',
                        name : 'appModuleName',
                        emptyText:'应用模块名',
                        value:'table'
                    },{
                        fieldLabel : '应用名',
                        name : 'appSignName',
                        emptyText:'应用签名，可以多级',
                        value:'waybill'
                    },{
                        fieldLabel : '查询请求',
                        name : 'storeProxyUrl',
                        emptyText:'../模块名/请求名',
                        value:'../table/waybill/mainQuery'
                    },{
                        fieldLabel : '查询集合名',
                        name : 'storeProxyRootProperty',
                        emptyText:'result 后面的,不包括 .',
                        value:'mainDtoList'
                    }
                ]
            }
        ]
    },
    buttons : [{
        text : '下一步',
        action : 'toSecond'
    }]
});