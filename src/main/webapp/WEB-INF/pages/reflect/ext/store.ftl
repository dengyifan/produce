Ext.define("${appSignName}.store.${defaultStoreName}", {
    extend: "Ext.data.Store",
    model: "${appSignName}.model.${modelSignName}",
    pageSize : 600,
    queryForm:null,//查询表单
    setQueryForm:function(form){
        this.queryForm = form;
    },
    proxy: {
        type: 'ajax',
        actionMethods: 'get',
        url: '${storeProxyUrl}',
        reader: {
            type: 'json',
            rootProperty: 'result.${storeProxyRootProperty}',
            totalProperty: 'result.totalCount'
        }
    },
    listeners : {
        'beforeload' : function(store, operation, eOpts) {
            var queryForm = store.queryForm.getForm();

            var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());

            if (!Ext.isEmpty(queryForm)) {
                var params = {   //封装请求参数
                    <#list columnMetaInfoDtoList as meta>
                    '${meta.columnName}':formData.get('${meta.columnName}')<#if !meta?is_last>,</#if>//${meta.remark}
                    </#list>
                };
                Ext.apply(store.proxy.extraParams, params);
            }
        }
    },
    autoLoad: false
});