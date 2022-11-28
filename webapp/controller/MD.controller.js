sap.ui.define([
    "./BaseController",
], function (
    BaseController
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.MD", {
        onBack: function (oEvent) {
            debugger;
            this.getOwnerComponent().navBack();
        }
    });
});