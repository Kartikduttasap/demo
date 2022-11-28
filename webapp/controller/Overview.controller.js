sap.ui.define([
    "./BaseController"]
    , function (
        BaseController
    ) {
        "use strict";

        return BaseController.extend("ns.demo.controller.Overview", {
            onInit: function () {

            },

            onUIElements: function (oEvent) {
                this.getOwnerComponent().navTo("RouteUI");
            },

            onList: function (oEvent) {
                this.getOwnerComponent().navTo("RouteList");
            },

            onMtable: function (oEvent) {
                this.getOwnerComponent().navTo("RouteMtable");
            },

            onUItable: function (oEvent) {
                this.getOwnerComponent().navTo("RouteUItable");
            },

            onMasterDet: function (oEvent) {
                this.getOwnerComponent().navTo("RouteMD");
            },

            onCallStdApp: function (oEvent) {
                debugger;
                // var supplier = oEvent.getSource().getBindingContext().getProperty("Product/SupplierID"); // read SupplierID from OData path Product/SupplierID
                // var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"); // get a handle on the global XAppNav service
                // var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
                //     target: {
                //         semanticObject: "Supplier",
                //         action: "display"
                //     },
                //     params: {
                //         "supplierID": supplier
                //     }
                // })) || ""; // generate the Hash to display a Supplier
                // oCrossAppNavigator.toExternal({
                //     target: {
                //         shellHash: hash
                //     }
                // }); // navigate to Supplier application
                ///////////
                sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function (oService) {

                    oService.hrefForExternalAsync({
                        target: {
                            semanticObject: "Product",
                            action: "display"
                        },
                        params: {
                            "ProductID": "102343333"
                        }
                    }).then(function (sHref) {
                        // Place sHref somewhere in the DOM
                    });
                });

            },
            onMessage: function (oEvent) {
                this.getOwnerComponent().navTo("RouteMessage");
            },

            onUpload: function (oEvent) {
                this.getOwnerComponent().navTo("RouteUpload");
            },

            onBarcode: function (oEvent) {
                this.getOwnerComponent().navTo("RouteBarcode");
            },

            onChart: function (oEvent) {
                this.getOwnerComponent().navTo("RouteChart");
            },

            onCRUD: function (oEvent) {
                this.getOwnerComponent().navTo("RouteCRUD");
            }

        });
    });