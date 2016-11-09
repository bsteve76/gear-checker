var blizzApp = angular.module("BlizzApp", ["ui.bootstrap"]);
blizzApp.controller("BlizzCtrl", BlizzCtrl);
BlizzCtrl.$inject = ["$scope","$http","BlizzardSvc"];

function BlizzCtrl($scope, $http, BlizzardSvc) {
    $scope.loading = false;
    $scope.realms = { selected: "Windrunner", all_realms: [] };
    $scope.toonName = "Mordalo";
    $scope.toon = {};
    $scope.items = {};
    $scope.pets = {};
    $scope.mounts = {};
    $scope.hunterPets = {};
    $scope.professions = [];
    $scope.titles = [];
    $scope.stats = {};
    $scope.power = [];

    $scope.init = function() {
        $scope.toon = {
            name: "",
            title: "",
            level: 0,
            gender: "",
            ach_points: 0,
            showTitle: false,
            classColor: ""
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

        $scope.pets = {};
        $scope.mounts = {};
        $scope.hunterPets = {};
        $scope.professions = [];
        $scope.titles = [];
        $scope.stats = {
            consumables: [],
            kills: {
                most: {
                    name: "",
                    highest: "",
                    quantity: 0
                }
            },
            deaths: 0,
            questsCompleted: 0,
            travel: [],
            combat: []
        };
        $scope.power = [];
    }

    $scope.init();

    BlizzardSvc.fetchRealms()
    .then(function(data) {
        angular.forEach(data.realms, function(item) {
            $scope.realms.all_realms.push(item.name);
        });
    });

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    $scope.fetchToon = function() {
        $scope.loading = true;
        $scope.init();

        BlizzardSvc.fetchToonData($scope.realms.selected, $scope.toonName)
            .then(processToon);
    }

    function processToon(data) {
        setToon(data);
        setPower(data);
        setStats(data);
        setItems(data);        
        setPets(data);
        setMounts(data);
        setHunterPets(data);
        setProfessions(data);
        $scope.loading = false;
    }

    function setToon(data) {
        $scope.toon.name = data.name;
        $scope.toon.level = data.level;
        $scope.toon.gender = (data.gender == 0) ? "M" : "F";
        $scope.toon.ach_points = data.achievementPoints;
        var toonClass = GetClass(data.class)
        $scope.toon.class = toonClass.class;
        $scope.toon.classColor = toonClass.color;
        $scope.toon.race = GetRace(data.race);
        $scope.toon.battlegroup = data.battlegroup;
        $scope.toon.honorableKills = data.totalHonorableKills;
        $scope.toon.achievementPoints = data.achievementPoints;
        $scope.toon.avatarUrl = "http://render-api-us.worldofwarcraft.com/static-render/us/" + data.thumbnail;

        var selectedTitle = "";
        angular.forEach(data.titles, function(title) {
            var fullTitle = title.name.replace("%s", $scope.toonName);
            if (title.selected) {
                selectedTitle = fullTitle;
                $scope.toon.title = fullTitle;
            } else {
                $scope.titles.push(fullTitle);
            }
        });

        if (selectedTitle !== "") {
            $scope.titles.unshift(selectedTitle);
        }
    }

    function setPower(data) {
        $scope.power.push({name: "Health", quantity: data.stats.health});
        $scope.power.push({name: data.stats.powerType.capitalizeFirstLetter(), quantity: data.stats.power});
        $scope.power.push({name: "Strength", quantity: data.stats.str});
        $scope.power.push({name: "Agility", quantity: data.stats.agi});
        $scope.power.push({name: "Intellect", quantity: data.stats.int});
        $scope.power.push({name: "Stamina", quantity: data.stats.sta});
        $scope.power.push({name: "Crit", quantity: data.stats.crit});
        $scope.power.push({name: "Haste", quantity: data.stats.haste});
        $scope.power.push({name: "Mastery", quantity: data.stats.mastery});
        $scope.power.push({name: "Versatility", quantity: data.stats.versatility});
        $scope.power.push({name: "Spell Crit", quantity: data.stats.spellCrit});
        $scope.power.push({name: "Armor", quantity: data.stats.armor});
        $scope.power.push({name: "Dodge", quantity: data.stats.dodge});
        $scope.power.push({name: "Parry", quantity: data.stats.parry});
        $scope.power.push({name: "Block", quantity: data.stats.block});
        $scope.power.push({name: "Main Hand DPS", quantity: data.stats.mainHandDps});
        $scope.power.push({name: "Off Hand DPS", quantity: data.stats.offHandDps});
        $scope.power.push({name: "Ranged DPS", quantity: data.stats.rangedDps});
    }

    function setStats(data) {
        angular.forEach(data.statistics.subCategories[0].subCategories[0].statistics, function(stat) {
            var highest;
            if (stat.highest) {
                highest = stat.highest;
            }

            $scope.stats.consumables.push({
                name: stat.name,
                highest: highest,
                quantity: stat.quantity
            });
        });

        angular.forEach(data.statistics.subCategories[1].statistics, function(stat) {
            $scope.stats.combat.push({
                name: stat.name,
                quantity: stat.quantity
            });
        });

        $scope.stats.kills = {
            quantity: data.statistics.subCategories[2].statistics[0].quantity
        };

        $scope.stats.kills.most = {
            name: data.statistics.subCategories[2].subCategories[0].statistics[2].name,
            highest: data.statistics.subCategories[2].subCategories[0].statistics[2].highest,
            quantity: data.statistics.subCategories[2].subCategories[0].statistics[2].quantity
        };
        
        $scope.stats.deaths = data.statistics.subCategories[3].statistics[0].quantity;
        $scope.stats.questsCompleted = data.statistics.subCategories[4].statistics[0].quantity;
        $scope.stats.dailiesCompleted = data.statistics.subCategories[4].statistics[2].quantity;

        $scope.stats.travel.push({
            name: data.statistics.subCategories[7].statistics[0].name,
            quantity: data.statistics.subCategories[7].statistics[0].quantity
        });
        
        $scope.stats.travel.push({
            name: data.statistics.subCategories[7].statistics[4].name,
            quantity: data.statistics.subCategories[7].statistics[4].quantity
        });
    }

    function setItems(data) {
        $scope.items.avgItemLvl = data.items.averageItemLevel;
        $scope.items.avgItemLvlEquipped = data.items.averageItemLevelEquipped;

        var slots = ["back","chest","feet","finger1","finger2","hands","head","legs","mainHand","neck","offHand","shoulder","trinket1","trinket2","waist","wrist"];
        angular.forEach(slots, function(value, key) {
            if (data.items[value] !== undefined) {
                $scope.items[value] = {
                    id: data.items[value].id,
                    name: data.items[value].name,
                    quality: data.items[value].quality,
                    itemLevel: data.items[value].itemLevel,
                    stats: GetStats(data.items[value].stats),
                    armor: data.items[value].armor
                };
            }
        });
        
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
    }

    function setPets(data) {
        $scope.pets = {
            collectedCount: data.pets.numCollected,
            uncollectedCount: data.pets.numNotCollected,
            sortOrder: "name",
            sortDesc: false,
            pets: []
        };

        angular.forEach(data.pets.collected, function(pet) {
            $scope.pets.pets.push({
                name: pet.name,
                level: pet.stats.level,
                canBattle: pet.canBattle ? "Yes" : "No",
                quality: pet.qualityId
            });
        });

    }

    function setMounts(data) {
        $scope.mounts = {
            collectedCount: data.mounts.numCollected,
            uncollectedCount: data.mounts.numNotCollected,
            sortOrder: "name",
            sortDesc: false,
            mounts: []
        };

        angular.forEach(data.mounts.collected, function(mount) {
            $scope.mounts.mounts.push({ 
                name: mount.name,
                flying: mount.isFlying ? "Yes" : "No"
            });
        });
    }

    function setHunterPets(data) {
        $scope.hunterPets = {
            sortOrder: "name",
            sortDesc: false,
            hunterPets: []
        };

        angular.forEach(data.hunterPets, function(hpet) {
            var role = "N/A";
            if (hpet.spec !== undefined) {
                role = hpet.spec.role;
            }

            $scope.hunterPets.hunterPets.push({ 
                name: hpet.name,
                familyName: hpet.familyName,
                role: role
            });
        });
    }

    function setProfessions(data) {
        angular.forEach(data.professions.primary, function(profession) {
            $scope.professions.push({
                name: profession.name,
                rank: profession.rank,
                maxRank: profession.max
            });
        });

        angular.forEach(data.professions.secondary, function(profession) {
            $scope.professions.push({
                name: profession.name,
                rank: profession.rank,
                maxRank: profession.max
            });
        });
    }

    function GetClass(classId) {
        var toon = {
            class: "",
            color: ""
        };

        switch (classId) {
            case 1: toon.class = "Warrior"; break;
            case 2: toon.class = "Paladin"; break;
            case 3: toon.class = "Hunter"; break;
            case 4: toon.class = "Rogue"; break;
            case 5: toon.class = "Priest"; break;
            case 6: toon.class = "Death Knight"; break;
            case 7: toon.class = "Shaman"; break;
            case 8: toon.class = "Mage"; break;
            case 9: toon.class = "Warlock"; break;
            case 10: toon.class = "Monk"; break;
            case 11: toon.class = "Druid"; break;
        }
        
        toon.color = toon.class.replace(" ", "-").toLowerCase();
        return toon;
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
}
