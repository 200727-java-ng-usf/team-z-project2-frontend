import { User } from "../models/user";

export class Order {
	user_id: number;
	id: number;
	user: User;
	timeCreated: Date;
    itemCount: number;
	price: number; //unsure about camel case when interacting with backend
	
    constructor() {}

    public setAll(newOrder:Order):void{
		this.$id = newOrder.$id; // called id in backend, not order_id
		this.$user = newOrder.$user;
        this.$itemCount = newOrder.$itemCount;
        this.$price = newOrder.$price;
    }

    //getters, setters===============
    //id=============
	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}

    //user associated with order=============
	public get $user(): User {
		return this.user;
	}

	public set $user(value: User) {
		this.user = value;
	}

	//timeCreated=================
	public get $timeCreated(): Date {
		return this.timeCreated;
	}

	public set $timeCreated(value: Date) {
		this.timeCreated = this.timeCreated;
	}

    //itemCount=============
	public get $itemCount(): number {
		return this.itemCount;
	}

	public set $itemCount(value: number) {
		this.itemCount = value;
	}

    //price=============
	public get $price(): number {
		return this.itemCount;
	}

	public set $price(value: number) {
		this.price = value;
    }
    
}