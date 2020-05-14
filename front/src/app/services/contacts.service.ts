import { Injectable ,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  onContactAdded: EventEmitter<any> = new EventEmitter<any>();
  onEditContact: EventEmitter<any> = new EventEmitter<any>();
  onMove2EditContact: EventEmitter<any> = new EventEmitter<any>();

  api_endpoint = 'http://localhost:3000/contacts';

  contacts = [];
  contact = {};
  
  constructor(private http:HttpClient) { }

  getContacts():Observable<any> {
    return this.http.get(this.api_endpoint);
  }

  addContact( contact ):Observable<any> {
    return this.http.post(this.api_endpoint, {contact});
  }

  editContact( contact ):Observable<any> {
    return this.http.put(this.api_endpoint,{contact});
  }

  deleteContact( contactId ):Observable<any> {
    return this.http.delete(this.api_endpoint + '/' + contactId);
  }

  notifyContactAdded( newContact ) {
    this.onContactAdded.emit( newContact )
  }

  notifyEditContact() {
    this.onEditContact.emit();
  }

  move2EditContact( contact ) {
    this.onMove2EditContact.emit( contact );
  }
}
