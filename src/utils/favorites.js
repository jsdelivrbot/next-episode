class FavoritesUtil {

    constructor() {
        self.__favorites = [];

        var oReq = new XMLHttpRequest();
        oReq.onload = (function(e) {
            self.__favorites = JSON.parse(oReq.responseText);
        });
        oReq.open("get", "./favorites.json", true);
        oReq.send();
    }

    flushData() {
        console.log(self.__favorites);
    }

    addToFavorites(id) {
        var index = self.__favorites.indexOf(id);

        if (index === -1) {
            self.__favorites.push(id);
            this.flushData();
        }
    }

    removeFromFavorites(id) {
        var index = self.__favorites.indexOf(id);

        if (index !== -1) {
            self.__favorites.splice(index, 1);
            this.flushData();
        }
    }

    isFavorite(id) {
        return self.__favorites.indexOf(id) !== -1;
    }
}

module.exports = new FavoritesUtil();