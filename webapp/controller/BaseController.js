sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/message/MessageManager",
    "ns/demo/model/formatter",
    "sap/m/MessageToast"
], function (
    ManagedObject,
    Controller,
    UIComponent,
    JSONModel,
    MessageManager,
    formatter,
    MessageToast
) {
    "use strict";

    return Controller.extend("ns.demo.controller.BaseController", {
        formatter: formatter,
        getView: function () {

        },
        setView: function () {

        },
        getModel: function (othis, sId) {
            debugger;
            if (sId === undefined) {
                return othis.getView().getModel();
            } else {
                return othis.getView().byId(sId).getModel();
            }

        },
        setModel: function (oModel, othis) {
            debugger;
            othis.getView().setModel(oModel);
        },
        showMessage: function () {
            alert("Popup Message");
        }
    });
});