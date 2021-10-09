<template>
  <v-container fluid>
    <v-row v-if="contacts.length !== 0" justify="center" class="mt-4">
      <v-col md="4" v-for="contact in contacts" :key="contact.id">
        <Contact
          v-on:edit-contact="editContact"
          v-on:delete-contact="deleteContact"
          :contact="contact"
        />
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="mt-5">
      <h2>No contact with this combination!</h2>
    </v-row>
  </v-container>
</template> 

<script>
import Contact from "./Contact.vue";

export default {
  components: { Contact },
  name: "Contacts",
  props: {
    contacts: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    // sending out the eventdelete with the id parameter
    deleteContact(id) {
      this.$emit("delete-contact", id);
    },
    // sending out the event edit with the contact parameter
    editContact(contact) {
      this.$emit("edit-contact", contact);
    },
  },
};
</script>
