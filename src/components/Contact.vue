<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1 name">
          {{ contact.firstName }} {{ contact.lastName }}
        </v-list-item-title>

        <v-list-item-subtitle class="email">{{
          contact.email
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="transparent">
        <v-img
          class="elevation-6"
          alt="avatar"
          v-if="contact.gender == 'female'"
          src="../assets/female-avatar.png"
        ></v-img>
        <v-img
          class="elevation-6 avatar"
          alt="avatar"
          v-if="contact.gender == 'male'"
          src="../assets/male-avatar.jpg"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        @click="deleteContact"
        class="mt-8 ml-6 delete"
        id="btn-delete"
        text
      >
        <v-icon color="grey"> mdi-delete </v-icon>
      </v-btn>

      <AddContact
        v-on:edit-user="editContact"
        v-bind:isEdit="true"
        :contact="contact"
      />
    </v-card-actions>
  </v-card>
</template>



<script>
import AddContact from "./AddContact.vue";

export default {
  components: {
    AddContact,
  },

  props: {
    contact: Object,
  },
  methods: {
    // sending out the eventdelete with the id parameter
    deleteContact() {
      this.$emit("delete-contact", this.contact.id);
    },
    // sending out the event edit with the contact parameter
    editContact(contact) {
      this.$emit("edit-contact", contact);
    },
  },
};
</script>
