blizzApp.factory('BlizzardSvc', function($http, $q){
    var service = {};

    var host = "https://us.api.battle.net/wow/";
    var callback = "jsonp=JSON_CALLBACK";
    var locale = "locale=en_US";
    var apiKey = "apikey=aqjm6mmk5rzbkvzc65t2gcep9er4nk7b";
    var urlSuffix = callback + "&" + locale + "&" + apiKey;

    service.fetchRealms = function() {
        var url = host + "realm/status" + "?" + urlSuffix;
        var deferred = $q.defer();

        $http.jsonp(url).success(function(data, status) {
            deferred.resolve(data);
        });

        return deferred.promise;
    };
    
    service.fetchToonData = function(realmName, toonName) {
        var character = "character/" + realmName + "/" + toonName;
        var fields = "?fields=items,pets,mounts,hunterPets"
        var url = host + character + fields + "&" + urlSuffix;
        var deferred = $q.defer();

        $http.jsonp(url).success(function(data, status) {
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    return service;
});
