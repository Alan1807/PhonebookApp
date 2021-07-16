import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { PhonebookService } from 'src/app/service/phonebook.service';

const $ = window['jQuery'];

@Component({
  selector: 'pb-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {


  contacts: Contact[];
  pageNumber: number = 1;

  constructor(private service: PhonebookService) { }

  ngOnInit() {

    this.service.getAllContacts()
      .subscribe( data => this.contacts = data );
    
    // $(window).scroll(function() {
    //   let w = $(window);
    //   let d = $(document);

    //   if (w.height() + d.scrollTop() === d.height()) {
    //     this.loadMore();
    //   }
    // });

    $(window).on('scroll', () => {
      let w = $(window);
      let d = $(document);

      if (w.height() + d.scrollTop() === d.height()) {
        this.loadMore();
      }
    });

  }

  loadMore() {
    this.pageNumber++;
    this.service.getAllContacts(this.pageNumber)
      .subscribe(data => this.contacts = [...this.contacts, ...data]);
  }

}
