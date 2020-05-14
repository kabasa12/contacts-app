import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contact = {
    _id: undefined,
    name: '',
    email:'',
    phone: ''
  }

  constructor(private contactsService:ContactsService) { 
    contactsService.onMove2EditContact.subscribe( editContact =>{
      this.contact = editContact;
    })
  }

  ngOnInit(): void {
  }

  saveContact() {
    if(this.contact._id === undefined) {
      //  add
      this.contactsService.addContact( this.contact ).subscribe( apiResponse => {

        if( apiResponse.success ) {
          this.contactsService.notifyContactAdded( apiResponse.data );
          this.contact = {
            _id: undefined,
            name:'',
            email:'',
            phone:''
          }
        }

      })
    } else {
      // edit
      this.contactsService.editContact( this.contact ).subscribe( apiResponse => {
        if( apiResponse.success ){
          this.contactsService.notifyEditContact();
          this.contact = {
                  _id: undefined,
                  name:'',
                  email:'',
                  phone:''
                }  
        }
      });
    }
  }
}
