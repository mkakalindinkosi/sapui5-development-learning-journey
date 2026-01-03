sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.Detail", {

        onInit: function () {
            // Attach route match event
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sCustomerGuid = oEvent.getParameter("arguments").customerGuid;

            if (!sCustomerGuid) {
                sap.m.MessageToast.show("Customer GUID is missing!");
                return;
            }

            // Bind the "customer" named model to this view
            this.getView().bindElement({
                path: "/UX_Customer('" + sCustomerGuid + "')"
             //   model: "customer"
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("overview", {}, true);
            }
        }

    });
});
