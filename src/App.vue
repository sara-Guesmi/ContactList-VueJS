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
    try {
      let res = await axios.get(`http://localhost:3000/contacts`);
      this.list = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // add a newContact to the list contactData
    async addContact(newContact) {
      // the variable list recieve a new array , adding the newContact
      try {
        await axios.post(`http://localhost:3000/contacts`, newContact);
        let res = await axios.get(`http://localhost:3000/contacts`);

        this.list = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    // delete a contact to the list contactData using his id
    async deleteContact(id) {
      // before we delete we should cofirm it
      const confirm = window.confirm("are you sure to delete the contact?");
      // if confirm is true so we filter the data
      if (confirm) {
        try {
          await axios.delete(`http://localhost:3000/contacts/${id}`);
          let res = await axios.get(`http://localhost:3000/contacts`);

          this.list = res.data;
        } catch (error) {
          console.log(error);
        }
      }
    },

    // edit the current contact
    async editContact(contact) {
      // we search the current contact in the array using the id
      try {
        await axios.put(
          `http://localhost:3000/contacts/${contact.id}`,
          contact
        );
        let res = await axios.get(`http://localhost:3000/contacts`);

        this.list = res.data;
      } catch (error) {
        console.log(error);
      }
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
          el.firstName
            .toLowerCase()
            .includes(searchedContact.trim().toLowerCase()) ||
          el.lastName
            .toLowerCase()
            .includes(searchedContact.trim().toLowerCase()) ||
          el.email.toLowerCase().includes(searchedContact.trim().toLowerCase())
      );
    },
  },
};
</script>
