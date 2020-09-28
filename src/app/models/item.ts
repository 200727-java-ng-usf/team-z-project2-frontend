

export class Item {
    //id name price stock description itemImageUrl genre_id
	id: number;
    name: string;
    price: string;
	stock: number; //unsure about camel case when interacting with backend
	description: string;
    itemImageUrl: string;
    genre: string; //may need to change back to number, depending on what is sent back
    
    constructor() {}

    public setAll(newItem:Item):void{
		this.$id = newItem.$id;
		this.$name = newItem.$name;
        this.$price = newItem.$price;
        this.$stock = newItem.$stock;
        this.$description = newItem.$description;
        this.$itemImageUrl = newItem.$itemImageUrl;
        this.$genre = newItem.$genre;
    }

    //getters, setters===============
    //id=============
	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
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
	public get $genre(): string {
		return this.genre;
	}

	public set $genre(value: string) {
		this.genre = value;
    }
}