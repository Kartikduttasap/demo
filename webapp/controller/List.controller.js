sap.ui.define([
    "./BaseController",
    "ns/demo/model/formatter"
], function (
    BaseController,
    formatter
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.List", {
        // formatter: formatter,
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        }
    });
});