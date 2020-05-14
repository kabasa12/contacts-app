import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts = [];
  constructor(private contactsService:ContactsService) { 
    
    this.getContacts();

    contactsService.onContactAdded.subscribe( newContact => {
      this.contacts.push( newContact );
    });

    contactsService.onEditContact.subscribe(()=>{
      this.getContacts();
    });
  }

  ngOnInit() {
  }

  getContacts(){
    this.contactsService.getContacts().subscribe(apiRes => {

      if(apiRes.success)
        this.contacts = apiRes.data;
    });
  }

  editContact( contact ) {
    this.contactsService.move2EditContact( contact );
  }

  deleteContact( contactId ){
    
    let index = this.contacts.findIndex( contact => contact._id === contactId);
    if(index != -1) {
      this.contactsService.deleteContact(contactId).subscribe(apiRes => {
        if(apiRes.success) {
          this.contacts.splice(index,1);
        }
      });
    }
    
  }
}
