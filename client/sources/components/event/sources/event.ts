
import { Registration } from './registration'

export class Event<Payload, Result=void>
{
	private registrations : Map<Registration,  (payload:Payload)=>Result> = new Map();

	public subscribe(callback: (payload:Payload)=>Result) : Registration
	{
		const registration = new Registration(this);
		this.registrations.set(registration, callback);
		return registration;
	}

	public unsubscribe(registration : Registration)
	{
		if(this.registrations.has(registration))
		{
			this.registrations.delete(registration);
		}
	}

	public fire(payload: Payload) : Result[]
	{
		let result: Result[] = [];
		for(const registration of this.registrations)
		{
			result.push(registration[1](payload));
		}
		return result;
	}
}