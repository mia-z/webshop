class Product {
    constructor(id, name, category, price, imageUrl, desc) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.colours = [];
        this.selectedColour = undefined;
        this.desc = desc;
    }

    get getName() {
        return this.name;
    }

    get getPrice() {
        return this.price;
    }

    get getCategory() {
        return this.category;
    }

    get getImageUrl() {
        return this.imageUrl;
    }

    get getColours() {
        return this.colours;
    }

    set setColour(c) {
        this.colour = c;
    }

    set setColours(c) {
        this.colours = c;
    }
}