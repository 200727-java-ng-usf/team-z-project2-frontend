

export class Item {
    //id name price stock description itemImageUrl genre_id
	item_id: number;
    name: string;
    price: string;
	stock: number; //unsure about camel case when interacting with backend
	description: string;
    itemImageUrl: string;
    genre_id: string; //may need to change back to number, depending on what is sent back
    
    constructor() {}

    public setAll(newItem:Item):void{
		this.$item_id = newItem.$item_id;
		this.$name = newItem.$name;
        this.$price = newItem.$price;
        this.$stock = newItem.$stock;
        this.$description = newItem.$description;
        this.$itemImageUrl = newItem.$itemImageUrl;
        this.$genre_id = newItem.$genre_id;
    }

    //getters, setters===============
    //id=============
	public get $item_id(): number {
		return this.item_id;
	}

	public set $item_id(value: number) {
		this.item_id = value;
	}

    //name=============
	public get $name(): string {
		return this.name;
	}

	public set $name(value: string) {
		this.name = value;
	}

    //price=============
	public get $price(): string {
		return this.price;
	}

	public set $price(value: string) {
		this.price = value;
	}

    //stock=============
	public get $stock(): number {
		return this.stock;
	}

	public set $stock(value: number) {
		this.stock = value;
    }
    
    //description=============
	public get $description(): string {
		return this.description;
	}

	public set $description(value: string) {
		this.description = value;
	}

    //itemImageUrl=============
	public get $itemImageUrl(): string {
		return this.itemImageUrl;
	}

	public set $itemImageUrl(value: string) {
		this.itemImageUrl = value;
    }

    //genre_id=============
	public get $genre_id(): string {
		return this.genre_id;
	}

	public set $genre_id(value: string) {
		this.genre_id = value;
    }
}