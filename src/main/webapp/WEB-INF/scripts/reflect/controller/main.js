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
        'main.List',
        'dto.view',
        'model.view',
        'common.window',
        'search.form',
        'search.param',
        'search.view',
        'search.name',
        'grid.view'
    ],
    init: function () {
        this.control({
            'reflectDemoSearch button[action = query]': {
                click: this.mainQuery
            },
            'reflectDemoGrid button[action = dto]':{
                click: this.dto
            },
            'reflectDemoGrid button[action = search]':{
                click: this.search
            },
            'reflectDemoGrid button[action = grid]':{
                click: this.grid
            },
            'reflectDemoGrid button[action = model]':{
                click: this.model
            },
            'reflectDemoDtoView button[action = executeDto]':{
                click: this.executeDto
            },
            'reflectDemoModelView button[action = executeModel]':{
                click: this.executeModel
            },
            'reflectDemoViewSearchForm button[action = searchPreview]':{
                click:this.searchPreview
            },
            'reflectDemoViewSearchForm button[action = searchCode]':{
                click:this.searchCode
            },
            'reflectDemoViewSearchForm button[action = params]':{
                click:this.params
            },
            'reflectDemoSearchParam textfield[name = voColumnName]':{
                change:this.voColumnChangeResponse
            },
            'reflectDemoGridView button[action = executeGrid]':{
                click:this.executeGrid
            },
            'reflectDemoGrid button[action = selectSql]':{
                click: this.selectSql
            },
            'reflectDemoGrid button[action = insertSql]':{
                click: this.insertSql
            },
            'reflectDemoGrid button[action = updateSql]':{
                click: this.updateSql
            },
            'reflectDemoGrid button[action = introduce]':{
                click: this.introduce
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
    },
    search:function(btn){
        var me = this;
        var selections = this.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请勾选字段后，再操作');
            return;
        }

        var columnNameRemarkMap = {};

        var itemArr = [];
        var curSubItemArr = [];

        selections.forEach(function(curObj,idx){
            var curData = curObj.data;
            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);

            //对于没有加字段注释的 默认不实现
            if(!Ext.isEmpty(curRemark)){

                //将列名 与 注释名 保存起来
                columnNameRemarkMap[curColumnName] = curRemark;


                curSubItemArr.push({
                    xtype:'combo',
                    fieldLabel: curRemark,
                    name: curColumnName,
                    store:[
                        ['textfield','textfield'],
                        ['combo','combo'],
                        ['numberfield','numberfield'],
                        ['datefield','datefield']
                    ],
                    value:'textfield',
                    editable:false
                });


                if((idx + 1) % 6 == 0){
                    itemArr.push({
                        layout:'column',
                        defaults : {
                            labelAlign : "right",
                            margin:'5',
                            labelWidth:100,
                            width:200
                        },
                        items:curSubItemArr
                    });

                    curSubItemArr = [];
                }
            }

        });

        //补充剩下的字段
        if(curSubItemArr.length > 0){
            itemArr.push({
                layout:'column',
                defaults : {
                    labelAlign : "right",
                    margin:'5',
                    labelWidth:100,
                    width:200
                },
                items:curSubItemArr
            });
            curSubItemArr = [];
        }

        var win = Ext.create('reflectDemo.view.search.view',{
            title : '类型选择',
            defaults:{
                margin:10
            },
            items:[
                {
                    xtype:'reflectDemoViewSearchName'
                },
                {
                    xtype : 'reflectDemoViewSearchForm',
                    items : itemArr
                }
            ],
            columnNameRemarkMap:columnNameRemarkMap
        });
        win.show();
    },
    searchCode:function(btn,previewFunc){
        var me = this;

        var nameForm = btn.up('window').down('form');
        var nameFormData = Ext.create('Ext.data.Model',nameForm.getForm().getValues());
        var searchSignName = nameFormData.get('searchSignName');
        var searchAlignName = nameFormData.get('searchAlignName');

        //给个默认值
        searchSignName = Ext.isEmpty(searchSignName) ? 'aa.bb.form.cc':searchSignName;
        searchAlignName = Ext.isEmpty(searchAlignName) ? 'aaBbFormCc':searchAlignName;

        var curForm = btn.up('form');
        var formData = Ext.create('Ext.data.Model',curForm.getForm().getValues());
        var columnMeta = formData.data;

        //取出 win 里，在上一步里传递的数据对象
        var columnNameRemarkMap = curForm.up().columnNameRemarkMap;

        var formFieldArr = [];
        for(var key in columnMeta){

            if(!Ext.isEmpty(columnNameRemarkMap[key])){
                var curXtype = columnMeta[key];
                var curFieldLabel = columnNameRemarkMap[key];
                var curName = key;

                formFieldArr.push({
                    xtype:curXtype,
                    fieldLabel:curFieldLabel,
                    name:curName
                });
            }
        }

        var url = '../ext/searchCode';
        var params = {
            'extFormFieldDtoList':formFieldArr,
            'searchSignName':searchSignName,
            'searchAlignName':searchAlignName
        };
        var context = btn.up('form');
        me.requestAjax(url,params,context,function(result){
            if(previewFunc instanceof Function){
                previewFunc.apply(context,[result,searchSignName]);
            } else {
                me.showScriptStr('Search',result);
            }
        },btn);

    },
    searchPreview:function(btn){
        var me = this;
        me.searchCode(btn,function(result,searchSignName){

            eval(result);
            var win = Ext.create('Ext.window.Window',{
                title:'预览',
                width: document.documentElement.clientWidth-10,
                height: document.documentElement.clientHeight- 100,
                layout : "fit",
                modal : true,
                items : [
                    Ext.create(searchSignName)
                ]
            });
            win.show();
        });
    },
    params:function(btn){
        var tmpWin = Ext.create('reflectDemo.view.search.param',{
            paramBtn:btn
        });
        tmpWin.show();
    },
    voColumnChangeResponse:function(self){ //param 界面里 文本框输入改变事件响应
        var me = this;
        var attrPrefix = Ext.isEmpty(self.getValue()) ? 'vo.dto.' : self.getValue();

        //获取 点击的 param 按钮
        var btn = self.up('form').up().paramBtn;

        var curForm = btn.up('form');
        var formData = Ext.create('Ext.data.Model',curForm.getForm().getValues());
        var columnMeta = formData.data;

        //取出 win 里，在上一步里传递的数据对象
        var columnNameRemarkMap = curForm.up().columnNameRemarkMap;


        var str = me.dealPreSubfix(0,"var queryForm = store.queryForm;");

        str += me.dealPreSubfix(0,"");
        str += me.dealPreSubfix(0,"//获取表单各项的值");
        str += me.dealPreSubfix(0,"var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());");
        str += me.dealPreSubfix(0,"var params = {");

        for(var key in columnMeta){
            if(!Ext.isEmpty(columnNameRemarkMap[key])){
                str += me.dealPreSubfix(1,"'"+ attrPrefix + key +"':" + "formData.get('"+key+"')," + columnNameRemarkMap[key]);
            }
        }

        str += me.dealPreSubfix(0,"};");
        str += me.dealPreSubfix(0,"");
        str += me.dealPreSubfix(0,"Ext.apply(store.proxy.extraParams,params);");

        var paramStrObj = self.up('form').getForm().findField('paramStr');
        paramStrObj.setValue();
        paramStrObj.setValue(str);
    },
    grid:function(btn){
        var me = this;
        var selections = this.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请勾选字段后，再操作');
            return;
        }

        var columnArr = [];
        var fieldOrderArr = [];
        selections.forEach(function(curObj){
            var curData = curObj.data;

            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);
            curRemark = Ext.util.Format.trim(curRemark);

            var curTypeName = curData['typeName'];

            if(!Ext.isEmpty(curRemark)){
                columnArr.push({
                    columnName : curColumnName,
                    typeName : curTypeName,
                    remark : curRemark
                });


                var curFieldObj = Ext.widget('textfield',{
                    fieldLabel:curRemark,
                    xtype :'numberfield',
                    minValue:1,
                    value:60,
                    name : curColumnName
                });

                fieldOrderArr.push(curFieldObj);
            }
        });

        var win = Ext.create('reflectDemo.view.grid.view',{
            columnArr:columnArr,
            fieldOrderArr:fieldOrderArr
        });

        win.show();

    },
    executeGrid:function(btn){

        var me = this;

        var win = btn.up('window');
        var form = win.down('form');

        var formData = Ext.create('Ext.data.Model',form.getForm().getValues());

        var gridSignName = formData.get('gridSignName');
        var gridAlignName = formData.get('gridAlignName');

        gridSignName = Ext.isEmpty(gridSignName) ? 'aa.bb.view.list' :gridSignName;
        gridAlignName = Ext.isEmpty(gridAlignName) ? 'aaBbViewList' :gridAlignName;


        var columnArr = win.columnArr;
        columnArr.forEach(function(curData){
            var columnName = curData['columnName'];
            curData['order'] = formData.get(columnName);
        });

        var url = '../ext/grid';
        var params = {
            'columnMetaInfoDtoList':columnArr,
            'gridSignName':gridSignName,
            'gridAlignName':gridAlignName
        };
        var context = btn.up('form');
        me.requestAjax(url,params,context,function(result){

            if(!Ext.isEmpty(result)){

                win.close();

                eval(result);

                //创建一个 window 来展示
                var tmpWindow = Ext.create('Ext.window.Window',{
                    title:'Grid预览',
                    width: document.documentElement.clientWidth-10,
                    height: document.documentElement.clientHeight - 100,
                    items: [{
                        xtype : 'form',
                        height:(document.documentElement.clientHeight - 100) / 2,
                        width:'100%',
                        items:[
                            {
                                xtype:'textareafield',
                                value: result,
                                height:'100%',
                                width:'100%',
                            }
                        ]
                    }, Ext.create(gridSignName,{
                        width:'100%',
                        height:(document.documentElement.clientHeight - 100) / 2
                    })]
                });

                tmpWindow.show();
            }

        },btn);
    },
    dto:function(btn){
        var me = this;

        var selections = this.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请选择字段后再操作！');
            return;
        }

        var metaInfoObjArr = [];

        //是否存在日期类型
        var containsDate = false;

        selections.forEach(function(curObj) {
            var curData = curObj.data;
            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);
            curRemark = Ext.util.Format.trim(curRemark);

            var curTypeName = me.parseDbTypeToJava(curData);
            if(curTypeName == 'Date'){
                containsDate = true;
            }

            metaInfoObjArr.push({
                columnName : curColumnName,
                upperColumnName : me.firstUpper(curColumnName),
                typeName : curTypeName,
                remark : curRemark,
                oldRemark : curData['remark']
            });
        });

        var win = Ext.create('reflectDemo.view.dto.view',{
            metaInfoObjArr:metaInfoObjArr,
            containsDate:containsDate
        });
        win.show();
    },
    executeDto:function(btn){
        var me = this;

        var win = btn.up('window');
        var queryForm = btn.up('window').down('form');
        var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());
        var dtoClassName = formData.get('dtoClassName');
        var packageName = formData.get('packageName');

        dtoClassName = Ext.isEmpty(dtoClassName) ? 'TODO_DtoClassName' : dtoClassName;
        packageName = Ext.isEmpty(packageName) ? 'TODO_PackageName' : packageName;

        var url = '../ext/dto';
        var params = {
            'columnMetaInfoDtoList':win.metaInfoObjArr,
            'dtoClassName':dtoClassName,
            'packageName':packageName,
            'containsDate':win.containsDate
        };
        var context = btn.up('window');
        me.requestAjax(url,params,context,function(result){
            if(!Ext.isEmpty(result)){
                win.close();
            }
            me.showScriptStr('Dto',result);
        },btn);

    },
    model:function(btn){
        var me = this;

        var selections = me.getSelected(btn);
        if(selections.length == 0){
            me.showErrorMsg('请选择字段后再操作！');
            return;
        }

        var metaInfoObjArr = [];

        //组装 fields 字段内容
        selections.forEach(function(curObj,idx){
            var curData = curObj.data;

            //字段名
            var curColumnName = curData['columnName'];

            //首字母小写
            curColumnName = me.firstLower(curColumnName);

            //字段注释
            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);

            //类型
            var curTypeName = me.parseDbTypeToExt(curData);

            metaInfoObjArr.push({
                columnName : curColumnName,
                typeName : curTypeName,
                remark : curRemark
            });
        });

        var win = Ext.create('reflectDemo.view.model.view',{
            metaInfoObjArr:metaInfoObjArr
        });
        win.show();
    },
    executeModel:function(btn){
        var me = this;

        var win = btn.up('window');
        var queryForm = btn.up('window').down('form');
        var formData = Ext.create('Ext.data.Model',queryForm.getForm().getValues());
        var modelSignName = formData.get('modelSignName');


        modelSignName = Ext.isEmpty(modelSignName) ? 'TODO_modelSignName' : modelSignName;

        var url = '../ext/model';
        var params = {
            'columnMetaInfoDtoList':win.metaInfoObjArr,
            'modelSignName':modelSignName
        };
        var context = btn.up('window');
        me.requestAjax(url,params,context,function(result){
            me.showScriptStr('Dto',result);
        },btn);
    },
    selectSql:function(btn){
        var me = this;

        //获取表单输入的 表名
        var form = this.getFormByGridBtn(btn);
        var tableName = form.getForm().findField('tableName').getValue();

        //获取Grid里选择的字段集合
        var selections = this.getSelected(btn);

        if(selections.length == 0){
            me.showErrorMsg('请勾选字段后，再操作');
            return;
        }


        var columnArr = [];
        selections.forEach(function(curObj) {
            var curData = curObj.data;
            var curColumnName = curData['columnName'];
            curColumnName = me.firstLower(curColumnName);

            var curRemark = curData['remark'];
            curRemark = me.dealRemark(curRemark);

            var curTypeName = curData['typeName'];
            switch (curTypeName){
                case 'DATETIME':
                    curTypeName = 'TIMESTAMP';
                    break;
                default:
                    curTypeName = 'VARCHAR';
            }

            columnArr.push({
                columnName:curColumnName,
                typeName:curTypeName,
                remark:curRemark
            });
        });


        var url = '../ext/selectSql';
        var params = {
            'columnMetaInfoDtoList':columnArr,
            'tableName':tableName
        };


        me.requestAjax(url,params,form,function(result){
            me.showScriptStr('Dto',result);
        },btn);
    },
    insertSql:function(btn){},
    updateSql:function(btn){},
    introduce:function(btn){},
    getSelected:function(btn){
        var mainGrid = btn.up('grid');
        var selections = mainGrid.getSelectionModel().getSelection();
        return selections;
    },
    showErrorMsg:function(msg){
        Ext.Msg.show({
            title:'提示',
            msg:msg
        });
    },
    requestAjax:function(url,params,context,callback,btn){
        var me = this;

        Ext.Ajax.request({
            url:url,
            method:'POST',
            jsonData:params,
            timeout:5000,
            success: function(response,options){
                if(!Ext.isEmpty(callback)){
                    callback.apply(context,[response.responseText]);
                }

            },
            failure: function(response,options){
                var result = response.responseText;
                Ext.Msg.hide();
                if(!Ext.isEmpty(btn)){
                    btn.setDisabled(false);
                }

                if (Ext.isEmpty(result)) {
                    me.showErrorMsg('请求超时');
                } else {
                    var message = response.message;
                    me.showErrorMsg(message);
                }
            }
        });

    },
    dealRemark:function(curRemark){
        var realRemark = curRemark.indexOf('\n') == -1 ? curRemark : curRemark.substring(0,curRemark.indexOf('\n'));
        return Ext.util.Format.trim(realRemark);
    },
    firstLower:function(curColumnName){
        var str = curColumnName.substring(0,1).toLocaleLowerCase() + curColumnName.substring(1,curColumnName.length);
        return str;
    },
    firstUpper:function(curColumnName){
        var str = curColumnName.substring(0,1).toLocaleUpperCase() + curColumnName.substring(1,curColumnName.length);
        return str;
    },
    parseDbTypeToJava:function(curData){
        var javaType = null;
        switch (curData['typeName']){
            case 'VARCHAR' :
                javaType = 'String';
                break;
            case 'CHAR':
                javaType = 'String';
                break;
            case 'TEXT':
                javaType = 'String';
                break;
            case 'DATETIME':
                javaType = 'Date';
                break;
            case 'FLOAT':
                javaType = 'float';
                break;
            case 'DECIMAL':
                javaType = 'BigDecimal';
                break;
            case 'BIGINT':
                javaType = 'BigInteger';
                break;
            case 'INT':
                javaType = 'int';
                break;
        }
        return javaType;

    },
    parseDbTypeToExt:function(curData){

        //字段类型
        var curTypeName = curData['typeName'];

        var extTypeName = '';

        switch(curTypeName){
            case 'DATETIME':
                extTypeName = 'date';
                break;
            case 'FLOAT':
                extTypeName = 'float';
                break;
            default:
                extTypeName = 'string';
        }

        return extTypeName;
    },
    showScriptStr:function(title,cnt){
        //组装完后 展示到窗口里
        var win = Ext.create('reflectDemo.view.common.window',{
            title:title
        });

        //向界面填充值
        var sqlCntObj = win.down('form').getForm().findField('sqlCnt');
        sqlCntObj.setValue(cnt);

        win.show();
    },
    dealPreSubfix:function(count,str){
        if(Ext.isEmpty(str)){
            return this.getLineDownFlag();
        }
        return this.getDefineTab(count) + str + this.getLineDownFlag();
    },
    getLineDownFlag:function(){//换行
        return "\r\n";
    },
    getDefineTab:function(count){

        if(count == 0) return "";

        var str = "";
        while(count != 0){
            str += "    ";
            count --;
        }
        return str;
    },
    getFormByGridBtn:function(btn){ //当点击 grid 上的 btn 时，获取到整个页面的 form 对象
        var form = btn.up('grid').up().down('form');
        return form;
    },
});