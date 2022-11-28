sap.ui.define([
    "./BaseController"
], function (
    BaseController,

) {
    "use strict";

    return BaseController.extend("ns.demo.controller.Master", {
        onSelect: function (oEvent) {
            debugger;
            // var oDetail = this.getView();
            var oContext = this.getOwnerComponent().mdContext = oEvent.getSource().getBindingContext();
            var oDetailView = sap.ui.getCore().byId("__xmlview1");
            // var oDetailView = sap.ui.getCore().byId("detail");
            var oHeader = oDetailView.byId("idHeader").setBindingContext(oContext);
            // var oRouter = this.getOwnerComponent().getRouter();

            // oRouter.navTo("RouteDetail");
        }
    });
});