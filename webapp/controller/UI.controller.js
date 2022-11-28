sap.ui.define([
    "./BaseController"

], function (
    BaseController

) {
    "use strict";

    return BaseController.extend("ns.demo.controller.UI", {
        /**
         * @override
         */
        onInit: function () {
            debugger;
            var oModel = this.getOwnerComponent().getModel();
            // this.setModel(oModel, this);
            this.getView().setModel(oModel);
        },
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },

        onSetValue: function (oEvent) {
            var oInput = this.getView().byId("idDynInput");
            oInput.setValue("Custom Value");
        },

        onBindValue: function (oEvent) {
            var oInput = this.getView().byId("idDynInput");
            oInput.bindValue("/fruits/0/name");
        },

        onBindContext: function (oEvent) {
            debugger;
            var oContext = this.getView().byId("idStaInput").getBindingContext();
            var oInput = this.getView().byId("idDynInput");
            // Bind Context will give the model and the path but not the value to be binded
            oInput.setBindingContext(oContext);
            // Bind value to get the vaue from the path
            oInput.bindValue("type");
        },
        onDynButton: function () {
            alert("Dynamic Button Clicked");
        },

        onDynText: function (oEvent) {
            debugger;
            var oPanel = this.getView().byId("idPanel");
            var oText = new sap.m.Text({
                text: "This is a Dynamic Text"
            });
            // var sLoc = this.getView().byId("idDyn");
            oPanel.addContent(oText);
        },

        onDynRadBut: function (oEvent) {
            debugger;
            var oRadButGroup = new sap.m.RadioButtonGroup();
            var aFruits = this.getView().getModel().getData().fruits;
            aFruits.forEach(element => {
                oRadButGroup.addButton({
                    text: element.name,
                    valueState: "None"
                });
            });
            debugger;
            var oPanel = this.getView().byId("idPanel");
            oPanel.addContent(oRadButGroup);
        },

        onDynCheckbox: function (oEvent) {

        }

    });
});