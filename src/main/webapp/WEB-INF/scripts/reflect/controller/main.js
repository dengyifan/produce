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
        'grid.view',
        'grid.view2',
        'onestep.first'
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
            },
            'reflectDemoGrid button[action = oneStep]':{
                click: this.oneStep
            },
            'reflectDemoOneStepFirst button[action = toSecond]':{
                click: this.toSecond
            },
            'reflectDemoGrid button[action = sqlParse]':{
                click: this.sqlParse
            },
            'reflectDemoCommonWin button[action = sqlParseNext]':{
                click: this.sqlParseNext
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

        var data = me.dealSearchSelections(selections);

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
                    items : data.itemArr
                }
            ],
            columnNameRemarkMap:data.columnNameRemarkMap
        });


        win.show();
    },
    dealSearchSelections:function(selections){
        var me = this;

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

        return {
            itemArr:itemArr,
            columnNameRemarkMap:columnNameRemarkMap
        };

    },
    searchCode:function(btn,previewFunc){
        var me = this;

        var nameForm = btn.up('window').down('form');
        var nameFormData = Ext.create('Ext.data.Model',nameForm.getForm().getValues());
        var appSignNameName = nameFormData.get('appSignName');
        var searchAlignName = nameFormData.get('searchAlignName');

        //给个默认值
        appSignNameName = Ext.isEmpty(appSignNameName) ? 'cc':appSignNameName;
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
            'appSignName':appSignNameName,
            'searchAlignName':searchAlignName
        };
        var context = btn.up('form');
        me.requestAjaxResponseText(url,params,context,function(result){
            if(previewFunc instanceof Function){
                previewFunc.apply(context,[result,appSignNameName,searchAlignName]);
            } else {
                me.showScriptStr('Search',result);
            }
        },btn);

    },
    searchPreview:function(btn){
        var me = this;
        me.searchCode(btn,function(result,appSignNameName,searchAlignName){

            eval(result);
            var win = Ext.create('Ext.window.Window',{
                title:'预览',
                width: document.documentElement.clientWidth-10,
                height: document.documentElement.clientHeight- 100,
                layout : "fit",
                modal : true,
                items : [
                    Ext.create(appSignNameName+'.view.main.'+searchAlignName)
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
                str += me.dealPreSubfix(1,"'"+ attrPrefix + key +"':" + "formData.get('"+key+"'), //" + columnNameRemarkMap[key]);
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

        var data = me.getGridFieldData(selections);

        var win = Ext.create('reflectDemo.view.grid.view',{
            columnArr:data.columnArr,
            fieldOrderArr:data.fieldOrderArr
        });

        win.show();

    },
    getGridFieldData:function(selections){
        var me = this;
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

        return {
            columnArr:columnArr,
            fieldOrderArr:fieldOrderArr
        };
    },
    executeGrid:function(btn){

        var me = this;

        var win = btn.up('window');
        var form = win.down('form');

        var formData = Ext.create('Ext.data.Model',form.getForm().getValues());

        var appSignName = formData.get('appSignName');
        appSignName = Ext.isEmpty(appSignName) ? 'table' :appSignName;

        var columnArr = win.columnArr;
        columnArr.forEach(function(curData){
            var columnName = curData['columnName'];
            curData['order'] = formData.get(columnName);
        });

        var url = '../ext/grid';
        var params = {
            'columnMetaInfoDtoList':columnArr,
            'appSignName':appSignName
        };

        var gridSignName = appSignName + ".view.main." + appSignName + "List";

        var context = btn.up('form');
        me.requestAjaxResponseText(url,params,context,function(result){

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
        me.requestAjaxResponseText(url,params,context,function(result){
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
        me.requestAjaxResponseText(url,params,context,function(result){
            me.showScriptStr('Model',result);
        },btn);
    },
    sqlCommon:function(btn,url,title){
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

        var params = {
            'columnMetaInfoDtoList':columnArr,
            'tableName':tableName
        };

        me.requestAjaxResponseText(url,params,form,function(result){
            me.showScriptStr(title,result);
        },btn);
    },
    selectSql:function(btn){
        var me = this;
        var url = '../ext/selectSql';
        me.sqlCommon(btn,url,'SelectSql');
    },
    insertSql:function(btn){
        var me = this;
        var url = '../ext/insertSql';
        me.sqlCommon(btn,url,'InsertSql');
    },
    updateSql:function(btn){
        var me = this;
        var url = '../ext/updateSql';
        me.sqlCommon(btn,url,'UpdateSql');
    },
    oneStep:function(btn){
        var win = Ext.create('reflectDemo.view.onestep.first');
        win.show();
    },
    toSecond:function(btn){
        var me = this;
        var form = btn.up('window').down('form');
        var firstStepFormData = Ext.create('Ext.data.Model',form.getForm().getValues());

        btn.up('window').close();

        var secondWin = me.getFieldSelectorWin('第二步:选择查询字段',function(){
            console.log('--3--');
            me.toThird1(this);
        },{
            firstStepFormData:firstStepFormData
        });
        secondWin.show();
    },
    toThird1:function(btn){
        var me = this;

        var secondWin = btn.up('window');
        console.log('获取第一步表单填写的数据:');
        console.log(secondWin.firstStepFormData);

        var secondGrid = secondWin.down('grid');
        var secondSelectionDataArr = secondGrid.getSelectionModel().getSelection();

        console.log('获取第二步选择的字段:');
        console.log(secondSelectionDataArr);


        var data = me.dealSearchSelections(secondSelectionDataArr);

        var third1Window = Ext.create('reflectDemo.view.search.view',{
            title : '第三步：为查询字段设置标签类型',
            height: 400,
            items:[
                {
                    xtype : 'reflectDemoViewSearchForm',
                    title : '',
                    items : data.itemArr,
                    dockedItems:[],
                    height:'100%'
                }
            ],
            columnNameRemarkMap:data.columnNameRemarkMap,
            firstStepFormData:secondWin.firstStepFormData,
            buttons : [{
                text : '下一步',
                handler:function(){
                    me.toThird(this);
                }
            }]
        });

        secondWin.close();

        third1Window.show();
    },
    toThird:function(btn){
        var me = this;

        var curForm = btn.up('window').down('form');
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

        //取出 win 里，在上一步里传递的第一步的表单数据
        var firstStepFormData = curForm.up().firstStepFormData;


        var thirdWindow = me.getFieldSelectorWin('第四步:选择结果列表字段',function(){
            console.log('--4--');
            me.toFourth1(this);
        },{
            firstStepFormData:firstStepFormData,
            secondSelectionDataArr:formFieldArr
        });

        //关闭上一个页面
        curForm.up().close();

        thirdWindow.show();
    },
    toFourth1:function(btn){
        console.log('toFourth1');
        var me = this;


        var thirdWindow = btn.up('window');
        var thirdGrid = thirdWindow.down('grid');
        var thirdGridSelections = thirdGrid.getSelectionModel().getSelection();
        var data = me.getGridFieldData(thirdGridSelections);


        var fourth1Win = Ext.create('reflectDemo.view.grid.view2',{
            title:'第五步：为结果列表字段排序',
            columnArr:data.columnArr,
            fieldOrderArr:data.fieldOrderArr,
            buttons : [{
                text : '下一步',
                handler:function(){
                    me.toFourth(this);
                }
            }],
            firstStepFormData:thirdWindow.firstStepFormData,
            secondSelectionDataArr:thirdWindow.secondSelectionDataArr
        });

        thirdWindow.close();

        fourth1Win.show();
    },
    toFourth:function(btn){
        var me = this;

        var win = btn.up('window');
        var form = win.down('form');

        var formData = Ext.create('Ext.data.Model',form.getForm().getValues());

        var columnArr = win.columnArr;
        columnArr.forEach(function(curData){
            var columnName = curData['columnName'];
            curData['order'] = formData.get(columnName);
        });


        //初始化应用的基础数据
        var params = win.firstStepFormData.data;

        //展示 search 时使用的字段
        params['extFormFieldDtoList'] = win.secondSelectionDataArr;

        //展示 grid 时排好序的字段
        params['columnMetaInfoDtoList'] = columnArr;

        console.log(params);


        var url = '../ext/oneStep';
        me.requestAjax(url,params,win,function(result){

            console.log(result);

            var downloadUrl = '../file/download?path='+result.result.downloadFilePath+'&fileName='+result.result.downloadFileName;

            var frm = document.getElementById('downloadForm');
            if(Ext.isEmpty(frm)){
                frm = document.createElement('form');
                frm.id = 'downloadForm';
                frm.style.display = 'none';
                document.body.appendChild(frm);
                frm.method ="post";
                frm.action = downloadUrl;
            }

            frm.submit();
            win.close();
        },btn);

    },
    getFieldSelectorWin:function(winTitle,nextFunc,cfg){

        var secondForm = Ext.create('reflectDemo.view.main.Search',{title:null});
        var store = Ext.create('reflectDemo.store.main');
        store.setQueryForm(secondForm);

        var grid = Ext.create('reflectDemo.view.main.List',{
            selModel: Ext.create('Ext.selection.CheckboxModel'),//这个也要重新创建 否则会影响主界面同样的功能
            store:store,
            dockedItems:[],
            width:'100%',
            height:450
        });

        //动态创建时 一定要设置这一步 不然 会在 store 里报 queryForm 为空
        grid.getPagingToolbar().store = store;

        var win = Ext.create('Ext.window.Window',{
            title:winTitle,
            width:500,
            height:500,
            items:[
                secondForm,
                grid
            ],
            buttons : [{
                text : '下一步',
                handler:nextFunc
            }]
        });

        cfg = Ext.apply({}, cfg);
        win = Ext.apply(win,cfg);
        return win;
    },
    introduce:function(btn){
        var me = this;

        var str = me.dealPreSubfix(0,"注意事项：");
        str += me.dealPreSubfix(0,"1、没有注释的字段不会处理");
        str += me.dealPreSubfix(0,"2、表注释时 需要为其添加编码说明的 需要回车换行再写 ");
        str += me.dealPreSubfix(0,"3、字段名为多单词时，请使用驼峰式命名 ");
        str += me.dealPreSubfix(0,"4、当输入为 Dto 类名时，为了更好地获取注释 请使用 @FieldMeta 注解 ");

        me.showScriptStr('说明',str);
    },
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
                    var result = Ext.decode(response.responseText);
                    callback.apply(context,[result]);
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
    requestAjaxResponseText:function(url,params,context,callback,btn){
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
    sqlParse:function(){
        var tmpWin = Ext.create('reflectDemo.view.common.window',{
            title:'填写SQL',
            buttons : [{
                text : '下一步',
                action : 'sqlParseNext'
            }]
        });

        tmpWin.show();
    },
    sqlParseNext:function(btn){
        var me = this;

        var win = btn.up('window');

        var sqlCntObj = win.down('form').getForm().findField('sqlCnt');
        var sqlCnt = sqlCntObj.getValue();

        var params = {
            sqlCnt:sqlCnt
        };

        var url = '../ext/sqlParse';
        me.requestAjax(url,params,win,function(result){
            console.log(result);
        },btn);
    }
});