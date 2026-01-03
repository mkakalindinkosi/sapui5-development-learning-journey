sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("sap.training.exc.controller.Overview", {

        onInit: function () {
            // Model for form editing
            this.getView().setModel(new JSONModel({}), "customer");
        },

        onSave: function () {
            var oModelData = this.getView().getModel("customer").getData();
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            if (!oModelData.Discount) {
                oModelData.Discount = "0";
            }

            // Create new customer entry
            this.byId("customerTable").getBinding("items").create({
                CustomerName: oModelData.CustomerName,
                Discount: oModelData.Discount,
                Street: oModelData.Street,
                PostCode: oModelData.PostCode,
                City: oModelData.City,
                Country: oModelData.Country,
                Form: oModelData.Form,
                Email: oModelData.Email,
                Telephone: oModelData.Telephone
            }).created().then(function () {
                MessageToast.show(oResourceBundle.getText("customerCreatedMessage"));
            });
        },

        onCustomerChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            if (!oItem) return;

            var oContext = oItem.getBindingContext();

            // Bind bookings table to the selected customer
            this.byId("bookingTable").setBindingContext(oContext);

            // Fill the edit form
            this.getView().getModel("customer").setData(oContext.getObject());
        },

        onFilterCustomers: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
            }

            this.byId("customerTable").getBinding("items").filter(aFilters);
        },

        onNavToDetails: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext();

            if (!oContext && oSource.getParent) {
                oContext = oSource.getParent().getBindingContext();
            }

            if (!oContext) {
                MessageToast.show("Please select a customer first");
                return;
            }

            // ✅ Use CustomerGuid (the real OData key)
            var sCustomerGuid = oContext.getProperty("CustomerGuid");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", { customerGuid: sCustomerGuid });
        }

    });
});
