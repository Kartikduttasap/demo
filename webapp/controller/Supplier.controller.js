sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment"
], function (
    BaseController,
    Fragment
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.Supplier", {
        onHelp: function (oEvent) {
            this.oCity = oEvent.getSource();
            debugger;
            // var oCity = sap.ui.xmlfragment("ns.demo.fragments.City", this);
            var oView = this.getView();

            if (!this.byId("openDialog")) {
                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "ns.demo.fragments.CityPopup",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },
        closeDialog: function () {
            this.byId("openDialog").close();
        },
        selectDialog: function (oEvent) {
            var delRecord = this.getView().byId("idTable").getSelectedContexts();
            this.oCity.setValue(delRecord[0].getObject().name);
            this.byId("openDialog").close();
        },
        onSelect: function (oEvent) {
            var delRecord = this.getView().byId("idTable").getSelectedContexts();
            this.oCity.setValue(delRecord[0].getObject().name);
            this.byId("openDialog").close();
        }
    });
});