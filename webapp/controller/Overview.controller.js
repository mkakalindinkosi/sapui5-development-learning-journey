sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    syncStyleClass,
    JSONModel,
    Filter,
    FilterOperator
) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.Overview", {

        onInit: function () {
            // Model for form editing
            this.getView().setModel(new JSONModel({}), "customer");
        },

        onSave: function () {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "sap.training.exc.view.Dialog"
                }).then(function (oDialog) {
                    syncStyleClass(
                        this.getOwnerComponent().getContentDensityClass(),
                        this.getView(),
                        oDialog
                    );
                    return oDialog;
                }.bind(this));
            }

            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this.byId("dialog").close();
        },

        onCustomerChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            if (!oItem) {
                return;
            }

            var oContext = oItem.getBindingContext();

            // 🔑 THIS LINE MAKES BOOKINGS WORK
            this.byId("bookingTable").setBindingContext(oContext);

            // Fill edit form
            this.getView()
                .getModel("customer")
                .setData(oContext.getObject());
        },

        onFilterCustomers: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilters = [];

            if (sQuery) {
                aFilters.push(
                    new Filter("CustomerName", FilterOperator.Contains, sQuery)
                );
            }

            this.byId("customerTable")
                .getBinding("items")
                .filter(aFilters);
        }
    });
});
