// export interface User {
// 	user_id: number;
//     username: string;
//     password: string;
// 	firstName: string; //unsure about camel case when interacting with backend
// 	lastName: string;
//     email: string;
//     role: string; //may need to change back to number, depending on what is sent back
//   }


export class User {

	user_id: number;
    username: string;
    password: string;
	firstName: string; //unsure about camel case when interacting with backend
	lastName: string;
    email: string;
    role: string; //may need to change back to number, depending on what is sent back
    
    constructor() {}

    public setAll(newUser:User):void{
		this.$user_id = newUser.$user_id;
		this.$username = newUser.$username;
        this.$password = newUser.$password;
        this.$firstName = newUser.$firstName;
        this.$lastName = newUser.$lastName;
        this.$email = newUser.$email;
        this.$role = newUser.$role;
    }

    //getters, setters===============
    //id=============
	public get $user_id(): number {
		return this.user_id;
	}

	public set $user_id(value: number) {
		this.user_id = value;
	}

    //username=============
	public get $username(): string {
		return this.username;
	}

	public set $username(value: string) {
		this.username = value;
	}

    //password=============
	public get $password(): string {
		return this.password;
	}

	public set $password(value: string) {
		this.password = value;
	}

    //firstname=============
	public get $firstName(): string {
		return this.firstName;
	}

	public set $firstName(value: string) {
		this.firstName = value;
    }
    
    //lastname=============
	public get $lastName(): string {
		return this.lastName;
	}

	public set $lastName(value: string) {
		this.lastName = value;
	}

    //email=============
	public get $email(): string {
		return this.email;
	}

	public set $email(value: string) {
		this.email = value;
    }

    //email=============
	public get $role(): string {
		return this.role;
	}

	public set $role(value: string) {
		this.role = value;
    }
}