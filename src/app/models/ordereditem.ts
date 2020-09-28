import { Order } from "../models/order";
import { Item } from "../models/item";

export class OrderedItem {

	id: number;
    order: Order;
    item: Item;
	
    constructor() {}

    public setAll(newOrderedItem:OrderedItem):void{
		this.$id = newOrderedItem.$id; // called id in backend, not order_id
		this.$order = newOrderedItem.$order;
        this.$item = newOrderedItem.$item;
    }

    //getters, setters===============
    //id=============
	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}

    //order associated with ordered item=============
	public get $order(): Order {
		return this.order;
	}

	public set $order(value: Order) {
		this.order = value;
	}

    //item associated with ordered item=============
	public get $item(): Item {
		return this.item;
	}

	public set $item(value: Item) {
		this.item = value;
	}

    
}