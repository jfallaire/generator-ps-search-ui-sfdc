public with sharing class Coveo_CommunitySearch {
	@AuraEnabled
    public static string getToken() {
        String filter = '';
        
        return CoveoV2.Globals.generateSearchToken(new Map<String, Object> {
            'filter' => filter
        });
    }
}