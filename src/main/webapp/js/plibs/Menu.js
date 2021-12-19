var menuData = [
    [1, 1, "Dashboard", "fa fa-lg fa-fw fa-bar-chart-o", "", 0, "#", "", "m1"],
    [2, 2, "My Profile", "fa fa-lg fa-fw fa-asterisk", "", 0, "", "tab", "m2"],
    [3, 2, "Change Password", "fa fa-lg fa-fw fa-asterisk", "", 0, "ui/common/dashboard/ChangePassword.html", "", "m3"]
];

var mainMenu = document.getElementById("menu");


function Menu() {
    this.id;
    this.dom;
    this.data;
    this.domId;

    this.setDomId = function (pDomId) {
        this.domId = pDomId;
    };

    this.getDomId = function () {
        return this.domId;
    };

    this.setId = function (pId) {
        this.id = pId;
    };

    this.getId = function () {
        return this.id;
    };

    this.getData = function () {
        return this.data;
    };

    this.setData = function (pData) {
        this.data = pData;
    };

    this.setDom = function (pDom) {
        this.dom = pDom;
    };

    this.getDom = function () {
        return this.dom;
    };

    this.createli = function (pObj) {
        var li = document.createElement('li');
        li.dataset.id = pObj[0];
        li.innerHTML =
                '<a href="' + pObj[5] + '" target="' + pObj[6] + '" id="a' + pObj[1] + '"><i class=" ' + pObj[3] + '"></i>' +
                '<span class="menu-item-parent">' + pObj[2] + '</span>' +
                '<span class="badge pull-right inbox-badge margin-right-13">' + pObj[4] + '</span></a>';
        return li;
    };


    this.render = function () {
        
        var map = {};
        var mainMenu = this.dom;
        var data = this.data;
//        
        for (var i = 0; i < data.length; i++) {
            var parent = data[i][1];
            if (data[i][0] === parent) { //if its the same element and its own parent.
                mainMenu.appendChild(this.createli(data[i]));
            } else {
                var el = mainMenu.querySelector("[data-id='" + parent + "']"); //search for elements parent.
                if (el) { //elements exists in main menu.
                    var subMenu = el.querySelector("ul");
                    if (!subMenu) { //if submenu exists in element.
                        subMenu = document.createElement("ul"); //create the submenu.
                        el.appendChild(subMenu);
                    }

                    if (map[parent]) {
                        map[parent].forEach(function (el) { //add all the elements present in map to this parent element
                            subMenu.appendChild(createListElement(el));
                        });
                        delete map[parent]; //not needed. Since new elements can be added to DOM subtree.
                    }
                    subMenu.appendChild(this.createli(data[i]));
                } else {
                    if (!map[parent]) { //create if doesn't exists
                        map[parent] = [];
                    }
                    map[parent].push(data[i]); //add to list as child.
                }
            }
        }
    };
}