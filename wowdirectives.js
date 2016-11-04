blizzApp.directive("showItem", function ($compile) {
    function getTemplate(slot) {
        var template = "<div style='color:white; padding:5px; margin-bottom:3px;border-radius:5px;border:2px solid gray' ng-class='{\"uncommon\": item.quality == 2, \"rare\": item.quality == 3, \"epic\": item.quality == 4, \"legendary\": item.quality == 6}' ng-show='item.itemLevel > 0'>" +
                    "<i>" + slot + "</i> (<b>{{item.itemLevel}}</b>)<br /><a href='https://www.wowhead.com/item={{item.id}}' target='_blank' style='font-size:large'>{{item.name}}</a>" +
                    "<ul style='list-style-type:none; font-size:small; margin-left:-25px'><span ng-if='item.armor > 0'>Armor - {{item.armor}}<br /></span><li ng-repeat='istat in item.stats | orderBy: \"stat\" | orderBy: \"stat\"'>{{istat.stat}} - {{istat.amount}}</li></ul></div>";
        return template;
    }

    function link(scope, element, attrs) {
        element.html(getTemplate(attrs.slot));
        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        scope: {
            item: "=",
            slot: "@"
        },
        link: link
    };
});
