var blizzApp = angular.module("BlizzApp", ["ui.bootstrap"]);

blizzApp.controller("BlizzCtrl", function($scope, $http, BlizzardSvc) {
    $scope.loading = false;
    $scope.realms = { selected: "Windrunner", all_realms: [] };
    $scope.toonName = "Mordalo";
    $scope.toon = {};
    $scope.items = {};
    $scope.pets = [];
    $scope.mounts = [];
    $scope.hunterPets = [];

    $scope.init = function() {
        $scope.toon = {
            name: "",
            level: 0,
            gender: "",
            ach_points: 0
        };

        $scope.items = {
            avgItemLvl: 0,
            avgItemLvlEquipped: 0,
            back: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            chest: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            feet: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            finger1: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            finger2: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            hands: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            head: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            legs: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            mainHand: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            neck: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            offHand: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            shoulder: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            trinket1: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            trinket2: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            waist: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 },
            wrist: { id: 0, name: "", quality: 0, itemLevel: 0, stats: [], armor: 0 }
        };

        $scope.pets = [];
        $scope.mounts = [];
        $scope.hunterPets = [];
    }

    $scope.init();

    BlizzardSvc.fetchRealms()
    .then(function(data) {
        angular.forEach(data.realms, function(item) {
            $scope.realms.all_realms.push(item.name);
        });
    });

    $scope.fetchToon = function() {
        $scope.init();
        $scope.loading = true;

        BlizzardSvc.fetchToonData($scope.realms.selected, $scope.toonName)
        .then(function(data) {
            $scope.toon.name = data.name;
            $scope.toon.level = data.level;
            $scope.toon.gender = (data.gender == 0) ? "M" : "F";
            $scope.toon.ach_points = data.achievementPoints;
            $scope.toon.class = GetClass(data.class);
            $scope.toon.race = GetRace(data.race);

            $scope.items.avgItemLvl = data.items.averageItemLevel;
            $scope.items.avgItemLvlEquipped = data.items.averageItemLevelEquipped;

            if (data.items.back !== undefined) {
                $scope.items.back = {
                    id: data.items.back.id,
                    name: data.items.back.name,
                    quality: data.items.back.quality,
                    itemLevel: data.items.back.itemLevel,
                    stats: GetStats(data.items.back.stats),
                    armor: data.items.back.armor
                };
            }

            if (data.items.chest !== undefined) {
                $scope.items.chest = {
                    id: data.items.chest.id,
                    name: data.items.chest.name,
                    quality: data.items.chest.quality,
                    itemLevel: data.items.chest.itemLevel,
                    stats: GetStats(data.items.chest.stats),
                    armor: data.items.chest.armor
                };
            }

            if (data.items.feet !== undefined) {
                $scope.items.feet = {
                    id: data.items.feet.id,
                    name: data.items.feet.name,
                    quality: data.items.feet.quality,
                    itemLevel: data.items.feet.itemLevel,
                    stats: GetStats(data.items.feet.stats),
                    armor: data.items.feet.armor
                };
            }

            if (data.items.finger1 !== undefined) {
                $scope.items.finger1 = {
                    id: data.items.finger1.id,
                    name: data.items.finger1.name,
                    quality: data.items.finger1.quality,
                    itemLevel: data.items.finger1.itemLevel,
                    stats: GetStats(data.items.finger1.stats),
                    armor: data.items.finger1.armor
                };
            }

            if (data.items.finger2 !== undefined) {
                $scope.items.finger2 = {
                    id: data.items.finger2.id,
                    name: data.items.finger2.name,
                    quality: data.items.finger2.quality,
                    itemLevel: data.items.finger2.itemLevel,
                    stats: GetStats(data.items.finger2.stats),
                    armor: data.items.finger2.armor
                };
            }

            if (data.items.hands !== undefined) {
                $scope.items.hands = {
                    id: data.items.hands.id,
                    name: data.items.hands.name,
                    quality: data.items.hands.quality,
                    itemLevel: data.items.hands.itemLevel,
                    stats: GetStats(data.items.hands.stats),
                    armor: data.items.hands.armor
                };
            }

            if (data.items.head !== undefined) {
                $scope.items.head = {
                    id: data.items.head.id,
                    name: data.items.head.name,
                    quality: data.items.head.quality,
                    itemLevel: data.items.head.itemLevel,
                    stats: GetStats(data.items.head.stats),
                    armor: data.items.head.armor
                };
            }

            if (data.items.legs !== undefined) {
                $scope.items.legs = {
                    id: data.items.legs.id,
                    name: data.items.legs.name,
                    quality: data.items.legs.quality,
                    itemLevel: data.items.legs.itemLevel,
                    stats: GetStats(data.items.legs.stats),
                    armor: data.items.legs.armor
                };
            }

            if (data.items.mainHand !== undefined) {
                $scope.items.mainHand = {
                    id: data.items.mainHand.id,
                    name: data.items.mainHand.name,
                    quality: data.items.mainHand.quality,
                    itemLevel: data.items.mainHand.itemLevel,
                    stats: GetStats(data.items.mainHand.stats),
                    armor: data.items.mainHand.armor
                };
            }

            if (data.items.neck !== undefined) {
                $scope.items.neck = {
                    id: data.items.neck.id,
                    name: data.items.neck.name,
                    quality: data.items.neck.quality,
                    itemLevel: data.items.neck.itemLevel,
                    stats: GetStats(data.items.neck.stats),
                    armor: data.items.neck.armor
                };
            }

            if (data.items.offHand !== undefined) {
                $scope.items.offHand = {
                    id: data.items.offHand.id,
                    name: data.items.offHand.name,
                    quality: data.items.offHand.quality,
                    itemLevel: data.items.offHand.itemLevel,
                    stats: GetStats(data.items.offHand.stats),
                    armor: data.items.offHandback.armor
                };
            }

            if (data.items.shoulder !== undefined) {
                $scope.items.shoulder = {
                    id: data.items.shoulder.id,
                    name: data.items.shoulder.name,
                    quality: data.items.shoulder.quality,
                    itemLevel: data.items.shoulder.itemLevel,
                    stats: GetStats(data.items.shoulder.stats),
                    armor: data.items.shoulder.armor
                };
            }

            if (data.items.trinket1 !== undefined) {
                $scope.items.trinket1 = {
                    id: data.items.trinket1.id,
                    name: data.items.trinket1.name,
                    quality: data.items.trinket1.quality,
                    itemLevel: data.items.trinket1.itemLevel,
                    stats: GetStats(data.items.trinket1.stats),
                    armor: data.items.trinket1.armor
                };
            }

            if (data.items.trinket2 !== undefined) {
                $scope.items.trinket2 = {
                    id: data.items.trinket2.id,
                    name: data.items.trinket2.name,
                    quality: data.items.trinket2.quality,
                    itemLevel: data.items.trinket2.itemLevel,
                    stats: GetStats(data.items.trinket2.stats),
                    armor: data.items.trinket2.armor
                };
            }

            if (data.items.waist !== undefined) {
                $scope.items.waist = {
                    id: data.items.waist.id,
                    name: data.items.waist.name,
                    quality: data.items.waist.quality,
                    itemLevel: data.items.waist.itemLevel,
                    stats: GetStats(data.items.waist.stats),
                    armor: data.items.waist.armor
                };
            }

            if (data.items.wrist !== undefined) {
                $scope.items.wrist = {
                    id: data.items.wrist.id,
                    name: data.items.wrist.name,
                    quality: data.items.wrist.quality,
                    itemLevel: data.items.wrist.itemLevel,
                    stats: GetStats(data.items.wrist.stats),
                    armor: data.items.wrist.armor
                };
            }
            
            var lowestItemLevel = 1000;
            var highestItemLevel = 0;
            $scope.items.lowestItem;
            $scope.items.highestItem;
            angular.forEach($scope.items, function(slot) {
                if (slot.itemLevel != 0) {
                    if (slot.itemLevel < lowestItemLevel) {
                        lowestItemLevel = slot.itemLevel;
                        $scope.items.lowestItem = slot;
                    }
                    
                    if (slot.itemLevel > highestItemLevel) {
                        highestItemLevel = slot.itemLevel;
                        $scope.items.highestItem = slot;
                    }
                }
            });

            angular.forEach(data.pets.collected, function(pet) {
                $scope.pets.push({
                    name: pet.name,
                    level: pet.stats.level
                });
            });

            angular.forEach(data.mounts.collected, function(mount) {
                $scope.mounts.push({ 
                    name: mount.name,
                    ground: mount.isGround,
                    flying: mount.isFlying
                });
            });

            angular.forEach(data.hunterPets, function(hpet) {
                $scope.hunterPets.push({ 
                    name: hpet.name,
                    familyName: hpet.familyName
                });
            });
        });

        $scope.loading = false;
    }

    function GetClass(classId) {
        var toonClass = "";
        switch (classId) {
            case 1: toonClass = "Warrior"; break;
            case 2: toonClass = "Paladin"; break;
            case 3: toonClass = "Hunter"; break;
            case 4: toonClass = "Rogue"; break;
            case 5: toonClass = "Priest"; break;
            case 6: toonClass = "Death Knight"; break;
            case 7: toonClass = "Shaman"; break;
            case 8: toonClass = "Mage"; break;
            case 9: toonClass = "Warlock"; break;
            case 10: toonClass = "Monk"; break;
            case 11: toonClass = "Druid"; break;
        }
        return toonClass;
    }

    function GetRace(raceId) {
        var race = "";
        switch (raceId) {
            case 1: race = "Human"; break;
            case 2: race = "Orc"; break;
            case 3: race = "Dwarf"; break;
            case 4: race = "Night Elf"; break;
            case 5: race = "Undead"; break;
            case 6: race = "Tauren"; break;
            case 7: race = "Gnome"; break;
            case 8: race = "Troll"; break;
            case 9: race = "Goblin"; break;
            case 10: race = "Blood Elf"; break;
            case 11: race = "Draenei"; break;
            case 22: race = "Worgen"; break;
            case 24:
            case 25:
            case 26: race = "Pandaren"; break;
        }
        return race;
    }

    function GetStats(stats) {
        var itemStats = [];
        angular.forEach(stats, function(stat) {
            switch (stat.stat) {
                case 73: itemStats.push({ stat: "Agility or Int", amount: stat.amount }); break;
                case 3: itemStats.push({ stat: "Agility", amount: stat.amount }); break;
                case 7: itemStats.push({ stat: "Stamina", amount: stat.amount }); break;
                case 40: itemStats.push({ stat: "Versatility", amount: stat.amount }); break;
                case 59: itemStats.push({ stat: "Multistrike", amount: stat.amount }); break;
                case 36: itemStats.push({ stat: "Haste", amount: stat.amount }); break;
                case 32: itemStats.push({ stat: "Critical Strike", amount: stat.amount }); break;
                case 49: itemStats.push({ stat: "Mastery", amount: stat.amount }); break;
            }
        });
        return itemStats;
    }

})
