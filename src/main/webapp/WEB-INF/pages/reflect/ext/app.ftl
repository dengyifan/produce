Ext.application({
    name: "${appSignName}",
    appFolder: '../scripts/${appModuleName}/${appSignName}',
    controllers: ["${defaultControllerName}"],
    autoCreateViewport: true,
    launch: function () {}
});