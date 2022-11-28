sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast"
], function (
    BaseController,
    MessageToast
) {
    "use strict";
    var prefixId;
    var oScanResultText;
    return BaseController.extend("ns.demo.controller.Barcode", {
        /**
         * @override
         */
        onInit: function () {
            // https://blogs.sap.com/2021/09/02/providing-native-barcode-scanning-on-sap-mobile-start-sapui5-quagga.js/

            prefixId = this.createId();
            if (prefixId) {
                prefixId = prefixId.split("--")[0] + "--";
            } else {
                prefixId = "";
            }
            oScanResultText = this.getView().byId("idText");
        },
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },
        onScanSuccess: function (oEvent) {
            if (oEvent.getParameter("cancelled")) {
                MessageToast.show("Scan cancelled", { duration: 1000 });
            } else {
                if (oEvent.getParameter("text")) {
                    oScanResultText.setText(oEvent.getParameter("text"));
                } else {
                    oScanResultText.setText('');
                }
            }
        },

        onScanError: function (oEvent) {
            MessageToast.show("Scan failed: " + oEvent, { duration: 1000 });
        },
    });
});