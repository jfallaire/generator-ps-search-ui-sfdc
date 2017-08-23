({
    generateSearchToken: function(component, event, helper) {
            // The deferred parameter for the event is a JQuery Deferred object;
            // The Coveo component expects the external code to resolve it with a valid search token
            var deferred = event.getParam('deferred');
            // getToken is the name of the Apex method that will be executed.
            var action = component.get('c.getToken');
     
            // The response will contain the token.
            // It is very important to resolve the deferred parameter
            // with a JSON containing searchToken as a key.
            action.setCallback(this, function(response){
                if(response.getState() == 'SUCCESS') {
                    deferred.resolve({
                        searchToken : response.getReturnValue()
                    })
                }
            })
     
            // Queue the action using the framework available methods.
            $A.enqueueAction(action);
        }
})