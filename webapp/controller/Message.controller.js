sap.ui.define([
    "./BaseController",
    'sap/ui/core/IconPool',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Icon',
    'sap/m/Link',
    'sap/m/MessageItem',
    'sap/m/MessageView',
    'sap/m/Button',
    'sap/m/Bar',
    'sap/m/Title',
    'sap/m/Popover',
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (
    BaseController,
    IconPool, JSONModel, Icon, Link, MessageItem, MessageView, Button, Bar, Title, Popover, MessageToast, MessageBox
) {
    "use strict";

    return BaseController.extend("ns.demo.controller.Message", {
        onBack: function (oEvent) {
            this.getOwnerComponent().navBack();
        },
        onInit: function () {

            // Create Link
            var that = this;
            var oLink = new Link({
                text: "Show more information",
                href: "http://sap.com",
                target: "_blank"
            });

            // Create Message Template, Add Link
            var oMessageTemplate = new MessageItem({
                type: '{type}',
                title: '{title}',
                description: '{description}',
                subtitle: '{subtitle}',
                counter: '{counter}',
                markupDescription: "{markupDescription}",
                link: oLink
            });

            //Create test data as per Template
            var aMockMessages = [{
                type: 'Error',
                title: 'Error message',
                description: 'First Error message description. \n' +
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
                subtitle: 'Example of subtitle',
                counter: 1
            }, {
                type: 'Warning',
                title: 'Warning without description',
                description: ''
            }, {
                type: 'Success',
                title: 'Success message',
                description: 'First Success message description',
                subtitle: 'Example of subtitle',
                counter: 1
            }, {
                type: 'Error',
                title: 'Error message',
                description: 'Second Error message description',
                subtitle: 'Example of subtitle',
                counter: 2
            }, {
                type: 'Information',
                title: 'Information message',
                description: 'First Information message description',
                subtitle: 'Example of subtitle',
                counter: 1
            }];

            // Create Header Back Button
            var oBackButton = new Button({
                icon: IconPool.getIconURI("nav-back"),
                visible: false,
                press: function () {
                    that.oMessageView.navigateBack();
                    that._oPopover.focus();
                    this.setVisible(false);
                }
            });

            // Create Popup Header, Add the Back Button
            var oPopoverBar = new Bar({
                contentLeft: [oBackButton],
                contentMiddle: [
                    new Title({ text: "Messages" })
                ]
            });

            // Create Footer Close Button 
            var oCloseButton = new Button({
                text: "Close",
                press: function () {
                    that._oPopover.close();
                }
            }).addStyleClass("sapUiTinyMarginEnd"),

                // Create Popup Footer, Add the Close button
                oPopoverFooter = new Bar({
                    contentRight: oCloseButton
                });

            // Create Message View
            this.oMessageView = new MessageView({
                showDetailsPageHeader: false,
                itemSelect: function () {
                    oBackButton.setVisible(true);
                },
                items: {
                    path: "/",
                    template: oMessageTemplate
                }
            });

            // Set Model
            var oModel = new JSONModel(),
                that = this;

            oModel.setData(aMockMessages);

            this.oMessageView.setModel(oModel);

            // Create Popup 
            this._oPopover = new Popover({
                customHeader: oPopoverBar,
                contentWidth: "440px",
                contentHeight: "440px",
                verticalScrolling: false,
                modal: true,
                content: [this.oMessageView],
                footer: oPopoverFooter
            });
        },

        handlePopoverPress: function (oEvent) {
            // To make sure the Message popup is on the first screen
            this.oMessageView.navigateBack();
            // Opens the Popover and sets the Popover position accordingly
            this._oPopover.openBy(oEvent.getSource());
        },

        onMessageToast: function (oEvent) {
            MessageToast.show("Message Toast");
        },

        onMessageBox: function (oEvent) {
            MessageBox.information("This si Message Box");
        }

    });
});