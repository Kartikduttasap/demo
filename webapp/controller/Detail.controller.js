sap.ui.define([
    "./BaseController"
], function (
    BaseController
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.Detail", {
        /**
         * @override
         */
        onInit: function () {
            debugger;
            var oModel = sap.ui.getCore().getModel();
            this.getView().setModel(oModel);
            this.getOwnerComponent().getRouter().attachRouteMatched(this.onRoute, this);
        },
        onRoute: function (oEvent) {
            debugger;
            // var oArg = oEvent.getParameter("arguments");
            // var sPath = "/header/" + oArg.Vbeln;
            // debugger;
            // this.getView().byId("idForm").bindElement(sPath);
        },

        onBack: function (oEvent) {
            this.getOwnerComponent().onBack();
        },

        onGetSel: function (oEvent) {
            // this.mdContext
            debugger;
            this.getView().byId("idHeader").setBindingContext(this.getOwnerComponent().mdContext);

        },

        onFilterSelect: function (oEvent) {
            // alert("sel");
            // this.getView().byId("idIconTabBar").setStretchContentHeight(true);
        },

        showHeader: function (oEvent) {
            var oFlag = this.getView().byId("idIconTabBar").getStretchContentHeight();
            if (oFlag === true) {
                oFlag = false;
            } else {
                oFlag = true;
            }
            this.getView().byId("idIconTabBar").setStretchContentHeight(oFlag);
        }
    });
});