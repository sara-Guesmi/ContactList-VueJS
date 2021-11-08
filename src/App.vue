<template>
  <v-app>
    <AddContact
      v-on:search-contact="handleSearch"
      v-on:addContact="addContact"
    />

    <Contacts
      v-on:edit-contact="editContact"
      v-on:delete-contact="deleteContact"
      :contacts="searchedList(list, searchedContact)"
    />
  </v-app>
</template>

<script>
import Contacts from "./components/Contacts.vue";
import AddContact from "./components/AddContact.vue";
import axios from "axios";
export default {
  name: "App",

  components: {
    Contacts,
    AddContact,
  },

  data: () => ({
    list: [],
    searchedContact: "",
  }),
  async created() {
    let res = await axios.get(`http://localhost:3000/contacts`);
    this.list = res.data;
  },
  methods: {
    // add a newContact to the list contactData
    addContact(newContact) {
      // the variable list recieve a new array , adding the newContact
      this.list = [...this.list, newContact];
    },

    // delete a contact to the list contactData using his id
    deleteContact(id) {
      // before we delete we should cofirm it
      const confirm = window.confirm("are you sure to delete the contact?");
      // if confirm is true so we filter the data
      if (confirm) {
        this.list = this.list.filter((contact) => contact.id !== id);
      }
    },

    // edit the current contact
    editContact(contact) {
      // we search the current contact in the array using the id
      // if we found it we change its value
      this.list = this.list.map((el) => (el.id == contact.id ? contact : el));
    },

    // change the value of the searchedContact by the recieved from the component
    handleSearch(searchedContact) {
      this.searchedContact = searchedContact;
    },

    // change the list send it to contact  by the filtred one
    searchedList(list, searchedContact) {
      // serachedList return a filtyred array=> passed as a props to contacts components
      return list.filter(
        (el) =>
          el.firstName.toLowerCase().includes(searchedContact.toLowerCase()) ||
          el.lastName.toLowerCase().includes(searchedContact.toLowerCase()) ||
          el.email.toLowerCase().includes(searchedContact.toLowerCase())
      );
    },
  },
};
</script>
