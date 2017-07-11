/**
 * Created by yifan on 17-7-4.
 */
Ext.define("reflectDemo.store.main", {
    extend: "Ext.data.Store",
    model: "reflectDemo.model.main",
    pageSize : 600,
    queryForm:null,//查询表单
    setQueryForm:function(form){
        this.queryForm = form;
    },
    proxy: {
        type: 'ajax',
        actionMethods: 'get',
        url: '../table/columnInfo',
        reader: {
            type: 'json',
            rootProperty: 'result.columnMetaInfoDtoList',
            totalProperty: 'result.totalCount'
        }
    },
    listeners : {
        'beforeload' : function(store, operation, eOpts) {
            var queryForm = store.queryForm.getForm();

            var tableName = queryForm.findField('tableName').getValue();
            var dtoSignName = queryForm.findField('dtoSignName').getValue();

            if(Ext.isEmpty(tableName) && Ext.isEmpty(dtoSignName) ){

               Ext.Msg.show({
                   title:'提示',
                   msg:'请输入表名或Dto签名后，再查询'
               });

                return;
            }

            if (!Ext.isEmpty(queryForm)) {
                var params = {   //封装请求参数
                    'tableName' : tableName,
                    'dtoSignName' : dtoSignName,
                };
                Ext.apply(store.proxy.extraParams, params);
            }
        }
    },
    autoLoad: false
});